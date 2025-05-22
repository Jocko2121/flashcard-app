# Theme Preparation Documentation

## Current Color Usage

### Layout Colors (Already in Variables)
```css
:root {
    --bg-color: #f7f8fa;      /* Main background color */
    --panel-bg: #ffffff;      /* Panel background color */
    --border-color: #eee;     /* Border color for panels and dividers */
}
```

### Component Colors (Need to be Moved to Variables)

#### Buttons
```css
/* Primary Action Buttons */
background: #4a90e2;          /* Primary button background */
background: #357abd;          /* Primary button hover state */

/* Add Flashcard Button */
background: #908cff;          /* Special action button */
background: #6c63ff;          /* Special action hover state */

/* TODO: Consider creating semantic variables:
   --btn-primary-bg
   --btn-primary-hover
   --btn-special-bg
   --btn-special-hover
*/
```

#### Text Colors
```css
color: #333;                  /* Primary text color */
color: #666;                  /* Secondary text color */
color: #6c757d;              /* Muted text color */

/* TODO: Consider creating semantic variables:
   --text-primary
   --text-secondary
   --text-muted
*/
```

#### Library Colors
```css
border: 2px solid #908cff;    /* Library border */
background: #e0e7ff;          /* Active library background */
border-color: #4f46e5;        /* Active library border */

/* TODO: Consider creating semantic variables:
   --library-border
   --library-active-bg
   --library-active-border
*/
```

#### Top Bar Colors
```css
background: #e3f0fb;          /* Top bar background */
border-bottom: 1px solid #b6d4ef;  /* Top bar border */

/* TODO: Consider creating semantic variables:
   --topbar-bg
   --topbar-border
*/
```

## Theming Considerations

### 1. Color System
- Consider implementing a color system with:
  - Primary colors
  - Secondary colors
  - Accent colors
  - Semantic colors (success, warning, error)
  - Neutral colors (grays)

### 2. Dark Mode Support
- All colors should have dark mode alternatives
- Consider using CSS custom properties for dark mode:
```css
:root {
    --bg-color: #f7f8fa;
    --text-color: #333;
}

@media (prefers-color-scheme: dark) {
    :root {
        --bg-color: #1a1a1a;
        --text-color: #fff;
    }
}
```

### 3. Accessibility
- Ensure sufficient color contrast
- Consider color-blind users
- Test with WCAG guidelines

### 4. Implementation Strategy
1. Create base color palette
2. Define semantic color variables
3. Replace hardcoded colors with variables
4. Add dark mode support
5. Test across all components

### 5. Future Considerations
- Theme switching mechanism
- User preference storage
- Theme preview functionality
- Theme customization options

## Next Steps
1. Create base color palette
2. Define semantic variables
3. Move hardcoded colors to variables
4. Test color consistency
5. Implement dark mode
6. Add theme switching mechanism 