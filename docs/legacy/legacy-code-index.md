# Legacy Code Reference Index

## Overview
This document maps features and business logic from legacy V1 systems (Resaland V1 & Tongkho V1) to the new web application.

**Purpose:**
- Quick reference for finding V1 implementation patterns
- Track migration progress from V1 to V2
- Document business logic extracted from legacy systems
- Prevent re-inventing solutions that already exist

---

## Quick Reference Table

| Feature | New Location | Old Location (V1) | Status | Priority |
|---------|-------------|-------------------|--------|----------|
| Authentication | TBD | `resaland_v1/src/modules/auth/` | Not Started | High |
| Product Management | TBD | `tongkho_v1/src/modules/products/` | Not Started | High |
| Inventory Tracking | TBD | `tongkho_v1/src/modules/inventory/` | Not Started | High |
| Property Listings | TBD | `resaland_v1/src/modules/properties/` | Not Started | Medium |
| User Management | TBD | `resaland_v1/src/modules/users/` | Not Started | High |
| Reports & Analytics | TBD | Both systems | Not Started | Medium |

---

## Resaland V1 Features

### 1. Authentication & Authorization
- **V1 Location:** `reference/resaland_v1/src/modules/auth/`
- **Key Files:** [To be documented after scouting]
- **Business Logic:**
  - JWT-based authentication
  - Role-based access control (Admin, Agent, Customer)
  - Session management
  - Password reset flow
- **Migration Status:** Not started
- **New Implementation:** TBD
- **Notes:** Consider upgrading to more modern auth patterns

### 2. Property Management
- **V1 Location:** `reference/resaland_v1/src/modules/properties/`
- **Key Files:** [To be documented after scouting]
- **Business Logic:**
  - Property listing CRUD
  - Property status workflow (Available, Reserved, Sold)
  - Property search with filters
  - Image gallery management
- **Migration Status:** Not started
- **New Implementation:** TBD

### 3. Agent Management
- **V1 Location:** `reference/resaland_v1/src/modules/agents/`
- **Key Files:** [To be documented after scouting]
- **Business Logic:**
  - Agent profiles
  - Commission tracking
  - Performance metrics
- **Migration Status:** Not started
- **New Implementation:** TBD

---

## Tongkho V1 Features

### 1. Inventory Management (Tồn kho)
- **V1 Location:** `reference/tongkho_v1/src/modules/inventory/`
- **Key Files:** [To be documented after scouting]
- **Business Logic:**
  - Real-time stock tracking
  - Multi-warehouse support
  - Stock level alerts (low stock, out of stock)
  - Inventory valuation (FIFO method - to be confirmed)
  - Stock adjustments (manual corrections)
- **Migration Status:** Not started
- **New Implementation:** TBD
- **Complexity:** High (complex state management)
- **Notes:** Critical business logic - needs careful migration

### 2. Import/Export Transactions
- **V1 Location:** `reference/tongkho_v1/src/modules/transactions/`
- **Key Files:** [To be documented after scouting]
- **Business Logic:**
  - Import orders (purchase from suppliers)
  - Export orders (sales to customers)
  - Transaction history & audit trail
  - Stock movement tracking
- **Migration Status:** Not started
- **New Implementation:** TBD

### 3. Product Management
- **V1 Location:** `reference/tongkho_v1/src/modules/products/`
- **Key Files:** [To be documented after scouting]
- **Business Logic:**
  - Product catalog
  - Product categories & variants
  - Barcode/SKU management
  - Product pricing
- **Migration Status:** Not started
- **New Implementation:** TBD

### 4. Warehouse Management
- **V1 Location:** `reference/tongkho_v1/src/modules/warehouses/`
- **Key Files:** [To be documented after scouting]
- **Business Logic:**
  - Multiple warehouse locations
  - Stock transfers between warehouses
  - Warehouse capacity management
- **Migration Status:** Not started
- **New Implementation:** TBD

---

## Common Patterns

### Database Patterns
- **ORM/Query Builder:** [To be documented]
- **Migration Strategy:** [To be documented]
- **Connection Pooling:** [To be documented]

### API Patterns
- **REST API Structure:** [To be documented]
- **Error Handling:** [To be documented]
- **Request Validation:** [To be documented]

### State Management
- **Client State:** [To be documented]
- **Server State:** [To be documented]
- **Caching Strategy:** [To be documented]

---

## Migration Strategy

### Phase 1: Documentation (Current Phase)
- [x] Create reference directory structure
- [x] Create README files for legacy codebases
- [ ] Scout Resaland V1 for detailed feature mapping
- [ ] Scout Tongkho V1 for detailed feature mapping
- [ ] Document key business logic patterns
- [ ] Create detailed feature documentation

### Phase 2: Architecture Planning
- [ ] Design V2 database schema (combining both systems)
- [ ] Design V2 API structure
- [ ] Choose technology stack for V2
- [ ] Define feature priorities for migration

### Phase 3: Core Features Migration
- [ ] Authentication & Authorization
- [ ] User Management
- [ ] Product Management (from Tongkho)
- [ ] Property Management (from Resaland - if applicable)

### Phase 4: Advanced Features
- [ ] Inventory tracking system
- [ ] Transaction management
- [ ] Reports & Analytics
- [ ] Multi-warehouse support

---

## How to Use This Index

### When Implementing a New Feature:
1. **Check this index** - Look for similar V1 features
2. **Read detailed docs** - Check `resaland-v1-features.md` or `tongkho-v1-features.md`
3. **Search V1 code** - Use Grep/Glob to explore V1 implementation
4. **Analyze business logic** - Understand V1 approach
5. **Design V2 solution** - Improve on V1, don't just copy
6. **Update this index** - Mark feature as "In Progress" or "Completed"

### Search Examples:
```bash
# Find authentication logic in Resaland V1
pattern: "auth|login|jwt", path: "./reference/resaland_v1/"

# Find inventory tracking in Tongkho V1
pattern: "inventory|stock|warehouse", path: "./reference/tongkho_v1/"

# Find database models
pattern: "model|schema|entity", path: "./reference/"
```

---

## Key Learnings from V1

### What Worked Well:
- [To be documented during analysis]

### What Needs Improvement:
- [To be documented during analysis]

### Security Considerations:
- [Document any security issues found in V1]
- [Document security improvements for V2]

---

## Questions to Resolve

1. Which features from Resaland V1 are needed in the new system?
2. Which features from Tongkho V1 are needed in the new system?
3. How do we combine real estate + inventory features?
4. What's the primary business model for V2?
5. Are we migrating data from V1 databases?

---

## References
- Resaland V1 README: `reference/resaland_v1/README.md`
- Tongkho V1 README: `reference/tongkho_v1/README.md`
- Detailed Resaland Features: `docs/legacy/resaland-v1-features.md`
- Detailed Tongkho Features: `docs/legacy/tongkho-v1-features.md`
