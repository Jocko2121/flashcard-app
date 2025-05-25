# Phase 5: Full Multi-File Class/ID Refactor Plan

## Objective
Perform a comprehensive, coordinated refactor of all class and ID names across the frontend codebase (HTML, CSS, JS) for clarity, consistency, and maintainability. Standardize state classes and update all selectors and event listeners. Ensure no legacy or suspicious code remains unaddressed.

---

## 1. Preparation & Analysis
- Read all relevant files: `frontend/index.html`, `frontend/styles/layout.css`, `frontend/styles/components.css`, and any other CSS/JS files that reference UI classes/IDs.
- Extract all unique class and ID names from HTML, CSS, and JS.
- Categorize each as:
  - Structural/Layout
  - Component/UI
  - State/JS-driven
  - Utility/Helper
- Identify all selectors and event listeners in JS that depend on these names.
- Note any legacy, unused, or suspicious classes/IDs for review/commenting out.

---

## 2. Naming Conventions (to apply)
- **Structural/Layout:**
  - `panel-base` → `section-base`
  - `panel-left` → `sidebar-nav`
  - `panel-main` → `main-content`
  - `panel-right` → `sidebar-done`
  - `panel-header` → `section-header`
  - `panel-content` → `section-content`
- **Component/UI:**
  - `main-header` → `view-header`
  - `main-header-content` → `view-header-content`
  - `header-buttons` → `view-header-actions`
  - `header-card-count` → `view-header-count`
  - `card-sets-list` → `set-list`
  - `stacked-layout` → `list-stacked`
  - `card-set` → `set-card`
  - `card-list` → `flashcard-list`
  - `form-container` → `form-wrap`
  - `controls` → `action-controls`
  - `nav-header` → `sidebar-header`
  - `nav-content` → `sidebar-content`
  - `nav-label` → `sidebar-label`
  - `sidebar-nav-btn` → `sidebar-btn`
  - `nav-icon-btn` → `sidebar-icon-btn`
- **State/JS-driven:**
  - `active` → `is-active`
  - `hidden` → `is-hidden`
  - `panel-visible` → `is-visible`
  - `panel-hidden` → `is-hidden`
- **Utility/Helper:**
  - `stacked-layout` → `list--stacked`
  - `form-container.hidden` → `form--hidden`

---

## 3. Refactor Steps (Granular)
1. **Structural/Layout Classes**
   - Refactor all `panel-base` → `section-base` in HTML, CSS, JS.
   - Refactor all `panel-left` → `sidebar-nav` in HTML, CSS, JS.
   - Refactor all `panel-main` → `main-content` in HTML, CSS, JS.
   - Refactor all `panel-right` → `sidebar-done` in HTML, CSS, JS.
   - Refactor all `panel-header` → `section-header` in HTML, CSS, JS.
   - Refactor all `panel-content` → `section-content` in HTML, CSS, JS.
   - After each, search to verify no old names remain before proceeding.
2. **Component/UI Classes**
   - Refactor all `main-header` → `view-header` in HTML, CSS, JS.
   - Refactor all `main-header-content` → `view-header-content` in HTML, CSS, JS.
   - Refactor all `header-buttons` → `view-header-actions` in HTML, CSS, JS.
   - Refactor all `header-card-count` → `view-header-count` in HTML, CSS, JS.
   - Refactor all `card-sets-list` → `set-list` in HTML, CSS, JS.
   - Refactor all `stacked-layout` → `list-stacked` in HTML, CSS, JS.
   - Refactor all `card-set` → `set-card` in HTML, CSS, JS.
   - Refactor all `card-list` → `flashcard-list` in HTML, CSS, JS.
   - Refactor all `form-container` → `form-wrap` in HTML, CSS, JS.
   - Refactor all `controls` → `action-controls` in HTML, CSS, JS.
   - Refactor all `nav-header` → `sidebar-header` in HTML, CSS, JS.
   - Refactor all `nav-content` → `sidebar-content` in HTML, CSS, JS.
   - Refactor all `nav-label` → `sidebar-label` in HTML, CSS, JS.
   - Refactor all `sidebar-nav-btn` → `sidebar-btn` in HTML, CSS, JS.
   - Refactor all `nav-icon-btn` → `sidebar-icon-btn` in HTML, CSS, JS.
   - After each, search to verify no old names remain before proceeding.
3. **State/JS-driven Classes**
   - Refactor all `active` → `is-active` in HTML, CSS, JS.
   - Refactor all `hidden` → `is-hidden` in HTML, CSS, JS.
   - Refactor all `panel-visible` → `is-visible` in HTML, CSS, JS.
   - Refactor all `panel-hidden` → `is-hidden` in HTML, CSS, JS.
   - After each, search to verify no old names remain before proceeding.
4. **Utility/Helper Classes**
   - Refactor all `stacked-layout` → `list--stacked` in HTML, CSS, JS.
   - Refactor all `form-container.hidden` → `form--hidden` in HTML, CSS, JS.
   - After each, search to verify no old names remain before proceeding.
5. **Legacy/Suspicious Code**
   - Comment out any legacy, unused, or suspicious code with a note (e.g., `<!-- Suspicious: not referenced, consider removing -->`).
   - Remove commented-out code only after confirming it is truly unused.

---

## 4. Verification
- After all changes, run a final search for any old class/ID names or state classes.
- Test all navigation, view switching, and dynamic UI features.
- Ensure all selectors and event listeners work as intended.

---

## 5. Communication
- Only report "REFACTOR COMPLETE" when all steps are finished and verified.
- If any issues or uncertainties arise, document them in the markdown file for review.

---

## 6. Notes
- This plan is self-contained and should be used to resume the refactor after a session restart.
- All context, naming conventions, and steps are included for continuity. 