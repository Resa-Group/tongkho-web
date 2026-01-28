# Phase 3: Tailwind CSS 4 Migration

**Date:** 2026-01-28  
**Effort:** 30m  
**Status:** Pending  
**Priority:** P1

---

## Context Links

- **Parent Plan:** [plan.md](./plan.md)
- **Previous Phase:** [phase-02-astro6-upgrade.md](./phase-02-astro6-upgrade.md)
- **Next Phase:** [phase-04-theme-migration.md](./phase-04-theme-migration.md)
- **Research:** [Tailwind 4 Migration Report](./research/researcher-02-tailwind4-migration.md)

---

## Overview

Replace Tailwind CSS 3.4 with v4. Install @tailwindcss/vite plugin. Update CSS directives. Delete JS config files.

---

## Key Insights

- **CSS-First Config:** JS config (tailwind.config.mjs) replaced by @theme {} in CSS
- **Vite Plugin:** @tailwindcss/vite replaces PostCSS workflow (5-10x faster)
- **Directive Change:** @tailwind base/components/utilities → @import "tailwindcss"
- **PostCSS Removal:** autoprefixer, postcss.config.js no longer needed
- **Auto Content Detection:** No content paths config required
- **Browser Req:** Safari 16.4+, Chrome 111+, Firefox 128+ (production build target)

---

## Requirements

### Functional
- Tailwind CSS 4 installed (tailwindcss@next)
- @tailwindcss/vite plugin configured in astro.config.mjs
- CSS directives updated in src/styles/global.css
- PostCSS dependencies removed
- JS config files deleted (tailwind.config.mjs, postcss.config.js if exists)

### Non-Functional
- Dev server HMR functional
- Build succeeds without CSS errors
- Visual parity maintained (theme in Phase 4)

---

## Related Code Files

### Files to Modify
- `package.json` - update tailwindcss, remove autoprefixer
- `astro.config.mjs` - add @tailwindcss/vite to vite.plugins
- `src/styles/global.css` - replace @tailwind directives

### Files to Delete
- `tailwind.config.mjs` - replaced by @theme {} in CSS
- `postcss.config.js` - no longer needed (Vite plugin replaces PostCSS)

---

## Implementation Steps

### 1. Uninstall Tailwind CSS 3.x + PostCSS
```bash
npm uninstall tailwindcss autoprefixer
```

**Validation:**
```bash
npm list tailwindcss autoprefixer
# Should return: (empty)
```

### 2. Install Tailwind CSS 4 + Vite Plugin
```bash
npm install -D tailwindcss@next @tailwindcss/vite@next
```

**Expected Versions:**
- tailwindcss@4.0.0-beta.x
- @tailwindcss/vite@4.0.0-beta.x

**Validation:**
```bash
npm list tailwindcss @tailwindcss/vite
```

### 3. Update astro.config.mjs

Add @tailwindcss/vite to vite.plugins:

**Before (from Phase 2):**
```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tongkhobds.com',
  integrations: [
    react(),
    sitemap(),
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [], // Empty from Phase 2
    ssr: {
      noExternal: ['@radix-ui/*'],
    },
  },
});
```

**After:**
```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://tongkhobds.com',
  integrations: [
    react(),
    sitemap(),
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['@radix-ui/*'],
    },
  },
});
```

**Changes:**
- Add `import tailwindcss from '@tailwindcss/vite'`
- Replace `plugins: []` with `plugins: [tailwindcss()]`

### 4. Update src/styles/global.css - Directives Only

**Current (Tailwind 3.4):**
```css
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base { ... }
@layer components { ... }
@layer utilities { ... }
```

**Updated (Tailwind 4 - Directives Only):**
```css
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');

@import "tailwindcss";

@layer base { ... }
@layer components { ... }
@layer utilities { ... }
```

**Changes:**
- Replace `@tailwind base;` `@tailwind components;` `@tailwind utilities;` with single `@import "tailwindcss";`
- Keep Google Fonts import BEFORE Tailwind import (order matters)
- Keep all @layer blocks unchanged (Phase 4 adds @theme)

**IMPORTANT:** Do NOT add @theme {} block yet - Phase 4 handles theme migration.

### 5. Delete Old Config Files

**Check for postcss.config.js:**
```bash
ls postcss.config.js postcss.config.cjs postcss.config.mjs
```

If exists:
```bash
rm postcss.config.js  # or .cjs/.mjs variant
```

**Delete tailwind.config.mjs:**
```bash
rm tailwind.config.mjs
```

**Validation:**
```bash
ls tailwind.config.* postcss.config.*
# Should return: No such file or directory
```

### 6. Test Dev Server
```bash
npm run dev
```

**Expected Behavior:**
- Server starts without errors
- Tailwind utilities work (bg-white, text-secondary-800, etc.)
- **Visual differences expected:** Custom colors/fonts not yet migrated (Phase 4)
- Custom component classes (.btn, .card) render with base Tailwind theme

**Verification Steps:**
1. Open http://localhost:4321
2. Inspect element: verify Tailwind classes applied
3. Check browser console: no CSS errors

**Kill server after verification (Ctrl+C)**

### 7. Test Build
```bash
npm run build
```

**Expected Output:**
- TypeScript check passes
- Astro build succeeds
- CSS bundle generated in dist/

**Validation:**
```bash
ls dist/_astro/*.css
# Should show generated CSS file
```

---

## Todo List

- [ ] Run `npm uninstall tailwindcss autoprefixer`
- [ ] Run `npm install -D tailwindcss@next @tailwindcss/vite@next`
- [ ] Verify versions: `npm list tailwindcss @tailwindcss/vite`
- [ ] Update `astro.config.mjs` (add tailwindcss import + plugin)
- [ ] Update `src/styles/global.css` (replace @tailwind with @import)
- [ ] Check for `postcss.config.js`, delete if exists
- [ ] Delete `tailwind.config.mjs`
- [ ] Verify config files deleted: `ls tailwind.config.* postcss.config.*`
- [ ] Run `npm run dev`, verify server starts
- [ ] Check http://localhost:4321 (expect base theme)
- [ ] Kill dev server
- [ ] Run `npm run build`, verify success
- [ ] Commit changes: "feat: migrate to Tailwind CSS 4 with Vite plugin"

---

## Success Criteria

✓ tailwindcss@4.0.0-beta.x installed  
✓ @tailwindcss/vite@4.0.0-beta.x installed  
✓ autoprefixer removed from package.json  
✓ astro.config.mjs includes @tailwindcss/vite plugin  
✓ global.css uses @import "tailwindcss" directive  
✓ tailwind.config.mjs deleted  
✓ postcss.config.js deleted (if existed)  
✓ Dev server runs without CSS errors  
✓ Build succeeds

---

## Risk Assessment

**Low Risk:**
- Vite plugin official (maintained by Tailwind Labs)
- Backward compatible directives (@layer blocks unchanged)
- Automatic content detection (no config needed)

**Medium Risk:**
- Visual differences until Phase 4 (custom theme not loaded)
- Custom components use base theme temporarily

**Mitigation:**
- Phase 4 immediately follows (restores custom theme)
- Backup branch available for rollback

---

## Known Issues

**Expected:** Site appears with Tailwind's default theme (blue, gray) instead of custom orange/slate colors. This is correct - Phase 4 restores custom theme.

**Fonts:** Google Fonts still load, but font-sans/font-heading utilities use Tailwind defaults until Phase 4.

---

## Next Steps

After completion:
1. Proceed immediately to [Phase 4: Theme Migration](./phase-04-theme-migration.md)
2. Restore custom colors (primary orange, secondary slate)
3. Restore custom fonts (Inter, Be Vietnam Pro)
4. Fix shadow utility renames
