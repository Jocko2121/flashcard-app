const fs = require('fs');
const path = require('path');
const config = require('./config');

// Helper function to read JSON file
function readJsonFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.log(`No data found at ${filePath}`);
        return null;
    }
}

// Helper function to write JSON file
function writeJsonFile(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing file:', error);
        return false;
    }
}

// Helper function to generate a unique ID
function generateUniqueId(existingIds) {
    let id = Date.now();
    while (existingIds.has(id)) {
        id++;
    }
    return id;
}

// Standardize data format
function standardizeData() {
    console.log('Starting data standardization...');

    // Read current data
    const currentData = readJsonFile(config.dataPath) || {
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

    // Create a map to track unique sets by name
    const uniqueSets = new Map();
    const existingCardIds = new Set();
    let nextSetId = 1;

    // First pass: collect all existing IDs
    currentData.cardSets.forEach(set => {
        if (set && set.id) {
            nextSetId = Math.max(nextSetId, set.id + 1);
        }
        if (set && set.cards) {
            set.cards.forEach(card => {
                if (card && card.id) {
                    existingCardIds.add(card.id);
                }
            });
        }
    });

    // Process each set
    currentData.cardSets.forEach(set => {
        // Skip if set is invalid
        if (!set || !set.name) {
            console.log('Skipping invalid set:', set);
            return;
        }

        // If we haven't seen this set name before, add it
        if (!uniqueSets.has(set.name)) {
            uniqueSets.set(set.name, {
                id: set.id || nextSetId++,
                name: set.name,
                description: set.description || '',
                cards: set.cards || [],
                createdAt: set.createdAt || new Date().toISOString(),
                lastModified: set.lastModified || new Date().toISOString()
            });
            console.log(`Added new set: ${set.name} (ID: ${uniqueSets.get(set.name).id})`);
        } else {
            // If we have seen this set name, merge the cards
            const existingSet = uniqueSets.get(set.name);
            if (set.cards && set.cards.length > 0) {
                console.log(`Merging ${set.cards.length} cards into existing set: ${set.name}`);
                existingSet.cards = [...existingSet.cards, ...set.cards];
            }
        }
    });

    // Update the data with standardized sets
    currentData.cardSets = Array.from(uniqueSets.values());

    // Clean up and standardize cards
    currentData.cardSets.forEach(set => {
        // Remove any invalid cards
        const initialCardCount = set.cards.length;
        set.cards = (set.cards || []).filter(card => {
            if (!card || !card.question || !card.answer) {
                console.log(`Removing invalid card from set ${set.name}`);
                return false;
            }
            return true;
        });
        if (initialCardCount !== set.cards.length) {
            console.log(`Removed ${initialCardCount - set.cards.length} invalid cards from set ${set.name}`);
        }

        // Ensure each card has required fields with consistent format
        set.cards = set.cards.map(card => {
            // Try to preserve original ID if it's unique
            let cardId = card.id;
            if (!cardId || existingCardIds.has(cardId)) {
                cardId = generateUniqueId(existingCardIds);
            }
            existingCardIds.add(cardId);

            return {
                id: cardId,
                question: card.question.trim(),
                answer: card.answer.trim(),
                completed: card.completed || false,
                createdAt: card.createdAt || new Date().toISOString(),
                lastModified: card.lastModified || new Date().toISOString()
            };
        });

        // Sort cards by creation date
        set.cards.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    });

    // Update statistics
    currentData.statistics.totalCards = currentData.cardSets.reduce(
        (total, set) => total + set.cards.length,
        0
    );
    currentData.statistics.completedCards = currentData.cardSets.reduce(
        (total, set) => total + set.cards.filter(card => card.completed).length,
        0
    );

    // Backup current data
    const backupPath = config.dataPath + '.backup';
    if (fs.existsSync(config.dataPath)) {
        fs.copyFileSync(config.dataPath, backupPath);
        console.log('Created backup at:', backupPath);
    }

    // Validate the final data
    const validationErrors = validateData(currentData);
    if (validationErrors.length > 0) {
        console.error('Validation errors found:', validationErrors);
        return;
    }

    // Save standardized data
    if (writeJsonFile(config.dataPath, currentData)) {
        console.log('\nSuccessfully standardized data!');
        console.log(`Total sets: ${currentData.cardSets.length}`);
        console.log(`Total cards: ${currentData.statistics.totalCards}`);
        console.log(`Completed cards: ${currentData.statistics.completedCards}`);
        console.log('\nSets:');
        currentData.cardSets.forEach(set => {
            console.log(`- ${set.name} (${set.cards.length} cards)`);
        });
    } else {
        console.error('Failed to save standardized data');
    }
}

// Validate the data structure
function validateData(data) {
    const errors = [];

    if (!data.cardSets || !Array.isArray(data.cardSets)) {
        errors.push('cardSets must be an array');
    }

    if (!data.settings) {
        errors.push('settings object is missing');
    }

    if (!data.statistics) {
        errors.push('statistics object is missing');
    }

    data.cardSets.forEach((set, index) => {
        if (!set.id) errors.push(`Set at index ${index} is missing an ID`);
        if (!set.name) errors.push(`Set at index ${index} is missing a name`);
        if (!Array.isArray(set.cards)) errors.push(`Set ${set.name} cards must be an array`);

        set.cards.forEach((card, cardIndex) => {
            if (!card.id) errors.push(`Card at index ${cardIndex} in set ${set.name} is missing an ID`);
            if (!card.question) errors.push(`Card at index ${cardIndex} in set ${set.name} is missing a question`);
            if (!card.answer) errors.push(`Card at index ${cardIndex} in set ${set.name} is missing an answer`);
        });
    });

    return errors;
}

// Run the standardization
standardizeData(); 