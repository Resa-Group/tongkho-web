# Phase 3: Component Integration

**Duration:** 2-3 days
**Priority:** High
**Dependencies:** Phase 2 complete
**Status:** Pending

---

## Overview

Update header components to use dynamic menu data while preserving existing UI/UX exactly.

---

## Context Links

- **Main Plan:** [plan.md](./plan.md)
- **Phase 2:** [phase-02-menu-generation-build.md](./phase-02-menu-generation-build.md)
- **Header Component:** [src/components/header/header.astro](../../src/components/header/header.astro)
- **Mobile Menu:** [src/components/header/header-mobile-menu.tsx](../../src/components/header/header-mobile-menu.tsx)

---

## Implementation Steps

### Step 1: Update header.astro (1 hour)

**Before:**
```astro
---
import { mainNavItems } from './header-nav-data';
---
```

**After:**
```astro
---
import { getMainNavItems } from '@/data/menu-data';
const mainNavItems = await getMainNavItems();
---
```

**Changes:**
- Replace import with async fetch
- Keep all other logic identical
- Preserve CSS classes and structure

---

### Step 2: Update Mobile Menu (1 hour)

**File:** `src/components/header/header-mobile-menu.tsx`

No changes needed - component receives `navItems` as props, data source is transparent.

**Verify:**
- Props interface matches NavItem[]
- Rendering logic unchanged
- Interactions work correctly

---

### Step 3: Remove Old Data File (15 minutes)

```bash
# Backup first
cp src/components/header/header-nav-data.ts src/components/header/header-nav-data.ts.backup

# Remove from imports
git rm src/components/header/header-nav-data.ts

# Or comment out for safety during testing
# mv src/components/header/header-nav-data.ts src/components/header/header-nav-data.ts.old
```

---

## Todo List

- [ ] Update `header.astro` to use getMainNavItems()
- [ ] Test desktop navigation rendering
- [ ] Test dropdown menus (hover/click)
- [ ] Test mobile menu rendering
- [ ] Test mobile menu interactions
- [ ] Verify all menu links are correct
- [ ] Test responsive breakpoints
- [ ] Remove old header-nav-data.ts file

---

## Success Criteria

- ✅ Desktop menu renders identically
- ✅ Mobile menu renders identically
- ✅ All dropdowns work correctly
- ✅ All links navigate correctly
- ✅ No console errors
- ✅ Responsive behavior unchanged

---

## Next Steps

**Phase 4:** Implement news folder hierarchy with sub-folders
