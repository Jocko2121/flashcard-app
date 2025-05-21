// API service for handling all backend communication
const API = {
    // Card Sets
    async getAllSets() {
        const response = await fetch('/api/sets');
        if (!response.ok) throw new Error('Failed to fetch sets');
        return response.json();
    },

    async getSet(id) {
        const response = await fetch(`/api/sets/${id}`);
        if (!response.ok) throw new Error('Failed to fetch set');
        return response.json();
    },

    async createSet(name, description = '') {
        const response = await fetch('/api/sets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description })
        });
        if (!response.ok) throw new Error('Failed to create set');
        return response.json();
    },

    async updateSet(id, name, description = '') {
        const response = await fetch(`/api/sets/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description })
        });
        if (!response.ok) throw new Error('Failed to update set');
        return response.json();
    },

    async deleteSet(id) {
        const response = await fetch(`/api/sets/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete set');
    },

    // Cards
    async getCards(setId) {
        const response = await fetch(`/api/sets/${setId}/cards`);
        if (!response.ok) throw new Error('Failed to fetch cards');
        return response.json();
    },

    async createCard(setId, question, answer) {
        const response = await fetch(`/api/sets/${setId}/cards`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question, answer })
        });
        if (!response.ok) throw new Error('Failed to create card');
        return response.json();
    },

    async updateCard(setId, cardId, question, answer, completed = false) {
        const response = await fetch(`/api/sets/${setId}/cards/${cardId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question, answer, completed })
        });
        if (!response.ok) throw new Error('Failed to update card');
        return response.json();
    },

    async deleteCard(setId, cardId) {
        const response = await fetch(`/api/sets/${setId}/cards/${cardId}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete card');
    },

    // Settings
    async getLastActiveSet() {
        const response = await fetch('/api/sets/settings/last-active-set');
        if (!response.ok) throw new Error('Failed to get last active set');
        const data = await response.json();
        return data.lastActiveSet;
    },

    async updateLastActiveSet(setId) {
        const response = await fetch('/api/sets/settings/last-active-set', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ setId })
        });
        if (!response.ok) throw new Error('Failed to update last active set');
        return response.json();
    }
}; 