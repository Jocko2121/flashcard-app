class Card {
    constructor(data) {
        this.id = data.id || Date.now();
        this.question = data.question;
        this.answer = data.answer;
        this.completed = data.completed || false;
        this.lastReviewed = data.lastReviewed || null;
        this.createdAt = data.createdAt || new Date().toISOString();
        this.lastModified = data.lastModified || new Date().toISOString();
    }

    validate() {
        if (!this.question) {
            throw new Error('Card question is required');
        }
        if (!this.answer) {
            throw new Error('Card answer is required');
        }
        return true;
    }

    toJSON() {
        return {
            id: this.id,
            question: this.question,
            answer: this.answer,
            completed: this.completed,
            lastReviewed: this.lastReviewed,
            createdAt: this.createdAt,
            lastModified: this.lastModified
        };
    }
}

module.exports = Card; 