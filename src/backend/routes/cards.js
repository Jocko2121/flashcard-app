const express = require('express');
const router = express.Router();
const CardController = require('../controllers/cardController');
const { validateCard, validateId } = require('../middleware/validation');

// Get all cards in a set
router.get('/:setId/cards', validateId, CardController.getAllInSet);

// Get specific card
router.get('/:setId/cards/:cardId', validateId, CardController.getById);

// Add card to set
router.post('/:setId/cards', validateId, validateCard, CardController.create);

// Update card
router.put('/:setId/cards/:cardId', validateId, validateCard, CardController.update);

// Delete card
router.delete('/:setId/cards/:cardId', validateId, CardController.delete);

module.exports = router; 