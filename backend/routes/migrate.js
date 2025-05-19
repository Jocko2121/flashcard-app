const express = require('express');
const router = express.Router();
const { migrateFromLocalStorage } = require('../migrate');
const { errorHandler } = require('../middleware/error-handler');

// POST /api/migrate
// Migrate data from localStorage to LowDB
router.post('/', async (req, res, next) => {
    try {
        const { localStorageData } = req.body;
        
        if (!localStorageData) {
            throw new Error('No localStorage data provided');
        }

        const success = await migrateFromLocalStorage(localStorageData);
        
        if (success) {
            res.json({ 
                message: 'Migration completed successfully',
                timestamp: new Date().toISOString()
            });
        } else {
            throw new Error('Migration failed');
        }
    } catch (error) {
        next(error);
    }
});

// GET /api/migrate/status
// Check if migration has been performed
router.get('/status', (req, res) => {
    // TODO: Implement migration status check
    res.json({ 
        migrated: false,
        timestamp: null
    });
});

module.exports = router; 