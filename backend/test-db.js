const db = require('./database');

// Test 1: Check if database file exists and has correct structure
console.log('Test 1: Checking database structure...');
const structure = db.getState();
console.log('Current database structure:', JSON.stringify(structure, null, 2));

// Test 2: Try to write some test data
console.log('\nTest 2: Writing test data...');
const testSet = {
    id: 1,
    name: "Test Set",
    description: "A test set for database verification",
    createdAt: new Date().toISOString(),
    lastModified: new Date().toISOString(),
    cards: [
        {
            id: 1,
            question: "Test question?",
            answer: "Test answer",
            lastReviewed: null,
            difficulty: 0,
            completed: false,
            tags: []
        }
    ]
};

db.get('cardSets')
    .push(testSet)
    .write();

// Test 3: Read back the data
console.log('\nTest 3: Reading back test data...');
const savedSet = db.get('cardSets')
    .find({ id: 1 })
    .value();
console.log('Saved test set:', JSON.stringify(savedSet, null, 2));

// Test 4: Update the data
console.log('\nTest 4: Updating test data...');
db.get('cardSets')
    .find({ id: 1 })
    .assign({ name: "Updated Test Set" })
    .write();

const updatedSet = db.get('cardSets')
    .find({ id: 1 })
    .value();
console.log('Updated test set:', JSON.stringify(updatedSet, null, 2));

// Test 5: Delete the test data
console.log('\nTest 5: Deleting test data...');
db.get('cardSets')
    .remove({ id: 1 })
    .write();

const remainingSets = db.get('cardSets')
    .value();
console.log('Remaining sets:', JSON.stringify(remainingSets, null, 2));

console.log('\nAll tests completed!'); 