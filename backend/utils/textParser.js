const { validationResult } = require('express-validator');

class TextParserError extends Error {
    constructor(message, lineNumber = null, field = null) {
        super(message);
        this.name = 'TextParserError';
        this.lineNumber = lineNumber;
        this.field = field;
    }
}

function parseText(text) {
    if (!text || typeof text !== 'string') {
        throw new TextParserError('No text provided');
    }

    const lines = text.split('\n').map(line => line.trim());
    let currentLine = 0;

    // Parse set name (first line)
    if (!lines[currentLine]) {
        throw new TextParserError('Set name is required', currentLine + 1, 'name');
    }
    const setName = lines[currentLine];
    if (setName.length > 100) {
        throw new TextParserError('Set name must be 100 characters or less', currentLine + 1, 'name');
    }
    currentLine++;

    // Parse set description (second line)
    const setDescription = lines[currentLine] || '';
    if (setDescription.length > 500) {
        throw new TextParserError('Set description must be 500 characters or less', currentLine + 1, 'description');
    }
    currentLine++;

    // Skip blank line after set info
    while (currentLine < lines.length && !lines[currentLine]) {
        currentLine++;
    }

    // Parse cards
    const cards = [];
    let currentCard = null;

    while (currentLine < lines.length) {
        const line = lines[currentLine];

        if (!line) {
            // Empty line - end of current card or just extra whitespace
            if (currentCard) {
                cards.push(currentCard);
                currentCard = null;
            }
            currentLine++;
            continue;
        }

        if (!currentCard) {
            // Start of new card
            if (line.length > 1000) {
                throw new TextParserError('Question must be 1000 characters or less', currentLine + 1, 'question');
            }
            currentCard = {
                question: line,
                answer: ''
            };
        } else {
            // Part of current card's answer
            if (currentCard.answer) {
                currentCard.answer += '\n';
            }
            currentCard.answer += line;
            if (currentCard.answer.length > 1000) {
                throw new TextParserError('Answer must be 1000 characters or less', currentLine + 1, 'answer');
            }
        }
        currentLine++;
    }

    // Add the last card if exists
    if (currentCard) {
        cards.push(currentCard);
    }

    // Validate card count
    if (cards.length === 0) {
        throw new TextParserError('At least one card is required');
    }
    if (cards.length > 100) {
        throw new TextParserError('Maximum 100 cards allowed');
    }

    return {
        name: setName,
        description: setDescription,
        cards: cards
    };
}

function validateParsedData(data) {
    const errors = [];

    // Validate set name
    if (!data.name || typeof data.name !== 'string') {
        errors.push({ field: 'name', message: 'Set name is required' });
    } else if (data.name.length > 100) {
        errors.push({ field: 'name', message: 'Set name must be 100 characters or less' });
    }

    // Validate set description
    if (data.description && data.description.length > 500) {
        errors.push({ field: 'description', message: 'Set description must be 500 characters or less' });
    }

    // Validate cards
    if (!Array.isArray(data.cards) || data.cards.length === 0) {
        errors.push({ field: 'cards', message: 'At least one card is required' });
    } else if (data.cards.length > 100) {
        errors.push({ field: 'cards', message: 'Maximum 100 cards allowed' });
    } else {
        data.cards.forEach((card, index) => {
            if (!card.question || typeof card.question !== 'string') {
                errors.push({ field: `cards[${index}].question`, message: 'Question is required' });
            } else if (card.question.length > 1000) {
                errors.push({ field: `cards[${index}].question`, message: 'Question must be 1000 characters or less' });
            }

            if (!card.answer || typeof card.answer !== 'string') {
                errors.push({ field: `cards[${index}].answer`, message: 'Answer is required' });
            } else if (card.answer.length > 1000) {
                errors.push({ field: `cards[${index}].answer`, message: 'Answer must be 1000 characters or less' });
            }
        });
    }

    return errors;
}

module.exports = {
    parseText,
    validateParsedData,
    TextParserError
}; 