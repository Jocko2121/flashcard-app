const { expect } = require('chai');
const { parseText, validateParsedData, TextParserError } = require('../utils/textParser');

describe('Text Parser', () => {
    describe('parseText', () => {
        it('should parse valid text format', () => {
            const text = `Math Basics
Basic arithmetic questions

What is 2+2?
4

What is the quadratic formula?
The quadratic formula is:
x = (-b ± √(b² - 4ac)) / 2a`;

            const result = parseText(text);
            expect(result).to.have.property('name', 'Math Basics');
            expect(result).to.have.property('description', 'Basic arithmetic questions');
            expect(result.cards).to.have.lengthOf(2);
            expect(result.cards[0]).to.deep.include({
                question: 'What is 2+2?',
                answer: '4'
            });
            expect(result.cards[1].question).to.equal('What is the quadratic formula?');
            expect(result.cards[1].answer).to.include('x = (-b ± √(b² - 4ac)) / 2a');
        });

        it('should handle empty text', () => {
            expect(() => parseText('')).to.throw(TextParserError, 'No text provided');
        });

        it('should handle missing set name', () => {
            const text = `
Description

Question
Answer`;
            expect(() => parseText(text)).to.throw(TextParserError, 'Set name is required');
        });

        it('should handle set name too long', () => {
            const text = 'a'.repeat(101) + '\nDescription\n\nQuestion\nAnswer';
            expect(() => parseText(text)).to.throw(TextParserError, 'Set name must be 100 characters or less');
        });

        it('should handle description too long', () => {
            const text = `Set Name
${'a'.repeat(501)}

Question
Answer`;
            expect(() => parseText(text)).to.throw(TextParserError, 'Set description must be 500 characters or less');
        });

        it('should handle question too long', () => {
            const text = `Set Name
Description

${'a'.repeat(1001)}
Answer`;
            expect(() => parseText(text)).to.throw(TextParserError, 'Question must be 1000 characters or less');
        });

        it('should handle answer too long', () => {
            const text = `Set Name
Description

Question
${'a'.repeat(1001)}`;
            expect(() => parseText(text)).to.throw(TextParserError, 'Answer must be 1000 characters or less');
        });

        it('should handle no cards', () => {
            const text = `Set Name
Description

`;
            expect(() => parseText(text)).to.throw(TextParserError, 'At least one card is required');
        });
    });

    describe('validateParsedData', () => {
        it('should validate valid data', () => {
            const data = {
                name: 'Test Set',
                description: 'Test Description',
                cards: [
                    { question: 'Q1', answer: 'A1' },
                    { question: 'Q2', answer: 'A2' }
                ]
            };
            const errors = validateParsedData(data);
            expect(errors).to.have.lengthOf(0);
        });

        it('should validate missing name', () => {
            const data = {
                description: 'Test Description',
                cards: [{ question: 'Q1', answer: 'A1' }]
            };
            const errors = validateParsedData(data);
            expect(errors).to.have.lengthOf(1);
            expect(errors[0].field).to.equal('name');
        });

        it('should validate missing cards', () => {
            const data = {
                name: 'Test Set',
                description: 'Test Description',
                cards: []
            };
            const errors = validateParsedData(data);
            expect(errors).to.have.lengthOf(1);
            expect(errors[0].field).to.equal('cards');
        });

        it('should validate invalid card data', () => {
            const data = {
                name: 'Test Set',
                description: 'Test Description',
                cards: [{ question: '', answer: 'A1' }]
            };
            const errors = validateParsedData(data);
            expect(errors).to.have.lengthOf(1);
            expect(errors[0].field).to.equal('cards[0].question');
        });
    });
}); 