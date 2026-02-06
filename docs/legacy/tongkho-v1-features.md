# Tongkho V1 - Detailed Feature Documentation

> **Status:** Initial template - needs scouting to populate details
> **Last Updated:** 2026-02-06

---

## System Overview

### Technology Stack
- **Frontend Framework:** [To be documented]
- **Backend Framework:** [To be documented]
- **Database:** [To be documented]
- **Real-time Communication:** [To be documented]
- **Hosting/Deployment:** [To be documented]

### Architecture Overview
[Diagram or description to be added after scouting]

---

## Core Features

### 1. Inventory Management (Quản lý Tồn kho)

#### Files
- [To be documented after scouting]

#### Stock Data Model
```typescript
// To be documented - extract inventory schema/interface
```

#### Features
- Real-time stock level tracking
- Stock adjustments (manual corrections)
- Low stock alerts
- Out of stock notifications
- Stock history & audit trail

#### Business Rules
- **Inventory Valuation Method:** [FIFO/LIFO/WAC - to be confirmed]
- **Stock Update Triggers:** [Document when stock updates occur]
- **Negative Stock Policy:** [Allow/Disallow negative inventory]

#### Key Code Patterns
```typescript
// Example patterns to be extracted
```

---

### 2. Import Transactions (Nhập hàng)

#### Files
- [To be documented after scouting]

#### Import Flow
```
[Document step-by-step import process]
1. Create import order
2. Add products & quantities
3. Calculate costs
4. Update inventory levels
5. Generate receipt
```

#### Features
- Create import orders
- Supplier management
- Cost calculation
- Receipt generation
- Import history

#### Business Rules
- [Document validation rules]
- [Document pricing rules]
- [Document approval workflow if any]

---

### 3. Export Transactions (Xuất hàng)

#### Files
- [To be documented after scouting]

#### Export Flow
```
[Document step-by-step export process]
1. Create export order
2. Check stock availability
3. Reserve stock
4. Process order
5. Update inventory
6. Generate invoice
```

#### Features
- Create export orders
- Customer management
- Stock reservation
- Invoice generation
- Export history

#### Business Rules
- [Document stock checking rules]
- [Document pricing/discount rules]
- [Document approval workflow if any]

---

### 4. Product Management (Quản lý Sản phẩm)

#### Files
- [To be documented after scouting]

#### Product Data Model
```typescript
// To be documented - extract product schema/interface
```

#### Features
- Product catalog
- Product categories
- Product variants (size, color, etc.)
- Barcode/SKU management
- Product images
- Pricing management

#### Business Rules
- [Document product validation rules]
- [Document SKU generation rules]

---

### 5. Warehouse Management (Quản lý Kho)

#### Files
- [To be documented after scouting]

#### Features
- Multiple warehouse locations
- Stock transfers between warehouses
- Warehouse capacity tracking
- Location-based inventory

#### Business Rules
- [Document transfer workflow]
- [Document capacity limits]

---

### 6. Reports & Analytics (Báo cáo & Phân tích)

#### Files
- [To be documented after scouting]

#### Report Types
- Stock level reports
- Import/Export reports
- Inventory valuation reports
- Product movement reports
- Warehouse performance reports

---

## Business Logic Patterns

### Stock Calculation Logic
```typescript
// To be extracted - how is stock calculated?
// Current Stock = Beginning Stock + Imports - Exports + Adjustments
```

### Transaction Processing
[Document transaction processing patterns]

### Validation Patterns
[To be extracted from codebase]

### Error Handling
[To be documented]

---

## Database Schema

### Key Tables
- `products`
- `inventory`
- `warehouses`
- `import_orders`
- `export_orders`
- `transactions`
[More to be documented after analyzing database]

---

## API Endpoints

### Products
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
[More to be documented]

### Inventory
- `GET /api/inventory`
- `GET /api/inventory/:productId`
- `POST /api/inventory/adjust`
[More to be documented]

### Transactions
- `POST /api/transactions/import`
- `POST /api/transactions/export`
- `GET /api/transactions/history`
[More to be documented]

---

## Real-time Features

### WebSocket Events
[Document if using WebSocket for real-time updates]

### Stock Update Broadcasting
[Document how stock changes are communicated]

---

## UI/UX Patterns

### Component Structure
[To be documented]

### Dashboard Layout
[To be documented]

---

## Security Considerations

### Transaction Security
[Document transaction security measures]

### Data Validation
[Document validation approaches]

### Authorization
[Document permission checking for stock operations]

---

## Performance Considerations

### Stock Calculation Performance
[Document optimization techniques]

### Database Indexing
[Document key indexes used]

### Caching Strategy
[Document caching approach]

---

## Known Issues & Limitations

### Technical Debt
[Document issues found in V1]

### Scalability Concerns
[Document scalability limitations]

### Data Integrity Issues
[Document any data consistency problems]

---

## Critical Business Logic to Preserve

### Stock Calculation Formulas
[Extract exact formulas used]

### Inventory Valuation Methods
[Document valuation approach]

### Transaction Workflows
[Document critical workflows]

---

## Migration Notes

### What to Keep
[Document good patterns to preserve in V2]

### What to Improve
[Document areas that need redesign in V2]

### Data Migration Considerations
[Document data migration challenges]

---

## Next Steps

1. Scout the codebase using `/scout` skill
2. Fill in detailed file locations
3. Extract stock calculation logic
4. Document transaction workflows
5. Map database schema
6. Identify critical business rules for V2
