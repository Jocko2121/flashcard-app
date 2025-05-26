const request = require('supertest');
const express = require('express');
const data = require('../data');
const fs = require('fs').promises;
const path = require('path');
const config = require('../config');
const { expect } = require('chai');
const errorHandler = require('../middleware/error-handler');

// Patch config.dataPath to use a temporary file for tests
const originalDataPath = config.dataPath;
const tempDataPath = path.join(__dirname, '../test-data.json');
config.dataPath = tempDataPath;

// Helper function to create a fresh app instance
function createApp() {
    const app = express();
    app.use(express.json());
    app.use(errorHandler.errorHandler);
    
    // Import routes
    const setsRouter = require('../routes/sets');
    const cardsRouter = require('../routes/cards');
    
    // Mount routes
    app.use('/api/sets', setsRouter);
    app.use('/api/sets/:setId/cards', (req, res, next) => {
        // Ensure setId is available to card routes
        req.params.setId = req.params.setId;
        next();
    }, cardsRouter);
    
    return app;
}

// Helper function to reset data file
async function resetDataFile() {
    await fs.writeFile(tempDataPath, JSON.stringify({
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
}

// Helper function to wait for file operations
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

before(async () => {
    await resetDataFile();
    await wait(100);
});

afterEach(async () => {
    await resetDataFile();
    await wait(100);
});

after(async () => {
    await resetDataFile();
    await wait(100);
    // Restore original data path and delete temp file
    config.dataPath = originalDataPath;
    await fs.unlink(tempDataPath).catch(() => {});
});

describe('Set Routes', () => {
    let app;

    beforeEach(async () => {
        app = createApp();
    });

    it('Should create a new set', async () => {
        const response = await request(app)
            .post('/api/sets')
            .send({
                name: 'Test Set',
                description: 'Test Description'
            });
        expect(response.status).to.equal(201);
        expect(response.body.id).to.equal(1);
        expect(response.body.name).to.equal('Test Set');
    });

    it('Should get all sets', async () => {
        // Create a test set first
        await request(app)
            .post('/api/sets')
            .send({
                name: 'Test Set',
                description: 'Test Description'
            });

        const response = await request(app).get('/api/sets');
        expect(response.status).to.equal(200);
        expect(Array.isArray(response.body)).to.equal(true);
        expect(response.body.length).to.equal(1);
        expect(response.body[0].name).to.equal('Test Set');
    });

    it('Should get set by ID', async () => {
        // Create a test set first
        const createResponse = await request(app)
            .post('/api/sets')
            .send({
                name: 'Test Set',
                description: 'Test Description'
            });

        const setId = createResponse.body.id;
        const response = await request(app).get(`/api/sets/${setId}`);
        expect(response.status).to.equal(200);
        expect(response.body.id).to.equal(setId);
        expect(response.body.name).to.equal('Test Set');
    });

    it('Should return 404 for non-existent set', async () => {
        const response = await request(app).get('/api/sets/999');
        expect(response.status).to.equal(404);
    });

    it('Should update set', async () => {
        // Create a test set first
        const createResponse = await request(app)
            .post('/api/sets')
            .send({
                name: 'Test Set',
                description: 'Test Description'
            });

        const setId = createResponse.body.id;
        const response = await request(app)
            .put(`/api/sets/${setId}`)
            .send({
                name: 'Updated Set',
                description: 'Updated Description'
            });

        expect(response.status).to.equal(200);
        expect(response.body.id).to.equal(setId);
        expect(response.body.name).to.equal('Updated Set');
        expect(response.body.description).to.equal('Updated Description');
    });

    it('Should delete set', async () => {
        // Create a test set first
        const createResponse = await request(app)
            .post('/api/sets')
            .send({
                name: 'Test Set',
                description: 'Test Description'
            });

        const setId = createResponse.body.id;
        const deleteResponse = await request(app).delete(`/api/sets/${setId}`);
        expect(deleteResponse.status).to.equal(204);

        // Wait for file operations to complete
        await wait(100);

        // Verify set is deleted
        const verifyResponse = await request(app).get('/api/sets');
        expect(verifyResponse.status).to.equal(200);
        expect(verifyResponse.body.length).to.equal(0);
    });
});

describe('Card Routes', () => {
    let app;
    let testSetId;

    beforeEach(async () => {
        app = createApp();
        // Create a test set for card operations
        const createResponse = await request(app)
            .post('/api/sets')
            .send({
                name: 'Card Test Set',
                description: 'For testing cards'
            });
        testSetId = createResponse.body.id;
    });

    it('Should create a new card', async () => {
        const response = await request(app)
            .post(`/api/sets/${testSetId}/cards`)
            .send({
                question: 'Test Question',
                answer: 'Test Answer'
            });
        expect(response.status).to.equal(201);
        expect(response.body.id).to.equal(1);
        expect(response.body.question).to.equal('Test Question');
    });

    it('Should get all cards', async () => {
        // Create a test card first
        await request(app)
            .post(`/api/sets/${testSetId}/cards`)
            .send({
                question: 'Test Question',
                answer: 'Test Answer'
            });

        const response = await request(app).get(`/api/sets/${testSetId}/cards`);
        expect(response.status).to.equal(200);
        expect(Array.isArray(response.body)).to.equal(true);
        expect(response.body.length).to.equal(1);
        expect(response.body[0].question).to.equal('Test Question');
    });

    it('Should get card by ID', async () => {
        // Create a test card first
        const createResponse = await request(app)
            .post(`/api/sets/${testSetId}/cards`)
            .send({
                question: 'Test Question',
                answer: 'Test Answer'
            });

        const cardId = createResponse.body.id;
        const response = await request(app).get(`/api/sets/${testSetId}/cards/${cardId}`);
        expect(response.status).to.equal(200);
        expect(response.body.id).to.equal(cardId);
        expect(response.body.question).to.equal('Test Question');
    });

    it('Should return 404 for non-existent card', async () => {
        const response = await request(app).get(`/api/sets/${testSetId}/cards/999`);
        expect(response.status).to.equal(404);
    });

    it('Should update card', async () => {
        // Create a test card first
        const createResponse = await request(app)
            .post(`/api/sets/${testSetId}/cards`)
            .send({
                question: 'Test Question',
                answer: 'Test Answer'
            });

        const cardId = createResponse.body.id;
        const response = await request(app)
            .put(`/api/sets/${testSetId}/cards/${cardId}`)
            .send({
                question: 'Updated Question',
                answer: 'Updated Answer',
                completed: true
            });

        expect(response.status).to.equal(200);
        expect(response.body.id).to.equal(cardId);
        expect(response.body.question).to.equal('Updated Question');
        expect(response.body.completed).to.equal(true);
    });

    it('Should delete card', async () => {
        // Create a test card first
        const createResponse = await request(app)
            .post(`/api/sets/${testSetId}/cards`)
            .send({
                question: 'Test Question',
                answer: 'Test Answer'
            });

        const cardId = createResponse.body.id;
        const deleteResponse = await request(app).delete(`/api/sets/${testSetId}/cards/${cardId}`);
        expect(deleteResponse.status).to.equal(204);

        // Wait for file operations to complete
        await wait(100);

        // Verify card is deleted
        const verifyResponse = await request(app).get(`/api/sets/${testSetId}/cards`);
        expect(verifyResponse.status).to.equal(200);
        expect(verifyResponse.body.length).to.equal(0);
    });
});

describe('Error Handling', () => {
    let app;

    beforeEach(async () => {
        app = createApp();
    });

    it('Should return 404 for invalid set ID', async () => {
        const response = await request(app).get('/api/sets/invalid');
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('Resource not found');
    });

    it('Should return 404 for invalid card ID', async () => {
        // Create a test set first
        const createResponse = await request(app)
            .post('/api/sets')
            .send({
                name: 'Test Set',
                description: 'Test Description'
            });

        const setId = createResponse.body.id;
        const response = await request(app).get(`/api/sets/${setId}/cards/invalid`);
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('Resource not found');
    });
});

console.log('\n✨ All route tests completed!'); 