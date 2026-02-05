# Phase 5: Cleanup & Validation

## Context

- **Parent Plan:** [plan.md](./plan.md)
- **Depends On:** [Phase 4](./phase-04-migrate-news-project-service.md)

## Overview

| Field | Value |
|-------|-------|
| Priority | P2 |
| Status | completed |
| Effort | 15 minutes |

Remove `pg` dependency, clean up code, and validate full migration.

## Requirements

### Cleanup Tasks

1. Remove `pg` package from dependencies
2. Delete any unused imports
3. Update TypeScript path aliases if needed
4. Verify all pages work correctly

### Validation Tasks

1. Build project successfully
2. Test all database-dependent pages
3. Verify no runtime errors in dev mode

## Related Code Files

**Modify:**
- `package.json` - Remove pg dependency

**Verify:**
- `src/services/postgres-property-service.ts` - No pg imports
- `src/services/postgres-news-project-service.ts` - No pg imports
- `src/db/index.ts` - Using postgres-js

## Implementation Steps

### 1. Remove pg Package

```bash
npm uninstall pg @types/pg
```

### 2. Verify No pg References

Search codebase for any remaining `pg` imports:
```bash
grep -r "from 'pg'" src/
grep -r "from \"pg\"" src/
```

### 3. Update tsconfig (if needed)

Ensure path alias works for db:
```json
{
  "compilerOptions": {
    "paths": {
      "@/db/*": ["src/db/*"]
    }
  }
}
```

### 4. Full Build Test

```bash
npm run build
```

### 5. Runtime Validation

Start dev server and test pages:
```bash
npm run dev
```

**Pages to Test:**
- [ ] Homepage (`/`) - Featured projects, latest news
- [ ] Property detail (`/bat-dong-san/[slug]`) - Property data, related properties
- [ ] News detail (`/tin-tuc/[slug]`) - News article content

## Todo List

- [ ] Uninstall pg and @types/pg packages
- [ ] Search for any remaining pg imports
- [ ] Verify tsconfig path aliases
- [ ] Run npm run build
- [ ] Test homepage sections
- [ ] Test property detail page
- [ ] Test news detail page
- [ ] Verify no console errors

## Success Criteria

- [ ] `pg` removed from package.json
- [ ] No references to `pg` in codebase
- [ ] `npm run build` passes
- [ ] All database pages render correctly
- [ ] No runtime errors in browser console

## Final Checklist

### Before Migration
- 2 service files with raw SQL (~600 LOC)
- `pg` library for database connection
- Manual type definitions (DBPropertyRow, etc.)

### After Migration
- [ ] 3 schema files with Drizzle definitions
- [ ] 2 service files using Drizzle queries
- [ ] `postgres` (postgres-js) for connection
- [ ] Auto-inferred types from schema
- [ ] Type-safe queries with compile-time validation

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Breaking existing functionality | Test all pages before marking complete |
| Missing edge cases | Check error handling paths |

## Documentation Updates

After successful migration, update:
- `docs/codebase-summary.md` - Add database layer info
- `docs/system-architecture.md` - Document Drizzle setup

---

**Migration Complete!** 🎉

The codebase now uses Drizzle ORM for all database operations with:
- Type-safe queries
- Auto-generated TypeScript types
- Better developer experience
- Smaller bundle (postgres-js vs pg)
