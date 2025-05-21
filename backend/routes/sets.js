const express = require('express');
const router = express.Router();
const data = require('../data');
const { ValidationError, NotFoundError } = require('../middleware/error-handler');

// Get all sets
router.get('/', (req, res) => {
    res.json(data.getAllSets());
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

// Update set
router.put('/:id', (req, res, next) => {
    const { name, description } = req.body;
    const updatedSet = data.updateSet(req.params.id, { name, description });
    if (!updatedSet) {
        return next(new NotFoundError(`Set with ID ${req.params.id} not found`));
    }
    res.json(updatedSet);
});

// Delete set
router.delete('/:id', (req, res, next) => {
    const success = data.deleteSet(req.params.id);
    if (!success) {
        return next(new NotFoundError(`Set with ID ${req.params.id} not found`));
    }
    res.status(204).send();
});

// Get last active set
router.get('/settings/last-active-set', (req, res) => {
    const lastActiveSet = data.getLastActiveSet();
    res.json({ lastActiveSet });
});

// Update last active set
router.post('/settings/last-active-set', (req, res, next) => {
    const { setId } = req.body;
    if (!setId) {
        return next(new ValidationError('Set ID is required'));
    }
    const success = data.updateLastActiveSet(setId);
    if (!success) {
        return next(new Error('Failed to update last active set'));
    }
    res.json({ lastActiveSet: setId });
});

module.exports = router; 