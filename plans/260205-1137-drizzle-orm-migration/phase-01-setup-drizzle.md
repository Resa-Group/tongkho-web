# Phase 1: Setup Drizzle ORM

## Context

- **Parent Plan:** [plan.md](./plan.md)
- **Research:** [Drizzle Patterns](./research/researcher-01-drizzle-patterns.md)

## Overview

| Field | Value |
|-------|-------|
| Priority | P1 - Required first |
| Status | completed |
| Effort | 30 minutes |

Install Drizzle ORM packages and configure for PostgreSQL with Astro.

## Requirements

### Functional
- Install drizzle-orm and postgres driver
- Configure drizzle.config.ts for schema introspection
- Create database connection module

### Non-Functional
- Zero breaking changes to existing code
- Support both `import.meta.env` and `process.env` for DATABASE_URL

## Architecture

```
src/
└── db/
    ├── index.ts          # Database connection export
    └── schema/           # Table schemas (created in Phase 2)
        └── index.ts      # Re-export all schemas

drizzle.config.ts         # Drizzle-kit configuration
```

## Related Code Files

**Create:**
- `src/db/index.ts`
- `src/db/schema/index.ts`
- `drizzle.config.ts`

**Modify:**
- `package.json` - Add dependencies

## Implementation Steps

1. Install packages:
   ```bash
   npm install drizzle-orm postgres
   npm install -D drizzle-kit
   ```

2. Create `drizzle.config.ts`:
   ```typescript
   import { defineConfig } from 'drizzle-kit';

   export default defineConfig({
     dialect: 'postgresql',
     schema: './src/db/schema/index.ts',
     out: './src/db/migrations',
     dbCredentials: {
       url: process.env.DATABASE_URL!,
     },
   });
   ```

3. Create `src/db/index.ts`:
   ```typescript
   import { drizzle } from 'drizzle-orm/postgres-js';
   import postgres from 'postgres';
   import * as schema from './schema';

   const connectionString = import.meta.env.DATABASE_URL || process.env.DATABASE_URL;

   if (!connectionString) {
     throw new Error('[DB] DATABASE_URL not configured');
   }

   const client = postgres(connectionString, { max: 10 });
   export const db = drizzle(client, { schema });
   ```

4. Create placeholder `src/db/schema/index.ts`:
   ```typescript
   // Schema exports will be added in Phase 2
   export {};
   ```

## Todo List

- [x] Install drizzle-orm, postgres, drizzle-kit packages
- [x] Create drizzle.config.ts
- [x] Create src/db/index.ts with connection
- [x] Create src/db/schema/index.ts placeholder
- [x] Verify build passes with `npm run build`

## Success Criteria

- [x] `npm run build` passes without errors
- [x] Drizzle packages installed in package.json
- [x] Database connection module created
- [x] No changes to existing service files yet

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| postgres-js vs pg driver conflict | Keep pg until full migration, then remove |
| ESM/CJS compatibility | Use .ts extension, Astro handles transpilation |

## Next Steps

Proceed to [Phase 2: Define Schema](./phase-02-define-schema.md)
