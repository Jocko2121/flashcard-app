const db = require('../config/database');

class CardController {
    static async getAllInSet(req, res, next) {
        try {
            const set = db.get('cardSets')
                .find({ id: req.id })
                .value();

            if (!set) {
                const error = new Error('Card set not found');
                error.name = 'NotFoundError';
                return next(error);
            }

            res.json(set.cards);
        } catch (error) {
            error.name = 'DatabaseError';
            next(error);
        }
    }

    static async getById(req, res, next) {
        try {
            const set = db.get('cardSets')
                .find({ id: req.id })
                .value();

            if (!set) {
                const error = new Error('Card set not found');
                error.name = 'NotFoundError';
                return next(error);
            }

            const card = set.cards.find(c => c.id === parseInt(req.params.cardId));
            if (!card) {
                const error = new Error('Card not found');
                error.name = 'NotFoundError';
                return next(error);
            }

            res.json(card);
        } catch (error) {
            error.name = 'DatabaseError';
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const set = db.get('cardSets')
                .find({ id: req.id });

            if (!set.value()) {
                const error = new Error('Card set not found');
                error.name = 'NotFoundError';
                return next(error);
            }

            const card = req.card;
            const newCard = card.toJSON();

            set.get('cards')
                .push(newCard)
                .write();

            // Update statistics
            db.update('statistics.totalCards', n => n + 1)
                .write();

            res.status(201).json(newCard);
        } catch (error) {
            error.name = 'DatabaseError';
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const set = db.get('cardSets')
                .find({ id: req.id });

            if (!set.value()) {
                const error = new Error('Card set not found');
                error.name = 'NotFoundError';
                return next(error);
            }

            const card = set.get('cards')
                .find({ id: parseInt(req.params.cardId) });

            if (!card.value()) {
                const error = new Error('Card not found');
                error.name = 'NotFoundError';
                return next(error);
            }

            const updates = {
                ...req.card.toJSON(),
                lastModified: new Date().toISOString()
            };

            if (updates.completed && !card.value().completed) {
                updates.lastReviewed = new Date().toISOString();
                // Update statistics
                db.update('statistics.completedCards', n => n + 1)
                    .write();
            }

            card.assign(updates)
                .write();

            res.json(card.value());
        } catch (error) {
            error.name = 'DatabaseError';
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            console.log('CardController.delete received:', {
                id: req.id,
                cardId: req.cardId,
                params: req.params,
                path: req.path,
                method: req.method
            });

            const set = db.get('cardSets')
                .find({ id: req.id });

            if (!set.value()) {
                console.log('Card set not found:', req.id);
                const error = new Error('Card set not found');
                error.name = 'NotFoundError';
                return next(error);
            }

            console.log('Found card set:', set.value());

            const card = set.get('cards')
                .find({ id: req.cardId });

            if (!card.value()) {
                console.log('Card not found:', req.cardId);
                const error = new Error('Card not found');
                error.name = 'NotFoundError';
                return next(error);
            }

            console.log('Found card:', card.value());

            // Update statistics
            if (card.value().completed) {
                db.update('statistics.completedCards', n => n - 1)
                    .write();
            }
            db.update('statistics.totalCards', n => n - 1)
                .write();

            // Delete the card
            set.get('cards')
                .remove({ id: req.cardId })
                .write();

            console.log('Card deleted successfully');
            res.status(204).send();
        } catch (error) {
            console.error('Error in delete:', error);
            error.name = 'DatabaseError';
            next(error);
        }
    }
}

module.exports = CardController; 