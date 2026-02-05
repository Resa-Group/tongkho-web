# Phase 3: Migrate Property Service

## Context

- **Parent Plan:** [plan.md](./plan.md)
- **Depends On:** [Phase 2](./phase-02-define-schema.md)
- **Research:** [Drizzle Patterns](./research/researcher-01-drizzle-patterns.md)

## Overview

| Field | Value |
|-------|-------|
| Priority | P1 |
| Status | completed |
| Effort | 45 minutes |

Migrate `PostgresPropertyService` from raw SQL to Drizzle ORM queries.

## Requirements

### Queries to Migrate

1. **getPropertyBySlug(slug)** - SELECT with WHERE slug = $1 AND aactive = true
2. **getRelatedProperties(excludeId, propertyTypeId, limit)** - SELECT with multiple WHERE conditions, ORDER BY, LIMIT

### Preserve

- Existing `Property` interface as return type
- `mapToProperty()` transformation logic
- Helper methods (`parsePriceDescription`, `extractFeatures`, etc.)
- Singleton export pattern

## Related Code Files

**Modify:**
- `src/services/postgres-property-service.ts`

**Import From:**
- `src/db/index.ts` - db instance
- `src/db/schema/real-estate.ts` - realEstate table

## Implementation Steps

### 1. Update Imports

```typescript
// Remove
import pg from "pg";
const { Pool } = pg;

// Add
import { db } from "@/db";
import { realEstate } from "@/db/schema";
import { eq, and, ne, desc } from "drizzle-orm";
```

### 2. Refactor Class

```typescript
export class PostgresPropertyService {
  // Remove pool property and initPool() method

  async getPropertyBySlug(slug: string): Promise<Property | null> {
    const result = await db
      .select()
      .from(realEstate)
      .where(
        and(
          eq(realEstate.slug, slug),
          eq(realEstate.aactive, true)
        )
      )
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    return this.mapToProperty(result[0]);
  }

  async getRelatedProperties(
    excludeId: string,
    propertyTypeId: number,
    limit: number = 4
  ): Promise<Property[]> {
    const result = await db
      .select()
      .from(realEstate)
      .where(
        and(
          ne(realEstate.id, Number(excludeId)),
          eq(realEstate.propertyTypeId, propertyTypeId),
          eq(realEstate.aactive, true)
        )
      )
      .orderBy(desc(realEstate.createdOn))
      .limit(limit);

    return result.map((row) => this.mapToProperty(row));
  }

  // Keep mapToProperty() but update parameter type
  private mapToProperty(row: typeof realEstate.$inferSelect): Property {
    // ... existing transformation logic (unchanged)
  }

  // Remove close() method - not needed with postgres-js
}
```

### 3. Update mapToProperty Parameter Type

Change from `DBPropertyRow` to `typeof realEstate.$inferSelect` or create type alias:

```typescript
import type { RealEstateRow } from "@/db/schema";

private mapToProperty(row: RealEstateRow): Property {
  // Access fields using camelCase (Drizzle auto-maps)
  let images: string[] = [];
  try {
    const rawImages = JSON.parse(row.images || "[]") as string[];
    images = rawImages.map((img) => this.getFullImageUrl(img));
  } catch {
    images = [];
  }
  // ... rest unchanged
}
```

### 4. Remove Unused Code

- Delete `DBPropertyRow` interface (replaced by schema type)
- Delete `pool` property
- Delete `initPool()` method
- Delete `close()` method

## Todo List

- [x] Update imports (remove pg, add drizzle)
- [x] Refactor getPropertyBySlug() to use Drizzle query
- [x] Refactor getRelatedProperties() to use Drizzle query
- [x] Update mapToProperty() parameter type
- [x] Remove DBPropertyRow interface
- [x] Remove pool initialization code
- [x] Remove close() method
- [x] Verify existing Property interface unchanged
- [x] Converted from class to pure functions

## Success Criteria

- [x] No raw SQL in postgres-property-service.ts
- [x] No pg imports
- [x] Uses RealEstateRow type from schema
- [x] Pure functions exported (not class)
- [x] Legacy singleton export for backward compatibility
- [x] No TypeScript errors in property service
- [x] Drizzle queries use proper operators (eq, and, ne, desc)

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Field name mismatch (snake_case vs camelCase) | Drizzle schema uses camelCase in TS |
| Numeric type handling | Cast to Number() where needed |
| null vs undefined | Use nullish coalescing (??) |

## Next Steps

Proceed to [Phase 4: Migrate News/Project Service](./phase-04-migrate-news-project-service.md)
