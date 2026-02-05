---
title: "Astro Image Optimization"
description: "Migrate static images to src/assets and implement Astro Image/Picture components"
status: completed
priority: P2
effort: 4h
branch: main
tags: [astro, images, performance, optimization]
created: 2026-02-05
---

# Astro Image Optimization Plan

## Overview

Migrate ~20 static images from `public/images/` to `src/assets/images/` and update ~35 `<img>` tags to use Astro's `<Image />` and `<Picture />` components for automatic optimization.

## Key Benefits

- Automatic WebP/AVIF format conversion (25-40% size reduction)
- Build-time optimization (zero runtime overhead)
- CLS prevention via automatic dimension inference
- Responsive image generation with srcset

## Phases

| Phase | Title | Status | Effort |
|-------|-------|--------|--------|
| 1 | [Configure astro.config.mjs](./phase-01-setup-image-config.md) | completed | 30m |
| 2 | [Reorganize assets folder](./phase-02-reorganize-assets.md) | completed | 30m |
| 3 | [Migrate static components](./phase-03-migrate-static-components.md) | completed | 1.5h |
| 4 | [Migrate data-driven components](./phase-04-migrate-data-driven-components.md) | completed | 1h |
| 5 | [Update documentation](./phase-05-update-documentation.md) | completed | 30m |

## Dependencies

- Astro 5.2 (already installed)
- Sharp (bundled with Astro)

## Success Criteria

- [x] All images in `src/assets/images/`
- [x] All components use `<Image />`
- [x] Build succeeds without warnings
- [ ] No CLS on image load (Lighthouse score) - to verify in browser
- [x] code-standards.md updated with Image Guidelines

## Research References

- [Research 01: Astro Image Component](./research/researcher-01-astro-image-component.md)
- [Research 02: Migration Patterns](./research/researcher-02-migration-patterns.md)

---

## Validation Log

### Session 1 — 2026-02-05
**Trigger:** Initial plan creation validation
**Questions asked:** 5

#### Questions & Answers

1. **[Architecture]** How should CSS background images (NEN_DTH_1.webp, NEN_DTH_2.webp in download-app-section) be handled?
   - Options: Keep in public/ as CSS url | Convert to `<Image />` component | Remove decorative backgrounds
   - **Answer:** Convert to `<Image />` component
   - **Rationale:** User wants full optimization even for decorative images. Requires refactoring CSS background to inline `<Image />` in download-app-section.astro.

2. **[Architecture]** The plan proposes breakpoints [320, 640, 1024, 1280]. Are these correct for your target devices?
   - Options: Yes, use these values | Use Tailwind defaults exactly | Fewer breakpoints
   - **Answer:** Yes, use these values (Recommended)
   - **Rationale:** Standard mobile-first breakpoints confirmed. No changes needed to Phase 1 config.

3. **[Scope]** Property thumbnails and news images currently use mock URL strings. Should they be migrated now or deferred?
   - Options: Defer to backend integration | Create placeholder imports now | Use picsum/placeholder service
   - **Answer:** Defer to backend integration (Recommended)
   - **Rationale:** Mock data will be replaced by API responses in Phase 3 backend. No need to optimize placeholder URLs now.

4. **[Architecture]** BCT certification badge (da-dang-ky-bct.svg) needs external link. How should it be handled?
   - Options: Keep in public/ as native `<img>` | Move to src/assets/ with ?raw import | Convert to Astro Icon
   - **Answer:** Keep in public/ as native `<img>` (Recommended)
   - **Rationale:** SVG needs direct URL for external compliance link. No optimization benefit from moving to assets.

5. **[Tradeoff]** Should we use `<Picture />` for multi-format output (AVIF + WebP + fallback) or stick with `<Image />`?
   - Options: Use `<Image />` only | Use `<Picture />` for hero + featured | Use `<Picture />` everywhere
   - **Answer:** Use `<Image />` only (Recommended)
   - **Rationale:** Simpler implementation, Astro auto-generates WebP. AVIF adds build complexity without significant benefit for current image sizes.

#### Confirmed Decisions
- **CSS backgrounds:** Convert to `<Image />` — requires additional work in Phase 3
- **Breakpoints:** [320, 640, 1024, 1280] — confirmed as-is
- **Mock images:** Defer — keep string URLs for now
- **SVG badge:** public/ with native `<img>` — no migration needed
- **Component choice:** `<Image />` only — skip `<Picture />` complexity

#### Action Items
- [ ] Update Phase 03 to include CSS background refactoring for NEN_DTH_1/2.webp
- [ ] Remove `<Picture />` mentions from Phase 05 documentation template

#### Impact on Phases
- Phase 3: Add task to refactor download-app-section CSS backgrounds to `<Image />` components
- Phase 5: Update documentation to clarify `<Image />` is preferred over `<Picture />`
