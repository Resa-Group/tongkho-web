# Phase 05: Update Documentation

## Context Links

- [Code Standards](../docs/code-standards.md)
- Astro Image docs: https://docs.astro.build/en/guides/images/

## Overview

- **Priority:** Medium
- **Status:** pending
- **Effort:** 30 minutes

Add Image Guidelines section to code-standards.md documenting best practices for image handling in the project.

## Key Insights

- Team needs clear guidance on when to use `<Image />` vs `<Picture />` vs native `<img>`
- Asset organization pattern should be documented
- Remote image handling will be important for Phase 3 backend

## Requirements

### Functional

- New section in code-standards.md
- Clear decision matrix for component selection
- Example code snippets

### Non-Functional

- Consistent with existing documentation style
- Under 100 lines for the new section

## Architecture

```
docs/code-standards.md
├── ... existing sections ...
├── ## Image Guidelines (NEW)
│   ├── Asset Organization
│   ├── Component Selection
│   ├── Import Patterns
│   ├── Remote Images
│   └── SVG Handling
└── ## Document History (updated)
```

## Related Code Files

### Files to Modify

- `docs/code-standards.md` - Add Image Guidelines section

## Implementation Steps

### 1. Add Image Guidelines Section

Insert before `## Document History` section in `docs/code-standards.md`:

```markdown
---

## Image Guidelines

### Asset Organization

Store images in `src/assets/images/` organized by semantic category:

```
src/assets/images/
├── branding/      # Logos, brand assets
├── hero/          # Hero section backgrounds
├── partners/      # Partner/developer logos
├── download-app/  # App download section assets
├── auth/          # Authentication modal images
├── icons/         # UI icons (prefer SVG)
└── placeholders/  # Fallback images
```

**Exception:** SVGs used as external link badges (e.g., BCT certification) may stay in `public/` for direct URL access.

### Component Selection

| Scenario | Component | Example |
|----------|-----------|---------|
| Local image, single format | `<Image />` | Logo, hero background |
| Local image, multi-format | `<Picture />` | Product photos (AVIF/WebP/JPEG) |
| External/CDN URL | `<Image />` with dimensions | Property thumbnails from API |
| SVG icon | Native `<img>` or `?raw` import | UI icons, badges |
| CSS background | Native CSS | Decorative patterns |

### Import Patterns

**Static imports (recommended):**
```astro
---
import { Image } from 'astro:assets';
import logo from '@/assets/images/branding/logo.webp';
---

<Image src={logo} alt="TongkhoBDS" class="h-10" />
```

**Data-driven imports:**
```typescript
// src/data/partners.ts
import type { ImageMetadata } from 'astro';
import vinhomesLogo from '@/assets/images/partners/vinhomes.webp';

export interface Partner {
  image: ImageMetadata; // Not string
}
```

### Remote Images

For external URLs (future CDN integration):

```astro
<Image
  src="https://api.tongkhobds.com/images/property.jpg"
  alt="Property"
  width={800}
  height={600}
/>
```

**Required:** Configure `image.remotePatterns` in `astro.config.mjs` before using.

### SVG Handling

1. **Inline SVG** (for styling/animation):
   ```astro
   ---
   import LogoSVG from '@/assets/images/icons/logo.svg?raw';
   ---
   <div set:html={LogoSVG} class="w-10 h-10" />
   ```

2. **Image SVG** (for badges/external links):
   ```astro
   <img src="/images/icons/badge.svg" alt="Badge" class="h-12" />
   ```

### Best Practices

- Always provide descriptive `alt` text in Vietnamese
- Use `loading="lazy"` for below-fold images
- Prefer WebP source format (already compressed, re-optimized by Astro)
- Keep images under 2000x2000px for build performance
- Use `class` for sizing, let Astro infer dimensions from import
```

### 2. Update Document History

Add entry to the version table:

```markdown
| 1.2 | 2026-02-05 | Add Image Guidelines section for Astro image optimization |
```

## Todo List

- [ ] Add Image Guidelines section to code-standards.md
- [ ] Update Document History table
- [ ] Review for consistency with existing style
- [ ] Verify all code examples are correct

## Success Criteria

- Section added to code-standards.md
- Examples match actual implementation
- No broken markdown formatting

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Outdated examples | Confusion | Review after implementation |
| Missing edge cases | Incomplete guide | Add as discovered |

## Security Considerations

- No sensitive paths in examples
- Remote patterns documented for future CDN

## Next Steps

- Implementation complete
- Clean up `public/images/` directory (remove migrated files)
- Run Lighthouse audit to verify performance gains
