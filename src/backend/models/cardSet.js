class CardSet {
    constructor(data) {
        this.id = data.id ? String(data.id) : Date.now().toString();
        this.name = data.name;
        this.description = data.description || '';
        this.createdAt = data.createdAt || new Date().toISOString();
        this.lastModified = data.lastModified || new Date().toISOString();
        this.cards = data.cards || [];
    }

    validate() {
        if (!this.name) {
            throw new Error('Card set name is required');
        }
        return true;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            createdAt: this.createdAt,
            lastModified: this.lastModified,
            cards: this.cards
        };
    }
}

module.exports = CardSet; 