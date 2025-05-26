const { expect } = require('chai');
const request = require('supertest');
const express = require('express');
const data = require('../data');
const importRouter = require('../routes/import');
const { errorHandler } = require('../middleware/error-handler');

describe('Import Routes', () => {
    let app;

    beforeEach(async () => {
        await data.resetData();
        app = express();
        app.use(express.json());
        app.use('/api/sets/import', importRouter);
        app.use(errorHandler);
    });

    describe('POST /api/sets/import/preview', () => {
        it('should preview valid import text', async () => {
            const validText = `Math Basics
Basic arithmetic questions

What is 2+2?
4

What is 5×5?
25`;

            const response = await request(app)
                .post('/api/sets/import/preview')
                .send({ text: validText });

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('set');
            expect(response.body.set).to.have.property('name', 'Math Basics');
            expect(response.body.set).to.have.property('description', 'Basic arithmetic questions');
            expect(response.body).to.have.property('cards').that.is.an('array');
            expect(response.body.cards).to.have.lengthOf(2);
            expect(response.body).to.have.property('validation');
            expect(response.body.validation).to.have.property('isValid', true);
        });

        it('should handle invalid text format', async () => {
            const invalidText = `Math Basics
${'a'.repeat(501)}  // Description too long

What is 2+2?
4`;

            const response = await request(app)
                .post('/api/sets/import/preview')
                .send({ text: invalidText });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('error');
            expect(response.body.error).to.include('Set description must be 500 characters or less');
        });

        it('should handle missing text', async () => {
            const response = await request(app)
                .post('/api/sets/import/preview')
                .send({});

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('error');
            expect(response.body.error).to.equal('Import text is required');
        });
    });

    describe('POST /api/sets/import', () => {
        it('should import valid text', async () => {
            const validText = `Math Basics
Basic arithmetic questions

What is 2+2?
4

What is 5×5?
25`;

            const response = await request(app)
                .post('/api/sets/import')
                .send({ text: validText });

            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('set');
            expect(response.body.set).to.have.property('name', 'Math Basics');
            expect(response.body.set).to.have.property('description', 'Basic arithmetic questions');
            expect(response.body).to.have.property('cards').that.is.an('array');
            expect(response.body.cards).to.have.lengthOf(2);
        });

        it('should handle duplicate set names', async () => {
            // First create a set
            const validText = `Math Basics
Basic arithmetic questions

What is 2+2?
4`;

            await request(app)
                .post('/api/sets/import')
                .send({ text: validText });

            // Try to create another set with the same name
            const response = await request(app)
                .post('/api/sets/import')
                .send({ text: validText });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('error');
            expect(response.body.error).to.equal('A set with this name already exists');
        });

        it('should handle invalid text format', async () => {
            const invalidText = `Math Basics
${'a'.repeat(501)}  // Description too long

What is 2+2?
4`;

            const response = await request(app)
                .post('/api/sets/import')
                .send({ text: invalidText });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('error');
            expect(response.body.error).to.include('Set description must be 500 characters or less');
        });

        it('should handle missing text', async () => {
            const response = await request(app)
                .post('/api/sets/import')
                .send({});

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('error');
            expect(response.body.error).to.equal('Import text is required');
        });
    });
}); 