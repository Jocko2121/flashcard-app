# Flashcard App

A local flashcard application built with Node.js and Express, featuring a modern three-panel interface for card set management, active study area, and completed cards tracking.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. Access the application:
   Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
flashcard-app/
├── backend/
│   ├── tests/           # Test files
│   │   ├── legacy-removal.test.js
│   │   └── test-*.js
│   ├── routes/          # API route handlers
│   │   ├── cards.js
│   │   └── sets.js
│   ├── middleware/      # Express middleware
│   │   ├── error-handler.js
│   │   └── security.js
│   ├── config.js        # Configuration
│   ├── data.js          # Data management
│   └── server.js        # Express server
├── frontend/
│   ├── styles/          # CSS files
│   │   ├── base.css     # Global styles and resets
│   │   ├── layout.css   # Layout and structure
│   │   └── components.css # Component-specific styles
│   ├── js/             # JavaScript files
│   │   └── api.js      # API client
│   └── index.html      # Main application
└── docs/               # Documentation
    ├── PLAN-Phase 4.md # Phase 4 implementation plan
    └── THEME-PREPARATION.md # Theme implementation notes
```

## CSS Organization

The application uses a modular CSS structure:
- `base.css`: Global styles, resets, and defaults
- `layout.css`: Layout structure, CSS variables, and panel management
- `components.css`: Component-specific styles and UI elements

## Testing

Run the test suite:
```bash
npm test
```

## Documentation

For detailed documentation, including API endpoints, usage instructions, and development workflow, please see the [docs](docs/) directory.

## API Endpoints

### Card Sets
- `GET /api/sets` - Get all card sets
- `POST /api/sets` - Create a new card set
- `GET /api/sets/:id` - Get a specific card set
- `PUT /api/sets/:id` - Update a card set
- `DELETE /api/sets/:id` - Delete a card set

### Cards
- `GET /api/sets/:setId/cards` - Get all cards in a set
- `POST /api/sets/:setId/cards` - Create a new card
- `GET /api/sets/:setId/cards/:id` - Get a specific card
- `PUT /api/sets/:setId/cards/:id` - Update a card
- `DELETE /api/sets/:setId/cards/:id` - Delete a card

### Settings
- `GET /api/sets/settings/last-active-set` - Get the last active set
- `POST /api/sets/settings/last-active-set` - Update the last active set 