const express = require('express');
const router = express.Router();
const data = require('../data');
const { ValidationError, NotFoundError } = require('../middleware/error-handler');

// Get all sets
router.get('/', (req, res) => {
    const sets = data.getAllSets();
    res.json(sets);
});

// Get set by ID
router.get('/:id', (req, res, next) => {
    const set = data.getSetById(req.params.id);
    if (!set) {
        return next(new NotFoundError(`Set with ID ${req.params.id} not found`));
    }
    res.json(set);
});

// Create new set
router.post('/', (req, res, next) => {
    const { name, description } = req.body;
    
    if (!name) {
        return next(new ValidationError('Set name is required'));
    }

    const newSet = data.addSet({ name, description });
    if (!newSet) {
        return next(new Error('Failed to create set'));
    }
    res.status(201).json(newSet);
});

// Delete set
router.delete('/:id', (req, res, next) => {
    const success = data.deleteSet(req.params.id);
    if (!success) {
        return next(new NotFoundError(`Set with ID ${req.params.id} not found`));
    }
    res.status(204).end();
});

// Add PUT endpoint for updating sets
router.put('/:id', (req, res, next) => {
    const { name, description } = req.body;
    const setId = req.params.id;

    const updatedSet = data.updateSet(setId, { name, description });
    if (!updatedSet) {
        return next(new NotFoundError(`Set with ID ${setId} not found`));
    }
    res.json(updatedSet);
});

module.exports = router; 