const fs = require('fs');
const config = require('./config');

// Helper function to read data
function readData() {
    try {
        const data = fs.readFileSync(config.dataPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data:', error);
        return {
            cardSets: [],
            settings: {
                showCompleted: true,
                lastActiveSet: null,
                theme: "light",
                studyMode: "normal"
            },
            statistics: {
                totalCards: 0,
                completedCards: 0,
                lastStudySession: null
            }
        };
    }
}

// Helper function to write data
function writeData(data) {
    try {
        fs.writeFileSync(config.dataPath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing data:', error);
        return false;
    }
}

// Get all card sets
function getAllSets() {
    const data = readData();
    return data.cardSets;
}

// Get set by ID
function getSetById(id) {
    const data = readData();
    const set = data.cardSets.find(set => String(set.id) === String(id));
    return set || null;
}

// Add new set
function addSet({ name, description }) {
    const data = readData();
    // Find the max existing set ID and increment
    const maxId = data.cardSets.reduce((max, set) => Math.max(max, Number(set.id)), 0);
    const newSet = {
        id: maxId + 1,
        name,
        description,
        cards: [],
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString()
    };
    data.cardSets.push(newSet);
    if (writeData(data)) {
        return newSet;
    }
    return null;
}

// Delete set
function deleteSet(id) {
    console.log(`Attempting to delete set with ID: ${id}`);
    const data = readData();
    console.log(`Current sets before deletion: ${JSON.stringify(data.cardSets)}`);
    const initialLength = data.cardSets.length;
    data.cardSets = data.cardSets.filter(set => String(set.id) !== String(id));
    console.log(`Sets after filter: ${JSON.stringify(data.cardSets)}`);
    if (data.cardSets.length !== initialLength) {
        const writeResult = writeData(data);
        console.log(`Write result: ${writeResult}`);
        return writeResult;
    }
    console.log('No sets were removed');
    return false;
}

// Get all cards in a set
function getAllCards(setId) {
    const set = getSetById(setId);
    return set ? set.cards : [];
}

// Get card by ID
function getCardById(setId, cardId) {
    const set = getSetById(setId);
    if (!set) return null;
    const card = set.cards.find(card => String(card.id) === String(cardId));
    return card || null;
}

// Add card to set
function createCard(setId, { question, answer }) {
    const data = readData();
    const set = data.cardSets.find(s => String(s.id) === String(setId));
    if (!set) return null;
    // Find the max existing card ID and increment
    const maxCardId = set.cards.reduce((max, card) => Math.max(max, Number(card.id)), 0);
    const newCard = {
        id: maxCardId + 1,
        question,
        answer,
        completed: false,
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString()
    };
    set.cards.push(newCard);
    if (writeData(data)) {
        return newCard;
    }
    return null;
}

// Update card
function updateCard(setId, cardId, { question, answer, completed }) {
    const data = readData();
    const set = data.cardSets.find(s => String(s.id) === String(setId));
    if (!set) return null;

    const card = set.cards.find(c => String(c.id) === String(cardId));
    if (!card) return null;

    if (question) card.question = question;
    if (answer) card.answer = answer;
    if (completed !== undefined) card.completed = completed;
    card.lastModified = new Date().toISOString();

    if (writeData(data)) {
        return card;
    }
    return null;
}

// Delete card
function deleteCard(setId, cardId) {
    const data = readData();
    const set = data.cardSets.find(s => String(s.id) === String(setId));
    if (!set) return false;

    const initialLength = set.cards.length;
    set.cards = set.cards.filter(card => String(card.id) !== String(cardId));
    if (set.cards.length !== initialLength) {
        return writeData(data);
    }
    return false;
}

// Add updateSet function
function updateSet(id, { name, description }) {
    const data = readData();
    const set = data.cardSets.find(s => String(s.id) === String(id));
    if (!set) return null;

    if (name) set.name = name;
    if (description) set.description = description;
    set.lastModified = new Date().toISOString();

    if (writeData(data)) {
        return set;
    }
    return null;
}

// Reset data file (for testing)
function resetData() {
    const blankData = {
        cardSets: [],
        settings: {
            showCompleted: true,
            lastActiveSet: null,
            theme: "light",
            studyMode: "normal"
        },
        statistics: {
            totalCards: 0,
            completedCards: 0,
            lastStudySession: null
        }
    };
    return writeData(blankData);
}

// Get last active set
function getLastActiveSet() {
    const data = readData();
    return data.settings.lastActiveSet;
}

// Update last active set
function updateLastActiveSet(setId) {
    const data = readData();
    data.settings.lastActiveSet = setId;
    return writeData(data);
}

module.exports = {
    getAllSets,
    getSetById,
    addSet,
    deleteSet,
    getAllCards,
    getCardById,
    createCard,
    updateCard,
    deleteCard,
    updateSet,
    resetData,
    getLastActiveSet,
    updateLastActiveSet
}; 