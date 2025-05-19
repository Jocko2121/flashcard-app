const db = require('../config/database');
const fs = require('fs');
const path = require('path');

class CardSetController {
    static async getAll(req, res, next) {
        try {
            const sets = db.get('cardSets').value();
            res.json(sets);
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
            
            res.json(set);
        } catch (error) {
            error.name = 'DatabaseError';
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const cardSet = req.cardSet;
            const newSet = cardSet.toJSON();

            db.get('cardSets')
                .push(newSet)
                .write();

            // Update statistics
            db.update('statistics.totalCards', n => n + 0)
                .write();

            res.status(201).json(newSet);
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

            const updates = {
                ...req.cardSet.toJSON(),
                lastModified: new Date().toISOString()
            };

            set.assign(updates)
                .write();

            res.json(set.value());
        } catch (error) {
            error.name = 'DatabaseError';
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const set = db.get('cardSets')
                .find({ id: req.id });

            if (!set.value()) {
                const error = new Error('Card set not found');
                error.name = 'NotFoundError';
                return next(error);
            }

            // Update statistics before deleting
            const cardCount = set.value().cards.length;
            db.update('statistics.totalCards', n => n - cardCount)
                .write();

            // Delete the set
            db.get('cardSets')
                .remove({ id: req.id })
                .write();

            res.status(204).send();
        } catch (error) {
            error.name = 'DatabaseError';
            next(error);
        }
    }

    static async getCards(req, res, next) {
        try {
            const set = db.get('cardSets').find({ id: req.id }).value();
            if (!set) {
                const error = new Error('Card set not found');
                error.name = 'NotFoundError';
                return next(error);
            }
            res.json(set.cards || []);
        } catch (error) {
            error.name = 'DatabaseError';
            next(error);
        }
    }

    static async addCard(req, res, next) {
        try {
            const set = db.get('cardSets').find({ id: req.id });
            const setValue = set.value();
            if (!setValue) {
                const error = new Error('Card set not found');
                error.name = 'NotFoundError';
                return next(error);
            }
            const { question, answer } = req.body;
            if (!question || !answer) {
                const error = new Error('Question and answer are required');
                error.name = 'ValidationError';
                return next(error);
            }

            // Create card with string ID
            const cardId = Date.now().toString();
            console.log('Creating new card with ID:', cardId);

            const newCard = {
                id: cardId,
                question,
                answer,
                completed: false,
                createdAt: new Date().toISOString(),
                lastModified: new Date().toISOString()
            };

            set.get('cards').push(newCard).write();
            db.update('statistics.totalCards', n => n + 1).write();
            res.status(201).json(newCard);
        } catch (error) {
            error.name = 'DatabaseError';
            next(error);
        }
    }

    static async deleteCard(req, res, next) {
        try {
            // Get the card set
            const set = db.get('cardSets')
                .find({ id: req.id });

            if (!set.value()) {
                const error = new Error('Card set not found');
                error.name = 'NotFoundError';
                return next(error);
            }

            const setValue = set.value();

            // Convert cardId to string for comparison
            const cardId = req.cardId.toString();

            // Find the card in the set
            const cardIndex = setValue.cards.findIndex(card => card.id === cardId);
            if (cardIndex === -1) {
                const error = new Error('Card not found');
                error.name = 'NotFoundError';
                return next(error);
            }

            // Remove the card
            set.get('cards')
                .splice(cardIndex, 1)
                .write();

            // Update statistics
            db.update('statistics.totalCards', n => n - 1)
                .write();

            res.status(204).send();
        } catch (error) {
            error.name = 'DatabaseError';
            next(error);
        }
    }
}

module.exports = CardSetController; 