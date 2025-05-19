// Card management class
class CardManager {
    constructor() {
        this.currentSetId = null;
        this.cards = [];
        this.doneCards = new Set(JSON.parse(localStorage.getItem('doneCards') || '[]'));
    }

    async loadCards(setId) {
        try {
            this.currentSetId = setId;
            const response = await fetch(`/api/sets/${setId}/cards`);
            this.cards = await response.json();
            this.renderCards();
            this.loadDoneCards();
        } catch (error) {
            console.error('Failed to load cards:', error);
            this.showError('Failed to load cards');
        }
    }

    async createCard(question, answer) {
        if (!this.currentSetId) {
            this.showError('No card set selected');
            return;
        }

        try {
            const response = await fetch(`/api/sets/${this.currentSetId}/cards`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question, answer })
            });

            if (!response.ok) {
                throw new Error('Failed to create card');
            }

            await this.loadCards(this.currentSetId);
        } catch (error) {
            console.error('Failed to create card:', error);
            this.showError('Failed to create card');
        }
    }

    async updateCard(cardId, updates) {
        if (!this.currentSetId) {
            this.showError('No card set selected');
            return;
        }

        try {
            const response = await fetch(`/api/sets/${this.currentSetId}/cards/${cardId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updates)
            });

            if (!response.ok) {
                throw new Error('Failed to update card');
            }

            await this.loadCards(this.currentSetId);
        } catch (error) {
            console.error('Failed to update card:', error);
            this.showError('Failed to update card');
        }
    }

    async deleteCard(cardId) {
        if (!this.currentSetId) {
            this.showError('No card set selected');
            return;
        }

        try {
            const url = `/api/sets/${this.currentSetId}/cards/${cardId}`;
            console.log('Attempting to delete card with URL:', url);
            
            const response = await fetch(url, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Delete failed with status:', response.status, 'Error:', errorText);
                throw new Error('Failed to delete card');
            }

            // Remove from local state
            this.cards = this.cards.filter(card => card.id !== cardId);
            this.doneCards.delete(cardId);
            
            // Refresh the display
            this.renderCards();
            this.loadDoneCards();
        } catch (error) {
            console.error('Failed to delete card:', error);
            this.showError('Failed to delete card');
        }
    }

    async toggleComplete(cardId) {
        const card = this.cards.find(c => c.id === cardId);
        if (!card) return;

        if (this.doneCards.has(cardId)) {
            this.doneCards.delete(cardId);
        } else {
            this.doneCards.add(cardId);
        }
        localStorage.setItem('doneCards', JSON.stringify([...this.doneCards]));
        this.loadCards(this.currentSetId);
    }

    renderCards() {
        const container = document.querySelector('.card-list-container');
        if (!container) return;

        const activeCards = this.cards.filter(card => !this.doneCards.has(card.id));
        
        if (activeCards.length === 0) {
            container.innerHTML = `
                <div class="card-set">
                    No cards in this set yet. Click "Add Flashcard" to create one!
                </div>
            `;
            return;
        }

        container.innerHTML = activeCards.map(card => `
            <div class="flashcard" data-id="${card.id}">
                <h3>${card.question}</h3>
                <p>${card.answer}</p>
                <div class="controls">
                    <button class="complete" data-id="${card.id}">Complete</button>
                    <button class="delete" data-id="${card.id}">Delete</button>
                </div>
            </div>
        `).join('');

        // Add event listeners
        container.querySelectorAll('.complete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cardId = e.target.dataset.id;
                this.toggleComplete(cardId);
            });
        });

        container.querySelectorAll('.delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cardId = e.target.dataset.id;
                if (confirm('Are you sure you want to delete this card?')) {
                    this.deleteCard(cardId);
                }
            });
        });
    }

    loadDoneCards() {
        const container = document.querySelector('.panel-right .panel-content');
        if (!container) return;

        const doneCardsList = this.cards.filter(card => this.doneCards.has(card.id));
        
        if (doneCardsList.length === 0) {
            container.innerHTML = `
                <div class="card-set">
                    No completed cards yet. Complete some cards to see them here!
                </div>
            `;
            return;
        }

        container.innerHTML = doneCardsList.map(card => `
            <div class="card-set completed" data-id="${card.id}">
                <h3>${card.question}</h3>
                <p>${card.answer}</p>
                <button class="activate" data-id="${card.id}">Activate</button>
                <button class="delete" data-id="${card.id}">Delete</button>
            </div>
        `).join('');

        // Add event listeners
        container.querySelectorAll('.activate').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cardId = e.target.dataset.id;
                this.toggleComplete(cardId);
            });
        });

        container.querySelectorAll('.delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cardId = e.target.dataset.id;
                if (confirm('Are you sure you want to delete this card?')) {
                    this.deleteCard(cardId);
                }
            });
        });
    }

    showError(message) {
        console.error(message);
        // TODO: Add visual error feedback
    }
}

// Initialize the card manager
const cardManager = new CardManager();

// Export for use in app.js
window.CardManager = CardManager; 