const request = require('supertest');
const express = require('express');
const app = express();
const { migrateFromLocalStorage } = require('../migrate');
const migrateRouter = require('../routes/migrate');
const { errorHandler } = require('../middleware/error-handler');

// Middleware
app.use(express.json());

// Mount migration route
app.use('/api/migrate', migrateRouter);

// Error handling
app.use(errorHandler);

describe('Migration API', () => {
    const testLocalStorageData = {
        sets: [
            {
                id: '1',
                name: 'Test Set',
                description: 'Test Description',
                cards: [
                    {
                        id: '1',
                        question: 'Test Question',
                        answer: 'Test Answer'
                    }
                ]
            }
        ]
    };

    test('POST /api/migrate - successful migration', async () => {
        const response = await request(app)
            .post('/api/migrate')
            .send({ localStorageData: JSON.stringify(testLocalStorageData) });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Migration completed successfully');
        expect(response.body).toHaveProperty('timestamp');
    });

    test('POST /api/migrate - missing data', async () => {
        const response = await request(app)
            .post('/api/migrate')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    test('GET /api/migrate/status', async () => {
        const response = await request(app)
            .get('/api/migrate/status');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('migrated');
        expect(response.body).toHaveProperty('timestamp');
    });
}); 