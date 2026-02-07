# V1 to V2 Migration Strategy & Database Reference

**Document Purpose:** Guide for integrating V1 TongKho & ResaLand architecture patterns into V2 static site
**Version:** 1.0
**Last Updated:** 2026-02-07
**Status:** Planning Phase (Phase 3 Implementation)

---

## Executive Summary

V2 Tongkho-Web is built as a static Astro site but references V1 architecture patterns:
- **V1 Database:** PostgreSQL with 57 tables, soft-delete pattern, hierarchical data
- **V2 Approach:** Selective schema extraction during build time, Drizzle ORM for type safety
- **Migration Path:** Phase 1-2 (menu only) → Phase 3 (real estate core) → Phase 4-5 (financial/office)

---

## Phase 3: Real Estate Core Integration (Target: Q2 2026)

### 1. Property Listings (real_estate table)

**V1 Schema (40+ fields):**
```sql
id: INTEGER PRIMARY KEY
title: VARCHAR(512) NOT NULL
slug: VARCHAR(512) UNIQUE
property_type_id: FK → property_type
status: INTEGER CHECK (1-5)  -- 1=draft, 2=active, 3=sold, 4=rented, 5=inactive
salesman_id: FK → salesman
city_id, district_id, ward_id: FK → locations (hierarchical)
price: NUMERIC
area: FLOAT
bedrooms, bathrooms: INTEGER
description, html_content: TEXT
data: JSON (flexible attributes)
aactive: BOOLEAN DEFAULT TRUE (soft-delete flag)
created_on: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
created_by: FK → auth_user
updated_on: TIMESTAMP (trigger-based update)
```

**V2 Implementation (Drizzle ORM):**
```typescript
// src/db/schema/real-estate.ts
export const realEstate = pgTable('real_estate', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 512 }).notNull(),
  slug: varchar('slug', { length: 512 }).unique(),
  propertyTypeId: integer('property_type_id'),
  status: integer('status').default(2), // 1-5 enum
  salesmanId: integer('salesman_id'),
  cityId: integer('city_id'),
  districtId: integer('district_id'),
  wardId: integer('ward_id'),
  price: numeric('price'),
  area: real('area'),
  bedrooms: integer('bedrooms'),
  bathrooms: integer('bathrooms'),
  description: text('description'),
  htmlContent: text('html_content'),
  data: json('data'), // Flexible attributes
  aactive: boolean('aactive').default(true),
  createdOn: timestamp('created_on').defaultNow(),
  createdBy: integer('created_by'),
  updatedOn: timestamp('updated_on'),
});
```

**Query Service:**
```typescript
// src/services/postgres-property-service.ts
export async function getPropertyDetail(slug: string): Promise<Property | null> {
  const result = await db
    .select()
    .from(realEstate)
    .where(and(
      eq(realEstate.slug, slug),
      eq(realEstate.aactive, true),
      eq(realEstate.status, 2) // ACTIVE only
    ))
    .limit(1);

  return result[0] || null;
}

export async function getPropertiesByCity(
  cityId: number,
  limit: number = 20
): Promise<Property[]> {
  return db
    .select()
    .from(realEstate)
    .where(and(
      eq(realEstate.cityId, cityId),
      eq(realEstate.aactive, true),
      eq(realEstate.status, 2)
    ))
    .orderBy(desc(realEstate.createdOn))
    .limit(limit);
}
```

**V1 to V2 Mapping Notes:**
- V1 real_estate has 40+ fields; V2 initially maps ~15 core fields
- Flexible `data` JSON field stores optional attributes
- Status enum: hardcode 5 values, enforce via CHECK constraint
- Always filter: `aactive=true` AND `status IN (2,3)` for searchable listings

---

### 2. Geographic Hierarchy (locations table)

**V1 Structure (4-level tree):**
```
Level 1: City (Hà Nội, TP.HCM, ...)
  └─ Level 2: District (Ba Đình, Cầu Giấy, ...)
      └─ Level 3: Ward (Quảng An, Láng Thượng, ...)
          └─ Level 4: Street (Trần Hưng Đạo, Tây Sơn, ...)
```

**V1 Schema:**
```sql
id: INTEGER PRIMARY KEY
name: VARCHAR(255) NOT NULL
slug: VARCHAR(255) UNIQUE
level: INTEGER (1-4)
parent_id: FK → self (NULL for root)
aactive: BOOLEAN DEFAULT TRUE
created_on, created_by, updated_on: AUDIT FIELDS
```

**V2 Drizzle Implementation:**
```typescript
export const locations = pgTable('locations', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).unique(),
  level: integer('level'), // 1-4
  parentId: integer('parent_id'),
  aactive: boolean('aactive').default(true),
  createdOn: timestamp('created_on').defaultNow(),
  createdBy: integer('created_by'),
  updatedOn: timestamp('updated_on'),
});

// Recursive query helper
export async function getLocationHierarchy(parentId: number | null = null) {
  const parent = await db
    .select()
    .from(locations)
    .where(and(
      eq(locations.parentId, parentId),
      eq(locations.aactive, true)
    ))
    .orderBy(locations.name);

  // Recursively fetch children (if needed for frontend)
  return Promise.all(parent.map(async (p) => ({
    ...p,
    children: await getLocationHierarchy(p.id),
  })));
}
```

**Elasticsearch Index (locations):**
```typescript
// For autocomplete: Hà Nội autocomplete should return districts + wards
interface LocationDocument {
  id: number;
  name: string;
  slug: string;
  level: number;
  parentId: number | null;
  breadcrumb: string; // "Hà Nội > Ba Đình > Quảng An"
}
```

---

### 3. Real Estate Transactions (real_estate_transaction table)

**Purpose:** Track sales, rentals, consultations; immutable state history

**V1 Schema:**
```sql
id: INTEGER PRIMARY KEY
real_estate_id: FK → real_estate
salesman_id: FK → salesman
transaction_status: INTEGER (1-5)
  1=pending, 2=approved, 3=rejected, 4=in_reconciliation, 5=completed
transaction_type_id: FK → transaction_type (buy/sell, rental, project)
buyer_name, buyer_phone, buyer_email: STRING
amount: NUMERIC (property price)
commission: NUMERIC (calculated from rate_seller)
aactive, created_on, created_by, updated_on: AUDIT FIELDS
```

**V2 Implementation:**
```typescript
export const realEstateTransaction = pgTable('real_estate_transaction', {
  id: serial('id').primaryKey(),
  realEstateId: integer('real_estate_id').notNull(),
  salesmanId: integer('salesman_id'),
  transactionStatus: integer('transaction_status'),
  transactionTypeId: integer('transaction_type_id'),
  buyerName: varchar('buyer_name'),
  buyerPhone: varchar('buyer_phone'),
  buyerEmail: varchar('buyer_email'),
  amount: numeric('amount'),
  commission: numeric('commission'),
  aactive: boolean('aactive').default(true),
  createdOn: timestamp('created_on').defaultNow(),
  createdBy: integer('created_by'),
  updatedOn: timestamp('updated_on'),
});

// Status constants
const TX_STATUS = {
  PENDING: 1,
  APPROVED: 2,
  REJECTED: 3,
  IN_RECONCILIATION: 4,
  COMPLETED: 5,
};
```

**Transaction History (Immutable Audit Log):**
```typescript
export const transactionHistory = pgTable('transaction_history', {
  id: serial('id').primaryKey(),
  realEstateTransactionId: integer('real_estate_transaction_id').notNull(),
  oldStatus: integer('old_status'),
  newStatus: integer('new_status'),
  changeReason: text('change_reason'),
  createdOn: timestamp('created_on').defaultNow(),
  createdBy: integer('created_by'),
});

// Query: never UPDATE or DELETE this table
// Only append new entries
async function logStatusChange(
  transactionId: number,
  oldStatus: number,
  newStatus: number,
  reason: string,
  userId: number
) {
  await db.insert(transactionHistory).values({
    realEstateTransactionId: transactionId,
    oldStatus,
    newStatus,
    changeReason: reason,
    createdBy: userId,
  });
}
```

---

### 4. Projects (project table)

**V1 Schema:**
```sql
id: INTEGER PRIMARY KEY
name: VARCHAR(512) NOT NULL
code: VARCHAR(50) UNIQUE
developer_project_id: FK → developer_project
zone_of_project_id: FK → zone_of_project
status: INTEGER (1-4)
  1=upcoming, 2=selling, 3=sold_out, 4=completed
city_id, district_id, ward_id: FK → locations
parent_id: FK → self (NULL for top-level, self-ref for multi-phase)
aactive, created_on, created_by, updated_on: AUDIT FIELDS
```

**V2 Implementation:**
```typescript
export const project = pgTable('project', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 512 }).notNull(),
  code: varchar('code', { length: 50 }).unique(),
  developerProjectId: integer('developer_project_id'),
  zoneOfProjectId: integer('zone_of_project_id'),
  status: integer('status'), // 1-4 enum
  cityId: integer('city_id'),
  districtId: integer('district_id'),
  wardId: integer('ward_id'),
  parentId: integer('parent_id'), // For multi-phase projects
  aactive: boolean('aactive').default(true),
  createdOn: timestamp('created_on').defaultNow(),
  createdBy: integer('created_by'),
  updatedOn: timestamp('updated_on'),
});

const PROJECT_STATUS = {
  UPCOMING: 1,
  SELLING: 2,
  SOLD_OUT: 3,
  COMPLETED: 4,
};
```

---

## Phase 4: Financial Domain (Deferred to Q3 2026)

**Not needed for V2 static site; commission/withdrawal tracking is V1 admin feature**

Tables to defer:
- dbank, dbank_account (banking setup)
- withdraw (withdrawal requests)
- transaction_reconciliation (batch processing)
- commission calculations (backend job)

---

## Phase 5: Office & Staff System (Deferred to Q3 2026)

**Not needed for V2 public site; office hierarchy is internal admin feature**

Tables to defer:
- post_office (5-level org structure)
- office_staff (employee roster)
- office_department, office_position (team structure)
- office_territory, staff_work_area (geographic scope)

---

## Elasticsearch Integration (Phase 3)

### Property Search Index

**Index Name:** `real_estate`

**Mapping:**
```typescript
interface PropertyDocument {
  id: number;
  slug: string;
  title: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  city_id: number;
  district_id: number;
  ward_id: number;
  status: number;
  aactive: boolean;
  created_time: string; // ISO datetime
  latlng: { lat: number; lon: number }; // geo_point type
  is_featured: boolean;
  images: string[]; // CDN URLs
}
```

**Query Example:**
```typescript
// Search with filters
export async function searchProperties(filters: {
  city?: number;
  type?: number;
  priceMin?: number;
  priceMax?: number;
  areaMin?: number;
  areaMax?: number;
  keyword?: string;
}) {
  const must = [
    { term: { aactive: true } },
    { terms: { status: [2, 3] } }, // active or sold (for reference)
  ];

  if (filters.city) must.push({ term: { city_id: filters.city } });
  if (filters.priceMin || filters.priceMax) {
    must.push({
      range: { price: {
        ...(filters.priceMin && { gte: filters.priceMin }),
        ...(filters.priceMax && { lte: filters.priceMax }),
      }}
    });
  }
  if (filters.keyword) {
    must.push({
      multi_match: {
        query: filters.keyword,
        fields: ['title^2', 'description'],
      }
    });
  }

  return client.search({
    index: 'real_estate',
    body: { query: { bool: { must } } }
  });
}
```

---

## Caching Strategy (V1-Aligned)

### Build-Time Cache (Current)

```typescript
// 1-hour TTL for build stability
const CACHE_TTL = 3600000; // ms

// Phase 3: Extend to property data
export async function getPropertyListCached(
  cityId: number
): Promise<Property[]> {
  const cacheKey = `properties_city_${cityId}`;

  const cached = cache.get(cacheKey);
  if (cached && !isExpired(cached)) {
    console.log(`Cache hit: ${cacheKey}`);
    return cached.data;
  }

  console.log(`Cache miss: ${cacheKey}`);
  const properties = await db
    .select()
    .from(realEstate)
    .where(and(
      eq(realEstate.cityId, cityId),
      eq(realEstate.aactive, true)
    ))
    .limit(50);

  cache.set(cacheKey, {
    data: properties,
    timestamp: Date.now(),
    ttl: CACHE_TTL,
  });

  return properties;
}
```

### Redis Cache (Future - Multi-Server)

```typescript
// Phase 4+: For distributed builds
const redis = createClient({ url: process.env.REDIS_URL });

export async function getPropertyListRedis(cityId: number) {
  const key = `properties:city:${cityId}`;

  try {
    const cached = await redis.get(key);
    if (cached) return JSON.parse(cached);
  } catch (e) {
    console.warn('Redis miss, falling back to DB');
  }

  const properties = await db.select()
    .from(realEstate)
    .where(eq(realEstate.cityId, cityId))
    .limit(50);

  await redis.setex(key, 3600, JSON.stringify(properties)); // 1-hour TTL
  return properties;
}
```

---

## Critical V1 Patterns to Enforce

### 1. Soft-Delete Discipline

**NEVER:**
```typescript
await db.delete(realEstate).where(eq(realEstate.id, id));
```

**ALWAYS:**
```typescript
await db
  .update(realEstate)
  .set({ aactive: false })
  .where(eq(realEstate.id, id));
```

### 2. Status Enum Validation

```typescript
// Enforce valid status codes
const VALID_STATUS = [1, 2, 3, 4, 5] as const;

function validateStatus(status: unknown): status is typeof VALID_STATUS[number] {
  return typeof status === 'number' && VALID_STATUS.includes(status);
}

// In schema:
const propertyStatus = integer('status')
  .default(1)
  .checkColumn(sql`"status" IN (1, 2, 3, 4, 5)`);
```

### 3. Audit Trail Consistency

```typescript
// All inserts must include created_by
const insertProperty = (data: PropertyInput, userId: number) => {
  return db.insert(realEstate).values({
    ...data,
    createdBy: userId,
    createdOn: new Date(),
  });
};

// Update trigger maintains updated_on (database-side)
// Never manually set updated_on in application
```

### 4. Query Filter Requirements

```typescript
// Every query MUST filter by aactive=true
const getActiveProperties = async (filters: any) => {
  // ✅ CORRECT: aactive filter included
  return db
    .select()
    .from(realEstate)
    .where(and(
      eq(realEstate.aactive, true),
      // ... other filters
    ));
};

// ❌ WRONG: Missing aactive filter allows deleted records!
const getBuggyProperties = async () => {
  return db.select().from(realEstate); // NO!
};
```

---

## Data Cleanup & Deprecation Plan

**V1 has 57 tables; V2 will use ~15 core tables**

### Phase 3 (Keep)
- property_type, folder (menu system)
- real_estate, real_estate_transaction, project
- locations (geographic hierarchy)
- consultation (lead tracking)
- auth_user, auth_group, auth_membership (authentication)

### Phase 4-5 (Keep, Not Exposed in Frontend)
- post_office, office_staff (internal only)
- dbank, withdraw, transaction_reconciliation (finance backend)

### Deprecate (Archive to cold storage)
- sms_log, rocket_message (legacy messaging)
- Several configuration tables with single rows
- Unused event tracking tables

---

## Migration Checklist (Phase 3)

- [ ] Create Drizzle schema for real_estate table
- [ ] Create Drizzle schema for locations (with recursive queries)
- [ ] Create Drizzle schema for real_estate_transaction
- [ ] Create Drizzle schema for project
- [ ] Write migration files (increment version)
- [ ] Implement getPropertyDetail(slug) service
- [ ] Implement getPropertiesByCity(cityId) service
- [ ] Implement getLocationHierarchy() service
- [ ] Setup Elasticsearch property index
- [ ] Write searchProperties() Elasticsearch service
- [ ] Update Astro pages/bds/[slug].astro to use real data
- [ ] Update pages/index.astro property grid to use real data
- [ ] Implement 1-hour cache for property queries
- [ ] Test soft-delete filter enforcement
- [ ] Add integration tests for all queries
- [ ] Performance benchmark (query latency, cache hit rate)
- [ ] Update README with Phase 3 completion notes

---

## Unresolved Questions

1. **V1 Image URLs:** How are images stored? V1 uses CDN prefix (quanly.tongkhobds.com)?
2. **Property Photos:** real_estate table has no photo_id FK; how are images tracked?
3. **Custom Fields:** real_estate.data JSON field structure – no schema validation?
4. **Salesman Identity:** V1 has both salesman table and auth_user; consolidation roadmap?
5. **SEO Metadata:** seo_meta_data table uses generic entity_type/entity_id; performance impact?

---

**Last Updated:** 2026-02-07
**Next Review:** Before Phase 3 implementation (Q2 2026)
