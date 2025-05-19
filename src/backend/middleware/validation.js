const CardSet = require('../models/cardSet');
const Card = require('../models/card');

const validateCardSet = (req, res, next) => {
    try {
        const cardSet = new CardSet(req.body);
        cardSet.validate();
        req.cardSet = cardSet;
        next();
    } catch (error) {
        error.name = 'ValidationError';
        next(error);
    }
};

const validateCard = (req, res, next) => {
    try {
        const card = new Card(req.body);
        card.validate();
        req.card = card;
        next();
    } catch (error) {
        error.name = 'ValidationError';
        next(error);
    }
};

const validateId = (req, res, next) => {
    try {
        // For card operations, we expect setId and cardId in the params
        if (req.params.setId && req.params.cardId) {
            const setId = req.params.setId;
            const cardId = req.params.cardId;
            req.id = setId;
            req.cardId = cardId;
            return next();
        }

        // For card set operations, we expect just setId
        const setId = req.params.setId;
        if (!setId) {
            const error = new Error('Set ID is required');
            error.name = 'ValidationError';
            return next(error);
        }

        req.id = setId;
        next();
    } catch (error) {
        error.name = 'ValidationError';
        next(error);
    }
};

module.exports = {
    validateCardSet,
    validateCard,
    validateId
}; 