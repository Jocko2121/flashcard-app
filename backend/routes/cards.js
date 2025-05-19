const express = require('express');
const router = express.Router({ mergeParams: true });
const data = require('../data');
const { ValidationError, NotFoundError } = require('../middleware/error-handler');

// Get all cards in a set
router.get('/', (req, res, next) => {
    const set = data.getSetById(req.params.setId);
    if (!set) {
        return next(new NotFoundError(`Set with ID ${req.params.setId} not found`));
    }
    res.json(set.cards);
});

// Get card by ID
router.get('/:id', (req, res, next) => {
    const card = data.getCardById(req.params.setId, req.params.id);
    if (!card) {
        return next(new NotFoundError(`Card with ID ${req.params.id} not found in set ${req.params.setId}`));
    }
    res.json(card);
});

// Create new card
router.post('/', (req, res, next) => {
    const { question, answer } = req.body;
    
    if (!question || !answer) {
        return next(new ValidationError('Question and answer are required'));
    }

    const set = data.getSetById(req.params.setId);
    if (!set) {
        return next(new NotFoundError(`Set with ID ${req.params.setId} not found`));
    }

    const newCard = data.createCard(req.params.setId, { question, answer });
    res.status(201).json(newCard);
});

// Delete card
router.delete('/:id', (req, res, next) => {
    const success = data.deleteCard(req.params.setId, req.params.id);
    if (!success) {
        return next(new NotFoundError(`Card with ID ${req.params.id} not found in set ${req.params.setId}`));
    }
    res.status(204).send();
});

// Add PUT endpoint for updating cards
router.put('/:id', (req, res, next) => {
    const { question, answer, completed } = req.body;
    const setId = req.params.setId;
    const cardId = req.params.id;

    const updatedCard = data.updateCard(setId, cardId, { question, answer, completed });
    if (!updatedCard) {
        return next(new NotFoundError(`Card with ID ${cardId} not found in set ${setId}`));
    }
    res.json(updatedCard);
});

module.exports = router; 