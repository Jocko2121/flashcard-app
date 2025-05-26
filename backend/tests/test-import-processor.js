const { expect } = require('chai');
const data = require('../data');
const { processImport, ImportError } = require('../utils/importProcessor');

describe('Import Processor', () => {
    beforeEach(async () => {
        await data.resetData();
    });

    describe('processImport', () => {
        it('should process valid import data', async () => {
            const importData = {
                name: 'Test Set',
                description: 'Test Description',
                cards: [
                    { question: 'Q1', answer: 'A1' },
                    { question: 'Q2', answer: 'A2' }
                ]
            };

            const result = await processImport(importData);
            expect(result).to.have.property('set');
            expect(result.set).to.have.property('name', 'Test Set');
            expect(result.set).to.have.property('description', 'Test Description');
            expect(result.cards).to.have.lengthOf(2);
            expect(result.cards[0]).to.have.property('question', 'Q1');
            expect(result.cards[1]).to.have.property('question', 'Q2');
        });

        it('should handle duplicate set names', async () => {
            // Create initial set
            await data.addSet({
                name: 'Test Set',
                description: 'Original Set'
            });

            const importData = {
                name: 'Test Set',
                description: 'Duplicate Set',
                cards: [{ question: 'Q1', answer: 'A1' }]
            };

            try {
                await processImport(importData);
                expect.fail('Should have thrown ImportError');
            } catch (error) {
                expect(error).to.be.instanceOf(ImportError);
                expect(error.message).to.equal('A set with this name already exists');
                expect(error.details).to.have.property('field', 'name');
            }
        });

        it('should rollback on card creation failure', async () => {
            const importData = {
                name: 'Test Set',
                description: 'Test Description',
                cards: [
                    { question: 'Q1', answer: 'A1' },
                    { question: '', answer: 'A2' } // Invalid card
                ]
            };

            try {
                await processImport(importData);
                expect.fail('Should have thrown ImportError');
            } catch (error) {
                expect(error).to.be.instanceOf(ImportError);
                
                // Verify set was rolled back
                const sets = await data.getAllSets();
                expect(sets).to.have.lengthOf(0);
            }
        });

        it('should handle empty card list', async () => {
            const importData = {
                name: 'Test Set',
                description: 'Test Description',
                cards: []
            };

            try {
                await processImport(importData);
                expect.fail('Should have thrown ImportError');
            } catch (error) {
                expect(error).to.be.instanceOf(ImportError);
                expect(error.message).to.equal('At least one card is required');
            }
        });
    });
}); 