const { expect } = require('chai');
const db = require('../database');

describe('Database', () => {
    beforeEach(() => {
        // Reset database state before each test
        db.setState({ cardSets: [] });
    });

    it('should have correct initial structure', () => {
        const structure = db.getState();
        expect(structure).to.have.property('cardSets').that.is.an('array');
    });

    it('should write and read test data', () => {
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

        // Write test data
        db.get('cardSets')
            .push(testSet)
            .write();

        // Read back the data
        const savedSet = db.get('cardSets')
            .find({ id: 1 })
            .value();

        expect(savedSet).to.deep.equal(testSet);
    });

    it('should update test data', () => {
        // First create a test set
        const testSet = {
            id: 1,
            name: "Test Set",
            description: "A test set for database verification",
            createdAt: new Date().toISOString(),
            lastModified: new Date().toISOString(),
            cards: []
        };

        db.get('cardSets')
            .push(testSet)
            .write();

        // Update the data
        db.get('cardSets')
            .find({ id: 1 })
            .assign({ name: "Updated Test Set" })
            .write();

        const updatedSet = db.get('cardSets')
            .find({ id: 1 })
            .value();

        expect(updatedSet.name).to.equal("Updated Test Set");
    });

    it('should delete test data', () => {
        // First create a test set
        const testSet = {
            id: 1,
            name: "Test Set",
            description: "A test set for database verification",
            createdAt: new Date().toISOString(),
            lastModified: new Date().toISOString(),
            cards: []
        };

        db.get('cardSets')
            .push(testSet)
            .write();

        // Delete the test data
        db.get('cardSets')
            .remove({ id: 1 })
            .write();

        const remainingSets = db.get('cardSets')
            .value();

        expect(remainingSets).to.be.an('array').that.is.empty;
    });
}); 