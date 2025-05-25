# Flashcard App Master Plan

## Overview
This document outlines the development plan for a personal flashcard application built with Node.js and Express. The app features a modern three-panel interface for card set management, active study area, and completed cards tracking. All data is stored locally using a JSON file system, with no external services required. This plan focuses on enhancing the user experience and adding new features while maintaining the app's simplicity and personal-use focus. We follow an iterative development approach, testing each feature as we build it.


**## PHASES - NEXT**


### *Phase 6: Import/Export functionality*
- [ ] Epic 6.1 - Add import/export functionality
  - [ ] Create import UI with file upload and text paste
  - [ ] Implement structured text parsing (CSV/TSV)
  - [ ] Add preview functionality
  - [ ] Implement export features (maybe, if it's easy)
  - [ ] Test import/export functionality
  - [ ] Document import/export features


### *Phase 7: Search and Filtering*
- [ ] Epic 7.1 - Implement card search
- [ ] Epic 7.2 - Add tag support
- [ ] Epic 7.3 - Create advanced filters
- [ ] Epic 7.4 - Test search functionality
 - [ ] Document search features


### *Phase 8: Custom Study Modes*
- [ ] Epic 8.1 - Create custom study modes
  - [ ] Add timed study sessions
  - [ ] Implement random order
  - [ ] Add custom card ordering
  - [ ] Test study modes
  - [ ] Document modes








**## PHASES - DONE / ACTIVE**
### *Phase 1: Project Setup and Static File Serving (1-2 days)*
- [X] Epic 1.1 - Initialize Node.js project
- [X] Epic 1.2 - Install required dependencies
- [X] Epic 1.3 - Set up Express server and static file serving
- [X] Epic 1.4 - Refactor & clean up code for this phase
- [X] Epic 1.5 - Code Cleanup Tasks

### *Phase 2: Database and API Implementation (2-3 days)*
- [X] Epic 2.1 - Set up local JSON file storage
- [X] Epic 2.2 - Complete data migration
- [X] Epic 2.3 - Implement core API endpoints
- [X] Epic 2.4 - Implement additional API endpoints
- [X] Epic 2.5 - Basic testing

### *Phase 3: Github Integration*
- [X] Epic 3.1 - Learn Git Basics
- [X] Epic 3.2 - GitHub Account Setup
- [X] Epic 3.3 - Project Repository Setup
- [X] Epic 3.4 - Basic Workflow Setup
- [X] Epic 3.5 - Documentation

### *Phase 4: CSS Reorganization Plan (2-3 days)*
- [X] Epic 4.1 - Update frontend to use new API endpoints
- [X] Epic 4.2 - Layout.css (First File)
- [X] Epic 4.3 - Components.css (New File)
- [X] Epic 4.4 - Base.css (New File)
- [x] Epic 4.5 - Documentation
- [x] Epic 4.6 - Cleanup

### *Phase 5: Flashcard Play Implimentation*
- [x] Epic 5.1 - Basic Structure
- [x] Epic 5.2 - Card Display
- [x] Epic 5.3 - Navigation
- [x] Epic 5.4 - Progress and State
- [x] Epic 5.5 - Polish and Testing