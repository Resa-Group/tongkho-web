---
title: "Astro 6 Beta + Tailwind CSS 4 Migration"
description: "Upgrade framework and styling to latest versions with CSS-first config"
status: pending
priority: P2
effort: 2h
branch: main
tags: [migration, astro, tailwind, upgrade]
created: 2026-01-28
---

# Astro 6 Beta + Tailwind CSS 4 Migration

## Overview

Migrate tongkho-web from Astro 5.2 + Tailwind CSS 3.4 to Astro 6 beta + Tailwind CSS 4 with CSS-first configuration.

## Key Changes

### Astro 6 Beta
- Node.js 22.12+ required → **Current: v24.11.1 ✓**
- Vite 7.0 upgrade
- @astrojs/tailwind DEPRECATED → use @tailwindcss/vite
- No content collections to migrate (static site with mock data)
- No Astro.glob() or ViewTransitions usage

### Tailwind CSS 4
- JS config (tailwind.config.mjs) → CSS-first (@theme block)
- @tailwind directives → @import "tailwindcss"
- Custom theme: 10 primary (orange), 10 secondary (slate) colors
- Custom fonts: Inter (sans), Be Vietnam Pro (heading)
- Container: Keep custom .container-custom class (no migration needed)
- Shadow utilities: shadow-sm → shadow-xs (4 files affected)

## Migration Phases

### Phase 1: Prerequisites & Backup
**File:** [phase-01-prerequisites-backup.md](./phase-01-prerequisites-backup.md)  
**Status:** ⬜ Pending  
**Effort:** 10m

- Verify Node.js 22.12+ ✓ (current: v24.11.1)
- Create git backup branch
- Document current build output

### Phase 2: Astro 6 Upgrade
**File:** [phase-02-astro6-upgrade.md](./phase-02-astro6-upgrade.md)  
**Status:** ⬜ Pending  
**Effort:** 20m

- Upgrade astro@beta, @astrojs/react@latest, @astrojs/sitemap@latest
- Remove @astrojs/tailwind integration
- Update astro.config.mjs (Vite plugin structure)
- Verify React 19 compatibility

### Phase 3: Tailwind CSS 4 Migration
**File:** [phase-03-tailwind4-migration.md](./phase-03-tailwind4-migration.md)  
**Status:** ⬜ Pending  
**Effort:** 30m

- Uninstall tailwindcss@3.4, autoprefixer, postcss
- Install @tailwindcss/vite plugin
- Update src/styles/global.css (directives)
- Delete tailwind.config.mjs, postcss.config.js

### Phase 4: Theme Migration
**File:** [phase-04-theme-migration.md](./phase-04-theme-migration.md)  
**Status:** ⬜ Pending  
**Effort:** 40m

- Migrate colors: 20 CSS variables (primary/secondary scales)
- Migrate fonts: --font-sans, --font-heading
- Keep custom component classes (.btn, .card, .input, etc.)
- Fix shadow-sm → shadow-xs in 4 files

### Phase 5: Verification & Testing
**File:** [phase-05-verification-testing.md](./phase-05-verification-testing.md)  
**Status:** ⬜ Pending  
**Effort:** 20m

- Run astro check (TypeScript validation)
- Test dev server HMR
- Build production bundle
- Visual regression testing (homepage, properties, contact)

## Dependencies

- Phase 2 blocks Phase 3 (Astro config must support Vite plugins)
- Phase 3 blocks Phase 4 (CSS entry must exist for @theme)
- Phase 4 blocks Phase 5 (complete migration before testing)

## Risk Assessment

**Low Risk:**
- Node version satisfied (v24 > v22.12)
- No content collections, Astro.glob(), ViewTransitions
- No custom Tailwind plugins detected
- Static site only (no SSR complexity)

**Medium Risk:**
- Shadow utility rename (4 files need manual update)
- Custom components use @apply with shadow-sm (may still work)

## Success Criteria

- [x] Node.js 22.12+ verified
- [ ] astro@beta, @tailwindcss/vite installed
- [ ] Dev server runs without errors
- [ ] Build succeeds (astro check + astro build)
- [ ] Visual parity with v3 site
- [ ] HMR works for CSS changes

## Performance Goals

- Full build: 5x faster (Tailwind v4 benchmark)
- Incremental rebuild: 100x faster
- Dev server HMR: <50ms for CSS changes

## Rollback Plan

1. Checkout backup branch: `git checkout backup/pre-astro6-migration`
2. Reinstall old deps: `npm install`
3. Restart dev server

## Validation Summary

**Validated:** 2026-01-28  
**Questions asked:** 3

### Confirmed Decisions
- **Astro Version:** Use astro@beta (accept beta instability for latest features)
- **Shadow Utilities:** Update ALL shadow-sm → shadow-xs everywhere (including @apply in global.css)
- **Verification Depth:** Standard (build + TypeScript + homepage visual comparison)

### Action Items
- [x] Q1: Proceed with astro@beta as planned
- [ ] Q2: Update global.css @apply shadow-sm → shadow-xs (Phase 4 adjustment)
- [x] Q3: Standard verification scope confirmed

---

## Notes

- **Google Fonts:** Already imported in global.css (keep order: fonts → tailwindcss → @theme)
- **Custom Container:** .container-custom uses utility classes, no config migration needed
- **@apply in Components:** Update @apply shadow-sm → shadow-xs for consistency (validated)
- **Static Site:** No SSR/API routes, simpler migration path
