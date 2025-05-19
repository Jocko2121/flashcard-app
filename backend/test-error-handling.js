const request = require('supertest');
const express = require('express');
const app = express();
const data = require('./data');
const { errorHandler } = require('./middleware/error-handler');

// Import routes
const setsRouter = require('./routes/sets');
const cardsRouter = require('./routes/cards');

// Middleware
app.use(express.json());

// Mount routes
app.use('/api/sets', setsRouter);
app.use('/api/sets/:setId/cards', cardsRouter);

// Error handling middleware (must be last)
app.use(errorHandler);

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

// Test 1: 404 Not Found Errors
runTest('404 Not Found Errors', async () => {
    // Test non-existent set
    const nonExistentSetResponse = await request(app)
        .get('/api/sets/999');
    assert(nonExistentSetResponse.status === 404, 'Should return 404 for non-existent set');
    assert(nonExistentSetResponse.body.error, 'Should include error message');
    assert(typeof nonExistentSetResponse.body.error === 'string', 'Error should be a string');

    // Test non-existent card
    const nonExistentCardResponse = await request(app)
        .get('/api/sets/1/cards/999');
    assert(nonExistentCardResponse.status === 404, 'Should return 404 for non-existent card');
    assert(nonExistentCardResponse.body.error, 'Should include error message');
    assert(typeof nonExistentCardResponse.body.error === 'string', 'Error should be a string');
});

// Test 2: 400 Bad Request Errors
runTest('400 Bad Request Errors', async () => {
    // Test creating set without name
    const noNameSetResponse = await request(app)
        .post('/api/sets')
        .send({ description: 'No name set' });
    assert(noNameSetResponse.status === 400, 'Should return 400 for missing name');
    assert(noNameSetResponse.body.error, 'Should include error message');
    assert(typeof noNameSetResponse.body.error === 'string', 'Error should be a string');

    // Test creating card without required fields
    const noFieldsCardResponse = await request(app)
        .post('/api/sets/1/cards')
        .send({});
    assert(noFieldsCardResponse.status === 400, 'Should return 400 for missing fields');
    assert(noFieldsCardResponse.body.error, 'Should include error message');
    assert(typeof noFieldsCardResponse.body.error === 'string', 'Error should be a string');
});

// Test 3: Invalid ID Format Errors
runTest('Invalid ID Format Errors', async () => {
    // Test invalid set ID
    const invalidSetIdResponse = await request(app)
        .get('/api/sets/invalid');
    assert(invalidSetIdResponse.status === 404, 'Should return 404 for invalid set ID');
    assert(invalidSetIdResponse.body.error, 'Should include error message');
    assert(typeof invalidSetIdResponse.body.error === 'string', 'Error should be a string');

    // Test invalid card ID
    const invalidCardIdResponse = await request(app)
        .get('/api/sets/1/cards/invalid');
    assert(invalidCardIdResponse.status === 404, 'Should return 404 for invalid card ID');
    assert(invalidCardIdResponse.body.error, 'Should include error message');
    assert(typeof invalidCardIdResponse.body.error === 'string', 'Error should be a string');
});

// Test 4: Error Response Format
runTest('Error Response Format', async () => {
    // Test error response structure
    const errorResponse = await request(app)
        .get('/api/sets/999');
    
    // Check response structure
    assert(errorResponse.body.hasOwnProperty('error'), 'Error response should have error property');
    assert(typeof errorResponse.body.error === 'string', 'Error message should be a string');
    assert(errorResponse.body.error.length > 0, 'Error message should not be empty');
    
    // Check that response doesn't have unexpected properties
    const expectedProperties = ['error'];
    const actualProperties = Object.keys(errorResponse.body);
    assert(
        actualProperties.every(prop => expectedProperties.includes(prop)),
        'Error response should only have expected properties'
    );
});

console.log('\n✨ All error handling tests completed!'); 