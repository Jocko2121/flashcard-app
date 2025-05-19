// API endpoints
const API = {
    cardSets: '/api/sets',
    cards: '/api/sets/:setId/cards',
    settings: '/api/settings'
};

// Main app class
class FlashcardApp {
    constructor() {
        this.currentSetId = null;
        this.settings = null;
        this.initializeApp();
    }

    async initializeApp() {
        try {
            // Load settings
            const settingsResponse = await fetch(API.settings);
            this.settings = await settingsResponse.json();
            // this.updateSettingsUI(this.settings); // Disabled: not implemented

            // Load card sets
            await this.loadCardSets();

            // Set initial panel states - show left panel by default
            const layout = document.querySelector('.layout-3col');
            const leftPanel = document.querySelector('.panel-left');
            const rightPanel = document.querySelector('.panel-right');
            
            if (layout && leftPanel && rightPanel) {
                leftPanel.classList.remove('panel-hidden');
                leftPanel.classList.add('panel-visible');
                rightPanel.classList.add('panel-hidden');
                rightPanel.classList.remove('panel-visible');
                layout.style.gridTemplateColumns = '260px 1fr 0';
            }

            // Set up event listeners
            this.setupEventListeners();
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showError('Failed to load application data');
        }
    }

    async loadCardSets() {
        try {
            const response = await fetch(API.cardSets);
            const sets = await response.json();
            this.cardSets = sets;
            this.renderCardSets(sets);
        } catch (error) {
            console.error('Failed to load card sets:', error);
            this.showError('Failed to load card sets');
        }
    }

    async createCardSet(name, description) {
        try {
            const response = await fetch(API.cardSets, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, description })
            });

            if (!response.ok) {
                throw new Error('Failed to create card set');
            }

            await this.loadCardSets();
        } catch (error) {
            console.error('Failed to create card set:', error);
            this.showError('Failed to create card set');
        }
    }

    async updateCardSet(id, updates) {
        try {
            const response = await fetch(`${API.cardSets}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updates)
            });

            if (!response.ok) {
                throw new Error('Failed to update card set');
            }

            await this.loadCardSets();
        } catch (error) {
            console.error('Failed to update card set:', error);
            this.showError('Failed to update card set');
        }
    }

    async deleteCardSet(id) {
        try {
            const response = await fetch(`${API.cardSets}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete card set');
            }

            await this.loadCardSets();
        } catch (error) {
            console.error('Failed to delete card set:', error);
            this.showError('Failed to delete card set');
        }
    }

    renderCardSets(sets) {
        const container = document.getElementById('card-sets-list');
        if (!container) return;

        container.innerHTML = sets.map(set => `
            <div class="card-set ${String(set.id) === String(this.currentSetId) ? 'active' : ''}" data-id="${set.id}">
                <div class="set-content-view">
                    <h3>${set.name}</h3>
                    <p>${set.description || ''}</p>
                    <button class="edit-set-btn" data-id="${set.id}">Edit</button>
                    <button class="delete-set-btn" data-id="${set.id}">Delete</button>
                </div>
                <form class="edit-set-form" data-id="${set.id}" style="display:none; margin-top:10px;">
                    <input type="text" name="edit-set-name" value="${set.name}" style="width:90%; margin-bottom:5px;" required />
                    <input type="text" name="edit-set-desc" value="${set.description || ''}" style="width:90%; margin-bottom:5px;" />
                    <button type="submit">Save</button>
                    <button type="button" class="cancel-edit-set-btn">Cancel</button>
                </form>
            </div>
        `).join('');

        // Add event listeners for card set selection and editing
        container.querySelectorAll('.card-set').forEach(setElement => {
            const setId = setElement.dataset.id;
            
            // Set selection
            setElement.querySelector('.set-content-view').addEventListener('click', (e) => {
                if (e.target.classList.contains('edit-set-btn') || e.target.classList.contains('delete-set-btn')) return;
                this.selectCardSet(setId);
            });

            // Edit button
            setElement.querySelector('.edit-set-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                setElement.querySelector('.set-content-view').style.display = 'none';
                setElement.querySelector('.edit-set-form').style.display = 'block';
            });

            // Delete button
            setElement.querySelector('.delete-set-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm('Are you sure you want to delete this card set?')) {
                    this.deleteCardSet(setId);
                }
            });

            // Cancel edit
            setElement.querySelector('.cancel-edit-set-btn').addEventListener('click', (e) => {
                setElement.querySelector('.edit-set-form').style.display = 'none';
                setElement.querySelector('.set-content-view').style.display = 'block';
            });

            // Save edit
            setElement.querySelector('.edit-set-form').addEventListener('submit', (e) => {
                e.preventDefault();
                const name = e.target.querySelector('[name="edit-set-name"]').value;
                const description = e.target.querySelector('[name="edit-set-desc"]').value;
                this.updateCardSet(setId, { name, description });
            });
        });
    }

    selectCardSet(setId) {
        this.currentSetId = setId;
        const set = this.cardSets.find(s => String(s.id) === String(setId));
        if (set) {
            document.getElementById('current-set-name').textContent = set.name;
            document.getElementById('current-set-description').textContent = set.description || '';
            cardManager.loadCards(setId);
        }
        this.renderCardSets(this.cardSets); // Refresh highlight
    }

    togglePanel(side, forceState) {
        console.log(`togglePanel called for side: ${side}, forceState: ${forceState}`);
        const panel = document.querySelector(`.panel-${side}`);
        if (!panel) return;

        const isHidden = forceState !== undefined ? forceState : panel.classList.contains('panel-hidden');
        panel.classList.toggle('panel-hidden', !isHidden);
        panel.classList.toggle('panel-visible', isHidden);

        // Update grid layout
        const layout = document.querySelector('.layout-3col');
        if (layout) {
            const leftVisible = document.querySelector('.panel-left').classList.contains('panel-visible');
            const rightVisible = document.querySelector('.panel-right').classList.contains('panel-visible');
            console.log(`leftVisible: ${leftVisible}, rightVisible: ${rightVisible}`);
            if (leftVisible && rightVisible) {
                layout.style.gridTemplateColumns = '260px 1fr 260px';
            } else if (leftVisible) {
                layout.style.gridTemplateColumns = '260px 1fr 0';
            } else if (rightVisible) {
                layout.style.gridTemplateColumns = '0 1fr 260px';
            } else {
                layout.style.gridTemplateColumns = '0 1fr 0';
            }
        }
    }

    showError(message) {
        // TODO: Implement error display logic
        console.error(message);
    }

    setupEventListeners() {
        // Settings toggle
        const settingsToggle = document.getElementById('settings-toggle');
        if (settingsToggle) {
            settingsToggle.addEventListener('click', () => {
                console.log('Settings button clicked');
                this.togglePanel('left');
            });
        }

        // Toggle completed cards
        const toggleCompleted = document.getElementById('toggle-completed');
        if (toggleCompleted) {
            toggleCompleted.addEventListener('click', () => {
                this.togglePanel('right');
            });
        }

        // New set form
        const newSetBtn = document.getElementById('new-set-btn');
        const newSetForm = document.getElementById('new-set-form');
        const cancelNewSet = document.getElementById('cancel-new-set');

        if (newSetBtn) {
            newSetBtn.addEventListener('click', () => {
                newSetForm.style.display = 'block';
                newSetBtn.style.display = 'none';
            });
        }

        if (cancelNewSet) {
            cancelNewSet.addEventListener('click', () => {
                newSetForm.reset();
                newSetForm.style.display = 'none';
                newSetBtn.style.display = 'inline-block';
            });
        }

        if (newSetForm) {
            newSetForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('new-set-name').value.trim();
                const desc = document.getElementById('new-set-desc').value.trim();
                if (!name) return;
                this.createCardSet(name, desc);
                newSetForm.reset();
                newSetForm.style.display = 'none';
                newSetBtn.style.display = 'inline-block';
            });
        }

        // Add flashcard form
        const addFlashcardBtn = document.getElementById('add-flashcard');
        const addFlashcardForm = document.getElementById('add-flashcard-form');
        const cancelAddFlashcard = document.getElementById('cancel-add-flashcard');

        if (addFlashcardBtn) {
            addFlashcardBtn.addEventListener('click', () => {
                if (!this.currentSetId) {
                    alert('Please select a card set first!');
                    return;
                }
                addFlashcardForm.style.display = 'block';
                addFlashcardBtn.style.display = 'none';
            });
        }

        if (cancelAddFlashcard) {
            cancelAddFlashcard.addEventListener('click', () => {
                addFlashcardForm.reset();
                addFlashcardForm.style.display = 'none';
                addFlashcardBtn.style.display = 'inline-block';
            });
        }

        if (addFlashcardForm) {
            addFlashcardForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const question = document.getElementById('flashcard-question').value.trim();
                const answer = document.getElementById('flashcard-answer').value.trim();
                if (!question || !answer) return;
                cardManager.createCard(question, answer);
                addFlashcardForm.reset();
                addFlashcardForm.style.display = 'none';
                addFlashcardBtn.style.display = 'inline-block';
            });
        }
    }
}

// Initialize the app
// Ensure this runs after DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.app = new FlashcardApp();
    });
} else {
    window.app = new FlashcardApp();
} 