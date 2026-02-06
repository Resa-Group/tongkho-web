# Phase 2: Menu Generation at Build Time

**Duration:** 2-3 days
**Priority:** High
**Dependencies:** Phase 1 complete
**Status:** Pending

---

## Overview

Integrate menu service with Astro's build process, replacing hardcoded menu data with database-driven generation.

---

## Context Links

- **Main Plan:** [plan.md](./plan.md)
- **Phase 1:** [phase-01-database-schema-service.md](./phase-01-database-schema-service.md)
- **Current Menu Data:** [src/components/header/header-nav-data.ts](../../src/components/header/header-nav-data.ts)
- **Research:** [plans/reports/implementation-quick-reference.md](../../plans/reports/implementation-quick-reference.md)

---

## Key Insights

**Astro SSG Pattern:**
```typescript
// Top-level await in .astro components
const menu = await buildMenuStructure();
// Data fetched once during build, baked into HTML
```

**Build-time execution:**
- Runs during `npm run build`
- Data fetched once per build
- Results cached in static HTML
- No runtime database queries

---

## Implementation Steps

### Step 1: Create Menu Data Module (1 hour)
**File:** `src/data/menu-data.ts`

```typescript
import { buildMenuStructure } from '@/services/menu-service';
import type { NavItem } from '@/types/menu';

// Fallback menu if database fails
const FALLBACK_MENU: NavItem[] = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Mua bán', href: '/mua-ban', children: [] },
  { label: 'Cho thuê', href: '/cho-thue', children: [] },
  { label: 'Dự án', href: '/du-an', children: [] },
  { label: 'Tin tức', href: '/tin-tuc', children: [] },
  { label: 'Liên hệ', href: '/lien-he' },
  { label: 'Mạng lưới', href: '/mang-luoi' },
  { label: 'Tiện ích', href: '/tien-ich' }
];

/**
 * Fetch menu at build time with fallback
 */
export async function getMainNavItems(): Promise<NavItem[]> {
  try {
    console.log('[Menu Data] Fetching menu from database...');
    const structure = await buildMenuStructure();
    console.log('[Menu Data] Menu fetched successfully');
    return structure.main;
  } catch (error) {
    console.error('[Menu Data] Failed to fetch menu, using fallback:', error);
    return FALLBACK_MENU;
  }
}
```

---

### Step 2: Update Astro Config (30 minutes)
**File:** `astro.config.mjs`

Ensure database connection works during build:

```javascript
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');

export default defineConfig({
  // ... existing config
  vite: {
    define: {
      'process.env.DATABASE_URL': JSON.stringify(env.DATABASE_URL)
    }
  }
});
```

---

### Step 3: Test Build Cycle (1 hour)

```bash
# 1. Test database connection
npm run astro check

# 2. Test menu service directly
node -e "
  import('./src/services/menu-service.ts').then(m =>
    m.buildMenuStructure().then(console.log)
  )
"

# 3. Run full build
npm run build

# 4. Check build logs for menu fetching
# Should see: [Menu Service] Building menu structure...
#             [Menu Data] Menu fetched successfully

# 5. Verify static HTML includes menu
grep -r "Căn hộ chung cư" dist/index.html
```

---

## Todo List

- [ ] Create `src/data/menu-data.ts` with getMainNavItems()
- [ ] Add fallback menu for error cases
- [ ] Update `astro.config.mjs` for DATABASE_URL
- [ ] Test build with database available
- [ ] Test build with database unavailable (verify fallback)
- [ ] Verify menu data in built HTML
- [ ] Measure build time increase

---

## Success Criteria

- ✅ Build completes successfully
- ✅ Menu data fetched from database
- ✅ Fallback menu used if database fails
- ✅ Build time increase <30 seconds
- ✅ Static HTML contains dynamic menu items

---

## Next Steps

**Phase 3:** Update header components to consume new menu data
