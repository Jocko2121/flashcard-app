const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const config = require('./config');
const data = require('./data');
const { errorHandler } = require('./middleware/error-handler');
const { applySecurityMiddleware } = require('./middleware/security');

const app = express();

// Apply security middleware
applySecurityMiddleware(app);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Initialize data file if it doesn't exist
async function initializeDataFile() {
    try {
        await fs.access(config.dataPath);
    } catch (error) {
        const defaultData = {
            cardSets: [],
            settings: {
                showCompleted: true,
                lastActiveSet: null,
                theme: "light",
                studyMode: "normal"
            },
            statistics: {
                totalCards: 0,
                completedCards: 0,
                lastStudySession: null
            }
        };
        await fs.writeFile(config.dataPath, JSON.stringify(defaultData, null, 2));
    }
}

// Import routes
const setsRouter = require('./routes/sets');
const cardsRouter = require('./routes/cards');

// Mount routes
app.use('/api/sets', setsRouter);
app.use('/api/sets/:setId/cards', cardsRouter);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
async function startServer() {
    await initializeDataFile();
    app.listen(config.port, () => {
        console.log('=================================');
        console.log(`🚀 Server running on port ${config.port}`);
        console.log(`🌍 Environment: ${config.env}`);
        console.log('=================================');
    });
}

startServer().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
}); 