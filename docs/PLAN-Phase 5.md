# Phase 5 - Flashcard Play Functionality

## Overview
This document outlines the plan for implementing the flashcard play functionality. The goal is to create an interactive study mode that allows users to flip through cards, track progress, and navigate through their flashcard sets.

## Codebase Structure
The application follows a single-page architecture with the following key files:
- `frontend/index.html`: Contains all HTML structure and JavaScript code
- `frontend/styles/base.css`: Global styles and resets
- `frontend/styles/layout.css`: Layout system and CSS variables
- `frontend/styles/components.css`: Component-specific styles

The application uses a panel-based navigation system where:
- Each view is a `page-panel` div
- Panels are shown/hidden using `display: none/block`
- The `showPanel()` function handles panel switching
- The `switchToCardView()` function handles card view transitions

Key JavaScript patterns:
- Event delegation is used for all event listeners
- State is managed through variables in the main scope
- API calls are made through the API object
- DOM manipulation is done through querySelector/querySelectorAll
- Panel switching is handled by showPanel() function

Key CSS patterns:
- CSS variables are defined in layout.css
- Component styles are in components.css
- Base styles are in base.css
- Transitions use var(--transition-duration) and var(--transition-timing)
- Colors use CSS variables (e.g., var(--text-primary))

## Current State Analysis
- Basic flashcard viewing functionality exists
- Cards can be created, edited, and deleted
- Sets can be managed
- No interactive study mode
- No card flipping functionality
- No progress tracking

## Current Issues
- No way to study cards interactively
- No progress tracking during study sessions
- No card flipping animation
- No keyboard navigation
- No shuffle functionality

## Epics

**[x] Epic 5.1 - Basic Structure**
- [x] Create new view panel `view-play-cards`
  - [x] Add to index.html following existing panel pattern
  - [x] Match existing panel structure (view-header, view-header-content, view-header-actions)
  - [x] Add basic layout classes (page-panel, section-base)
  - [x] Ensure panel is hidden by default (style="display:none")
- [x] Add header section
  - [x] Add title with "[Set Name] - Play Flashcards"
  - [x] Add "Back to Sets" button (use existing button styles)
  - [x] Add "Exit Play Mode" button (use existing button styles)
  - [x] Ensure buttons use existing button classes
- [x] Add content section
  - [x] Create card display area (centered in viewport)
  - [x] Add navigation section (below card)
  - [x] Add progress indicator area (below navigation)
  - [x] Use flexbox for vertical layout
- [x] Basic styling
  - [x] Use existing CSS variables from layout.css
  - [x] Add minimal play-specific styles
  - [x] Ensure responsive layout
  - [x] Follow existing CSS class naming conventions
- [x] CHECKPOINT: Basic Structure Review
  - [x] Verify panel structure and layout
  - [x] Confirm header elements are correctly positioned
  - [x] Validate navigation buttons placement
  - [x] Check responsive behavior
  - [x] Await user feedback before proceeding to Epic 5.2

**[x] Epic 5.2 - Card Display**
- [x] Implement card container
  - [x] Create front/back structure (use CSS transform for 3D flip)
  - [x] Add question display (use existing text styles)
  - [x] Add answer display (use existing text styles)
  - [x] Set reasonable min-height for landscape flashcard appearance (use CSS min-height)
  - [x] Allow vertical expansion for long content (use CSS height: auto)
  - [x] Reset to min-height for each new card (reset in JavaScript)
  - [x] Use CSS perspective for 3D effect
  - [x] Add backface-visibility: hidden for clean flip
- [x] Add flip functionality
  - [x] Implement click/tap handler (use event delegation)
  - [x] Add flip animation (use CSS transform and transition)
  - [x] Add visual indicator (use CSS cursor: pointer)
  - [x] Use transform-style: preserve-3d
  - [x] Add transition: transform var(--transition-duration)
- [x] CHECKPOINT: Card Display Review
  - [x] Verify card container implementation
  - [x] Test card flip animation
  - [x] Validate handling of long content
  - [x] Confirm card positioning and size
  - [x] Await user feedback before proceeding with remaining tasks
- [x] Style card display
  - [x] Center in viewport (use flexbox)
  - [x] Set consistent size (use CSS width/max-width)
  - [x] Add minimal styling (use existing card styles as base)
  - [x] Use existing card border and shadow styles
  - [x] Match existing text styles for consistency

**[ ] Epic 5.3 - Navigation**
- [ ] Add navigation buttons
  - [ ] Add next/last buttons (use existing button styles)
  - [ ] Style buttons (use CSS variables for colors)
  - [ ] Add disable states (use CSS :disabled)
  - [ ] Use existing button classes for consistency
  - [ ] Add aria-labels for accessibility
- [ ] Implement progress display
  - [ ] Add card counter (use existing counter styles)
  - [ ] Add visual progress indicator (use CSS progress bar)
  - [ ] Use existing card-count class
  - [ ] Update counter on card change
- [ ] Add keyboard shortcuts
  - [ ] Implement left/right arrow navigation (use keydown event)
  - [ ] Add keyboard event listeners (use event delegation)
  - [ ] Prevent default behavior for arrow keys
  - [ ] Add visual feedback for keyboard navigation
- [ ] Add shuffle functionality
  - [ ] Add shuffle button (use existing button styles)
  - [ ] Implement shuffle algorithm (use Fisher-Yates)
  - [ ] Preserve original order (store in separate array)
  - [ ] Update navigation state after shuffle
  - [ ] Reset progress indicator after shuffle

**[ ] Epic 5.4 - Progress and State**
- [ ] Add progress tracking
  - [ ] Track current card (use JavaScript variable)
  - [ ] Track total cards (use JavaScript variable)
  - [ ] Update progress display (use DOM manipulation)
  - [ ] Store current index in variable
  - [ ] Update header count display
- [ ] Implement card transitions
  - [ ] Add slide animation (use CSS transform)
  - [ ] Handle edge cases (first/last card)
  - [ ] Use transform: translateX for slides
  - [ ] Add transition for smooth movement
- [ ] Add state management
  - [ ] Track card order (use JavaScript array)
  - [ ] Handle shuffle state (use boolean flag)
  - [ ] Manage navigation state (use JavaScript variables)
  - [ ] Store original order array
  - [ ] Track current view state

**[ ] Epic 5.5 - Polish and Testing**
- [ ] Test all functionality
  - [ ] Test card flipping (verify animation)
  - [ ] Test navigation (verify button states)
  - [ ] Test keyboard shortcuts (verify event handling)
  - [ ] Test shuffle (verify randomness)
  - [ ] Test all edge cases
- [ ] Test edge cases
  - [ ] Test first/last card (verify navigation)
  - [ ] Test single card set (verify display)
  - [ ] Test empty set (verify message)
  - [ ] Test very long content
  - [ ] Test rapid navigation
- [ ] Final styling
  - [ ] Adjust animations (verify smoothness)
  - [ ] Fine-tune spacing (verify consistency)
  - [ ] Verify responsive design (test breakpoints)
  - [ ] Check all transitions
  - [ ] Verify button states

## Checkpoints
The following checkpoints require user feedback before proceeding:

1. **Checkpoint 1 - Basic Structure (After Epic 5.1)**
   - Verify panel structure and layout
   - Confirm header elements are correctly positioned
   - Validate navigation buttons placement
   - Check responsive behavior

2. **Checkpoint 2 - Card Display (During Epic 5.2)**
   - Verify card container implementation
   - Test card flip animation
   - Validate handling of long content
   - Confirm card positioning and size

No other checkpoints are required. All other epics can be implemented continuously without interruption.

## Implementation Notes
- Keep styling minimal for future theming
- Use existing CSS variables where possible
- Document any new CSS variables
- Test each feature as it's implemented
- Consider mobile responsiveness
- Maintain consistent code style
- Follow existing event handling patterns
- Use existing API functions for data management
- Use event delegation for all event listeners
- Follow existing DOM manipulation patterns
- Use existing CSS class naming conventions
- Maintain consistent error handling
- Use existing transition timings

## Dependencies
### JavaScript Dependencies
- `frontend/index.html` - Main application file
  - Contains all JavaScript code
  - Uses event delegation
  - Manages state through variables
  - Handles API calls
  - Contains panel switching logic
  - Contains event handling system
- Existing card and set management code
  - API object for data operations
  - Event handling system
  - Panel switching logic
  - Card management functions
  - Set management functions

### CSS Dependencies
- Existing CSS variables (from layout.css)
  - Colors (--text-primary, --text-secondary, etc.)
  - Dimensions (--panel-width, --main-padding, etc.)
  - Transitions (--transition-duration, --transition-timing)
  - Shadows (--panel-shadow, --header-shadow)
- Layout and component styles
  - Panel structure (section-base, page-panel)
  - Button styles (sidebar-btn, new-set-btn)
  - Card styles (set-card, flashcard-card)
  - Header styles (view-header, view-header-content)
- Animation capabilities
  - Transform (rotateY, translateX)
  - Transition (transform, opacity)
  - Keyframes (if needed for complex animations)

## Testing Plan
- [ ] Card flip functionality
  - [ ] Test click/tap behavior
  - [ ] Test animation smoothness
  - [ ] Test mobile responsiveness
  - [ ] Test long content handling
  - [ ] Test rapid flipping
- [ ] Navigation
  - [ ] Test button functionality
  - [ ] Test keyboard shortcuts
  - [ ] Test edge cases
  - [ ] Test button states
  - [ ] Test rapid navigation
- [ ] Progress tracking
  - [ ] Test counter accuracy
  - [ ] Test progress indicator
  - [ ] Test state persistence
  - [ ] Test update timing
  - [ ] Test edge cases
- [ ] Shuffle functionality
  - [ ] Test random distribution
  - [ ] Test state preservation
  - [ ] Test navigation after shuffle
  - [ ] Test progress after shuffle
  - [ ] Test edge cases

## Future Theming Considerations
- Card size and proportions
- Flip animation timing and style
- Slide animation timing and style
- Progress indicator style
- Button styles
- Color scheme
- Typography
- Spacing and layout 