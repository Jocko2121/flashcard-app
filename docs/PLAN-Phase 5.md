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

**[ ] Epic 5.1 - Basic Structure**
- [ ] Create new view panel `view-play-cards`
  - [ ] Add to index.html following existing panel pattern
  - [ ] Match existing panel structure (view-header, view-header-content, view-header-actions)
  - [ ] Add basic layout classes (page-panel, section-base)
  - [ ] Ensure panel is hidden by default (style="display:none")
- [ ] Add header section
  - [ ] Add title with "[Set Name] - Play Flashcards"
  - [ ] Add "Back to Sets" button (use existing button styles)
  - [ ] Add "Exit Play Mode" button (use existing button styles)
  - [ ] Ensure buttons use existing button classes
- [ ] Add content section
  - [ ] Create card display area (centered in viewport)
  - [ ] Add navigation section (below card)
  - [ ] Add progress indicator area (below navigation)
  - [ ] Use flexbox for vertical layout
- [ ] Basic styling
  - [ ] Use existing CSS variables from layout.css
  - [ ] Add minimal play-specific styles
  - [ ] Ensure responsive layout
  - [ ] Follow existing CSS class naming conventions
- [ ] CHECKPOINT: Basic Structure Review
  - [ ] Verify panel structure and layout
  - [ ] Confirm header elements are correctly positioned
  - [ ] Validate navigation buttons placement
  - [ ] Check responsive behavior
  - [ ] Await user feedback before proceeding to Epic 5.2

**[ ] Epic 5.2 - Card Display**
- [ ] Implement card container
  - [ ] Create front/back structure (use CSS transform for 3D flip)
  - [ ] Add question display (use existing text styles)
  - [ ] Add answer display (use existing text styles)
  - [ ] Set reasonable min-height for landscape flashcard appearance (use CSS min-height)
  - [ ] Allow vertical expansion for long content (use CSS height: auto)
  - [ ] Reset to min-height for each new card (reset in JavaScript)
  - [ ] Use CSS perspective for 3D effect
  - [ ] Add backface-visibility: hidden for clean flip
- [ ] Add flip functionality
  - [ ] Implement click/tap handler (use event delegation)
  - [ ] Add flip animation (use CSS transform and transition)
  - [ ] Add visual indicator (use CSS cursor: pointer)
  - [ ] Use transform-style: preserve-3d
  - [ ] Add transition: transform var(--transition-duration)
- [ ] CHECKPOINT: Card Display Review
  - [ ] Verify card container implementation
  - [ ] Test card flip animation
  - [ ] Validate handling of long content
  - [ ] Confirm card positioning and size
  - [ ] Await user feedback before proceeding with remaining tasks
- [ ] Style card display
  - [ ] Center in viewport (use flexbox)
  - [ ] Set consistent size (use CSS width/max-width)
  - [ ] Add minimal styling (use existing card styles as base)
  - [ ] Use existing card border and shadow styles
  - [ ] Match existing text styles for consistency

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