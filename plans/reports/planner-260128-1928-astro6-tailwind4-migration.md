# Planner Report: Astro 6 + Tailwind CSS 4 Migration

**Date:** 2026-01-28  
**Agent:** planner (a53af98)  
**Plan Directory:** D:\BDS\tongkho-web\plans\260128-1928-astro6-tailwind4-migration\  
**Total Effort:** 2h

---

## Executive Summary

Created comprehensive 5-phase migration plan from Astro 5.2 + Tailwind CSS 3.4 to Astro 6 beta + Tailwind CSS 4 with CSS-first configuration. Migration low-risk due to static site architecture, no content collections, Node v24 already installed. Key changes: replace @astrojs/tailwind with @tailwindcss/vite, migrate JS config to @theme {} CSS block, update 4 files for shadow utility rename.

---

## Plan Structure

### Overview Plan
**File:** [plan.md](../260128-1928-astro6-tailwind4-migration/plan.md)  
**Lines:** 78  
**Contents:**
- YAML frontmatter (status: pending, priority: P2, effort: 2h)
- Key changes summary (Astro 6, Tailwind 4)
- 5 phase breakdown with status/effort
- Dependencies graph
- Risk assessment (low/medium)
- Success criteria checklist
- Performance goals (5x faster builds)
- Rollback plan

### Phase Files

#### Phase 1: Prerequisites & Backup
**File:** [phase-01-prerequisites-backup.md](../260128-1928-astro6-tailwind4-migration/phase-01-prerequisites-backup.md)  
**Effort:** 10m  
**Key Tasks:**
- Verify Node.js 22.12+ ✓ (current: v24.11.1)
- Create git backup branch
- Document baseline metrics (build time, bundle size)
- Test current build
- Create ROLLBACK.md

**Risk:** Low (read-only operations)

#### Phase 2: Astro 6 Beta Upgrade
**File:** [phase-02-astro6-upgrade.md](../260128-1928-astro6-tailwind4-migration/phase-02-astro6-upgrade.md)  
**Effort:** 20m  
**Key Tasks:**
- Upgrade astro@beta, @astrojs/react@latest, @astrojs/sitemap@latest
- Remove @astrojs/tailwind (deprecated)
- Update astro.config.mjs (remove tailwind integration, add vite.plugins array)
- Verify TypeScript checks
- Test dev server (expect Tailwind errors - fixed in Phase 3)

**Breaking Changes:**
- @astrojs/tailwind removed (replaced by @tailwindcss/vite)
- Vite 7.0 upgrade (Environment API)

**Risk:** Low (no deprecated APIs used in codebase)

#### Phase 3: Tailwind CSS 4 Migration
**File:** [phase-03-tailwind4-migration.md](../260128-1928-astro6-tailwind4-migration/phase-03-tailwind4-migration.md)  
**Effort:** 30m  
**Key Tasks:**
- Uninstall tailwindcss@3.4, autoprefixer, postcss
- Install tailwindcss@next, @tailwindcss/vite@next
- Update astro.config.mjs (add @tailwindcss/vite plugin)
- Replace @tailwind directives with @import "tailwindcss"
- Delete tailwind.config.mjs, postcss.config.js
- Test dev server (base theme, custom theme in Phase 4)

**Breaking Changes:**
- JS config → CSS-first (migration in Phase 4)
- @tailwind base/components/utilities → @import "tailwindcss"
- PostCSS workflow removed

**Risk:** Medium (visual differences until Phase 4)

#### Phase 4: Theme Migration
**File:** [phase-04-theme-migration.md](../260128-1928-astro6-tailwind4-migration/phase-04-theme-migration.md)  
**Effort:** 40m (longest phase)  
**Key Tasks:**
- Add @theme {} block to global.css
- Migrate 20 color variables (10 primary orange, 10 secondary slate)
- Migrate font variables (Inter, Be Vietnam Pro)
- Fix shadow-sm → shadow-xs in 4 files:
  - src/components/cards/property-card.astro
  - src/components/home/news-section.astro
  - src/components/home/customers-section.astro
  - src/components/header/header.astro
- Test visual parity
- Verify component classes (.btn, .card) render with brand colors

**Color Variables Format:**
```css
--color-primary-500: #f97316;  /* Not --color-primary.500 */
--font-sans: Inter, ui-sans-serif, ...;  /* Not --font-family-sans */
```

**Risk:** Low (declarative theme, @layer blocks unchanged)

#### Phase 5: Verification & Testing
**File:** [phase-05-verification-testing.md](../260128-1928-astro6-tailwind4-migration/phase-05-verification-testing.md)  
**Effort:** 20m  
**Key Tasks:**
- TypeScript validation (astro check)
- Production build test
- Measure build performance (compare to Phase 1)
- Preview server testing (all pages)
- Browser DevTools inspection (CSS variables, console)
- HMR test (<50ms CSS updates)
- Responsive design test (mobile/tablet/desktop)
- Sitemap validation
- Bundle size analysis

**Performance Targets:**
- Full build: 5x faster (realistic: 2-3x for small project)
- Incremental build: 100x faster (realistic: 10-50x)
- HMR: <50ms CSS changes

**Risk:** Low (automated validation, measurable metrics)

---

## Research Insights Applied

### From Astro 6 Research
- Node 22.12+ required ✓ (v24 installed)
- @astrojs/tailwind deprecated → used @tailwindcss/vite
- No content collections → no migration needed
- No Astro.glob() or ViewTransitions → no code changes
- React 19 compatible → kept @astrojs/react@4.2+
- Sitemap backward compatible → upgraded to v3.6+

### From Tailwind 4 Research
- CSS-first config → created @theme {} block
- Shadow rename → fixed shadow-sm → shadow-xs (4 files)
- Font variables → used --font-sans/heading (not --font-family-*)
- Vite plugin → installed @tailwindcss/vite (5-10x faster)
- Container config removed → kept custom .container-custom class
- @apply compat → preserved component classes unchanged

---

## Dependency Graph

```
Phase 1 (Prerequisites)
    ↓
Phase 2 (Astro 6) → blocks → Phase 3 (Tailwind 4)
    ↓                              ↓
    └──────────────────────→ Phase 4 (Theme)
                                   ↓
                             Phase 5 (Testing)
```

**Critical Path:** 1 → 2 → 3 → 4 → 5 (sequential, no parallel execution)

---

## Risk Assessment Summary

**Low Risk (60%):**
- Node version satisfied (v24 > v22.12)
- No content collections to migrate
- No deprecated APIs in codebase (Astro.glob, ViewTransitions)
- Static site only (no SSR complexity)
- No custom Tailwind plugins detected
- CSS-first config declarative (no JS logic)

**Medium Risk (40%):**
- Shadow utility rename (4 files need manual update)
- Visual differences during Phase 3 (base theme temporarily)
- Vite 7.0 plugin compatibility (no custom plugins detected)
- Beta version stability (report bugs upstream)

**High Risk (0%):** None identified

**Mitigation:**
- Backup branch from Phase 1 (complete rollback available)
- Phase-by-phase validation (catch issues early)
- Research reports provide troubleshooting guidance

---

## Files Affected (Summary)

### Modified (6 files)
1. `package.json` - dependencies upgrade
2. `astro.config.mjs` - remove @astrojs/tailwind, add @tailwindcss/vite
3. `src/styles/global.css` - replace directives, add @theme {}
4. `src/components/cards/property-card.astro` - shadow-sm → shadow-xs
5. `src/components/home/news-section.astro` - shadow-sm → shadow-xs
6. `src/components/home/customers-section.astro` - shadow-sm → shadow-xs

### Deleted (2 files)
1. `tailwind.config.mjs` - replaced by @theme {}
2. `postcss.config.js` - replaced by Vite plugin (if exists)

### Created (1 file)
1. `ROLLBACK.md` - rollback instructions (Phase 1)

---

## Success Metrics

**Pre-Migration (Baseline from Phase 1):**
- astro: ^5.2.0
- tailwindcss: ^3.4.0
- Build time: [to be measured]
- Bundle size: [to be measured]

**Post-Migration (Target):**
- astro: 6.0.0-beta.x
- tailwindcss: 4.0.0-beta.x
- Build time: 2-5x faster
- Bundle size: comparable or smaller
- Visual parity: 100%

**Validation Criteria:**
- [x] Node.js 22.12+ verified (v24.11.1)
- [ ] TypeScript checks pass (0 errors)
- [ ] Production build succeeds
- [ ] Dev server runs without errors
- [ ] All pages render with brand theme
- [ ] HMR <50ms for CSS changes
- [ ] Sitemap generated correctly

---

## Known Issues & Workarounds

**Issue 1: Shadow Size Difference**
- **Symptom:** shadow-xs may differ from v3 shadow-sm
- **Workaround:** Change back to shadow-sm if needed (still available)
- **Permanent:** Adjust shadow scale in @theme {}

**Issue 2: Font Loading Flicker (FOUT)**
- **Symptom:** System font shows before Google Fonts load
- **Workaround:** Add font preload in HTML head
- **Reference:** Phase 5, section "Known Issues"

**Issue 3: Vite Cache Stale**
- **Symptom:** Old styles persist despite changes
- **Fix:** `rm -rf node_modules/.vite/ node_modules/.astro/`

---

## Next Steps for Implementation

1. **Assign to:** fullstack-developer or coder agent
2. **Start with:** Phase 1 (prerequisites, backup)
3. **Sequential execution:** Complete each phase before next
4. **Validation:** Run success criteria after each phase
5. **Report issues:** Document in phase file if tests fail
6. **Final deliverable:** Production-ready Astro 6 + Tailwind 4 site

---

## Unresolved Questions

1. **Build Performance Baseline:** Need to capture current build time/bundle size in Phase 1 for comparison.
2. **Shadow Visual Match:** Does shadow-xs exactly match v3 shadow-sm? May need adjustment.
3. **@apply Compatibility:** Does @apply shadow-sm auto-resolve to shadow-xs in Tailwind 4? Test in Phase 4.
4. **Browser Testing:** Need to test in Safari 16.4+, Chrome 111+ (Phase 5). Current dev environment?
5. **Production Deployment:** What's the deployment workflow? CI/CD needs Node 22+ update?

---

## Plan Files Deliverables

✓ plan.md (78 lines, overview with YAML frontmatter)  
✓ phase-01-prerequisites-backup.md (complete)  
✓ phase-02-astro6-upgrade.md (complete)  
✓ phase-03-tailwind4-migration.md (complete)  
✓ phase-04-theme-migration.md (complete)  
✓ phase-05-verification-testing.md (complete)  
✓ All phases include: context links, overview, insights, requirements, steps, todos, success criteria, risks

**Total Plan Size:** ~1200 lines across 6 files  
**Estimated Reading Time:** 15-20 minutes  
**Estimated Implementation Time:** 2 hours (sequential phases)
