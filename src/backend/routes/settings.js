const express = require('express');
const router = express.Router();
const SettingsController = require('../controllers/settingsController');
const { exec } = require('child_process');

// Get settings
router.get('/', SettingsController.getSettings);

// Update settings
router.put('/', SettingsController.updateSettings);

// Get statistics
router.get('/statistics', SettingsController.getStatistics);

// Update last study session
router.put('/statistics/session', SettingsController.updateStudySession);

// Kill all Node.js servers (Development only)
router.post('/kill-servers', (req, res) => {
    console.log('Attempting to kill all Node.js servers...');
    
    // For Windows
    if (process.platform === 'win32') {
        exec('taskkill /F /IM node.exe', (error, stdout, stderr) => {
            if (error) {
                console.error('Error killing servers:', error);
                return res.status(500).json({ error: 'Failed to kill servers' });
            }
            console.log('Successfully terminated all Node.js processes');
            res.json({ message: 'All servers terminated successfully' });
        });
    } 
    // For Unix-like systems (Linux/Mac)
    else {
        exec('pkill -f node', (error, stdout, stderr) => {
            if (error) {
                console.error('Error killing servers:', error);
                return res.status(500).json({ error: 'Failed to kill servers' });
            }
            console.log('Successfully terminated all Node.js processes');
            res.json({ message: 'All servers terminated successfully' });
        });
    }
});

module.exports = router; 