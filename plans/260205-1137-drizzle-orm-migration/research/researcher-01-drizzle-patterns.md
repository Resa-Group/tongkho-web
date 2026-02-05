# Drizzle ORM PostgreSQL Migration Research
**Date:** 2025-02-05 | **Focus:** Setup, Schema Definition, Query Patterns, Migration Strategies

---

## 1. Drizzle ORM Setup for Astro/Node.js

### Installation Packages
```bash
# Core packages
npm install drizzle-orm postgres
npm install -D drizzle-kit @types/node
```

**Key Packages:**
- `drizzle-orm`: Main ORM library (7.4kb gzipped, 0 dependencies)
- `postgres` or `pg`: PostgreSQL drivers
- `drizzle-kit`: CLI for migrations, introspection, schema management

### drizzle.config.ts Configuration
```typescript
// drizzle.config.ts
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/dbname',
  },
});
```

### Database Connection Setup
**Using postgres-js (recommended for performance):**
```typescript
// src/db/index.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema });
```

**Using node-postgres (pg):**
```typescript
import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });
```

---

## 2. Schema Definition Patterns

### Basic pgTable with Common Columns
```typescript
// src/db/schema.ts
import { pgTable, serial, varchar, text, boolean, timestamp, jsonb, numeric } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).unique(),
  content: text('content'),

  // JSON/JSONB columns
  metadata: jsonb('metadata').$type<{ tags: string[]; author: string }>(),

  // Boolean with soft delete pattern
  isDeleted: boolean('is_deleted').default(false),
  isDraft: boolean('is_draft').default(true),

  // Timestamps with defaults
  createdOn: timestamp('created_on').default(sql`NOW()`).notNull(),
  publishOn: timestamp('publish_on'),
  updatedAt: timestamp('updated_at').default(sql`NOW()`).notNull(),

  // Nullable columns
  description: varchar('description', { length: 500 }),
  price: numeric('price', { precision: 10, scale: 2 }),
});
```

### Reusable Column Patterns
```typescript
export const timestamps = {
  createdOn: timestamp('created_on').default(sql`NOW()`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`NOW()`).notNull(),
};

export const softDelete = {
  isDeleted: boolean('is_deleted').default(false),
};

// Usage in multiple tables
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  ...timestamps,
  ...softDelete,
});
```

### Column Naming with Aliases
```typescript
// Map camelCase to snake_case automatically
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  firstName: varchar('first_name', { length: 100 }), // auto-converted
  lastName: varchar('last_name', { length: 100 }),
}, (table) => ({
  uniqueEmail: unique().on(table.email),
}));

// In drizzle.config.ts enable:
// casing: 'snake_case' // auto-converts camelCase → snake_case
```

---

## 3. Query Patterns: Type-Safe Operations

### SELECT with Filtering
```typescript
// Simple WHERE with eq()
const userByName = await db.select()
  .from(users)
  .where(eq(users.name, 'John'));

// Multiple conditions with and()
import { and, or, eq, ne, gt, lt, ilike } from 'drizzle-orm';

const results = await db.select()
  .from(posts)
  .where(
    and(
      eq(posts.isDraft, false),
      eq(posts.isDeleted, false),
      gte(posts.publishOn, new Date())
    )
  );
```

### ORDER BY, LIMIT, OFFSET
```typescript
const paginated = await db.select()
  .from(posts)
  .where(eq(posts.isDeleted, false))
  .orderBy(desc(posts.createdOn), asc(posts.title))
  .limit(10)
  .offset(20);
```

### Complex Queries with sql Template
```typescript
import { sql } from 'drizzle-orm';

// Raw SQL for complex logic
const searched = await db.select()
  .from(posts)
  .where(
    sql`search_vector @@ plainto_tsquery('english', ${searchTerm})`
  );

// Use sql for computed fields
const withCount = await db.select({
  id: posts.id,
  title: posts.title,
  commentCount: sql`(SELECT COUNT(*) FROM comments WHERE post_id = ${posts.id})`,
})
.from(posts);
```

### Type-Safe Query Results
```typescript
// Inferred types from schema
type Post = typeof posts.$inferSelect; // Full row type
type NewPost = typeof posts.$inferInsert; // For INSERT

const allPosts: Post[] = await db.select().from(posts);
const newPost: NewPost = { title: 'Hello', slug: 'hello' };
```

---

## 4. Migration from Raw SQL: Database Introspection

### Using drizzle-kit pull
```bash
# Introspect existing database and generate TypeScript schema
npx drizzle-kit pull

# Output: src/db/schema.ts (auto-generated from actual DB)
```

**Generated schema includes:**
- All tables with accurate column types
- Constraints, defaults, and indexes
- Relations between tables (if applicable)

### Gradual Migration Strategy
```
Step 1: Run drizzle-kit pull → Get baseline schema.ts
Step 2: Verify generated types match your data model
Step 3: Create new migrations with drizzle-kit generate
Step 4: Test migrations on staging database
Step 5: Apply migrations with drizzle-kit migrate
```

### Migration Commands
```bash
# Generate migration files from schema changes
npx drizzle-kit generate

# Apply migrations to database
npx drizzle-kit migrate

# Direct push (no SQL files, good for dev)
npx drizzle-kit push

# For version-controlled migrations (production)
npx drizzle-kit generate && npx drizzle-kit migrate
```

---

## Key Insights

1. **Zero Dependencies**: At 7.4kb gzipped, Drizzle is ideal for edge/serverless environments
2. **SQL-First Philosophy**: Not an abstraction layer—writes 1:1 SQL queries you'd write manually
3. **TypeScript Native**: Full type inference from schema definitions; compile-time safety
4. **Flexible Migration**: Database-first (pull) or codebase-first (generate); gradual adoption possible
5. **PostgreSQL-Specific Features**: JSONB, arrays, custom types, full-text search via `sql` template
6. **Soft Delete Pattern**: Use boolean columns + WHERE filters for non-destructive deletes
7. **Timestamp Automation**: Use `default(sql\`NOW()\`)` for server-side defaults

---

## Best Practices for Astro Integration

1. **Use postgres-js driver**: Superior performance for async operations in edge/serverless
2. **Organize schema by domain**: One file per logical entity (users.ts, posts.ts, products.ts)
3. **Export all tables**: Drizzle-kit requires all models exported for proper migration generation
4. **Version control migrations**: Use `drizzle-kit generate` → commit SQL files → run `migrate` in CI
5. **Leverage sql template**: Complex queries (search, aggregations, CTEs) use raw SQL via `sql\`\``
6. **Type consistency**: Use `$inferSelect`/`$inferInsert` for query result types

---

**Unresolved Questions:**
- Specific transaction handling patterns in Astro (server actions vs API routes)
- Integration with existing raw SQL queries during migration phase
- Performance benchmarks: drizzle-orm vs raw postgres-js in your schema
