const db = require('./database');

// Function to migrate data from localStorage format to LowDB format
function migrateFromLocalStorage(localStorageData) {
    try {
        // Parse the localStorage data
        const data = JSON.parse(localStorageData);
        
        // Transform the data to match our new schema
        const cardSets = data.sets.map(set => ({
            id: set.id,
            name: set.name,
            description: set.description || '',
            createdAt: new Date().toISOString(),
            lastModified: new Date().toISOString(),
            cards: set.cards.map(card => ({
                id: card.id,
                question: card.question,
                answer: card.answer,
                lastReviewed: null,
                difficulty: 0,
                completed: false,
                tags: []
            }))
        }));

        // Update the database
        db.set('cardSets', cardSets).write();
        
        // Update statistics
        const totalCards = cardSets.reduce((sum, set) => sum + set.cards.length, 0);
        db.set('statistics.totalCards', totalCards).write();
        
        return true;
    } catch (error) {
        console.error('Migration failed:', error);
        return false;
    }
}

module.exports = {
    migrateFromLocalStorage
}; 