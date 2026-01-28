# Phase 5: Verification & Testing

**Date:** 2026-01-28  
**Effort:** 20m  
**Status:** Pending  
**Priority:** P1

---

## Context Links

- **Parent Plan:** [plan.md](./plan.md)
- **Previous Phase:** [phase-04-theme-migration.md](./phase-04-theme-migration.md)
- **Baseline:** Phase 1 metrics (build time, bundle size, screenshots)

---

## Overview

Comprehensive verification: TypeScript validation, production build, visual regression testing, performance benchmarks. Ensure migration successful and production-ready.

---

## Key Insights

- **Performance Target:** 5x faster full build, 100x faster incremental (Tailwind v4 claim)
- **Visual Parity:** Site should match v3 appearance (colors, fonts, shadows)
- **Type Safety:** astro check must pass (no migration-introduced type errors)
- **Build Output:** dist/ should contain optimized CSS bundle
- **Browser Compat:** Verify production bundle works in Safari 16.4+, Chrome 111+

---

## Requirements

### Functional
- TypeScript checks pass (astro check)
- Production build succeeds (astro build)
- Dev server HMR functional
- All pages render correctly
- No console errors in browser

### Non-Functional
- Build time <= v3 baseline (ideally 5x faster)
- Bundle size comparable or smaller
- Visual consistency across pages
- CSS variables accessible in production

---

## Related Code Files

### Files to Verify
- `dist/_astro/*.css` - production CSS bundle
- `dist/index.html` - homepage build output
- `src/**/*.astro` - all pages render correctly
- `src/**/*.{tsx,jsx}` - React components functional

---

## Implementation Steps

### 1. TypeScript Validation
```bash
npm run astro check
```

**Expected Output:**
```
Result (XXX files):
- 0 errors
- 0 warnings
- 0 hints
```

**Fix if Errors:**
- Type errors related to Tailwind CSS: Check @theme {} syntax
- Import errors: Verify @tailwindcss/vite installed
- React type errors: Verify @astrojs/react@latest

### 2. Production Build Test
```bash
npm run build
```

**Expected Output:**
```
building client (vite) 
✓ XXX modules transformed.
dist/index.html                  XX.XX kB
dist/_astro/*.css                XX.XX kB

building server (vite)
✓ XXX modules transformed.

@astrojs/sitemap: Generating sitemap...
✓ Completed in XXXms
```

**Validation:**
- No build errors
- CSS file generated in dist/_astro/
- sitemap.xml created
- Build completes successfully

### 3. Measure Build Performance

**Compare to Phase 1 Baseline:**

```bash
# Measure clean build
rm -rf dist/ node_modules/.astro/
time npm run build
# Record: [X.XXX seconds]

# Measure incremental build (change CSS)
echo "/* test */" >> src/styles/global.css
time npm run build
# Record: [X.XXX seconds]

# Revert test change
git checkout src/styles/global.css
```

**Benchmark Table:**

| Metric | Tailwind 3.4 (Baseline) | Tailwind 4 (Current) | Improvement |
|--------|-------------------------|---------------------|-------------|
| Clean build | [Phase 1 value] | [Current value] | X.Xx faster |
| Incremental | [Phase 1 value] | [Current value] | X.Xx faster |
| Bundle size | [Phase 1 value] | [Current value] | ±X kB |

**Target:** 3-5x faster (may not hit 5x with small codebase)

### 4. Preview Server Testing
```bash
npm run preview
```

**Open:** http://localhost:4321

**Visual Checks:**

**Homepage:**
- [ ] Hero section: Orange gradient buttons
- [ ] Features grid: Cards with subtle shadows
- [ ] Stats section: Primary color accents
- [ ] CTA: Orange button hover effects
- [ ] Footer: Slate text colors

**Properties Page:**
- [ ] Property cards: White background, shadow-xs
- [ ] Badges: Hot (red gradient), Featured (orange gradient)
- [ ] Filters: Input styles, border colors
- [ ] Hover effects: Card lift animation

**Contact Page:**
- [ ] Form inputs: Border focus (primary color)
- [ ] Submit button: Orange gradient
- [ ] Map embed: Correct rendering

### 5. Browser DevTools Inspection

**Open DevTools (F12) → Console:**
- [ ] No errors
- [ ] No Tailwind CSS warnings
- [ ] No React hydration errors

**DevTools → Elements → Computed Styles:**
```javascript
// Verify CSS variables
getComputedStyle(document.documentElement).getPropertyValue('--color-primary-500').trim()
// Expected: #f97316 or rgb(249, 115, 22)

getComputedStyle(document.documentElement).getPropertyValue('--font-sans').trim()
// Expected: Inter, ui-sans-serif, ...
```

**DevTools → Network → CSS:**
- [ ] CSS bundle loaded (200 status)
- [ ] File size: [XX kB]
- [ ] No 404 errors for Tailwind imports

### 6. Cross-Page Validation

**Test All Routes:**
```bash
# List all pages
find dist/ -name "*.html" -type f

# Expected:
dist/index.html
dist/properties/index.html
dist/contact/index.html
dist/404.html (if exists)
```

**Manual Click Testing:**
1. Visit homepage
2. Click "Properties" link → verify page loads
3. Click "Contact" link → verify page loads
4. Click back to homepage
5. Verify no console errors during navigation

### 7. HMR (Hot Module Replacement) Test

**Terminal 1:**
```bash
npm run dev
```

**Terminal 2 (or editor):**
```bash
# Modify CSS color
# Change --color-primary-500: #f97316; to #ff0000;
```

**Browser:**
- [ ] Page updates instantly (no refresh)
- [ ] Primary color changes to red
- [ ] No full page reload
- [ ] Console shows HMR update log

**Revert Change:**
```bash
git checkout src/styles/global.css
```

**Expected HMR Speed:** <50ms for CSS changes

### 8. Responsive Design Testing

**Resize browser window (or use DevTools device emulation):**

**Mobile (375px):**
- [ ] Navigation menu collapses
- [ ] Cards stack vertically
- [ ] Container padding: 1rem (--container-padding)

**Tablet (768px):**
- [ ] Container padding: 2rem (--container-padding-sm)
- [ ] Cards in 2-column grid

**Desktop (1280px):**
- [ ] Container padding: 4rem (--container-padding-lg)
- [ ] Cards in 3-4 column grid
- [ ] Max width: 7xl (1280px)

### 9. Sitemap Validation

**Check sitemap.xml:**
```bash
cat dist/sitemap-0.xml
```

**Expected:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tongkhobds.com/</loc>
  </url>
  <url>
    <loc>https://tongkhobds.com/properties/</loc>
  </url>
  <url>
    <loc>https://tongkhobds.com/contact/</loc>
  </url>
</urlset>
```

**Validation:**
- [ ] All pages listed
- [ ] Correct domain (tongkhobds.com)
- [ ] Valid XML syntax

### 10. Bundle Size Analysis

**Check CSS bundle:**
```bash
ls -lh dist/_astro/*.css
# Record size: [XX kB]
```

**Compare to Phase 1:**
- Baseline: [XX kB]
- Current: [XX kB]
- Difference: ±[X kB]

**Analyze bundle contents:**
```bash
head -n 50 dist/_astro/*.css
```

**Verify:**
- [ ] Custom colors present (--color-primary-500)
- [ ] Custom fonts present (--font-sans)
- [ ] Minified CSS (no comments, compressed)
- [ ] No unused Tailwind utilities (tree-shaken)

---

## Todo List

- [ ] Run `npm run astro check`, verify 0 errors
- [ ] Run `npm run build`, verify success
- [ ] Measure clean build time
- [ ] Measure incremental build time
- [ ] Compare build times to Phase 1 baseline
- [ ] Run `npm run preview`
- [ ] Test homepage visual appearance
- [ ] Test properties page visual appearance
- [ ] Test contact page visual appearance
- [ ] Open DevTools, check console (no errors)
- [ ] Verify CSS variables in DevTools
- [ ] Test all internal links
- [ ] Run `npm run dev`, test HMR
- [ ] Modify CSS color, verify instant update (<50ms)
- [ ] Revert CSS change
- [ ] Test responsive design (mobile/tablet/desktop)
- [ ] Validate dist/sitemap-0.xml
- [ ] Check CSS bundle size
- [ ] Compare bundle size to Phase 1
- [ ] Kill servers
- [ ] Document test results in report
- [ ] Commit changes: "test: verify Astro 6 + Tailwind 4 migration"

---

## Success Criteria

✓ TypeScript checks pass (0 errors)  
✓ Production build succeeds  
✓ Build time <= baseline (ideally 3-5x faster)  
✓ Bundle size comparable or smaller  
✓ All pages render correctly  
✓ Custom theme visible (orange/slate)  
✓ HMR works (<50ms CSS updates)  
✓ No console errors  
✓ Sitemap generated correctly  
✓ Responsive design functional

---

## Risk Assessment

**Low Risk:**
- Build validation (automated checks)
- Performance benchmarks (measurable)
- Visual testing (controlled environment)

**Medium Risk:**
- Browser-specific rendering issues (Safari vs Chrome)
- Font loading on slow connections (FOUT)

**Mitigation:**
- Test in multiple browsers (Chrome, Firefox, Safari)
- Use browser DevTools network throttling
- Add font preloading if FOUT detected

---

## Performance Benchmarks

**Expected Improvements (Tailwind v4 claims):**
- Full build: 5x faster
- Incremental build: 100x faster
- HMR: <50ms for CSS changes

**Realistic for Small Project (~2000 LOC):**
- Full build: 2-3x faster (less noticeable on small projects)
- Incremental build: 10-50x faster
- HMR: Consistent <50ms

**If Performance Worse:**
1. Check Vite cache: `rm -rf node_modules/.vite/`
2. Verify PostCSS removed: `npm list postcss autoprefixer` (should be empty)
3. Check for competing processes (CPU usage)

---

## Visual Regression Checklist

**Colors:**
- [ ] Primary: Orange (#f97316) in buttons, accents
- [ ] Secondary: Slate (#1e293b, #64748b) in text
- [ ] Backgrounds: White, soft gradients (orange-50/secondary-50)

**Fonts:**
- [ ] Body: Inter (not system-ui fallback)
- [ ] Headings: Be Vietnam Pro (not system-ui fallback)
- [ ] Font weights: 400, 500, 600, 700 (Google Fonts loaded)

**Shadows:**
- [ ] Cards: Subtle shadow (shadow-xs)
- [ ] Buttons: Visible shadow on hover
- [ ] Hover effects: Shadow enlarges (shadow-md, shadow-xl)

**Components:**
- [ ] .btn-primary: Orange gradient, white text
- [ ] .card: White bg, rounded-2xl, hover lift
- [ ] .input: Border focus (primary color ring)
- [ ] .badge-hot: Red gradient
- [ ] .badge-featured: Orange gradient

---

## Known Issues & Workarounds

**Issue 1: Shadow-xs Smaller Than v3 shadow-sm**
- **Symptom:** Cards have less prominent shadow
- **Workaround:** Change shadow-xs → shadow-sm in component files
- **Permanent Fix:** Adjust shadow scale in @theme {}

**Issue 2: Font Flicker on First Load (FOUT)**
- **Symptom:** System font shows briefly before Google Fonts load
- **Workaround:** Add font preload in HTML head:
  ```html
  <link rel="preload" href="https://fonts.googleapis.com/..." as="style">
  ```

**Issue 3: Vite Cache Stale**
- **Symptom:** Old styles persist despite changes
- **Fix:** `rm -rf node_modules/.vite/ node_modules/.astro/`

---

## Next Steps

After successful verification:
1. Create summary report in `plans/reports/`
2. Update `README.md` with new dependency versions
3. Document breaking changes (if any for future devs)
4. Merge to main branch
5. Deploy to production
6. Monitor production bundle performance

**If Tests Fail:**
1. Document failures in this phase file
2. Return to Phase 4 (theme issues) or Phase 3 (config issues)
3. Consult research reports for troubleshooting
4. Consider rollback to backup branch
