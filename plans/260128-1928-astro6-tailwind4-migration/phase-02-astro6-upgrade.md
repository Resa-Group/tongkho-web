# Phase 2: Astro 6 Beta Upgrade

**Date:** 2026-01-28  
**Effort:** 20m  
**Status:** Pending  
**Priority:** P1

---

## Context Links

- **Parent Plan:** [plan.md](./plan.md)
- **Previous Phase:** [phase-01-prerequisites-backup.md](./phase-01-prerequisites-backup.md)
- **Next Phase:** [phase-03-tailwind4-migration.md](./phase-03-tailwind4-migration.md)
- **Research:** [Astro 6 Migration Report](./research/researcher-01-astro6-migration.md)

---

## Overview

Upgrade Astro core + integrations to v6 beta. Remove deprecated @astrojs/tailwind. Prepare astro.config.mjs for Vite plugin architecture.

---

## Key Insights

- **@astrojs/tailwind DEPRECATED:** Replaced by @tailwindcss/vite (official Tailwind 4 method)
- **Vite 7.0 Upgrade:** New Environment API (breaking change for custom Vite plugins)
- **React 19 Compatible:** @astrojs/react v4.2.0+ supports React 19
- **Sitemap v3.3 → v3.6+:** No breaking changes, backward compatible
- **No Code Migrations:** Project has no Astro.glob(), ViewTransitions, content collections

---

## Requirements

### Functional
- Astro upgraded to v6 beta (latest pre-release)
- @astrojs/react upgraded to v4.4+ (latest stable)
- @astrojs/sitemap upgraded to v3.6+ (latest)
- @astrojs/tailwind removed from dependencies
- astro.config.mjs updated for Vite plugin architecture

### Non-Functional
- Dev server starts without errors
- TypeScript types resolve correctly
- React 19 compatibility maintained

---

## Related Code Files

### Files to Modify
- `package.json` - update dependencies, remove @astrojs/tailwind
- `astro.config.mjs` - remove tailwind integration, prepare vite.plugins

### Files to Check
- `src/**/*.astro` - verify no Astro.glob() usage
- `src/**/*.{tsx,jsx}` - verify no ViewTransitions usage

---

## Implementation Steps

### 1. Upgrade Core Astro Package
```bash
npm install astro@beta
```

**Expected Version:** astro@6.0.0-beta.x (latest beta)

**Validation:**
```bash
npm list astro
# Should show 6.0.0-beta.x
```

### 2. Upgrade Integrations
```bash
npm install @astrojs/react@latest @astrojs/sitemap@latest
```

**Expected Versions:**
- @astrojs/react: ^4.4.2 or higher
- @astrojs/sitemap: ^3.6.0 or higher

**Validation:**
```bash
npm list @astrojs/react @astrojs/sitemap
```

### 3. Remove Deprecated Tailwind Integration
```bash
npm uninstall @astrojs/tailwind
```

**Validation:**
```bash
npm list @astrojs/tailwind
# Should return: (empty)
```

### 4. Update astro.config.mjs

**Before (Astro 5.2):**
```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tongkhobds.com',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    ssr: {
      noExternal: ['@radix-ui/*'],
    },
  },
});
```

**After (Astro 6 Beta - Tailwind removed):**
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
    plugins: [], // Reserved for @tailwindcss/vite in Phase 3
    ssr: {
      noExternal: ['@radix-ui/*'],
    },
  },
});
```

**Changes:**
- Remove `import tailwind from '@astrojs/tailwind'`
- Remove `tailwind({ applyBaseStyles: false })` from integrations
- Add empty `vite.plugins` array (Phase 3 will populate)

### 5. Verify TypeScript Checks
```bash
npm run astro check
```

**Expected:** No type errors (may show Tailwind CSS import errors - expected until Phase 3)

### 6. Test Dev Server
```bash
npm run dev
```

**Expected Behavior:**
- Server starts on http://localhost:4321
- May show Tailwind CSS errors (expected - Phase 3 fixes)
- React components render
- No Astro core errors

**Kill server after verification (Ctrl+C)**

### 7. Update package.json Scripts (If Needed)

Verify scripts still valid:
```json
{
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview"
  }
}
```

No changes needed - Astro 6 preserves CLI commands.

---

## Todo List

- [ ] Run `npm install astro@beta`
- [ ] Verify astro version: `npm list astro`
- [ ] Run `npm install @astrojs/react@latest @astrojs/sitemap@latest`
- [ ] Verify integration versions
- [ ] Run `npm uninstall @astrojs/tailwind`
- [ ] Update `astro.config.mjs` (remove tailwind, add vite.plugins)
- [ ] Run `npm run astro check` (expect Tailwind errors - OK)
- [ ] Test `npm run dev` (verify server starts)
- [ ] Kill dev server
- [ ] Commit changes: "chore: upgrade to Astro 6 beta"

---

## Success Criteria

✓ astro@6.0.0-beta.x installed  
✓ @astrojs/react@4.4+ installed  
✓ @astrojs/sitemap@3.6+ installed  
✓ @astrojs/tailwind removed from package.json  
✓ astro.config.mjs updated (no tailwind import)  
✓ Dev server starts (ignore Tailwind CSS errors)  
✓ No Astro core errors in terminal

---

## Risk Assessment

**Low Risk:**
- Beta version stable (released after alpha testing)
- No deprecated APIs used in codebase
- React 19 already in use (compatible)

**Medium Risk:**
- Vite 7.0 breaking changes (no custom plugins detected)
- Beta bugs (report upstream if found)

**Mitigation:**
- Backup branch from Phase 1 available
- Can rollback with `git checkout backup/pre-astro6-migration`

---

## Next Steps

After completion:
1. Proceed to [Phase 3: Tailwind CSS 4 Migration](./phase-03-tailwind4-migration.md)
2. Fix Tailwind CSS errors by installing @tailwindcss/vite
3. Keep dev server stopped until Phase 3 complete
