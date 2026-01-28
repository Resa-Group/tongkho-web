# Phase 4: Theme Migration

**Date:** 2026-01-28  
**Effort:** 40m  
**Status:** Pending  
**Priority:** P1

---

## Context Links

- **Parent Plan:** [plan.md](./plan.md)
- **Previous Phase:** [phase-03-tailwind4-migration.md](./phase-03-tailwind4-migration.md)
- **Next Phase:** [phase-05-verification-testing.md](./phase-05-verification-testing.md)
- **Research:** [Tailwind 4 Theme Migration](./research/researcher-02-tailwind4-migration.md)
- **Old Config:** tailwind.config.mjs (deleted in Phase 3, reference from git)

---

## Overview

Migrate custom theme from JS config to CSS-first @theme {} block. Restore brand colors (orange/slate), custom fonts (Inter/Be Vietnam Pro), fix shadow utility renames.

---

## Key Insights

- **Color Variables:** --color-primary-500 (not --color-primary.500)
- **Font Variables:** --font-sans / --font-heading (renamed from --font-family-sans)
- **Order Matters:** Google Fonts import → @import "tailwindcss" → @theme {}
- **Shadow Rename:** shadow-sm → shadow-xs (used in 4 files)
- **Container:** Keep .container-custom class (uses utility composition, no config needed)
- **Component Classes:** .btn, .card use @apply with custom colors (auto-resolves after @theme)

---

## Requirements

### Functional
- Custom colors restored: 10 primary (orange), 10 secondary (slate) shades
- Custom fonts configured: Inter (sans), Be Vietnam Pro (heading)
- Shadow utilities updated: shadow-sm → shadow-xs (4 files)
- Component classes render with brand colors
- Visual parity with Tailwind 3.4 site

### Non-Functional
- CSS variables exposed for runtime access
- @apply directives resolve custom theme
- HMR reflects theme changes instantly

---

## Related Code Files

### Files to Modify
- `src/styles/global.css` - add @theme {} block
- `src/components/cards/property-card.astro` - shadow-sm → shadow-xs
- `src/components/home/news-section.astro` - shadow-sm → shadow-xs
- `src/components/home/customers-section.astro` - shadow-sm → shadow-xs
- `src/components/header/header.astro` - shadow-sm → shadow-xs

### Reference Files
- Previous `tailwind.config.mjs` (view in git: `git show HEAD~1:tailwind.config.mjs`)

---

## Implementation Steps

### 1. Add @theme {} Block to global.css

**Location:** src/styles/global.css  
**Position:** After @import "tailwindcss" directive, before @layer blocks

**Insert after line:**
```css
@import "tailwindcss";

/* INSERT @theme HERE */

@layer base { ... }
```

**@theme {} Block to Insert:**
```css
@theme {
  /* Primary Colors - Orange Scale (Brand) */
  --color-primary-50: #fff7ed;
  --color-primary-100: #ffedd5;
  --color-primary-200: #fed7aa;
  --color-primary-300: #fdba74;
  --color-primary-400: #fb923c;
  --color-primary-500: #f97316;
  --color-primary-600: #ea580c;
  --color-primary-700: #c2410c;
  --color-primary-800: #9a3412;
  --color-primary-900: #7c2d12;

  /* Secondary Colors - Slate Scale (Neutral) */
  --color-secondary-50: #f8fafc;
  --color-secondary-100: #f1f5f9;
  --color-secondary-200: #e2e8f0;
  --color-secondary-300: #cbd5e1;
  --color-secondary-400: #94a3b8;
  --color-secondary-500: #64748b;
  --color-secondary-600: #475569;
  --color-secondary-700: #334155;
  --color-secondary-800: #1e293b;
  --color-secondary-900: #0f172a;

  /* Font Families */
  --font-sans: Inter, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-heading: "Be Vietnam Pro", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
```

**Validation:**
- 10 primary color shades defined
- 10 secondary color shades defined
- Font families include system fallbacks
- Variable names use hyphens (not dots)

### 2. Fix Shadow Utilities in Astro Components

**Files Affected:** 4 files (from grep results)

**Pattern to Replace:**
- `shadow-sm` → `shadow-xs`
- Keep `shadow-` (bare shadow) unchanged (different utility)
- Keep `shadow-lg`, `shadow-xl` unchanged (no rename)

#### File 1: src/components/cards/property-card.astro

**Find:**
```astro
class="... shadow-sm ..."
```

**Replace:**
```astro
class="... shadow-xs ..."
```

#### File 2: src/components/home/news-section.astro

**Find:**
```astro
class="... shadow-sm ..."
```

**Replace:**
```astro
class="... shadow-xs ..."
```

#### File 3: src/components/home/customers-section.astro

**Find:**
```astro
class="... shadow-sm ..."
```

**Replace:**
```astro
class="... shadow-xs ..."
```

#### File 4: src/components/header/header.astro

**Find:**
```astro
class="... shadow-sm ..."
```

**Replace:**
```astro
class="... shadow-xs ..."
```

**Validation Script:**
```bash
# Verify no shadow-sm remains (except in @apply directives)
grep -r "shadow-sm" src/ --include="*.astro" --include="*.tsx" --include="*.jsx"
# Should only show @apply shadow-sm in global.css (auto-resolves to shadow-xs)
```

### 3. Update @apply Shadow in global.css

**Current Code (global.css @layer components):**
```css
.btn {
  @apply inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300;
  @apply shadow-sm hover:shadow-md active:scale-[0.98];
}
```

**Decision:** Update `@apply shadow-sm` → `@apply shadow-xs` (validated)  
**Reason:** Manual consistency across all files per user preference.

**Updated Code:**
```css
.btn {
  @apply inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300;
  @apply shadow-xs hover:shadow-md active:scale-[0.98];
}
```

**Also update .badge class:**
```css
.badge {
  @apply inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold;
  @apply shadow-xs backdrop-blur-sm;  /* was shadow-sm */
}
```

### 4. Test Theme in Dev Server

```bash
npm run dev
```

**Visual Checks:**
1. **Colors:**
   - Primary buttons: Orange gradient (#f97316)
   - Text: Slate 800 (#1e293b)
   - Background: White (#ffffff)

2. **Fonts:**
   - Body text: Inter
   - Headings: Be Vietnam Pro

3. **Shadows:**
   - Cards: Subtle shadow (xs size)
   - Buttons: Visible shadow on hover

4. **Component Classes:**
   - .btn-primary: Orange gradient
   - .card: White background, subtle shadow
   - .container-custom: Centered, responsive padding

**Browser DevTools Check:**
```javascript
// Inspect CSS variables
getComputedStyle(document.documentElement).getPropertyValue('--color-primary-500')
// Should return: #f97316

getComputedStyle(document.documentElement).getPropertyValue('--font-sans')
// Should return: Inter, ui-sans-serif, ...
```

### 5. Fix Any Visual Regressions

**Common Issues:**

**Issue 1: Font not loading**
- **Symptom:** Sans-serif fallback instead of Inter
- **Fix:** Verify Google Fonts import before @import "tailwindcss"

**Issue 2: Colors not applying**
- **Symptom:** Blue/gray instead of orange/slate
- **Fix:** Check @theme {} syntax (hyphens, not dots)

**Issue 3: Shadow too large/small**
- **Symptom:** Shadow-xs looks different than v3 shadow-sm
- **Fix:** Adjust to `shadow-sm` or use custom shadow in @layer utilities

### 6. Compare with Baseline Screenshots

**Reference:** Screenshots from Phase 1 baseline testing

**Pages to Compare:**
- Homepage (hero, features, CTA)
- Properties listing (cards, filters)
- Contact page (form, map)

**Acceptable Differences:**
- Slight shadow size variations (shadow-xs vs v3 shadow-sm)
- Font rendering differences (browser/OS variations)

**Unacceptable Differences:**
- Wrong colors (blue instead of orange)
- Missing shadows
- Wrong fonts

---

## Todo List

- [ ] Open `src/styles/global.css`
- [ ] Insert @theme {} block after @import "tailwindcss"
- [ ] Add 10 primary color variables (--color-primary-50 to 900)
- [ ] Add 10 secondary color variables (--color-secondary-50 to 900)
- [ ] Add font family variables (--font-sans, --font-heading)
- [ ] Update `src/components/cards/property-card.astro` (shadow-sm → shadow-xs)
- [ ] Update `src/components/home/news-section.astro` (shadow-sm → shadow-xs)
- [ ] Update `src/components/home/customers-section.astro` (shadow-sm → shadow-xs)
- [ ] Update `src/components/header/header.astro` (shadow-sm → shadow-xs)
- [ ] Update `src/styles/global.css` @apply shadow-sm → shadow-xs (.btn, .badge)
- [ ] Run grep to verify no shadow-sm anywhere
- [ ] Run `npm run dev`, test visual appearance
- [ ] Verify colors: orange primary, slate secondary
- [ ] Verify fonts: Inter (body), Be Vietnam Pro (headings)
- [ ] Verify shadows: xs size on cards/buttons
- [ ] Test component classes (.btn-primary, .card, .input)
- [ ] Compare with Phase 1 baseline screenshots
- [ ] Fix any visual regressions
- [ ] Kill dev server
- [ ] Commit changes: "feat: migrate custom theme to Tailwind 4 CSS-first config"

---

## Success Criteria

✓ @theme {} block added to global.css  
✓ 20 custom color variables defined (primary + secondary)  
✓ Custom fonts configured (Inter, Be Vietnam Pro)  
✓ Shadow utilities updated (shadow-sm → shadow-xs in 4 files)  
✓ Dev server shows correct brand colors  
✓ Component classes render with custom theme  
✓ Visual parity with Tailwind 3.4 site  
✓ CSS variables accessible in DevTools

---

## Risk Assessment

**Low Risk:**
- Declarative theme definition (no JS logic)
- CSS variables standard (browser support met)
- @layer blocks unchanged (component classes compatible)

**Medium Risk:**
- Shadow size visual differences (xs vs sm naming)
- Font loading timing (FOUT during dev)

**Mitigation:**
- Side-by-side comparison with v3 site
- Adjust shadow utility if needed (shadow-sm fallback)
- Preload fonts in HTML head if FOUT issue

---

## Unresolved Questions

1. **Shadow Consistency:** Does shadow-xs exactly match v3 shadow-sm? May need manual adjustment.
2. **Font Fallback:** Are system font fallbacks identical to v3? Check sans-serif rendering.
3. **@apply Compat:** Does @apply shadow-sm auto-resolve to shadow-xs? Test in .btn class.

---

## Next Steps

After completion:
1. Proceed to [Phase 5: Verification & Testing](./phase-05-verification-testing.md)
2. Run full build + TypeScript checks
3. Test all pages for visual regressions
4. Measure build performance (compare to Phase 1 baseline)
