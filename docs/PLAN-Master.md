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

## Phases - Done / Active

### **Phase 1: Project Setup and Static File Serving (1-2 days)**
- [X] Epic 1.1 - Initialize Node.js project
- [X] Epic 1.2 - Install required dependencies
- [X] Epic 1.3 - Set up Express server and static file serving
- [X] Epic 1.4 - Refactor & clean up code for this phase
- [X] Epic 1.5 - Code Cleanup Tasks

### **Phase 2: Database and API Implementation (2-3 days)**
- [X] Epic 2.1 - Set up local JSON file storage
- [X] Epic 2.2 - Complete data migration
- [X] Epic 2.3 - Implement core API endpoints
- [X] Epic 2.4 - Implement additional API endpoints
- [X] Epic 2.5 - Basic testing

### **Phase 3: Github Integration**
- [X] Epic 3.1 - Learn Git Basics
- [X] Epic 3.2 - GitHub Account Setup
- [X] Epic 3.3 - Project Repository Setup
- [X] Epic 3.4 - Basic Workflow Setup
- [X] Epic 3.5 - Documentation

### **Phase 4: CSS Reorganization Plan (2-3 days)**
- [X] Epic 4.1 - Update frontend to use new API endpoints
- [X] Epic 4.2 - Layout.css (First File)
- [X] Epic 4.3 - Components.css (New File)
- [X] Epic 4.4 - Base.css (New File)
- [x] Epic 4.5 - Documentation
- [x] Epic 4.6 - Cleanup






## Phases - Next

### **Phase 5: Responsive Design Specifications**
#### Implementation Tasks
- [ ] Epic 5.1 - Panel Width Adjustments
  - [ ] Define minimum panel width (260px)
  - [ ] Define maximum panel width
  - [ ] Implement flexible width calculations
  - [ ] Add width constraints to prevent layout breaking

- [ ] Epic 5.2 - Grid System Implementation
  - [ ] Set up CSS Grid for three-column layout
  - [ ] Define grid template areas
  - [ ] Implement grid gap and spacing
  - [ ] Add grid auto-flow rules

- [ ] Epic 5.3 - Content Scaling
  - [ ] Implement text scaling rules
  - [ ] Add image scaling constraints
  - [ ] Define minimum content widths
  - [ ] Set maximum content widths

- [ ] Epic 5.4 - Window Resize Handling
  - [ ] Add resize event listeners
  - [ ] Implement smooth transitions
  - [ ] Add debounce for performance
  - [ ] Handle panel visibility during resize

- [ ] Epic 5.5 - Testing and Validation
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



### **Phase 6: Error Handling Specifications**

- [ ] Epic 6.1 - API Error Scenarios:
  - [ ] Network failures during API calls
  - [ ] Server unavailability
  - [ ] Invalid API responses
  - [ ] Timeout handling
  - [ ] Rate limiting (if implemented)

- [ ] Epic 6.2 - Data Validation Errors:
  - [ ] Empty required fields
  - [ ] Invalid data types
  - [ ] Missing required data
  - [ ] Data format violations
  - [ ] Duplicate entries

- [ ] Epic 6.3 - User Interface Errors:
  - [ ] Form validation errors
  - [ ] Invalid user inputs
  - [ ] Concurrent operation conflicts
  - [ ] State management errors
  - [ ] UI update failures

- [ ] Epic 6.4 - Data Integrity Errors:
  - [ ] Corrupted data files
  - [ ] Missing data files
  - [ ] Invalid JSON format
  - [ ] Data version mismatches
  - [ ] Backup/restore failures

- [ ] Epic 6.5 - Error Recovery:
  - [ ] Automatic retry logic
  - [ ] User recovery options
  - [ ] Error logging
  - [ ] State recovery
  - [ ] Data consistency checks

- [ ] Epic 6.6 - Error Display:
  - [ ] Clear error messages
  - [ ] User-friendly notifications
  - [ ] Error location indication
  - [ ] Recovery instructions
  - [ ] Error severity indication



### **Phase 7: Loading State Specifications**
- [ ] Epic 7.1 - Initial Application Load:
  - [ ] App startup loading indicator
  - [ ] Initial data fetch progress
  - [ ] Panel initialization sequence
  - [ ] Default state restoration
  - [ ] Error state if initial load fails

- [ ] Epic 7.2 - Data Loading States:
  - [ ] Card set list loading
  - [ ] Individual card set loading
  - [ ] Card list loading
  - [ ] Settings loading
  - [ ] Statistics loading
  - [ ] Completed cards loading

- [ ] Epic 7.3 - Operation Loading States:
  - [ ] Creating new card set
  - [ ] Creating new card
  - [ ] Updating card set
  - [ ] Updating card
  - [ ] Deleting card set
  - [ ] Deleting card
  - [ ] Saving settings
  - [ ] Updating statistics

- [ ] Epic 7.4 - UI State Transitions:
  - [ ] Panel toggle loading
  - [ ] Card flip animation
  - [ ] Set selection transition
  - [ ] Study mode changes
  - [ ] Form submission states
  - [ ] Button state changes

- [ ] Epic 7.5 - Loading Indicators:
  - [ ] Progress indicators
  - [ ] Loading spinners
  - [ ] Skeleton screens
  - [ ] Disabled states
  - [ ] Visual feedback

- [ ] Epic 7.6 - Error States During Load:
  - [ ] Failed data fetch
  - [ ] Operation timeout
  - [ ] Network issues
  - [ ] Invalid data
  - [ ] Recovery options



### **Phase 8: Data Persistence Specifications**

- [ ] Epic 8.1 - Storage Operations:
  - [ ] Card set creation persistence
  - [ ] Card creation persistence
  - [ ] Settings updates persistence
  - [ ] Statistics updates persistence
  - [ ] Study session data persistence

- [ ] Epic 8.2 - Data Integrity:
  - [ ] Data file format validation
  - [ ] Data structure validation
  - [ ] Required field validation
  - [ ] Data type validation
  - [ ] Relationship validation (sets to cards)

- [ ] Epic 8.3 - Recovery Scenarios:
  - [ ] Application restart data recovery
  - [ ] Browser refresh data recovery
  - [ ] Error recovery with data preservation
  - [ ] Backup file restoration
  - [ ] Data migration handling

- [ ] Epic 8.4 - Concurrent Operations:
  - [ ] Multiple card updates
  - [ ] Multiple set updates
  - [ ] Settings changes during study
  - [ ] Statistics updates during study
  - [ ] Panel state persistence

- [ ] Epic 8.5 - Data Consistency:
  - [ ] Set-card relationships
  - [ ] Settings synchronization
  - [ ] Statistics accuracy
  - [ ] Study progress tracking
  - [ ] UI state consistency



### **Phase 9: Documentation Specifications**
- [ ] Epic 9.1 - Code Documentation:
  - [ ] API endpoint documentation
  - [ ] Function documentation
  - [ ] Event handler documentation
  - [ ] State management documentation
  - [ ] Component documentation

- [ ] Epic 9.2 - User Documentation:
  - [ ] Feature usage guides
  - [ ] UI element descriptions
  - [ ] Keyboard shortcuts
  - [ ] Common workflows
  - [ ] Troubleshooting guides

- [ ] Epic 9.3 - Technical Documentation:
  - [ ] Architecture overview
  - [ ] Data flow diagrams
  - [ ] Component relationships
  - [ ] State management flow
  - [ ] Error handling flow

- [ ] Epic 9.4 - Maintenance Documentation:
  - [ ] Setup instructions
  - [ ] Development workflow
  - [ ] Testing procedures
  - [ ] Deployment process
  - [ ] Backup procedures



### **Phase 10: Frontend Change Documentation**

- [ ] Epic 10.1 - API Integration Changes:
  - [ ] Document removal of localStorage
  - [ ] Document new API client implementation
  - [ ] Document event handler updates
  - [ ] Document state management changes
  - [ ] Document error handling additions

- [ ] Epic 10.2 - UI Component Changes:
  - [ ] Document panel structure changes
  - [ ] Document loading indicator additions
  - [ ] Document error message displays
  - [ ] Document form handling updates
  - [ ] Document button state management

- [ ] Epic 10.3 - Code Structure Changes:
  - [ ] Document new file organization
  - [ ] Document module dependencies
  - [ ] Document function changes
  - [ ] Document variable scope changes
  - [ ] Document event flow changes



### **Phase 11: Core Features and Testing (2-3 days)**

- [ ] Epic 11.1 - Implement study features
  - [ ] Add card completion tracking
  - [ ] Implement study statistics
  - [ ] Add progress indicators
  - [ ] Test study functionality
  - [ ] Document study features

- [ ] Epic 11.2 - Add import/export functionality
  - [ ] Create import UI with file upload and text paste
  - [ ] Implement structured text parsing (CSV/TSV)
  - [ ] Add preview functionality
  - [ ] Implement export features
  - [ ] Test import/export functionality
  - [ ] Document import/export features

- [ ] Epic 11.3 - Add local settings
  - [ ] Implement user preferences
  - [ ] Add theme options
  - [ ] Save last active set
  - [ ] Test settings functionality
  - [ ] Document settings features

- [ ] Epic 11.4 - Implement backup strategy
  - [ ] Add automatic backups
  - [ ] Create restore functionality
  - [ ] Test backup/restore
  - [ ] Document backup process

- [ ] Epic 11.5 - Performance optimization
  - [ ] Add request caching
  - [ ] Optimize file operations
  - [ ] Add request batching
  - [ ] Test performance improvements
  - [ ] Document optimizations



### **Phase 12: Advanced Features (ongoing)**

- [ ] Epic 12.1 - Implement spaced repetition
  - [ ] Add difficulty tracking
  - [ ] Implement review scheduling
  - [ ] Add performance analytics
  - [ ] Test spaced repetition
  - [ ] Document algorithm

- [ ] Epic 12.2 - Add search and filtering
  - [ ] Implement card search
  - [ ] Add tag support
  - [ ] Create advanced filters
  - [ ] Test search functionality
  - [ ] Document search features

- [ ] Epic 12.3 - Create custom study modes
  - [ ] Add timed study sessions
  - [ ] Implement random order
  - [ ] Add custom card ordering
  - [ ] Test study modes
  - [ ] Document modes



### **Phase 13: Documentation and Cleanup (ongoing)**
- [ ] Epic 13.1 - Maintain documentation
  - [ ] Keep API documentation up to date
  - [ ] Update setup instructions
  - [ ] Document new features
  - [ ] Add troubleshooting guides

- [ ] Epic 13.2 - Code cleanup
  - [ ] Remove unused files
  - [ ] Remove commented-out code
  - [ ] Update outdated comments
  - [ ] Standardize code style

- [ ] Epic 13.3 - Version control
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