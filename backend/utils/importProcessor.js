const data = require('../data');
const { TextParserError } = require('./textParser');

class ImportError extends Error {
    constructor(message, details = null) {
        super(message);
        this.name = 'ImportError';
        this.details = details;
    }
}

async function processImport(parsedData) {
    try {
        // Validate input
        if (!parsedData || !parsedData.name || !parsedData.cards) {
            throw new ImportError('Invalid import data');
        }

        if (parsedData.cards.length === 0) {
            throw new ImportError('At least one card is required');
        }

        // Check for duplicate set name
        const existingSets = await data.getAllSets();
        const duplicateSet = existingSets.find(set => set.name === parsedData.name);
        if (duplicateSet) {
            throw new ImportError('A set with this name already exists', {
                field: 'name',
                existingSetId: duplicateSet.id
            });
        }

        // Create the new set
        const newSet = await data.addSet({
            name: parsedData.name,
            description: parsedData.description
        });

        if (!newSet) {
            throw new ImportError('Failed to create set');
        }

        // Create all cards
        const createdCards = [];
        for (const card of parsedData.cards) {
            if (!card.question || !card.answer) {
                // If card creation fails, delete the set and all created cards
                await data.deleteSet(newSet.id);
                throw new ImportError('Invalid card data', {
                    createdCards: createdCards.length,
                    failedCard: card
                });
            }

            const newCard = await data.createCard(newSet.id, {
                question: card.question,
                answer: card.answer
            });

            if (!newCard) {
                // If card creation fails, delete the set and all created cards
                await data.deleteSet(newSet.id);
                throw new ImportError('Failed to create cards', {
                    createdCards: createdCards.length,
                    failedCard: card
                });
            }

            createdCards.push(newCard);
        }

        return {
            set: newSet,
            cards: createdCards
        };
    } catch (error) {
        if (error instanceof ImportError) {
            throw error;
        }
        throw new ImportError('Failed to process import', {
            originalError: error.message
        });
    }
}

module.exports = {
    processImport,
    ImportError
}; 