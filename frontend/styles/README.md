# CSS Architecture

## Overview
This directory contains the CSS files for the Flashcard App. The styles are organized into three main files, each with a specific responsibility:

1. `base.css` - Global styles and resets
2. `layout.css` - Layout system and CSS variables
3. `components.css` - Component-specific styles

## File Purposes

### base.css
- Global resets and defaults
- Box-sizing rules
- Body defaults
- Typography basics
- Form element resets
- Accessibility considerations (reduced motion)

### layout.css
- CSS variables (colors, dimensions, transitions)
- Grid system
- Panel layouts
- Responsive breakpoints
- Layout-specific animations

### components.css
- Card styles
- Button styles
- Form styles
- Header styles
- Component-specific animations

## Loading Order
The files are loaded in this specific order:
1. `base.css` - Establishes foundation
2. `layout.css` - Sets up layout system
3. `components.css` - Applies component styles

This order ensures that:
- Base styles are available to all other styles
- Layout variables are available to components
- Component styles can override layout styles when needed

## CSS Variables
CSS variables are defined in `layout.css` because they are primarily used for layout-related values:
- Panel dimensions
- Colors
- Transitions
- Shadows

## Debugging
- An empty `<style>` tag is maintained in `index.html` for quick debugging
- Use browser dev tools to inspect styles
- Check the loading order if styles aren't applying as expected

## Adding New Styles
1. Determine the scope of the new styles:
   - Global defaults → `base.css`
   - Layout-related → `layout.css`
   - Component-specific → `components.css`
2. Follow the existing patterns and naming conventions
3. Test across different screen sizes
4. Verify no conflicts with existing styles

## Best Practices
- Keep styles modular and focused
- Use CSS variables for repeated values
- Maintain consistent naming conventions
- Document complex style rules
- Test responsive behavior
- Consider accessibility 