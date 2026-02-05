# Phase 4: Migrate News/Project Service

## Context

- **Parent Plan:** [plan.md](./plan.md)
- **Depends On:** [Phase 3](./phase-03-migrate-property-service.md)

## Overview

| Field | Value |
|-------|-------|
| Priority | P1 |
| Status | pending |
| Effort | 45 minutes |

Migrate `PostgresNewsProjectService` from raw SQL to Drizzle ORM queries.

## Requirements

### Queries to Migrate

1. **getNewsBySlug(slug)** - SELECT with folder IN array filter
2. **getLatestNews(limit)** - SELECT with ORDER BY, LIMIT
3. **getFeaturedProjects(limit)** - SELECT with is_featured filter + fallback query

### Special Handling

- `folder = ANY($1)` → Drizzle `inArray()` operator
- `ORDER BY publish_on DESC NULLS LAST` → Custom SQL or `desc()` with null handling
- Fallback query pattern in getFeaturedProjects()

## Related Code Files

**Modify:**
- `src/services/postgres-news-project-service.ts`

**Import From:**
- `src/db/index.ts` - db instance
- `src/db/schema/news.ts` - news table
- `src/db/schema/project.ts` - project table

## Implementation Steps

### 1. Update Imports

```typescript
// Remove
import pg from "pg";
const { Pool } = pg;

// Add
import { db } from "@/db";
import { news, project } from "@/db/schema";
import { eq, and, ne, desc, inArray, isNull, isNotNull } from "drizzle-orm";
import { sql } from "drizzle-orm";
```

### 2. Refactor getNewsBySlug()

```typescript
async getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  const result = await db
    .select()
    .from(news)
    .where(
      and(
        eq(news.aactive, true),
        inArray(news.folder, this.NEWS_FOLDERS),
        isNotNull(news.avatar),
        ne(news.avatar, '')
      )
    )
    .orderBy(sql`${news.publishOn} DESC NULLS LAST`);

  // Find article by generated slug
  const matchingRow = result.find(
    (row) => generateSlug(row.name || '') === slug
  );

  if (!matchingRow) {
    return null;
  }

  return this.mapToNewsArticle(matchingRow);
}
```

### 3. Refactor getLatestNews()

```typescript
async getLatestNews(limit: number = 8): Promise<NewsArticle[]> {
  const result = await db
    .select()
    .from(news)
    .where(
      and(
        eq(news.aactive, true),
        inArray(news.folder, this.NEWS_FOLDERS),
        isNotNull(news.avatar),
        ne(news.avatar, '')
      )
    )
    .orderBy(sql`${news.publishOn} DESC NULLS LAST`, desc(news.id))
    .limit(limit);

  return result.map((row) => this.mapToNewsArticle(row));
}
```

### 4. Refactor getFeaturedProjects()

```typescript
async getFeaturedProjects(limit: number = 5): Promise<Project[]> {
  // Try featured first
  let result = await db
    .select()
    .from(project)
    .where(
      and(
        eq(project.aactive, true),
        eq(project.isFeatured, true),
        isNull(project.parentId)
      )
    )
    .orderBy(desc(project.createdOn))
    .limit(limit);

  // Fallback to any active projects if no featured
  if (result.length === 0) {
    result = await db
      .select()
      .from(project)
      .where(
        and(
          eq(project.aactive, true),
          isNull(project.parentId)
        )
      )
      .orderBy(desc(project.createdOn))
      .limit(limit);
  }

  return result.map((row) => this.mapToProject(row));
}
```

### 5. Update Mapper Types

```typescript
import type { NewsRow, ProjectRow } from "@/db/schema";

private mapToNewsArticle(row: NewsRow): NewsArticle {
  // ... existing logic unchanged
}

private mapToProject(row: ProjectRow): Project {
  // ... existing logic unchanged
}
```

### 6. Remove Unused Code

- Delete `DBNewsRow` interface
- Delete `DBProjectRow` interface
- Delete `pool` property
- Delete `initPool()` method
- Delete `close()` method

## Todo List

- [ ] Update imports (remove pg, add drizzle)
- [ ] Refactor getNewsBySlug() with inArray and NULLS LAST
- [ ] Refactor getLatestNews() with Drizzle query
- [ ] Refactor getFeaturedProjects() with fallback logic
- [ ] Update mapper method parameter types
- [ ] Remove DB interface definitions
- [ ] Remove pool/close code
- [ ] Test news page and homepage sections

## Success Criteria

- [ ] No raw SQL in postgres-news-project-service.ts
- [ ] News articles load correctly
- [ ] Featured projects display on homepage
- [ ] No TypeScript errors
- [ ] `npm run build` passes

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| NULLS LAST not directly supported | Use sql`` template |
| inArray() type safety | Ensure NEWS_FOLDERS is typed array |

## Next Steps

Proceed to [Phase 5: Cleanup & Validation](./phase-05-cleanup-validation.md)
