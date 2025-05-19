const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const data = require('./data');
const { errorHandler } = require('./middleware/error-handler');

const app = express();

// Middleware
app.use(cors(config.cors));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Initialize data file if it doesn't exist
if (!fs.existsSync(config.dataPath)) {
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
    fs.writeFileSync(config.dataPath, JSON.stringify(defaultData, null, 2));
}

// Import routes
const setsRouter = require('./routes/sets');
const cardsRouter = require('./routes/cards');
const migrateRouter = require('./routes/migrate');

// Mount routes
app.use('/api/sets', setsRouter);
app.use('/api/sets/:setId/cards', cardsRouter);
app.use('/api/migrate', migrateRouter);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
    console.log('=================================');
    console.log(`🚀 Server running on port ${config.port}`);
    console.log(`🌍 Environment: ${config.env}`);
    console.log('=================================');
}); 