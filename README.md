# Flashcard App

A local flashcard application built with Node.js and Express, featuring a modern three-panel interface for card set management, active study area, and completed cards tracking.

## Directory Structure
```
flashcard-app/
├── frontend/          # Frontend files
│   ├── index.html    # Main application page
│   ├── layout.css    # Application styles
│   └── images/       # Application images
├── backend/          # Node.js server code
│   ├── server.js     # Express server setup
│   └── data.json     # Local storage file
├── package.json      # Node.js configuration
└── README.md         # Project documentation
```

## Setup Instructions

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

## Features
- Card set management
- Active study area
- Completed cards tracking
- Local data storage
- Modern three-panel interface

## Technical Details
- Built with Node.js and Express
- Uses local file storage (data.json)
- No external services required
- Completely local application

## Development
- Frontend files are served from the `frontend` directory
- Backend server code is in the `backend` directory
- Data is stored locally in `backend/data.json` 