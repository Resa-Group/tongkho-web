---
title: "Migrate PostgreSQL to Drizzle ORM"
description: "Replace raw SQL queries with Drizzle ORM for type-safe database operations"
status: completed
priority: P2
effort: 3h
branch: main
tags: [database, orm, drizzle, refactoring]
created: 2026-02-05
completed: 2026-02-05
reviewed: 2026-02-05
review_status: excellent
---

# Drizzle ORM Migration Plan

## Overview

Migrate raw PostgreSQL queries (`pg` library) to Drizzle ORM for type-safe, maintainable database operations.

**Current State:**
- 2 service files with raw SQL (~600 LOC total)
- `pg.Pool` connection with parameterized queries
- 3 tables: `real_estate`, `news`, `project`

**Target State:**
- Drizzle ORM schema definitions
- Type-safe queries with compile-time validation
- Automatic type inference from schema

## Phases

| # | Phase | Status | Effort | File |
|---|-------|--------|--------|------|
| 1 | Setup & Configuration | completed | 30m | [phase-01-setup-drizzle.md](./phase-01-setup-drizzle.md) |
| 2 | Define Database Schema | completed | 45m | [phase-02-define-schema.md](./phase-02-define-schema.md) |
| 3 | Migrate Property Service | completed | 45m | [phase-03-migrate-property-service.md](./phase-03-migrate-property-service.md) |
| 4 | Migrate News/Project Service | completed | 45m | [phase-04-migrate-news-project-service.md](./phase-04-migrate-news-project-service.md) |
| 5 | Cleanup & Validation | completed | 15m | [phase-05-cleanup-validation.md](./phase-05-cleanup-validation.md) |

## Key Decisions

1. **Driver:** Use `postgres` (postgres-js) for better performance over `pg`
2. **Schema Location:** `src/db/schema/` with one file per table
3. **Connection:** Single `db` instance exported from `src/db/index.ts`
4. **Types:** Use `$inferSelect` for auto-generated types, keep existing interfaces as API contracts

## Dependencies

- No external service dependencies
- Requires `DATABASE_URL` env var (existing)

## Related Files

**To Create:**
- `src/db/index.ts` - Database connection
- `src/db/schema/real-estate.ts` - Property table schema
- `src/db/schema/news.ts` - News table schema
- `src/db/schema/project.ts` - Project table schema
- `drizzle.config.ts` - Drizzle configuration

**To Modify:**
- `src/services/postgres-property-service.ts`
- `src/services/postgres-news-project-service.ts`
- `package.json` - Add drizzle dependencies

**To Remove (after migration):**
- Raw `pg` import statements
- Pool initialization code
- DBPropertyRow, DBNewsRow, DBProjectRow interfaces

## Research

- [Drizzle Patterns Research](./research/researcher-01-drizzle-patterns.md)

## Code Review Log

### Review 1 — 2026-02-05 12:09
**Reviewer:** code-reviewer (abd599a)
**Status:** ✅ EXCELLENT - Ready for production
**Report:** [code-reviewer-260205-1209-drizzle-orm-migration.md](../reports/code-reviewer-260205-1209-drizzle-orm-migration.md)

**Summary:**
- All 5 phases verified complete
- Build passes (0 errors)
- Type safety: 100%
- Security: 0 vulnerabilities
- Migration completion: 100%

**Recommendations:**
1. Run `drizzle-kit pull` to validate schema matches DB constraints
2. Add `.notNull()` to critical columns based on actual DB schema
3. Update docs: `codebase-summary.md`, `system-architecture.md`
4. Consider adding test suite for mapping functions

---

## Validation Log

### Session 1 — 2026-02-05
**Trigger:** Initial plan creation validation
**Questions asked:** 3

#### Questions & Answers

1. **[Architecture]** Plan giả định schema được viết thủ công dựa trên DBRow interfaces hiện tại. Bạn muốn verify schema bằng cách nào?
   - Options: drizzle-kit pull (Recommended) | Manual review only | Skip verification
   - **Answer:** drizzle-kit pull (Recommended)
   - **Rationale:** Introspecting actual DB ensures schema matches reality, catches missing columns or type mismatches before runtime.

2. **[Code Pattern]** Sau khi migrate xong, bạn muốn giữ lại class pattern hay chuyển sang functions?
   - Options: Keep class + singleton (Recommended) | Convert to pure functions
   - **Answer:** Convert to pure functions
   - **Rationale:** Modern pattern, better tree-shaking, simpler testing. Requires updating Phase 3 & 4 implementation approach.

3. **[Scope]** Có cần thêm drizzle-kit migrations cho tương lai không?
   - Options: No migrations needed | Setup migrations (Recommended)
   - **Answer:** Setup migrations (Recommended)
   - **Rationale:** Future-proofs schema changes, enables version-controlled DB evolution.

#### Confirmed Decisions
- **Schema verification:** Use drizzle-kit pull to introspect DB and compare — ensures accuracy
- **Code pattern:** Convert services to pure functions — modern, cleaner approach
- **Migrations:** Setup drizzle-kit migrations — future schema changes supported

#### Action Items
- [ ] Phase 2: Add step to run `drizzle-kit pull` and compare with manual schema
- [ ] Phase 3: Update implementation to use pure functions instead of class
- [ ] Phase 4: Update implementation to use pure functions instead of class
- [ ] Phase 1: Add migration setup step with `drizzle-kit generate`

#### Impact on Phases
- **Phase 1:** Add migration configuration and explain `drizzle-kit generate` workflow
- **Phase 2:** Add verification step comparing manual schema with `drizzle-kit pull` output
- **Phase 3:** Refactor from class to pure exported functions
- **Phase 4:** Refactor from class to pure exported functions
