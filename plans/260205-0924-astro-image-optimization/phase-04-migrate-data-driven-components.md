# Phase 04: Migrate Data-Driven Components

## Context Links

- [Research: Migration Patterns](./research/researcher-02-migration-patterns.md)
- Partners data: `src/data/partners.ts`
- Components: partners-section.astro

## Overview

- **Priority:** Medium
- **Status:** completed
- **Effort:** 1 hour

Update components that render images from data arrays (partners, property cards, news) to use Astro `<Image />` with imported assets.

## Key Insights

- Data files can import images directly (tree-shakeable)
- Component receives `ImageMetadata` type from imports
- Remote/dynamic URLs require explicit dimensions

## Requirements

### Functional

- Partner logos use `<Image />` with imports
- Type safety maintained (ImageMetadata)
- Infinite scroll behavior preserved

### Non-Functional

- Build-time optimization for all partner logos
- No runtime image processing

## Architecture

```
Data File (imports) → Component (receives ImageMetadata) → <Image />

src/data/partners.ts
├── import mikgroup from '@/assets/images/partners/mikgroup.webp'
├── import vinhomes from '@/assets/images/partners/vinhomes.webp'
└── ... (6 partners)

partners-section.astro
├── import { Image } from 'astro:assets'
├── { partners } from '@/data/partners'
└── <Image src={partner.image} /> // ImageMetadata type
```

## Related Code Files

### Files to Modify

| File | Changes |
|------|---------|
| `src/data/partners.ts` | Add image imports, change type to ImageMetadata |
| `src/components/home/partners-section.astro` | Use `<Image />` component |

## Implementation Steps

### 1. Update Partners Data (partners.ts)

```typescript
import type { ImageMetadata } from 'astro';

// Import partner logos
import mikgroupLogo from '@/assets/images/partners/mikgroup.webp';
import vinhomesLogo from '@/assets/images/partners/vinhomes.webp';
import novalandLogo from '@/assets/images/partners/novaland.webp';
import sungroupLogo from '@/assets/images/partners/sungroup.webp';
import hungthinhLogo from '@/assets/images/partners/hungthinhland.webp';
import masteriseLogo from '@/assets/images/partners/masterise.webp';

export interface Partner {
  id: string;
  name: string;
  slug: string;
  image: ImageMetadata; // Changed from string
}

export const partners: Partner[] = [
  {
    id: '1',
    name: 'MIKGroup Việt Nam',
    slug: 'mikgroup',
    image: mikgroupLogo,
  },
  {
    id: '2',
    name: 'Vinhomes',
    slug: 'vinhomes',
    image: vinhomesLogo,
  },
  {
    id: '3',
    name: 'Novaland Group',
    slug: 'novaland',
    image: novalandLogo,
  },
  {
    id: '4',
    name: 'Sun Group',
    slug: 'sungroup',
    image: sungroupLogo,
  },
  {
    id: '5',
    name: 'Hưng Thịnh Land',
    slug: 'hungthinhland',
    image: hungthinhLogo,
  },
  {
    id: '6',
    name: 'Masterise Homes',
    slug: 'masterise',
    image: masteriseLogo,
  },
];
```

### 2. Update Partners Section (partners-section.astro)

```astro
---
import { Image } from 'astro:assets';
import { partners } from '@/data/partners';

// Duplicate partners for seamless infinite scroll
const duplicatedPartners = [...partners, ...partners, ...partners];
---

<section class="section relative">
  <div class="container-custom relative z-10">
    <div class="text-center mb-8">
      <h2 class="section-title text-white">Đối tác chiến lược</h2>
      <p class="text-secondary-300 mt-2">Hợp tác cùng các chủ đầu tư hàng đầu Việt Nam</p>
    </div>

    <div class="partners-slider overflow-hidden relative">
      <div class="partners-track flex items-center gap-4 sm:gap-8">
        {duplicatedPartners.map((partner, index) => (
          <a
            href={`/chu-dau-tu/${partner.slug}`}
            class="partner-item flex-shrink-0 flex items-center justify-center bg-white rounded-xl p-3 sm:p-4 shadow-xs hover:shadow-md transition-shadow"
            aria-label={`Xem thông tin ${partner.name}`}
          >
            <Image
              src={partner.image}
              alt={`Logo ${partner.name}`}
              class="h-12 sm:h-16 w-auto object-contain"
              loading={index < 6 ? 'eager' : 'lazy'}
            />
          </a>
        ))}
      </div>
    </div>
  </div>
</section>
```

### 3. Property Cards & News (Future Consideration)

Property cards and news components currently use external URLs or mock data. For now:

- **Property thumbnails:** Keep as string URLs (will be remote from API)
- **News thumbnails:** Keep as string URLs (will be remote from API)

When backend integration happens, configure `image.remotePatterns` in astro.config.mjs.

## Todo List

- [x] Update `src/data/partners.ts` with image imports
- [x] Change Partner interface `image` type to `ImageMetadata`
- [x] Update `partners-section.astro` to use `<Image />`
- [x] Run `npm run build` to verify
- [x] Run `npm run dev` to test infinite scroll
- [x] Verify animation still works

## Success Criteria

- Partner logos optimized at build time
- TypeScript compiles without errors
- Infinite scroll animation unchanged
- Loading="lazy" applied correctly

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Import path issues | Build fails | Use `@/` alias |
| Type mismatch | TS errors | Explicit ImageMetadata type |
| Animation breaks | UX degraded | Test scroll behavior |

## Security Considerations

- No external data sources yet
- Partner slugs sanitized in routes

## Next Steps

- Proceed to Phase 05: Update Documentation
