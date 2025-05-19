const express = require('express');
const router = express.Router();
const CardSetController = require('../controllers/cardSetController');
const { validateCardSet, validateId } = require('../middleware/validation');

// Get all card sets
router.get('/', CardSetController.getAll);

// Get specific card set
router.get('/:setId', validateId, CardSetController.getById);

// Create new card set
router.post('/', validateCardSet, CardSetController.create);

// Update card set
router.put('/:setId', validateId, validateCardSet, CardSetController.update);

// Delete card set
router.delete('/:setId', validateId, CardSetController.delete);

// Get all cards in a set
router.get('/:setId/cards', validateId, CardSetController.getCards);

// Add a card to a set
router.post('/:setId/cards', validateId, CardSetController.addCard);

// Delete a card from a set
router.delete('/:setId/cards/:cardId', validateId, CardSetController.deleteCard);

module.exports = router; 