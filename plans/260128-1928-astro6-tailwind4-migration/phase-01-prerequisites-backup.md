# Phase 1: Prerequisites & Backup

**Date:** 2026-01-28  
**Effort:** 10m  
**Status:** Pending  
**Priority:** P1

---

## Context Links

- **Parent Plan:** [plan.md](./plan.md)
- **Next Phase:** [phase-02-astro6-upgrade.md](./phase-02-astro6-upgrade.md)
- **Research Reports:**
  - [Astro 6 Migration](./research/researcher-01-astro6-migration.md)
  - [Tailwind 4 Migration](./research/researcher-02-tailwind4-migration.md)

---

## Overview

Verify system requirements, create safety backup, document baseline state before migration.

---

## Key Insights

- **Node Requirement:** Astro 6 beta requires Node.js 22.12.0+ (drops Node 18/20 support)
- **Current Version:** v24.11.1 ✓ (satisfies requirement)
- **Git Status:** Clean working tree recommended for safe rollback
- **Baseline Metrics:** Need current build time/bundle size for performance comparison

---

## Requirements

### Functional
- Node.js 22.12.0+ runtime available
- Git repository initialized with remote
- Current dependencies installable
- Current build succeeds

### Non-Functional
- Backup branch created before any changes
- Baseline metrics documented
- Clean git status (no uncommitted changes)

---

## Related Code Files

### Files to Check
- `package.json` - dependency versions
- `astro.config.mjs` - current config state
- `tailwind.config.mjs` - theme to migrate
- `src/styles/global.css` - directives to replace

### Files to Create
- None (backup only)

---

## Implementation Steps

### 1. Verify Node.js Version
```bash
node --version
# Expected: v22.12.0 or higher
# Actual: v24.11.1 ✓
```

**Validation:** Version number >= 22.12.0

### 2. Check Git Status
```bash
git status
# Should show clean working tree or only untracked files
```

**Action:** Commit or stash any pending changes

### 3. Create Backup Branch
```bash
git checkout -b backup/pre-astro6-migration
git push origin backup/pre-astro6-migration
git checkout main
```

**Validation:** Backup branch exists locally and remotely

### 4. Document Current State
```bash
# Record dependency versions
npm list astro @astrojs/react @astrojs/tailwind tailwindcss --depth=0

# Run baseline build
npm run build

# Record build metrics
du -sh dist/  # Bundle size
time npm run build  # Build time
```

**Capture:**
- astro: ^5.2.0
- @astrojs/react: ^4.2.0
- @astrojs/tailwind: ^6.0.0
- tailwindcss: ^3.4.0
- Build time: [record]
- Bundle size: [record]

### 5. Test Current Build
```bash
npm install
npm run build
npm run preview
```

**Validation:**
- No build errors
- Preview server starts successfully
- Site renders correctly

### 6. Create Rollback Instructions
Save to `ROLLBACK.md`:
```markdown
# Rollback to Pre-Migration State

1. Checkout backup branch:
   git checkout backup/pre-astro6-migration

2. Reinstall dependencies:
   npm install

3. Restart dev server:
   npm run dev

4. Delete migration branch (if needed):
   git branch -D main
   git checkout -b main
   git push origin main --force
```

---

## Todo List

- [ ] Run `node --version`, confirm v22.12.0+
- [ ] Check `git status`, commit/stash pending changes
- [ ] Create backup branch: `backup/pre-astro6-migration`
- [ ] Push backup branch to remote
- [ ] Record current dependency versions
- [ ] Run `npm run build`, capture baseline metrics
- [ ] Test preview server
- [ ] Create ROLLBACK.md instructions
- [ ] Document baseline in phase report

---

## Success Criteria

✓ Node.js version >= 22.12.0  
✓ Backup branch created and pushed to remote  
✓ Baseline build successful  
✓ Build time and bundle size documented  
✓ Rollback instructions created

---

## Risk Assessment

**Low Risk:**
- Read-only operations (no code changes)
- Git backup provides complete rollback path
- Node version already satisfied

**Mitigation:**
- Verify backup branch integrity before proceeding
- Test rollback procedure on separate clone

---

## Next Steps

After completion:
1. Proceed to [Phase 2: Astro 6 Upgrade](./phase-02-astro6-upgrade.md)
2. Keep baseline metrics for Phase 5 comparison
3. Reference backup branch if rollback needed
