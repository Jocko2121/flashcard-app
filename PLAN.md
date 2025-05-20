# Flashcard App Migration Plan

## Overview
This document outlines the plan to migrate the Flashcard App to use Node.js with local file storage (LowDB). The app will remain completely local, with no external services required. This plan is designed for personal use on your local machine. The app features a modern three-panel interface with card set management, active study area, and completed cards tracking. **Note:** Current test data in localStorage will be migrated to the new storage system, preserving user data while transitioning to the new architecture. We will follow an iterative development approach, testing each feature as we build it, and include debugging tips and command-line guidance throughout the process.

## Project Structure
### Directory Structure
```
flashcard-app/
├── frontend/          # Frontend files
│   ├── index.html    # Main application page
│   └── images/       # Application images
├── backend/          # Node.js server code
│   └── server.js     # Express server setup
├── data.json         # Main data storage file
├── data.json.backup  # Backup of data file
├── package.json      # Node.js configuration
└── README.md         # Project documentation
```

**Note:** The following files have been removed as they are no longer needed:
- [x] `index2.html` (temporary/backup file)
- [x] `styles.css`
- [x] `x-debug images/` (debug directory)
- [x] `data.js` (replaced by data.json)
- [x] `style.css.bak` (merged into index.html)

**Current State Notes:**
- All styles are embedded in index.html for simplicity
- No external stylesheets are currently in use
- Data is stored in JSON files in the root directory

## Development Phases

### Phase 1: Project Setup and Static File Serving (1-2 days)
- [X] Initialize Node.js project
  - [X] Created package.json with express, cors, and body-parser dependencies
  - [X] Set up basic npm configuration
- [X] Set up basic directory structure
  - [X] Organized frontend and backend files
  - [X] Removed redundant files (data.js, index2.html)
- [X] Install required dependencies:
  - [X] express
  - [X] cors
  - [X] body-parser
- [X] Set up Express server and static file serving
  - [X] Created and configured Express server (server.js)
  - [X] Moved static files to frontend directory:
    - [X] index.html
    - [X] layout.css
    - [X] images/
  - [X] Configured Express static file middleware to serve from frontend directory
  - [X] Tested and verified:
    - [X] HTML loads correctly
    - [X] CSS is applied
    - [X] Images display
    - [X] All current functionality works
- [X] Refactor & clean up code for this phase
  - [X] Created proper directory structure:
    - [X] frontend/ for static files (index.html, layout.css, images)
    - [X] backend/ for server code (server.js)
    - [X] root/ for data files (data.json, data.json.backup)
  - [X] Updated file paths in server.js for new structure
  - [X] Updated package.json to point to backend/server.js
  - [X] Created README.md with setup instructions
  - [X] Verified server runs correctly from new structure

- [X] Code Cleanup Tasks
  - [X] Route Organization
    - [X] Move API routes to separate files in routes directory
    - [X] Create route handlers for sets and cards
    - [X] Update server.js to use route modules
  - [X] Error Handling
    - [X] Create centralized error handling middleware
    - [X] Implement consistent error response format
    - [X] Add error logging
  - [X] Configuration Management
    - [X] Create config.js for environment variables
    - [X] Move port and other settings to config
    - [X] Add environment-specific configurations
  - [X] Data Initialization
    - [X] Move default data to separate file
    - [X] Create data initialization utility
    - [X] Add data validation on startup

### Phase 2: Database and API Implementation (2-3 days)
- [X] Set up local JSON file storage
  - [X] Create initial database structure
  - [X] Implement data validation
  - [X] Add automatic data file initialization
- [X] Complete data migration
  - [X] Create migration function
  - [X] Implement localStorage to API migration
  - [X] Add automatic migration on first app load
  - [X] Implement localStorage clearing after migration
  - [X] Add migration error handling
- [X] Implement core API endpoints
  - [X] Create card sets endpoints:
    - [X] GET /api/sets
    - [X] POST /api/sets
    - [X] GET /api/sets/:id
    - [X] PUT /api/sets/:id
    - [X] DELETE /api/sets/:id
  - [X] Create cards endpoints:
    - [X] GET /api/sets/:id/cards
    - [X] POST /api/sets/:id/cards
    - [X] GET /api/sets/:id/cards/:cardId
    - [X] PUT /api/sets/:id/cards/:cardId
    - [X] DELETE /api/sets/:id/cards/:cardId
  - [X] Add error handling and input validation
- [ ] Implement additional API endpoints
  - [ ] Statistics endpoints:
    - [ ] GET /api/statistics
    - [ ] POST /api/statistics/session
  - [ ] Settings endpoints:
    - [ ] GET /api/settings
    - [ ] PUT /api/settings
  - [ ] Add corresponding tests
- [X] Basic testing
  - [X] Test core CRUD operations
  - [X] Verify data persistence
  - [X] Document API endpoints
- [ ] Complete testing
  - [ ] Add statistics endpoint tests
  - [ ] Add settings endpoint tests
  - [ ] Add integration tests

### Phase 2.5: Github Integration
- [X] Learn Git Basics
  - [X] Install Git on local machine
  - [X] Configure Git with user name and email
  - [X] Learn basic Git commands
- [X] GitHub Account Setup
  - [X] Verify GitHub account is active
  - [X] Set up authentication
  - [X] Learn GitHub web interface basics
- [X] Project Repository Setup
  - [X] Create new repository on GitHub
  - [X] Initialize local repository
  - [X] Create .gitignore file for Node.js project
  - [X] Make first commit
  - [X] Push to GitHub
- [ ] Basic Workflow Setup
  - [X] Create main branch
  - [ ] Set up development branch
  - [ ] Learn pull request workflow
  - [ ] Practice basic collaboration workflow
- [ ] Documentation
  - [X] Create README.md with project description
  - [X] Add setup instructions
  - [ ] Document basic Git commands for team
  - [ ] Add contribution guidelines

### Phase 3: Frontend Integration (2-3 days)
- [X] Update frontend to use new API endpoints
  - [X] Create new `frontend/js/api.js` for API calls
  - [X] Implement all CRUD operations for sets and cards
  - [X] Add error handling and loading states
  - [X] Add retry logic for failed requests
  - [X] Remove all localStorage usage
  - [X] Replace with API client calls
  - [X] Update event handlers for new API structure
  - [X] Add loading indicators during API calls
- [ ] Enhance UI/UX
  - [ ] Implement three-column layout (col-left, col-main, col-right)
  - [ ] Add responsive design improvements
  - [ ] Implement card animations and transitions
- [ ] Test and validate
  - [ ] Test all CRUD operations
  - [ ] Verify error handling
  - [ ] Test loading states
  - [ ] Verify data persistence
  - [ ] Document frontend changes

### Phase 4: Core Features and Testing (2-3 days)
- [ ] Implement study features
  - [ ] Add card completion tracking
  - [ ] Implement study statistics
  - [ ] Add progress indicators
  - [ ] Test study functionality
  - [ ] Document study features
- [ ] Add import/export functionality
  - [ ] Create import UI with file upload and text paste
  - [ ] Implement structured text parsing (CSV/TSV)
  - [ ] Add preview functionality
  - [ ] Implement export features
  - [ ] Test import/export functionality
  - [ ] Document import/export features
- [ ] Add local settings
  - [ ] Implement user preferences
  - [ ] Add theme options
  - [ ] Save last active set
  - [ ] Test settings functionality
  - [ ] Document settings features
- [ ] Implement backup strategy
  - [ ] Add automatic backups
  - [ ] Create restore functionality
  - [ ] Test backup/restore
  - [ ] Document backup process
- [ ] Performance optimization
  - [ ] Add request caching
  - [ ] Optimize file operations
  - [ ] Add request batching
  - [ ] Test performance improvements
  - [ ] Document optimizations

### Phase 5: Advanced Features (ongoing)
- [ ] Implement spaced repetition
  - [ ] Add difficulty tracking
  - [ ] Implement review scheduling
  - [ ] Add performance analytics
  - [ ] Test spaced repetition
  - [ ] Document algorithm
- [ ] Add search and filtering
  - [ ] Implement card search
  - [ ] Add tag support
  - [ ] Create advanced filters
  - [ ] Test search functionality
  - [ ] Document search features
- [ ] Create custom study modes
  - [ ] Add timed study sessions
  - [ ] Implement random order
  - [ ] Add custom card ordering
  - [ ] Test study modes
  - [ ] Document modes

### Phase 6: Documentation and Cleanup (ongoing)
- [ ] Maintain documentation
  - [ ] Keep API documentation up to date
  - [ ] Update setup instructions
  - [ ] Document new features
  - [ ] Add troubleshooting guides
- [ ] Code cleanup
  - [ ] Remove unused files
  - [ ] Remove commented-out code
  - [ ] Update outdated comments
  - [ ] Standardize code style
- [ ] Version control
  - [ ] Set up development branch
  - [ ] Learn pull request workflow
  - [ ] Practice basic collaboration workflow
  - [ ] Document Git workflow

## Technical Implementation

### Dependencies
```
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",     // For handling cross-origin requests
    "body-parser": "^1.20.2"  // For parsing request bodies
  }
}
```

### Data Management
#### Database Structure
```
{
  "cardSets": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "createdAt": "date",
      "lastModified": "date",
      "cards": [
        {
          "id": "string",
          "question": "string",
          "answer": "string",
          "lastReviewed": "date",
          "difficulty": "number",
          "completed": "boolean",
          "tags": ["string"]
        }
      ]
    }
  ],
  "settings": {
    "showCompleted": "boolean",
    "lastActiveSet": "string",
    "theme": "string",
    "studyMode": "string"
  },
  "statistics": {
    "totalCards": "number",
    "completedCards": "number",
    "lastStudySession": "date"
  }
}
```

#### API Endpoints
- **Card Sets:**
  - `GET /api/sets` - Get all card sets
  - `POST /api/sets` - Create new card set
  - `GET /api/sets/:id` - Get specific card set
  - `PUT /api/sets/:id` - Update card set
  - `DELETE /api/sets/:id` - Delete card set

- **Cards:**
  - `GET /api/sets/:id/cards` - Get all cards in a set
  - `POST /api/sets/:id/cards` - Add card to set
  - `GET /api/sets/:id/cards/:cardId` - Get specific card
  - `PUT /api/sets/:id/cards/:cardId` - Update card
  - `DELETE /api/sets/:id/cards/:cardId` - Delete card

### Development Guidelines
- Use async/await for all database operations
- Implement proper error handling for all API endpoints
- Validate all input data before processing
- Keep frontend and backend code modular and well-documented
- Follow RESTful API design principles

## Project Scope

### Out of Scope
- **Cloud Features:**
  - No cloud synchronization
  - No user accounts or authentication
  - No sharing cards with others
  - No online leaderboards
- **Social Features:**
  - No user profiles
  - No social sharing
  - No community features
  - No collaborative editing
- **External Services:**
  - No third-party integrations
  - No external APIs
  - No analytics tracking
  - No cloud storage

### Future Development
#### Short-term Goals (Phase 5)
- Implement spaced repetition algorithm
- Add search and filtering capabilities
- Create custom study modes
- Add import/export functionality

#### Long-term Vision
- **UI/UX Enhancements:**
  - Dark/light theme support
  - Card flip animations
  - Progress visualization
  - Mobile responsiveness
- **Study Features:**
  - Study session timers
  - Performance analytics
  - Custom study modes
- **Technical Improvements:**
  - Automated testing
  - Offline support
  - Keyboard shortcuts
  - Performance optimization

## Progress Tracking
- [X] Phase 1 completed
- [X] Phase 2 completed
- [X] Phase 2.5 (GitHub basics) completed
- [ ] Phase 3 completed
- [ ] Phase 4 completed
- [ ] Phase 5 completed
- [ ] Phase 6 completed

## Development Timeline
- Phase 1: Project Setup and Static File Serving (1-2 days) ✅
- Phase 2: Database and API Implementation (2-3 days) ✅
- Phase 2.5: GitHub Integration (1 day) ✅
- Phase 3: Frontend Integration (2-3 days)
- Phase 4: Core Features and Testing (2-3 days)
- Phase 5: Advanced Features (ongoing)
- Phase 6: Documentation and Cleanup (ongoing)

Total estimated time: 8-12 days for core functionality (Phases 1-4) 