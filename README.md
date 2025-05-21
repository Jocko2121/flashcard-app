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
│   ├── routes/          # API route handlers
│   ├── middleware/      # Express middleware
│   ├── config.js        # Configuration
│   ├── data.js          # Data management
│   ├── database.js      # Database interface
│   └── server.js        # Express server
├── frontend/
│   ├── styles/          # CSS files
│   ├── js/             # JavaScript files
│   ├── images/         # Image assets
│   └── index.html      # Main application
└── docs/               # Documentation
```

## Testing

Run the test suite:
```bash
npm test
```

## Documentation

For detailed documentation, including API endpoints, usage instructions, and development workflow, please see the [docs](docs/) directory. 