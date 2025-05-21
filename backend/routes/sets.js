const express = require('express');
const router = express.Router();
const data = require('../data');
const { ValidationError, NotFoundError } = require('../middleware/error-handler');
const { setValidationRules, idValidationRules } = require('../middleware/security');

// Get all sets
router.get('/', async (req, res, next) => {
    try {
        const sets = await data.getAllSets();
        res.json(sets);
    } catch (error) {
        next(error);
    }
});

// Get set by ID
router.get('/:id', idValidationRules, async (req, res, next) => {
    try {
        const set = await data.getSetById(req.params.id);
        if (!set) {
            return next(new NotFoundError(`Set with ID ${req.params.id} not found`));
        }
        res.json(set);
    } catch (error) {
        next(error);
    }
});

// Create new set
router.post('/', setValidationRules, async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const newSet = await data.addSet({ name, description });
        if (!newSet) {
            return next(new Error('Failed to create set'));
        }
        res.status(201).json(newSet);
    } catch (error) {
        next(error);
    }
});

// Update set
router.put('/:id', [...idValidationRules, ...setValidationRules], async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const updatedSet = await data.updateSet(req.params.id, { name, description });
        if (!updatedSet) {
            return next(new NotFoundError(`Set with ID ${req.params.id} not found`));
        }
        res.json(updatedSet);
    } catch (error) {
        next(error);
    }
});

// Delete set
router.delete('/:id', idValidationRules, async (req, res, next) => {
    try {
        const success = await data.deleteSet(req.params.id);
        if (!success) {
            return next(new NotFoundError(`Set with ID ${req.params.id} not found`));
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

// Get last active set
router.get('/settings/last-active-set', async (req, res, next) => {
    try {
        const lastActiveSet = await data.getLastActiveSet();
        res.json({ lastActiveSet });
    } catch (error) {
        next(error);
    }
});

// Update last active set
router.post('/settings/last-active-set', async (req, res, next) => {
    try {
        const { setId } = req.body;
        const set = await data.getSetById(setId);
        if (!set) {
            return next(new NotFoundError(`Set with ID ${setId} not found`));
        }
        await data.updateLastActiveSet(setId);
        res.json({ lastActiveSet: setId });
    } catch (error) {
        next(error);
    }
});

module.exports = router; 