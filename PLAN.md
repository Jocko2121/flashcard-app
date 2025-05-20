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
- [X] Implement additional API endpoints
  - [X] Statistics endpoints:
    - [X] GET /api/statistics
    - [X] POST /api/statistics/session
  - [X] Settings endpoints:
    - [X] GET /api/settings
    - [X] PUT /api/settings
- [X] Basic testing
  - [X] Test core CRUD operations
  - [X] Verify data persistence
  - [X] Document API endpoints

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
- [X] Basic Workflow Setup
  - [X] Create main branch
  - [X] Document development workflow in README.md
- [X] Documentation
  - [X] Create README.md with project description
  - [X] Add setup instructions
  - [X] Document basic Git commands in README.md

### Phase 3.0: Frontend Integration (2-3 days)
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
  - [X] Implement three-column layout (col-left, col-main, col-right)
  - [ ] Fix card layout problem on page reflows
  - [ ] Card reordering (Drag n Drop)
  - [ ] add back missing show hide buttons (or something similar)
  - [ ] add back set delete button
  - [ ] add back highlight active set (it breaks)
  - [ ] Implement card animations and transitions








### Phase 3.1: Responsive Design Specifications
#### Implementation Tasks
- [ ] Panel Width Adjustments
  - [ ] Define minimum panel width (260px)
  - [ ] Define maximum panel width
  - [ ] Implement flexible width calculations
  - [ ] Add width constraints to prevent layout breaking

- [ ] Grid System Implementation
  - [ ] Set up CSS Grid for three-column layout
  - [ ] Define grid template areas
  - [ ] Implement grid gap and spacing
  - [ ] Add grid auto-flow rules

- [ ] Content Scaling
  - [ ] Implement text scaling rules
  - [ ] Add image scaling constraints
  - [ ] Define minimum content widths
  - [ ] Set maximum content widths

- [ ] Window Resize Handling
  - [ ] Add resize event listeners
  - [ ] Implement smooth transitions
  - [ ] Add debounce for performance
  - [ ] Handle panel visibility during resize

- [ ] Testing and Validation
  - [ ] Test at minimum width (13" laptop)
  - [ ] Test at maximum width (standard desktop)
  - [ ] Test panel toggling during resize
  - [ ] Verify content readability at all sizes

#### Target Environment
- **Screen Sizes**:
  - Minimum: Typical 13-15" laptop screen
  - Maximum: Standard desktop monitor
  - No support for extreme cases or mobile devices

- **Browser Support**:
  - Modern browsers only
  - No legacy browser support required
  - No specific browser version requirements

#### Layout Requirements
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

#### Non-Requirements
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



### Phase 3.2: Error Handling Specifications
- **API Error Scenarios**:
  - [ ] Network failures during API calls
  - [ ] Server unavailability
  - [ ] Invalid API responses
  - [ ] Timeout handling
  - [ ] Rate limiting (if implemented)

- **Data Validation Errors**:
  - [ ] Empty required fields
  - [ ] Invalid data types
  - [ ] Missing required data
  - [ ] Data format violations
  - [ ] Duplicate entries

- **User Interface Errors**:
  - [ ] Form validation errors
  - [ ] Invalid user inputs
  - [ ] Concurrent operation conflicts
  - [ ] State management errors
  - [ ] UI update failures

- **Data Integrity Errors**:
  - [ ] Corrupted data files
  - [ ] Missing data files
  - [ ] Invalid JSON format
  - [ ] Data version mismatches
  - [ ] Backup/restore failures

- **Error Recovery**:
  - [ ] Automatic retry logic
  - [ ] User recovery options
  - [ ] Error logging
  - [ ] State recovery
  - [ ] Data consistency checks

- **Error Display**:
  - [ ] Clear error messages
  - [ ] User-friendly notifications
  - [ ] Error location indication
  - [ ] Recovery instructions
  - [ ] Error severity indication



### Phase 3.3: Loading State Specifications
- **Initial Application Load**:
  - [ ] App startup loading indicator
  - [ ] Initial data fetch progress
  - [ ] Panel initialization sequence
  - [ ] Default state restoration
  - [ ] Error state if initial load fails

- **Data Loading States**:
  - [ ] Card set list loading
  - [ ] Individual card set loading
  - [ ] Card list loading
  - [ ] Settings loading
  - [ ] Statistics loading
  - [ ] Completed cards loading

- **Operation Loading States**:
  - [ ] Creating new card set
  - [ ] Creating new card
  - [ ] Updating card set
  - [ ] Updating card
  - [ ] Deleting card set
  - [ ] Deleting card
  - [ ] Saving settings
  - [ ] Updating statistics

- **UI State Transitions**:
  - [ ] Panel toggle loading
  - [ ] Card flip animation
  - [ ] Set selection transition
  - [ ] Study mode changes
  - [ ] Form submission states
  - [ ] Button state changes

- **Loading Indicators**:
  - [ ] Progress indicators
  - [ ] Loading spinners
  - [ ] Skeleton screens
  - [ ] Disabled states
  - [ ] Visual feedback

- **Error States During Load**:
  - [ ] Failed data fetch
  - [ ] Operation timeout
  - [ ] Network issues
  - [ ] Invalid data
  - [ ] Recovery options



### Phase 3.4: Data Persistence Specifications
- **Storage Operations**:
  - [ ] Card set creation persistence
  - [ ] Card creation persistence
  - [ ] Settings updates persistence
  - [ ] Statistics updates persistence
  - [ ] Study session data persistence

- **Data Integrity**:
  - [ ] Data file format validation
  - [ ] Data structure validation
  - [ ] Required field validation
  - [ ] Data type validation
  - [ ] Relationship validation (sets to cards)

- **Recovery Scenarios**:
  - [ ] Application restart data recovery
  - [ ] Browser refresh data recovery
  - [ ] Error recovery with data preservation
  - [ ] Backup file restoration
  - [ ] Data migration handling

- **Concurrent Operations**:
  - [ ] Multiple card updates
  - [ ] Multiple set updates
  - [ ] Settings changes during study
  - [ ] Statistics updates during study
  - [ ] Panel state persistence

- **Data Consistency**:
  - [ ] Set-card relationships
  - [ ] Settings synchronization
  - [ ] Statistics accuracy
  - [ ] Study progress tracking
  - [ ] UI state consistency



### Phase 3.5: Documentation Specifications
- **Code Documentation**:
  - [ ] API endpoint documentation
  - [ ] Function documentation
  - [ ] Event handler documentation
  - [ ] State management documentation
  - [ ] Component documentation

- **User Documentation**:
  - [ ] Feature usage guides
  - [ ] UI element descriptions
  - [ ] Keyboard shortcuts
  - [ ] Common workflows
  - [ ] Troubleshooting guides

- **Technical Documentation**:
  - [ ] Architecture overview
  - [ ] Data flow diagrams
  - [ ] Component relationships
  - [ ] State management flow
  - [ ] Error handling flow

- **Maintenance Documentation**:
  - [ ] Setup instructions
  - [ ] Development workflow
  - [ ] Testing procedures
  - [ ] Deployment process
  - [ ] Backup procedures



### Phase 3.6: Frontend Change Documentation
- **API Integration Changes**:
  - [ ] Document removal of localStorage
  - [ ] Document new API client implementation
  - [ ] Document event handler updates
  - [ ] Document state management changes
  - [ ] Document error handling additions

- **UI Component Changes**:
  - [ ] Document panel structure changes
  - [ ] Document loading indicator additions
  - [ ] Document error message displays
  - [ ] Document form handling updates
  - [ ] Document button state management

- **Code Structure Changes**:
  - [ ] Document new file organization
  - [ ] Document module dependencies
  - [ ] Document function changes
  - [ ] Document variable scope changes
  - [ ] Document event flow changes






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
  - `