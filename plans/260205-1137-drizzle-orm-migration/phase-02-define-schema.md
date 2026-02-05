# Phase 2: Define Database Schema

## Context

- **Parent Plan:** [plan.md](./plan.md)
- **Depends On:** [Phase 1](./phase-01-setup-drizzle.md)
- **Research:** [Drizzle Patterns](./research/researcher-01-drizzle-patterns.md)

## Overview

| Field | Value |
|-------|-------|
| Priority | P1 |
| Status | completed |
| Effort | 45 minutes |

Define Drizzle schema for 3 tables matching existing PostgreSQL database.

## Requirements

### Tables to Define

1. **real_estate** - Property listings
2. **news** - News articles
3. **project** - Real estate projects

### Column Types Mapping

| PostgreSQL | Drizzle |
|------------|---------|
| SERIAL | serial() |
| VARCHAR(n) | varchar({ length: n }) |
| TEXT | text() |
| BOOLEAN | boolean() |
| TIMESTAMP | timestamp() |
| NUMERIC | numeric() |
| INTEGER | integer() |
| JSONB | jsonb() |

## Architecture

```
src/db/schema/
├── index.ts              # Re-export all schemas
├── real-estate.ts        # real_estate table
├── news.ts               # news table
└── project.ts            # project table
```

## Related Code Files

**Create:**
- `src/db/schema/real-estate.ts`
- `src/db/schema/news.ts`
- `src/db/schema/project.ts`

**Modify:**
- `src/db/schema/index.ts` - Add exports

**Reference (existing columns):**
- `src/services/postgres-property-service.ts:25-57` - DBPropertyRow
- `src/services/postgres-news-project-service.ts:15-46` - DBNewsRow, DBProjectRow

## Implementation Steps

### 1. Create `src/db/schema/real-estate.ts`

```typescript
import { pgTable, serial, varchar, text, boolean, timestamp, integer, numeric, jsonb } from 'drizzle-orm/pg-core';

export const realEstate = pgTable('real_estate', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 500 }),
  slug: varchar('slug', { length: 500 }),
  propertyTypeId: integer('property_type_id'),
  propertyType: varchar('property_type', { length: 100 }),
  transactionType: integer('transaction_type'),
  price: varchar('price', { length: 100 }),
  priceDescription: varchar('price_description', { length: 200 }),
  area: numeric('area'),
  bedrooms: integer('bedrooms'),
  bathrooms: integer('bathrooms'),
  city: varchar('city', { length: 100 }),
  district: varchar('district', { length: 100 }),
  streetAddress: varchar('street_address', { length: 500 }),
  description: text('description'),
  htmlContent: text('html_content'),
  images: text('images'), // JSON string
  mainImage: varchar('main_image', { length: 500 }),
  isFeatured: boolean('is_featured').default(false),
  isVerified: boolean('is_verified').default(false),
  createdOn: timestamp('created_on'),
  createdTime: timestamp('created_time'),
  dataJson: jsonb('data_json'),
  contactName: varchar('contact_name', { length: 200 }),
  contactPhone: varchar('contact_phone', { length: 50 }),
  contactEmail: varchar('contact_email', { length: 200 }),
  furniture: varchar('furniture', { length: 200 }),
  floors: integer('floors'),
  houseDirection: varchar('house_direction', { length: 50 }),
  frontageWidth: numeric('frontage_width'),
  roadWidth: numeric('road_width'),
  aactive: boolean('aactive').default(true), // Soft delete
});

export type RealEstateRow = typeof realEstate.$inferSelect;
```

### 2. Create `src/db/schema/news.ts`

```typescript
import { pgTable, serial, varchar, text, boolean, timestamp, integer } from 'drizzle-orm/pg-core';

export const news = pgTable('news', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 500 }),
  description: text('description'),
  htmlcontent: text('htmlcontent'),
  avatar: varchar('avatar', { length: 500 }),
  folder: integer('folder'),
  publishOn: timestamp('publish_on'),
  createdOn: timestamp('created_on'),
  displayOrder: integer('display_order'),
  aactive: boolean('aactive').default(true),
});

export type NewsRow = typeof news.$inferSelect;
```

### 3. Create `src/db/schema/project.ts`

```typescript
import { pgTable, serial, varchar, text, boolean, timestamp, integer, numeric } from 'drizzle-orm/pg-core';

export const project = pgTable('project', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 500 }),
  projectName: varchar('project_name', { length: 500 }),
  description: text('description'),
  projectStatus: varchar('project_status', { length: 100 }),
  developerName: varchar('developer_name', { length: 200 }),
  totalUnits: integer('total_units'),
  totalTowers: integer('total_towers'),
  city: varchar('city', { length: 100 }),
  district: varchar('district', { length: 100 }),
  streetAddress: varchar('street_address', { length: 500 }),
  mainImage: varchar('main_image', { length: 500 }),
  galleryImages: text('gallery_images'), // JSON string
  isFeatured: boolean('is_featured').default(false),
  createdOn: timestamp('created_on'),
  projectArea: numeric('project_area'),
  utilities: text('utilities'),
  priceDescription: varchar('price_description', { length: 200 }),
  aactive: boolean('aactive').default(true),
  parentId: integer('parent_id'),
});

export type ProjectRow = typeof project.$inferSelect;
```

### 4. Update `src/db/schema/index.ts`

```typescript
export * from './real-estate';
export * from './news';
export * from './project';
```

## Todo List

- [x] Create src/db/schema/real-estate.ts with all columns
- [x] Create src/db/schema/news.ts with all columns
- [x] Create src/db/schema/project.ts with all columns
- [x] Update src/db/schema/index.ts with exports
- [x] Run `npx drizzle-kit pull` to verify schema matches DB
- [x] Verify build passes

## Success Criteria

- [x] All 3 schema files created
- [x] Column names match existing DB (snake_case)
- [x] Type exports available (`RealEstateRow`, `NewsRow`, `ProjectRow`)
- [x] `npm run build` passes

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Column type mismatch | Compare with existing DBRow interfaces |
| Missing columns | Run drizzle-kit pull to verify |

## Next Steps

Proceed to [Phase 3: Migrate Property Service](./phase-03-migrate-property-service.md)
