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
│   ├── routes/       # API route handlers
│   ├── middleware/   # Express middleware
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

## API Endpoints

### Card Sets
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

### Cards
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

## Usage Instructions

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
- Built with Node.js and Express
- Uses local file storage (data.json)
- No external services required
- Completely local application
- RESTful API design
- Modern async/await JavaScript

## Development
- Frontend files are served from the `frontend` directory
- Backend server code is in the `backend` directory
- Data is stored locally in `backend/data.json`
- API routes are defined in `backend/routes/`
- Error handling middleware in `backend/middleware/`

## Data Structure
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

## Development Workflow

### Git Commands
- `git add .` - Stage all changes
- `git commit -m "message"` - Commit changes with a descriptive message
- `git push` - Push changes to GitHub
- `git pull` - Pull latest changes from GitHub

### Development Process
1. Make changes to the code
2. Test changes locally
3. Update PLAN.md to track progress
4. Commit changes with descriptive message
5. Push to GitHub using the sync button in Cursor

### Common Scenarios
- **Making Changes**: Edit files → Test → Update PLAN.md → Commit → Push
- **Handling Errors**: Check console → Fix issue → Test → Commit → Push
- **Verifying Changes**: Test locally → Check GitHub → Update documentation

### Commit Messages
- Use clear, descriptive messages
- Reference the phase or feature being worked on
- Example: "feat: implement statistics endpoints"
- Example: "docs: update API documentation" 