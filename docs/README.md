# Flashcard App

A local flashcard application built with Node.js and Express, featuring a modern three-panel interface for card set management, active study area, and completed cards tracking.

## Table of Contents
1. [Setup](#setup)
2. [Features](#features)
3. [Usage](#usage)
4. [Technical Details](#technical-details)
5. [Development](#development)
6. [Frontend Specifications](#frontend-specifications)

## Setup

### Prerequisites
- Node.js installed
- Modern web browser

### Installation
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

## Usage

### Basic Operations
1. **Creating a Card Set**
   - Click "New Set" in the left panel
   - Enter a name and optional description
   - Click "Add Set"

2. **Adding Cards**
   - Select a card set from the left panel
   - Click "Add Flashcard" in the main panel
   - Enter the question and answer
   - Click "Add Card"

3. **Managing Cards**
   - Mark cards as complete using the "Mark Complete" button
   - Edit cards using the "Edit" button
   - Delete cards using the "Delete" button
   - View completed cards in the right panel

4. **Completed Cards**
   - Toggle the completed cards panel using the ✓ button
   - Reactivate completed cards using the "Activate" button
   - Delete completed cards using the "Delete" button

## Technical Details

### Architecture
- Built with Node.js and Express
- Uses local file storage (data.json)
- No external services required
- Completely local application
- RESTful API design
- Modern async/await JavaScript

### Directory Structure
```
flashcard-app/
├── frontend/          # Frontend files
│   ├── index.html    # Main application page
│   ├── styles/       # CSS files
│   │   ├── base.css      # Global styles and resets
│   │   ├── layout.css    # Layout system and variables
│   │   ├── components.css # Component-specific styles
│   │   └── README.md     # CSS documentation
│   └── images/       # Application images
├── backend/          # Node.js server code
│   ├── server.js     # Express server setup
│   ├── routes/       # API route handlers
│   ├── middleware/   # Express middleware
│   └── data.json     # Local storage file
├── docs/            # Project documentation
│   ├── README.md    # Main documentation
│   └── PLAN-*.md    # Project plans
├── package.json     # Node.js configuration
└── README.md        # Quick start guide
```

### API Endpoints

#### Card Sets
- `GET /api/sets` - Get all card sets
- `GET /api/sets/:id` - Get a specific card set
- `POST /api/sets` - Create a new card set
  ```json
  {
    "name": "Set Name",
    "description": "Set Description"
  }
  ```
- `PUT /api/sets/:id` - Update a card set
  ```json
  {
    "name": "New Name",
    "description": "New Description"
  }
  ```
- `DELETE /api/sets/:id` - Delete a card set

#### Cards
- `GET /api/sets/:setId/cards` - Get all cards in a set
- `GET /api/sets/:setId/cards/:cardId` - Get a specific card
- `POST /api/sets/:setId/cards` - Create a new card
  ```json
  {
    "question": "Card Question",
    "answer": "Card Answer"
  }
  ```
- `PUT /api/sets/:setId/cards/:cardId` - Update a card
  ```json
  {
    "question": "New Question",
    "answer": "New Answer",
    "completed": true
  }
  ```
- `DELETE /api/sets/:setId/cards/:cardId` - Delete a card

### Data Structure
```json
{
  "cardSets": [
    {
      "id": 1,
      "name": "Set Name",
      "description": "Set Description",
      "cards": [
        {
          "id": 1,
          "question": "Question",
          "answer": "Answer",
          "completed": false
        }
      ]
    }
  ],
  "settings": {
    "showCompleted": true,
    "lastActiveSet": null,
    "theme": "light",
    "studyMode": "normal"
  }
}
```

## Development

### Dependencies
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",     // For handling cross-origin requests
    "body-parser": "^1.20.2"  // For parsing request bodies
  }
}
```

### Development Workflow

#### Git Commands
- `git add .` - Stage all changes
- `git commit -m "message"` - Commit changes with a descriptive message
- `git push` - Push changes to GitHub
- `git pull` - Pull latest changes from GitHub

#### Development Process
1. Make changes to the code
2. Test changes locally
3. Update PLAN.md to track progress
4. Commit changes with descriptive message
5. Push to GitHub using the sync button in Cursor

#### Common Scenarios
- **Making Changes**: Edit files → Test → Update PLAN.md → Commit → Push
- **Handling Errors**: Check console → Fix issue → Test → Commit → Push
- **Verifying Changes**: Test locally → Check GitHub → Update documentation

#### Commit Messages
- Use clear, descriptive messages
- Reference the phase or feature being worked on
- Example: "feat: implement statistics endpoints"
- Example: "docs: update API documentation"

## Frontend Specifications

### Target Environment
- **Screen Sizes**:
  - Minimum: Typical 13-15" laptop screen
  - Maximum: Standard desktop monitor
  - No support for extreme cases or mobile devices

- **Browser Support**:
  - Modern browsers only
  - No legacy browser support required
  - No specific browser version requirements

### Layout Requirements
- **Panel Sizing**:
  - Left/Right panels: Flexible width (260px base)
  - Main panel: Responsive to available space
  - Minimum content width to prevent layout breaking
  - Maximum content width for readability

- **Content Scaling**:
  - Text should remain readable at all supported sizes
  - Images should scale appropriately
  - Maintain proper spacing and alignment
  - Preserve visual hierarchy

- **Window Resizing**:
  - Smooth transitions during resize
  - No layout breaking during resize
  - Maintain functionality during resize
  - Preserve user's panel visibility preferences

### Non-Requirements
- **Mobile Support**:
  - No mobile-specific layouts
  - No touch-friendly adjustments
  - No small screen optimizations
  - No mobile media queries

- **Legacy Support**:
  - No support for older browsers
  - No polyfills required
  - No fallback layouts
  - No compatibility fixes