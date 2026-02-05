# Phase 02: Reorganize Assets Folder

## Context Links

- [Research: Migration Patterns](./research/researcher-02-migration-patterns.md)
- Current images: `public/images/`

## Overview

- **Priority:** High (blocks component migration)
- **Status:** pending
- **Effort:** 30 minutes

Move static images from `public/images/` to `src/assets/images/` with organized subdirectory structure.

## Key Insights

- `src/assets/` enables build-time optimization and tree-shaking
- Organized folders improve maintainability
- Keep SVGs separate (may use `?raw` import)

## Requirements

### Functional

- All images accessible via imports
- Maintain semantic folder organization
- Preserve original filenames

### Non-Functional

- No broken image references during migration
- Clear folder structure for future additions

## Architecture

```
src/assets/images/
├── branding/
│   ├── logo.webp
│   └── logo-light.webp
├── hero/
│   └── hero-bg.webp
├── partners/
│   ├── mikgroup.webp
│   ├── vinhomes.webp
│   ├── novaland.webp
│   ├── sungroup.webp
│   ├── hungthinhland.webp
│   └── masterise.webp
├── download-app/
│   ├── qr-customer.webp
│   ├── qr-agent.webp
│   ├── appstore.png
│   ├── googleplay.png
│   ├── phone-back.webp
│   ├── phone-front.webp
│   ├── NEN_DTH_1.webp
│   └── NEN_DTH_2.webp
├── auth/
│   └── modal-login.webp
└── icons/
    └── da-dang-ky-bct.svg
```

## Related Code Files

### Files to Create

- `src/assets/images/` directory structure

### Files to Delete (after Phase 3-4 complete)

- `public/images/*` (defer until components migrated)

## Implementation Steps

1. Create directory structure:
   ```bash
   mkdir -p src/assets/images/{branding,hero,partners,download-app,auth,icons}
   ```

2. Move branding images:
   ```bash
   mv public/images/logo.webp src/assets/images/branding/
   mv public/images/logo-light.webp src/assets/images/branding/
   ```

3. Move hero images:
   ```bash
   mv public/images/hero-bg.webp src/assets/images/hero/
   ```

4. Move partner logos:
   ```bash
   mv public/images/partners/*.webp src/assets/images/partners/
   ```

5. Move download-app images:
   ```bash
   mv public/images/download-app/* src/assets/images/download-app/
   ```

6. Move auth images:
   ```bash
   mv public/images/modal-login.webp src/assets/images/auth/
   ```

7. Move SVG icons:
   ```bash
   mv public/images/da-dang-ky-bct.svg src/assets/images/icons/
   ```

8. Verify all files moved:
   ```bash
   ls -la src/assets/images/*
   ```

## Todo List

- [ ] Create directory structure
- [ ] Move branding images (logo, logo-light)
- [ ] Move hero background
- [ ] Move partner logos (6 files)
- [ ] Move download-app images (8 files)
- [ ] Move auth modal image
- [ ] Move BCT badge SVG
- [ ] Verify file count matches (19 total)

## Success Criteria

- All 19 images in `src/assets/images/`
- Folder structure matches architecture diagram
- No files left in `public/images/` (except during transition)

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Missing files | Broken images | Verify count before/after |
| Path conflicts | Build errors | Use unique subfolder names |

## Security Considerations

- No sensitive data in images
- File permissions preserved

## Next Steps

- Proceed to Phase 03: Migrate Static Components
