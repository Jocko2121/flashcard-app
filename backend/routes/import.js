const express = require('express');
const router = express.Router();
const data = require('../data');
const { parseText, validateParsedData, TextParserError } = require('../utils/textParser');
const { processImport, ImportError } = require('../utils/importProcessor');
const { ValidationError } = require('../middleware/error-handler');

// Preview import
router.post('/preview', async (req, res, next) => {
    try {
        const { text } = req.body;
        if (!text || typeof text !== 'string') {
            return next(new ValidationError('Import text is required'));
        }

        // Parse and validate the text
        const parsedData = parseText(text);
        const validationErrors = validateParsedData(parsedData);

        // Check for duplicate set name
        const existingSets = await data.getAllSets();
        const duplicateSet = existingSets.find(set => set.name === parsedData.name);
        if (duplicateSet) {
            validationErrors.push({
                field: 'name',
                message: 'A set with this name already exists',
                existingSetId: duplicateSet.id
            });
        }

        // Return preview data
        res.json({
            set: {
                name: parsedData.name,
                description: parsedData.description
            },
            cards: parsedData.cards.map(card => ({
                question: card.question,
                answer: card.answer
            })),
            validation: {
                isValid: validationErrors.length === 0,
                errors: validationErrors
            }
        });
    } catch (error) {
        if (error instanceof TextParserError) {
            return next(new ValidationError(error.message, {
                lineNumber: error.lineNumber,
                field: error.field
            }));
        }
        next(error);
    }
});

// Import set
router.post('/', async (req, res, next) => {
    let createdSet = null;
    let createdCards = [];

    try {
        const { text } = req.body;
        if (!text || typeof text !== 'string') {
            return next(new ValidationError('Import text is required'));
        }

        // Parse and validate the text
        const parsedData = parseText(text);
        const validationErrors = validateParsedData(parsedData);
        if (validationErrors.length > 0) {
            return next(new ValidationError('Invalid import data', validationErrors));
        }

        // Check for duplicate set name
        const existingSets = await data.getAllSets();
        const duplicateSet = existingSets.find(set => set.name === parsedData.name);
        if (duplicateSet) {
            return next(new ValidationError('A set with this name already exists', {
                field: 'name',
                existingSetId: duplicateSet.id
            }));
        }

        // Create the set
        createdSet = await data.addSet({
            name: parsedData.name,
            description: parsedData.description
        });

        if (!createdSet) {
            throw new Error('Failed to create set');
        }

        // Create all cards
        for (const card of parsedData.cards) {
            const newCard = await data.createCard(createdSet.id, {
                question: card.question,
                answer: card.answer
            });

            if (!newCard) {
                // If card creation fails, rollback by deleting the set
                if (createdSet) {
                    await data.deleteSet(createdSet.id);
                }
                throw new Error('Failed to create cards');
            }

            createdCards.push(newCard);
        }

        // Return success response with created data
        res.status(201).json({
            set: createdSet,
            cards: createdCards,
            message: `Successfully imported ${createdCards.length} cards`
        });
    } catch (error) {
        // Rollback on any error
        if (createdSet) {
            try {
                await data.deleteSet(createdSet.id);
            } catch (rollbackError) {
                console.error('Failed to rollback set creation:', rollbackError);
            }
        }

        if (error instanceof TextParserError) {
            return next(new ValidationError(error.message, {
                lineNumber: error.lineNumber,
                field: error.field
            }));
        }
        if (error instanceof ImportError) {
            return next(new ValidationError(error.message, error.details));
        }
        next(error);
    }
});

module.exports = router; 