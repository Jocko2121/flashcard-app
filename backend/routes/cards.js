const express = require('express');
const router = express.Router({ mergeParams: true });
const data = require('../data');
const { ValidationError, NotFoundError } = require('../middleware/error-handler');
const { cardCreationRules, cardUpdateRules, idValidationRules } = require('../middleware/security');

// Get all cards in a set
router.get('/', async (req, res, next) => {
    try {
        const set = await data.getSetById(req.params.setId);
        if (!set) {
            return next(new NotFoundError(`Set with ID ${req.params.setId} not found`));
        }
        res.json(set.cards);
    } catch (error) {
        next(error);
    }
});

// Get card by ID
router.get('/:id', idValidationRules, async (req, res, next) => {
    try {
        const card = await data.getCardById(req.params.setId, req.params.id);
        if (!card) {
            return next(new NotFoundError(`Card with ID ${req.params.id} not found in set ${req.params.setId}`));
        }
        res.json(card);
    } catch (error) {
        next(error);
    }
});

// Create new card
router.post('/', cardCreationRules, async (req, res, next) => {
    try {
        const { question, answer } = req.body;
        const set = await data.getSetById(req.params.setId);
        if (!set) {
            return next(new NotFoundError(`Set with ID ${req.params.setId} not found`));
        }

        const newCard = await data.createCard(req.params.setId, { question, answer });
        if (!newCard) {
            return next(new Error('Failed to create card'));
        }
        res.status(201).json(newCard);
    } catch (error) {
        next(error);
    }
});

// Update card
router.put('/:id', [...idValidationRules, ...cardUpdateRules], async (req, res, next) => {
    try {
        const { question, answer, completed } = req.body;
        const updatedCard = await data.updateCard(req.params.setId, req.params.id, { question, answer, completed });
        if (!updatedCard) {
            return next(new NotFoundError(`Card with ID ${req.params.id} not found in set ${req.params.setId}`));
        }
        res.json(updatedCard);
    } catch (error) {
        next(error);
    }
});

// Delete card
router.delete('/:id', idValidationRules, async (req, res, next) => {
    try {
        const success = await data.deleteCard(req.params.setId, req.params.id);
        if (!success) {
            return next(new NotFoundError(`Card with ID ${req.params.id} not found in set ${req.params.setId}`));
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router; 