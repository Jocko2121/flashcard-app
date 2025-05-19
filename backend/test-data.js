const data = require('./data');
const fs = require('fs');
const path = require('path');

// Test helper functions
function assert(condition, message) {
    if (!condition) {
        console.error(`❌ Test failed: ${message}`);
        return false;
    }
    console.log(`✅ ${message}`);
    return true;
}

function runTest(name, testFn) {
    console.log(`\n🧪 Running test: ${name}`);
    return testFn();
}

// Backup original data file if it exists
const dataFilePath = path.join(__dirname, 'data.json');
const backupFilePath = path.join(__dirname, 'data.json.backup');
if (fs.existsSync(dataFilePath)) {
    fs.copyFileSync(dataFilePath, backupFilePath);
    console.log('📦 Backed up existing data.json');
}

// Clear data file for testing
fs.writeFileSync(dataFilePath, JSON.stringify({
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
}, null, 2));

console.log('🧹 Cleared data file for testing\n');

// Test 1: Basic Set Operations
runTest('Basic Set Operations', () => {
    // Test adding a set
    const newSet = data.addSet({
        name: 'Test Set',
        description: 'Test Description'
    });
    assert(newSet, 'Should create a new set');
    assert(newSet.id === 1, 'Set should have ID 1');
    assert(newSet.name === 'Test Set', 'Set should have correct name');
    assert(newSet.cards.length === 0, 'New set should have no cards');

    // Test getting all sets
    const allSets = data.getAllSets();
    assert(allSets.length === 1, 'Should have one set');
    assert(allSets[0].id === 1, 'Should get the correct set');

    // Test getting set by ID
    const retrievedSet = data.getSetById(1);
    assert(retrievedSet, 'Should retrieve set by ID');
    assert(retrievedSet.name === 'Test Set', 'Retrieved set should have correct name');

    // Test deleting set
    const deleteResult = data.deleteSet(1);
    assert(deleteResult, 'Should delete set successfully');
    assert(data.getAllSets().length === 0, 'Should have no sets after deletion');
});

// Test 2: Card Operations
runTest('Card Operations', () => {
    // Create a test set
    const set = data.addSet({
        name: 'Card Test Set',
        description: 'For testing cards'
    });
    assert(set, 'Should create test set');

    // Test adding a card
    const newCard = data.addCard(set.id, {
        question: 'Test Question',
        answer: 'Test Answer'
    });
    assert(newCard, 'Should create a new card');
    assert(newCard.id === 1, 'Card should have ID 1');
    assert(newCard.question === 'Test Question', 'Card should have correct question');
    assert(newCard.completed === false, 'New card should not be completed');

    // Test getting all cards
    const allCards = data.getAllCards(set.id);
    assert(allCards.length === 1, 'Should have one card');
    assert(allCards[0].id === 1, 'Should get the correct card');

    // Test getting card by ID
    const retrievedCard = data.getCardById(set.id, 1);
    assert(retrievedCard, 'Should retrieve card by ID');
    assert(retrievedCard.question === 'Test Question', 'Retrieved card should have correct question');

    // Test updating card
    const updatedCard = data.updateCard(set.id, 1, {
        question: 'Updated Question',
        answer: 'Updated Answer'
    });
    assert(updatedCard, 'Should update card successfully');
    assert(updatedCard.question === 'Updated Question', 'Card should have updated question');
    assert(updatedCard.answer === 'Updated Answer', 'Card should have updated answer');

    // Test deleting card
    const deleteResult = data.deleteCard(set.id, 1);
    assert(deleteResult, 'Should delete card successfully');
    assert(data.getAllCards(set.id).length === 0, 'Should have no cards after deletion');
});

// Test 3: Error Handling
runTest('Error Handling', () => {
    // Test getting non-existent set
    const nonExistentSet = data.getSetById(999);
    assert(nonExistentSet === null, 'Should return null for non-existent set');

    // Test getting non-existent card
    const nonExistentCard = data.getCardById(1, 999);
    assert(nonExistentCard === null, 'Should return null for non-existent card');

    // Test adding card to non-existent set
    const addToNonExistentSet = data.addCard(999, {
        question: 'Test',
        answer: 'Test'
    });
    assert(addToNonExistentSet === null, 'Should return null when adding to non-existent set');

    // Test updating non-existent card
    const updateNonExistentCard = data.updateCard(1, 999, {
        question: 'Test',
        answer: 'Test'
    });
    assert(updateNonExistentCard === null, 'Should return null when updating non-existent card');
});

// Restore original data file if it existed
if (fs.existsSync(backupFilePath)) {
    fs.copyFileSync(backupFilePath, dataFilePath);
    fs.unlinkSync(backupFilePath);
    console.log('\n📦 Restored original data.json');
}

console.log('\n✨ All tests completed!'); 