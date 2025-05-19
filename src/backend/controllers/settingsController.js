const db = require('../config/database');

class SettingsController {
    static async getSettings(req, res, next) {
        try {
            const settings = db.get('settings').value();
            res.json(settings);
        } catch (error) {
            error.name = 'DatabaseError';
            next(error);
        }
    }

    static async updateSettings(req, res, next) {
        try {
            const { showCompleted, lastActiveSet, theme, studyMode } = req.body;
            
            const updates = {};
            if (showCompleted !== undefined) updates.showCompleted = showCompleted;
            if (lastActiveSet !== undefined) updates.lastActiveSet = lastActiveSet;
            if (theme !== undefined) updates.theme = theme;
            if (studyMode !== undefined) updates.studyMode = studyMode;

            db.get('settings')
                .assign(updates)
                .write();

            res.json(db.get('settings').value());
        } catch (error) {
            error.name = 'DatabaseError';
            next(error);
        }
    }

    static async getStatistics(req, res, next) {
        try {
            const stats = db.get('statistics').value();
            res.json(stats);
        } catch (error) {
            error.name = 'DatabaseError';
            next(error);
        }
    }

    static async updateStudySession(req, res, next) {
        try {
            const { duration, cardsReviewed } = req.body;
            
            if (!duration || !cardsReviewed) {
                const error = new Error('Duration and cards reviewed are required');
                error.name = 'ValidationError';
                return next(error);
            }

            db.get('statistics')
                .assign({
                    lastStudySession: {
                        date: new Date().toISOString(),
                        duration,
                        cardsReviewed
                    }
                })
                .write();

            res.json(db.get('statistics').value());
        } catch (error) {
            error.name = 'DatabaseError';
            next(error);
        }
    }
}

module.exports = SettingsController; 