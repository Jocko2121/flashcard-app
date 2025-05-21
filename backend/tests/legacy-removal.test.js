const request = require('supertest');
const express = require('express');
const cors = require('cors');
const setsRouter = require('../routes/sets');
const cardsRouter = require('../routes/cards');
const data = require('../data');
const { expect } = require('chai');
const path = require('path');
const fs = require('fs');

// Set test environment
process.env.NODE_ENV = 'test';

// Ensure test data file exists
const testDataPath = path.join(__dirname, '../test-data.json');
if (!fs.existsSync(testDataPath)) {
    fs.writeFileSync(testDataPath, JSON.stringify({
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

describe('Legacy Code Removal Implementation Tests', () => {
  let app;
  let testSetId;
  let testCardId;

  // Setup: Create test app and data before running tests
  before(async () => {
    // Reset data to initial state
    data.resetData();

    app = express();
    app.use(cors());
    app.use(express.json());
    
    // Mount routes with correct paths
    app.use('/api/sets', setsRouter);   // Mount sets router first
    app.use('/api/sets/:setId/cards', cardsRouter);  // Mount cards router with setId param

    // Create a test set
    const setResponse = await request(app)
      .post('/api/sets')
      .send({
        name: 'Test Set',
        description: 'For testing legacy code removal'
      });
    testSetId = setResponse.body.id;
    console.log('Created test set with ID:', testSetId);

    // Create a test card
    const cardResponse = await request(app)
      .post(`/api/sets/${testSetId}/cards`)
      .send({
        question: 'Test Question',
        answer: 'Test Answer'
      });
    testCardId = cardResponse.body.id;
    console.log('Created test card with ID:', testCardId);
  });

  // Cleanup: Delete test data after tests
  after(async () => {
    if (testCardId) {
      await request(app).delete(`/api/sets/${testSetId}/cards/${testCardId}`);
    }
    if (testSetId) {
      await request(app).delete(`/api/sets/${testSetId}`);
    }
    // Reset data after tests
    data.resetData();
  });

  describe('Last Active Set Functionality', () => {
    it('should initially return null for last active set', async () => {
      const response = await request(app)
        .get('/api/sets/settings/last-active-set');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({ lastActiveSet: null });
    });

    it('should update and retrieve last active set', async () => {
      console.log('Updating last active set with ID:', testSetId);
      // Update last active set
      const updateResponse = await request(app)
        .post('/api/sets/settings/last-active-set')
        .send({ setId: testSetId });
      console.log('Update response:', updateResponse.body);
      expect(updateResponse.status).to.equal(200);
      expect(updateResponse.body).to.deep.equal({ lastActiveSet: testSetId });

      // Verify the update
      const getResponse = await request(app)
        .get('/api/sets/settings/last-active-set');
      console.log('Get response:', getResponse.body);
      expect(getResponse.status).to.equal(200);
      expect(getResponse.body).to.deep.equal({ lastActiveSet: testSetId });
    });
  });

  describe('Card Completion Functionality', () => {
    it('should mark a card as completed', async () => {
      console.log('Marking card as completed:', { setId: testSetId, cardId: testCardId });
      const response = await request(app)
        .put(`/api/sets/${testSetId}/cards/${testCardId}`)
        .send({ completed: true });
      console.log('Card completion response:', response.body);
      expect(response.status).to.equal(200);
      expect(response.body.completed).to.be.true;
    });

    it('should retrieve completed cards', async () => {
      const response = await request(app)
        .get(`/api/sets/${testSetId}/cards`)
        .query({ completed: true });
      console.log('Completed cards response:', response.body);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body[0].completed).to.be.true;
    });

    it('should mark a card as incomplete', async () => {
      const response = await request(app)
        .put(`/api/sets/${testSetId}/cards/${testCardId}`)
        .send({ completed: false });
      console.log('Card incompletion response:', response.body);
      expect(response.status).to.equal(200);
      expect(response.body.completed).to.be.false;
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid set ID', async () => {
      const response = await request(app)
        .get('/api/sets/999999/cards');
      expect(response.status).to.equal(404);
    });

    it('should handle invalid card ID', async () => {
      const response = await request(app)
        .get(`/api/sets/${testSetId}/cards/999999`);
      expect(response.status).to.equal(404);
    });

    it('should handle invalid last active set update', async () => {
      const response = await request(app)
        .post('/api/sets/settings/last-active-set')
        .send({ setId: 999999 });
      expect(response.status).to.equal(404);
    });
  });
}); 