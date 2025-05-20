const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');
const config = require('./config');

// Create adapter
const adapter = new FileSync(config.dataPath);

// Create database instance
const db = low(adapter);

// Set defaults if database is empty
db.defaults({
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
}).write();

module.exports = db; 