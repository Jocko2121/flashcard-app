# Phase 6 - Import Functionality

## Overview
This document outlines the plan for implementing the import functionality for the flashcard application. The focus is on text paste functionality, allowing users to quickly import flashcard sets by pasting formatted text.

## Codebase Structure
The application follows a single-page architecture with the following key files:
- `frontend/index.html`: Contains all HTML structure and JavaScript code
- `frontend/styles/base.css`: Global styles and resets
- `frontend/styles/layout.css`: Layout system and CSS variables
- `frontend/styles/components.css`: Component-specific styles
- `backend/data.js`: Core data management
- `backend/routes/sets.js`: API endpoints for set management

The application uses a panel-based navigation system where:
- Each view is a `page-panel` div
- Panels are shown/hidden using `display: none/block`
- The `showPanel()` function handles panel switching

## Existing Import Structure
The application already has a dedicated import page and navigation:
1. Import Navigation Button:
   ```html
   <button id="btn-nav-import" class="sidebar-icon-btn sidebar-btn" type="button">
     <!-- Import SVG -->
     <svg>...</svg>
     <span class="sidebar-label">Import</span>
   </button>
   ```

2. Import Panel:
   ```html
   <div id="view-import" class="page-panel" style="display:none">
     <div class="view-header">
       <div class="view-header-content">
         <h2 class="current-set-name">Import</h2>
         <p class="current-set-description">Import your flashcard sets</p>
       </div>
     </div>
   </div>
   ```

This means we will:
- Use the existing import panel instead of creating a modal
- Follow the same panel pattern as other views (library, themes)
- Integrate with the existing navigation system
- Maintain consistency with the current UI/UX patterns

## Current State Analysis
- Basic flashcard management exists
- Card sets can be created and managed
- Import panel exists but is empty
- No import functionality implemented
- No text paste handling
- No preview functionality

## Import Panel Structure
The import panel will be organized with text paste as the input method:
1. Text Paste Section
   - Large text area for pasting content
   - Pre-populated with greyed-out example
   - Clear all button
   - Character count
   - Validate button
   - Error highlighting in text

2. Action Buttons
   - Import button
   - Clear all button
   - Validate button

## Text Paste Format
### Format Specification
```
Math Basics
Basic arithmetic questions

What is 2+2?
4

What is the quadratic formula?
The quadratic formula is:
x = (-b ± √(b² - 4ac)) / 2a

Where:
a, b, and c are coefficients
± means plus or minus
√ means square root
```

#### Format Rules
1. **Structure**
   - First two lines are set information:
     1. Set Name
     2. Set Description
   - Blank line after set information
   - Each card starts with Question on its own line
   - Answer can span multiple lines
   - Blank line between cards
   - One set per import
   - No maximum limit on blank lines between cards (for readability)
   - Empty lines within answers are allowed (for formatting)
   - Whitespace is trimmed from beginning/end of each line
   - Line endings are normalized (CRLF vs LF)

2. **Required Fields**
   - Set Name: Name of the flashcard set
   - Question: The question text
   - Answer: The answer text (can be multiple lines)

3. **Optional Fields**
   - Set Description: Description of the set (can be empty)

4. **Field Rules**
   - Maximum field lengths:
     - Set Name: 100 characters
     - Set Description: 500 characters
     - Question: 1000 characters
     - Answer: 1000 characters
   - Questions must be on a single line
   - Answers can span multiple lines
   - Blank line between cards

5. **Limits**
   - One set per import
   - Maximum 100 cards per set
   - Maximum 1000 characters per field

6. **Special Characters**
   - UTF-8 encoding supported
   - Newlines in answers are preserved
   - Tabs are converted to spaces

7. **User Guidance**
   - Clear instructions about format requirements
   - Simple example pre-populated in grey
   - Error messages will indicate exact location of issues
   - Users can edit text in paste area before submission
   - Duplicate set names will show friendly error message
   - Text area is never cleared on validation failure
   - Non-formatting errors are clearly indicated

## Error Handling Requirements
- Handle malformed text
  - Show exact location of error
  - Provide clear error message
  - Allow user to correct before submission
  - Never clear the text area on failure
- Handle missing required fields
  - Indicate which fields are missing
  - Show where fields should be
- Handle invalid data types
  - Show expected format
  - Provide correction guidance
- Handle duplicate set names
  - Show friendly error message
  - Indicate existing set name
  - Prevent import until resolved
- Handle special characters
- Handle encoding issues
- Handle size limits
- Handle system errors
  - Clearly indicate if error is not formatting-related
  - Preserve text content on any type of failure

## UI/UX Requirements
### Text Paste Focus
- Large, prominent text area
  - Fixed height with scrolling
  - Pre-populated with greyed-out example when empty
  - Example disappears on focus (like modern password fields)
  - Total character count display
- Clear all button
- Validate button (disabled when text area is empty)
- Error highlighting in text
- Undo/redo support
- Clear error message for multiple set attempts
- Error indicators show exact location of issues
- Users can edit text before submission
- Text area is never cleared on failure
- Live validation as user types
  - May switch to validate button only if live validation becomes unwieldy

### Error Handling
- Error messages appear near the error location
- Show all errors at once
- Error messages are tooltips near the error
- No automatic scrolling to errors
- Retry button for server errors
- Never clear text area on any type of error
- Preserve all user data during errors

### Success Handling
- Show success message after import
- Provide button to view new set
- Provide button to import another set
- Let user choose whether to clear text area
- Never clear text area by default
- Show count of cards imported
- Show set name in success message

### Import Process
- No loading indicators needed
- No import button disable needed
- No navigation prevention needed
- Simple retry button for server errors
- No draft saving needed

### Text Area Behavior
- Fixed height with scrolling
- No auto-expansion
- No minimum height requirement
- Standard scrolling behavior
- Example text only visible when empty
- Example disappears on focus
- No "use example" button needed

### Error Messages
- Appear as tooltips near the error
- Show all errors simultaneously
- No separate error panel
- No automatic scrolling
- Clear indication of error location
- Preserve all user data
- Simple, clear error messages
- No error categorization
- No icons or special formatting

### Success Flow
- Simple success message
- Basic buttons for navigation
- No special effects or animations
- No sound effects
- No popups or toasts
- Keep it simple and functional

### Error Recovery
- Simple retry button for server errors
- No local storage needed
- No draft saving needed
- Preserve all user data during errors

### Mobile Support
- No mobile-specific features needed
- No mobile layout adjustments needed
- Desktop-only implementation

### Accessibility
- No specific accessibility features needed
- No ARIA labels needed
- No screen reader support needed
- No keyboard navigation needed
- Standard browser accessibility only

### Styling Approach
- Minimal styling only
- Use existing theme variables
- No custom button styles
- No custom colors
- No custom animations
- No custom fonts
- No custom borders
- No custom backgrounds
- Keep styling to absolute minimum
- Prepare for future theming
- Use standard browser defaults where possible

## Epics

**[ ] Epic 6.1 - Basic Text Paste UI**
- [x] Create text paste interface
  - [x] Add large text area
  - [x] Add format example display
  - [x] Add clear button
  - [x] Add character count
  - [x] Add copy example button
  - [x] Add format help button
  - [x] Add card count display
  - [x] Add import button
- [x] Add basic preview section
  - [x] Show set name
  - [x] Show description
  - [x] Show card count
  - [x] Show preview status
- [x] Add quick format examples
  - [x] Add example templates
  - [x] Make examples copyable
- [x] Verify UI review
  - [x] Check all buttons work
  - [x] Verify text area behavior
  - [x] Test character count
  - [x] Test preview updates
  - [x] Verify error states
  - [x] Test responsive design

**[ ] Epic 6.2 - Text Paste Processing**
- [x] Install required packages
  - [x] Install express-validator for input validation
  - [x] Update package.json with new dependencies
- [x] Create text parser module
  - [x] Add text format detection
  - [x] Add data validation
  - [x] Add error handling middleware
- [x] Implement data processing
  - [x] Add set creation logic
  - [x] Add card creation logic
  - [x] Add duplicate handling
  - [x] Add error handling
- [x] Add preview endpoint
  - [x] Create /api/sets/import/preview route
  - [x] Add validation response
  - [x] Add error reporting
  - [x] Add format detection
- [x] Add import endpoint
  - [x] Create /api/sets/import route
  - [x] Add transaction handling
  - [x] Add rollback capability
  - [x] Add success response
- [x] CHECKPOINT: Processing Review
  - [x] Verify parser implementation
  - [x] Test data processing
  - [x] Validate error handling
  - [x] Test endpoints
  - [ ] Await user feedback

**[ ] Epic 6.3 - Enhanced Text Paste Features**
- [x] Add validation
  - [x] Implement format checking
  - [x] Implement inline error display
  - [x] Add auto-formatting (buggy - fix later)
- [x] Enhance preview functionality
  - [x] Add preview updates (simple styled preview)
  - [x] Add card counting
  - [x] Add button tooltips
  - [ ] Add error suggestions
  - [ ] Add undo/redo support
- [ ] CHECKPOINT: Enhanced Features Review
  - [ ] Verify live validation
  - [ ] Test preview enhancements
  - [ ] Validate user assistance
  - [ ] Await user feedback

**[ ] Epic 6.4 - Polish and Testing**
- [ ] Test all functionality
  - [ ] Test text paste
  - [ ] Test preview
  - [ ] Test import
  - [ ] Test error handling
- [ ] Test edge cases
  - [ ] Test empty pastes
  - [ ] Test malformed data
  - [ ] Test large pastes
  - [ ] Test special characters
  - [ ] Test duplicate sets
- [ ] Final styling
  - [ ] Adjust text area styling
  - [ ] Fine-tune preview table
  - [ ] Verify responsive design
  - [ ] Check all transitions
  - [ ] Verify error states

## Optional Future Enhancements
### Phase 6.5 - Format Support (Optional)
- [ ] Add markdown support for answers
  - [ ] Basic markdown formatting
  - [ ] Code blocks
  - [ ] Lists and tables
- [ ] Add HTML support for answers
  - [ ] Basic HTML tags
  - [ ] Image support
  - [ ] Table support
- [ ] Add syntax highlighting
  - [ ] Code blocks
  - [ ] Math formulas
  - [ ] Special formatting

## Security Implementation
- Basic security measures
  - Input sanitization
  - Size limits
  - Character restrictions
  - No script injection
- Not production-level security
  - Personal use focus
  - Basic protection only
  - No complex security measures

## Testing Plan

### Test Documentation

#### Import Validation Tests (Keep)
These tests are part of the core import validation system and should be maintained:

1. `test-import-routes.js`
   - Tests `/api/sets/import/preview` endpoint
   - Tests `/api/sets/import` endpoint
   - Validates import data before processing
   - Used by the app for import validation

2. `test-import-processor.js`
   - Tests core import processing logic
   - Tests text parsing
   - Tests data validation
   - Tests error handling
   - Used by the app to process imported data

3. `test-text-parser.js`
   - Tests text format detection
   - Tests data extraction
   - Tests parsing rules
   - Used by the app to parse imported text

#### Error Handling Tests (Keep)
These tests ensure proper error handling and should be maintained:

1. `test-error-handling.js`
   - Tests 404 responses for invalid IDs
   - Tests 400 responses for missing fields
   - Tests validation error handling
   - Used by the app for error handling

#### General API Tests (Can be deleted after Phase 6)
These tests were created for development and can be removed after Phase 6:

1. `test-routes.js`
   - Tests basic API endpoints
   - Tests set operations
   - Tests card operations
   - Development-only tests

2. `test-data.js`
   - Tests data operations
   - Tests set operations
   - Tests card operations
   - Development-only tests

3. `test-config.js`
   - Tests configuration loading
   - Tests environment variables
   - Development-only tests

4. `test-db.js`
   - Tests database operations
   - Tests data persistence
   - Development-only tests

5. `legacy-removal.test.js`
   - Tests removal of legacy code
   - Development-only tests

6. `test-migration.js`
   - Tests data migration
   - Development-only tests

### Test Implementation Details

#### Text Paste
- [x] Test paste handling
- [x] Test format detection
- [x] Test validation
- [x] Test clear functionality
- [x] Test input sanitization
- [x] Test special characters
- [x] Test Unicode support

#### Preview
- [x] Test preview functionality
- [x] Test validation
- [x] Test duplicate handling
- [x] Test format detection
- [x] Test card counting

#### Import
- [x] Test successful import
- [x] Test error handling
- [x] Test duplicate handling
- [x] Test rollback
- [x] Test security restrictions
- [x] Test performance with large pastes
- [x] Test different encodings
- [x] Test malformed text
- [x] Test import summary

## Dependencies
### Required npm Packages
- `express-validator`: Already installed and used in the project for input validation

### Package Usage
- `express-validator`: Will be used for validating import data and ensuring proper format
- Already imported in `backend/middleware/security.js`
- Will extend existing validation rules for import format

### JavaScript Dependencies
- `frontend/index.html`
  - Contains all JavaScript code
  - Uses event delegation
  - Manages state through variables
  - Handles API calls
  - Contains panel switching logic
- `backend/data.js`
  - Core data management
  - Set creation functions
  - Card creation functions
  - Data validation
- `backend/middleware/error-handler.js`
  - Custom error classes
  - Error handling middleware
  - Error response formatting
- `backend/middleware/security.js`
  - Input validation rules
  - Security middleware
  - Request sanitization
  - Already using express-validator 