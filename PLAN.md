# Flashcard App Migration Plan

## Overview
This document outlines the plan to migrate the Flashcard App to use Node.js with local file storage (LowDB). The app will remain completely local, with no external services required. This plan is designed for personal use on your local machine. The app features a modern three-panel interface with card set management, active study area, and completed cards tracking. **Note:** Current test data in localStorage will be migrated to the new storage system, preserving user data while transitioning to the new architecture. We will follow an iterative development approach, testing each feature as we build it, and include debugging tips and command-line guidance throughout the process.

## Directory Structure
```
flashcard-app/
├── frontend/          # Frontend files
│   ├── index.html    # Main application page
│   ├── style.css.bak # Backup of unused styles (will be merged in Phase 3)
│   └── images/       # Application images
├── backend/          # Node.js server code
│   ├── server.js     # Express server setup
│   └── data.json     # LowDB storage file
├── package.json      # Node.js configuration
└── README.md         # Project documentation
```

**Note:** The following files can be removed as they are no longer needed:
- [x] `index2.html` (temporary/backup file)
- [x] `styles.css`
- [ ] `x-debug images/` (debug directory)
- [x] `data.js` (replaced by data.json for LowDB)

**Current State Notes:**
- Styles are currently embedded in index.html for simplicity
- style.css has been renamed to style.css.bak and will be merged in Phase 3
- No external stylesheets are currently in use

## Phase 1: Project Setup and Static File Serving (1-2 days)
- [X] Initialize Node.js project
  - [X] Created package.json with express and lowdb dependencies
  - [X] Set up basic npm configuration
- [X] Set up basic directory structure
  - [X] Organized frontend and backend files
  - [X] Removed redundant files (data.js, index2.html)
- [X] Install required dependencies:
  - [X] express
  - [X] lowdb
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
    - [X] backend/ for server code (server.js, data.json)
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

## Phase 2: Database and API Implementation (2-3 days)
- [X] Set up LowDB for local JSON file storage
  - [X] Create initial database structure
  - [X] Implement data validation
- [ ] Complete data migration
  - [X] Create migration function
  - [ ] Implement `/api/migrate` endpoint
  - [ ] Add automatic migration on first app load
  - [ ] Implement localStorage clearing after migration
  - [ ] Add migration tests
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
  - [ ] Add migration tests
  - [ ] Add integration tests

## Phase 2.5: Github Integration
- [X] Learn Git Basics
  - [X] Install Git on local machine
  - [X] Configure Git with user name and email
  - [X] Learn basic Git commands:
    - [X] git init
    - [X] git add
    - [X] git commit
    - [X] git status
    - [X] git log
    - [X] git branch
    - [X] git checkout
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
  - [ ] Add setup instructions
  - [ ] Document basic Git commands for team
  - [ ] Add contribution guidelines

## Phase 3: Frontend Integration (2-3 days)
- [ ] Update frontend to use new API endpoints
  - [ ] Create new `frontend/js/api.js` for API calls
  - [ ] Implement all CRUD operations for sets and cards
  - [ ] Add error handling and loading states
  - [ ] Add retry logic for failed requests
  - [ ] Remove all localStorage usage
  - [ ] Replace with API client calls
  - [ ] Update event handlers for new API structure
  - [ ] Add loading indicators during API calls
- [ ] Enhance UI/UX
  - [ ] Implement three-column layout (col-left, col-main, col-right)
  - [ ] Add responsive design improvements
  - [ ] Implement card animations and transitions
- [ ] Refactor frontend code
  - [ ] Move JavaScript to external file (app.js)
  - [ ] Merge embedded styles with style.css.bak into new style.css
  - [ ] Organize CSS into logical sections:
    - [ ] layout
    - [ ] components
    - [ ] utilities
  - [ ] Update file references and imports
  - [ ] Implement proper module structure
- [ ] Test and validate
  - [ ] Test all CRUD operations
  - [ ] Verify error handling
  - [ ] Test loading states
  - [ ] Verify data persistence
  - [ ] Document frontend changes

## Phase 4: Core Features (2-3 days)
- [ ] Implement study features
  - [ ] Add card completion tracking
  - [ ] Implement study statistics
  - [ ] Add progress indicators
- [ ] Add import/export functionality
  - [ ] Create import UI with file upload and text paste
  - [ ] Implement structured text parsing (CSV/TSV)
  - [ ] Add preview functionality
  - [ ] Implement export features
- [ ] Add local settings
  - [ ] Implement user preferences
  - [ ] Add theme options
  - [ ] Save last active set
- [ ] Performance optimization
  - [ ] Add request caching
  - [ ] Optimize file operations
  - [ ] Add request batching

## Phase 5: Advanced Features (ongoing)
- [ ] Implement spaced repetition
  - [ ] Add difficulty tracking
  - [ ] Implement review scheduling
  - [ ] Add performance analytics
- [ ] Add search and filtering
  - [ ] Implement card search
  - [ ] Add tag support
  - [ ] Create advanced filters
- [ ] Create custom study modes
  - [ ] Add timed study sessions
  - [ ] Implement random order
  - [ ] Add custom card ordering

## Phase 6: Version Control and Documentation (1 day)
- [ ] Create documentation
  - [ ] Write setup instructions
  - [ ] Document API endpoints
  - [ ] Add request/response examples
  - [ ] Add error handling documentation
  - [ ] Add frontend setup steps
  - [ ] Add test setup instructions
  - [ ] Add development guidelines
  - [ ] Document localStorage to API migration
  - [ ] Add troubleshooting steps
  - [ ] Add rollback procedures
- [ ] Implement backup strategy
  - [ ] Add automatic backups
  - [ ] Create restore functionality
  - [ ] Document backup process
- [ ] Code cleanup
  - [ ] Remove unused files:
    - [ ] `x-debug images/` directory
    - [ ] Old test files after consolidation
    - [ ] Backup files
  - [ ] Remove commented-out code
  - [ ] Update outdated comments
  - [ ] Standardize code style

## Phase 7: Testing Infrastructure (1 day)
- [ ] Consolidate test files
  - [ ] Move all tests to Jest framework
  - [ ] Create proper test directory structure:
    ```
    backend/
    ├── __tests__/
    │   ├── routes/
    │   │   ├── sets.test.js
    │   │   └── cards.test.js
    │   ├── data/
    │   │   └── data.test.js
    │   ├── config/
    │   │   └── config.test.js
    │   └── error/
    │       └── error-handling.test.js
    ```
  - [ ] Add test coverage reporting
  - [ ] Add CI/CD test configuration
- [ ] Update test scripts
  - [ ] Add `test:coverage` script
  - [ ] Add `test:watch` script
  - [ ] Update documentation for running tests

## Progress Tracking
- [X] Phase 1 completed
- [ ] Phase 2 completed
- [ ] Phase 3 completed
- [ ] Phase 4 completed
- [ ] Phase 5 completed
- [ ] Phase 6 completed
- [ ] Phase 7 completed

## Technical Details

### Dependencies
```
{
  "dependencies": {
    "express": "^4.18.2",
    "lowdb": "^1.0.0",
    "cors": "^2.8.5",     // For handling cross-origin requests
    "body-parser": "^1.20.2"  // For parsing request bodies
  }
}
```

### Database Structure
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

### API Endpoints

#### Card Sets
- `GET /api/cardsets` - Get all card sets
- `POST /api/cardsets` - Create new card set
- `GET /api/cardsets/:id` - Get specific card set
- `PUT /api/cardsets/:id` - Update card set
- `DELETE /api/cardsets/:id` - Delete card set

#### Cards
- `GET /api/cardsets/:id/cards` - Get all cards in a set
- `POST /api/cardsets/:id/cards` - Add card to set
- `GET /api/cardsets/:id/cards/:cardId` - Get specific card
- `PUT /api/cardsets/:id/cards/:cardId` - Update card
- `DELETE /api/cardsets/:id/cards/:cardId` - Delete card
- `PUT /api/cardsets/:id/cards/:cardId/complete` - Mark card as complete/incomplete

#### Settings
- `GET /api/settings` - Get user settings
- `PUT /api/settings` - Update user settings

#### Statistics
- `GET /api/statistics` - Get study statistics
- `POST /api/statistics/session` - Record study session

#### Import/Export
- `POST /api/import` - Import cards from file/text
- `GET /api/export/:setId` - Export card set

### File Structure
```
flashcard-app/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── images/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── cardsets.js
│   │   ├── cards.js
│   │   ├── settings.js
│   │   └── statistics.js
│   ├── models/
│   │   └── database.js
│   └── data.json
├── package.json
└── README.md
```

### Development Guidelines
- Use async/await for all database operations
- Implement proper error handling for all API endpoints
- Validate all input data before processing
- Keep frontend and backend code modular and well-documented
- Follow RESTful API design principles
- Use semantic versioning for releases

## Migration Strategy

### Data Migration (Phase 2)
- **Current State:**
  - Data stored in localStorage
  - Test data only (can be safely discarded)
  - Simple JSON structure

- **Migration Process:**
  1. Initialize LowDB with empty structure
  2. Add migration endpoint `/api/migrate`
  3. On first app load:
     - Check for localStorage data
     - If found, attempt migration
     - If successful, clear localStorage
     - If failed, log error and start fresh
  4. No rollback needed (test data)

- **Error Handling:**
  - If migration fails, start with empty database
  - Log migration errors for debugging
  - No data recovery needed
  - Clear localStorage after successful migration

- **Validation:**
  - Verify data structure after migration
  - Check for required fields
  - Validate data types
  - Log any data inconsistencies

### Code Migration
- **Frontend Changes:**
  1. Replace all localStorage calls with API calls
  2. Update event handlers for new API structure
  3. Add loading states during API calls
  4. Implement error handling for API responses

- **Backend Setup:**
  1. Initialize LowDB with schema
  2. Set up API routes
  3. Implement data validation
  4. Add error handling middleware

### Testing Migration
- **Pre-Migration:**
  - Document current localStorage structure
  - Create test cases for migration
  - Set up error logging

- **During Migration:**
  - Monitor migration process
  - Log any errors or warnings
  - Verify data integrity

- **Post-Migration:**
  - Verify all data is accessible
  - Test all CRUD operations
  - Confirm localStorage is cleared
  - Validate new API endpoints

### Fallback Plan
- If migration fails:
  1. Start with empty database
  2. Log error for debugging
  3. Continue with fresh data
  4. No need for rollback (test data)

## Notes
- All data will be stored locally in JSON files using LowDB
- No external services or databases required
- Easy to backup by copying the db.json file
- Can be extended later if needed
- The app is designed to work offline
- Data migration from localStorage will be handled automatically
- All features are focused on local-first functionality

## Future Ideas
- **UI/UX Enhancements:**
  - Add dark/light theme support
  - Implement card flip animations
  - Add progress visualization
  - Improve mobile responsiveness
- **Study Features:**
  - Implement spaced repetition algorithms
  - Add study session timers
  - Create custom study modes
  - Add performance analytics
- **Data Management:**
  - Add card tagging system
  - Implement card categorization
  - Add bulk import/export options
  - Create backup scheduling
- **Technical Improvements:**
  - Add automated testing
  - Implement service workers for offline support
  - Add keyboard shortcuts
  - Improve performance optimization

## Out of Scope
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

## Development Timeline
- Phase 1: Project Setup and Static File Serving (1-2 days)
- Phase 2: Database and API Implementation (2-3 days)
- Phase 3: Frontend Integration (2-3 days)
- Phase 4: Core Features (2-3 days)
- Phase 5: Advanced Features (ongoing)
- Phase 6: Version Control and Documentation (1 day)
- Phase 7: Testing Infrastructure (1 day)

Total estimated time: 8-12 days for core functionality 

## Phase 1 Cleanup Plan

### 1. Documentation & Analysis (No Changes)
- [ ] Document current file structure
- [ ] Map all dependencies and their purposes
- [ ] Identify all data files and their relationships
- [ ] Document current test coverage
- [ ] Create a list of files to be removed/consolidated

### 2. Test Infrastructure (Changes with Testing)
- [ ] Review and organize test files:
  - `test-routes.js`
  - `test-error-handling.js`
  - `test-config.js`
  - `test-data.js`
  - `test-db.js`
- [ ] Create a test plan for each cleanup step
- [ ] Verify all tests pass before any changes

### 3. Data Management (Changes with Testing)
- [ ] Test current data access patterns
- [ ] Verify data integrity in `backend/data.json`
- [ ] Test backup/restore functionality
- [ ] Document data schema
- [ ] Create data validation tests

### 4. Code Cleanup (Changes with Testing)
- [ ] Remove duplicate code in `src/`:
  - Test main server functionality
  - Verify no critical features are lost
  - Remove duplicate files
- [ ] Consolidate frontend code:
  - Test frontend functionality
  - Move any unique features from `src/frontend`
  - Remove duplicate frontend code
- [ ] Organize backend code:
  - Test all routes
  - Verify middleware functionality
  - Clean up unused files

### 5. Dependency Cleanup (Changes with Testing)
- [ ] Audit package.json dependencies
- [ ] Test application with each dependency
- [ ] Remove unused dependencies
- [ ] Update package.json

### 6. Final Verification (Testing)
- [ ] Run all tests
- [ ] Verify all routes work
- [ ] Check data integrity
- [ ] Test frontend functionality
- [ ] Verify no regression bugs

### 7. Documentation Update (No Changes)
- [ ] Update README.md
- [ ] Document cleanup changes
- [ ] Update any configuration files
- [ ] Create setup instructions

### 8. Git Preparation (No Changes)
- [ ] Create .gitignore
- [ ] Document files to exclude
- [ ] Prepare for initial commit

For each step:
1. Show proposed changes
2. Run relevant tests
3. Get approval before proceeding
4. Document any issues found 