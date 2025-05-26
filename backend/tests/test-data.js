const { expect } = require('chai');
const fs = require('fs').promises;
const path = require('path');
const data = require('../data');

describe('Data Operations', () => {
    const dataFilePath = path.join(__dirname, '../data.json');
    const backupPath = `${dataFilePath}.backup`;

    before(async () => {
        // Backup original data file if it exists
        try {
            await fs.access(dataFilePath);
            await fs.copyFile(dataFilePath, backupPath);
        } catch (error) {
            // File doesn't exist, that's fine
        }
        // Clear data file for testing
        await data.resetData();
    });

    after(async () => {
        // Restore original data file if it existed
        try {
            await fs.access(backupPath);
            await fs.copyFile(backupPath, dataFilePath);
            await fs.unlink(backupPath);
        } catch (error) {
            // No backup file, that's fine
        }
    });

    describe('Set Operations', () => {
        it('should handle basic set operations', async () => {
            // Test adding a set
            const newSet = await data.addSet({
                name: 'Test Set',
                description: 'Test Description'
            });
            expect(newSet).to.exist;
            expect(newSet.id).to.equal(1);
            expect(newSet.name).to.equal('Test Set');
            expect(newSet.cards).to.be.an('array').that.is.empty;

            // Test getting all sets
            const allSets = await data.getAllSets();
            expect(allSets).to.have.lengthOf(1);
            expect(allSets[0].id).to.equal(1);

            // Test getting set by ID
            const retrievedSet = await data.getSetById(1);
            expect(retrievedSet).to.exist;
            expect(retrievedSet.name).to.equal('Test Set');

            // Test deleting set
            const deleteResult = await data.deleteSet(1);
            expect(deleteResult).to.be.true;
            const finalSets = await data.getAllSets();
            expect(finalSets).to.have.lengthOf(0);
        });
    });

    describe('Card Operations', () => {
        let testSet;

        beforeEach(async () => {
            // Create a test set before each test
            testSet = await data.addSet({
                name: 'Card Test Set',
                description: 'For testing cards'
            });
        });

        it('should handle card operations', async () => {
            // Test adding a card
            const newCard = await data.createCard(testSet.id, {
                question: 'Test Question',
                answer: 'Test Answer'
            });
            expect(newCard).to.exist;
            expect(newCard.id).to.equal(1);
            expect(newCard.question).to.equal('Test Question');
            expect(newCard.completed).to.be.false;

            // Test getting all cards
            const allCards = await data.getAllCards(testSet.id);
            expect(allCards).to.have.lengthOf(1);
            expect(allCards[0].id).to.equal(1);

            // Test getting card by ID
            const retrievedCard = await data.getCardById(testSet.id, 1);
            expect(retrievedCard).to.exist;
            expect(retrievedCard.question).to.equal('Test Question');

            // Test updating card
            const updatedCard = await data.updateCard(testSet.id, 1, {
                question: 'Updated Question',
                answer: 'Updated Answer'
            });
            expect(updatedCard).to.exist;
            expect(updatedCard.question).to.equal('Updated Question');
            expect(updatedCard.answer).to.equal('Updated Answer');

            // Test deleting card
            const deleteResult = await data.deleteCard(testSet.id, 1);
            expect(deleteResult).to.be.true;
            const finalCards = await data.getAllCards(testSet.id);
            expect(finalCards).to.have.lengthOf(0);
        });
    });

    describe('Error Handling', () => {
        it('should handle non-existent resources', async () => {
            // Test getting non-existent set
            const nonExistentSet = await data.getSetById(999);
            expect(nonExistentSet).to.be.null;

            // Test getting non-existent card
            const nonExistentCard = await data.getCardById(1, 999);
            expect(nonExistentCard).to.be.null;

            // Test adding card to non-existent set
            const addToNonExistentSet = await data.createCard(999, {
                question: 'Test',
                answer: 'Test'
            });
            expect(addToNonExistentSet).to.be.null;

            // Test updating non-existent card
            const updateNonExistentCard = await data.updateCard(1, 999, {
                question: 'Test',
                answer: 'Test'
            });
            expect(updateNonExistentCard).to.be.null;
        });
    });
}); 