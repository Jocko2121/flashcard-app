const fs = require('fs').promises;
const path = require('path');
const config = require('./config');

// Data structure validation
function isValidDataStructure(data) {
    return data 
        && typeof data === 'object'
        && Array.isArray(data.cardSets)
        && typeof data.settings === 'object'
        && typeof data.statistics === 'object';
}

// Helper function to read data
async function readData() {
    try {
        const data = await fs.readFile(config.dataPath, 'utf8');
        if (!data || data.trim() === '') {
            throw new Error('Empty data file');
        }
        const parsedData = JSON.parse(data);
        
        if (!isValidDataStructure(parsedData)) {
            throw new Error('Invalid data structure');
        }
        
        return parsedData;
    } catch (error) {
        console.error('Error reading data:', error);
        // Create default data structure
        const defaultData = {
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
        // Try to write the default data
        try {
            await writeData(defaultData);
        } catch (writeError) {
            console.error('Error writing default data:', writeError);
        }
        return defaultData;
    }
}

// Helper function to write data
async function writeData(data) {
    try {
        if (!isValidDataStructure(data)) {
            throw new Error('Invalid data structure');
        }

        const dataString = JSON.stringify(data, null, 2);
        if (dataString.length > 10 * 1024 * 1024) { // 10MB limit
            throw new Error('Data too large');
        }

        await fs.writeFile(config.dataPath, dataString);
        return true;
    } catch (error) {
        console.error('Error writing data:', error);
        return false;
    }
}

// Get all libraries
async function getAllSets() {
    const data = await readData();
    return data.cardSets;
}

// Get set by ID
async function getSetById(id) {
    const data = await readData();
    const set = data.cardSets.find(set => String(set.id) === String(id));
    return set || null;
}

// Add new set
async function addSet({ name, description }) {
    const data = await readData();
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
    if (await writeData(data)) {
        return newSet;
    }
    return null;
}

// Delete set
async function deleteSet(id) {
    const data = await readData();
    const initialLength = data.cardSets.length;
    data.cardSets = data.cardSets.filter(set => String(set.id) !== String(id));
    if (data.cardSets.length !== initialLength) {
        return await writeData(data);
    }
    return false;
}

// Get all cards in a set
async function getAllCards(setId) {
    const set = await getSetById(setId);
    return set ? set.cards : [];
}

// Get card by ID
async function getCardById(setId, cardId) {
    const set = await getSetById(setId);
    if (!set) return null;
    const card = set.cards.find(card => String(card.id) === String(cardId));
    return card || null;
}

// Add card to set
async function createCard(setId, { question, answer }) {
    const data = await readData();
    const set = data.cardSets.find(s => String(s.id) === String(setId));
    if (!set) return null;
    
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
    if (await writeData(data)) {
        return newCard;
    }
    return null;
}

// Update card
async function updateCard(setId, cardId, { question, answer, completed }) {
    const data = await readData();
    const set = data.cardSets.find(s => String(s.id) === String(setId));
    if (!set) return null;

    const card = set.cards.find(c => String(c.id) === String(cardId));
    if (!card) return null;

    if (question) card.question = question;
    if (answer) card.answer = answer;
    if (completed !== undefined) card.completed = completed;
    card.lastModified = new Date().toISOString();

    if (await writeData(data)) {
        return card;
    }
    return null;
}

// Delete card
async function deleteCard(setId, cardId) {
    const data = await readData();
    const set = data.cardSets.find(s => String(s.id) === String(setId));
    if (!set) return false;

    const initialLength = set.cards.length;
    set.cards = set.cards.filter(card => String(card.id) !== String(cardId));
    if (set.cards.length !== initialLength) {
        return await writeData(data);
    }
    return false;
}

// Update set
async function updateSet(id, { name, description }) {
    const data = await readData();
    const set = data.cardSets.find(s => String(s.id) === String(id));
    if (!set) return null;

    if (name) set.name = name;
    if (description) set.description = description;
    set.lastModified = new Date().toISOString();

    if (await writeData(data)) {
        return set;
    }
    return null;
}

// Reset data file (for testing)
async function resetData() {
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
    return await writeData(blankData);
}

// Get last active set
async function getLastActiveSet() {
    const data = await readData();
    return data.settings.lastActiveSet;
}

// Update last active set
async function updateLastActiveSet(setId) {
    const data = await readData();
    data.settings.lastActiveSet = setId;
    return await writeData(data);
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