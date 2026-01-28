# Tongkho-Web: Project Overview & PDR

## Executive Summary

**Tongkho-Web** is a Vietnamese real estate discovery and listing platform serving the Vietnamese property market. The project delivers a fast, SEO-optimized, static website for browsing properties, projects, and real estate market insights.

**Live Site:** https://tongkhobds.com

---

## Product Definition

### Vision
Enable property seekers in Vietnam to discover, compare, and understand the real estate market with a modern, responsive web experience.

### Target Audience
- **Primary:** Individual property buyers/renters searching for homes in Vietnam
- **Secondary:** Real estate investors researching market trends
- **Tertiary:** Real estate agents/developers discovering partnership opportunities

### Key Features

#### 1. Search & Discovery
- Multi-tab search interface (Buy/Rent/Projects)
- City-based filtering
- Property type filtering (apartment, house, villa, land, office, shophouse, warehouse)
- Price range & area range filters
- Keyword search

#### 2. Property Listings
- Property cards with images, price, area, bedrooms/bathrooms
- Featured/hot property highlighting
- Responsive grid layout
- Mock data with real property structure

#### 3. Project Showcase
- Real estate project listings with developer info
- Project status tracking (upcoming, selling, sold_out, completed)
- Amenities & location information
- Featured projects section

#### 4. Market Intelligence
- News/blog articles (market trends, policy, investment tips)
- Location cards showing property density
- Customer testimonials/reviews
- Vietnamese-specific content

#### 5. Responsive Design
- Desktop, tablet, mobile optimization
- Orange primary theme (#f97316)
- Vietnamese fonts (Inter, Be Vietnam Pro)

---

## Functional Requirements

| Requirement | Status | Priority |
|---|---|---|
| Homepage with hero search | Complete | High |
| Property listing grid | Complete | High |
| Search filtering (city, type, price, area) | Complete | High |
| Project showcase section | Complete | High |
| News/blog section | Complete | Medium |
| Location cards | Complete | Medium |
| Responsive design (all breakpoints) | Complete | High |
| Vietnamese localization (dates, numbers, prices) | Complete | High |
| SEO optimization (sitemap, meta tags) | Complete | High |
| Static HTML output (zero JS required) | Complete | High |

---

## Non-Functional Requirements

| Requirement | Specification |
|---|---|
| **Performance** | Sub-2s homepage load (static output) |
| **SEO** | Dynamic sitemap, meta tags per page, semantic HTML |
| **Accessibility** | WCAG 2.1 Level AA (Astro defaults) |
| **Browser Support** | Chrome, Firefox, Safari, Edge (latest 2 versions) |
| **Code Quality** | TypeScript strict mode, 0 unused variables |
| **Build Size** | <3MB total output (excluding images) |

---

## Technical Stack

- **Framework:** Astro 5.2 (static site generation)
- **Runtime:** React 19 (interactive components)
- **Styling:** Tailwind CSS 3.4 + Custom CSS
- **Language:** TypeScript 5.7
- **Icons:** Iconify JSON (Lucide)
- **Output:** Static HTML (no server)
- **Hosting:** Static file server (nginx, Netlify, Vercel, etc.)

---

## Data Model

### Core Entities

#### Property
```
- id, title, slug, type (PropertyType), transactionType
- price, priceUnit, area
- bedrooms?, bathrooms?
- address, district, city
- description, images[], thumbnail
- features[], createdAt, isFeatured, isHot
```

#### Project
```
- id, name, slug, developer, location, city
- status, totalUnits, priceRange, area
- description, images[], thumbnail, amenities[]
- completionDate?, isFeatured
```

#### NewsArticle
```
- id, title, slug, excerpt, content, thumbnail
- category (market|policy|tips|project_news|investment)
- author, publishedAt, views
```

#### Location
```
- id, name, slug, image, propertyCount
```

---

## User Workflows

### 1. Property Search
1. User lands on homepage
2. Selects transaction type (buy/rent)
3. Filters by city, property type, price, area
4. Views property cards with key info
5. (Future) Clicks through to property detail page

### 2. Project Discovery
1. User visits Projects section on homepage
2. Browsees featured projects grid
3. Sees developer, status, price range, amenities
4. (Future) Explores project detail page with unit inventory

### 3. Market Research
1. User navigates to News section
2. Reads market trends, policy updates, investment tips
3. (Future) Filters by category/date

---

## Success Metrics

| Metric | Target |
|---|---|
| Homepage load time | <2 seconds (static) |
| Mobile usability score | >90 (Lighthouse) |
| SEO ranking (target keywords) | Top 3 position (6-12 months) |
| User sessions | >5K/month (3-6 months) |
| Bounce rate | <50% |
| Pages per session | >2 |

---

## Phase-Based Roadmap

### Phase 1: Foundation (COMPLETE)
- Astro + React setup
- Tailwind styling
- Mock property/project/news data
- Search UI (tabs, filters)
- Responsive layout
- TypeScript interfaces

### Phase 2: Content & SEO (PLANNED)
- Dynamic routes per property/project/article
- Meta tags per page
- Open Graph / Twitter cards
- Structured data (JSON-LD)
- Blog/news dynamic rendering

### Phase 3: Backend Integration (PLANNED)
- Property CMS API integration
- Image CDN optimization
- Database design (PostgreSQL)
- Admin panel (property management)

### Phase 4: Monetization (PLANNED)
- Lead generation forms
- Agent/broker dashboard
- Premium listing features
- Sponsored content

### Phase 5: Advanced Features (PLANNED)
- Map integration (Google Maps)
- Virtual tours (3D)
- Mortgage calculator
- Price prediction/analytics
- AI chatbot

---

## Dependencies & Constraints

### Tech Constraints
- Must remain static (zero server-side rendering)
- TypeScript strict mode (no `any`)
- All dependencies must be published npm packages

### Business Constraints
- Vietnamese market focus (localization priority)
- SEO-first approach (every page must be discoverable)
- Mobile-first responsive design
- GDPR/privacy compliance for EU users

### Known Limitations
- Mock data only (no real property API yet)
- No user authentication
- No transaction/booking capability
- No real-time updates

---

## Acceptance Criteria

**MVP is COMPLETE when:**
- Homepage loads in <2 seconds (static output)
- All 5 search filters work (city, property type, price, area, keyword)
- Property/project/news cards render correctly on mobile/desktop
- Zero TypeScript errors
- Sitemap generated and robots.txt configured
- Visual design matches Figma (primary orange, Inter font, responsive)
- No console errors/warnings in production build

---

## Document History

| Version | Date | Changes |
|---|---|---|
| 1.0 | 2026-01-28 | Initial project documentation |
