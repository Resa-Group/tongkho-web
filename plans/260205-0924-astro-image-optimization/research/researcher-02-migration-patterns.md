# Astro Image Migration Patterns Research

**Date:** 2026-02-05 | **Focus:** HTML img → Astro Image component migration

---

## Executive Summary

Migrating from HTML `<img>` tags to Astro `<Image />` components provides automatic optimization, responsive image generation, and CLS (Cumulative Layout Shift) prevention at build time. Key patterns differ based on image source (static vs. dynamic) and complexity.

---

## 1. Migration Patterns

### Pattern A: Static Images (Recommended)

**Before (HTML img):**
```astro
<img src="/images/logo.webp" alt="Logo" width="200" height="100" />
```

**After (Astro Image):**
```astro
---
import { Image } from 'astro:assets';
import logo from '../assets/logo.webp';
---

<Image src={logo} alt="Logo" width={200} height={100} />
```

**Benefits:**
- Automatic format optimization (webp, avif generation)
- Dimensions inferred → prevents CLS
- Tree-shakeable imports (unused images excluded)
- Build-time optimization

### Pattern B: Public/Remote Images

For images in `public/` or external URLs, provide explicit dimensions:

```astro
import { Image } from 'astro:assets';

<Image
  src="/images/public-image.jpg"
  alt="Description"
  width={640}
  height={480}
/>

<Image
  src="https://example.com/image.jpg"
  alt="Description"
  width={640}
  height={480}
/>
```

**Note:** Remote URLs bypass build-time optimization; width/height required.

---

## 2. Folder Structure Best Practices

**Recommended organization (tongkho-web):**
```
src/
├── assets/
│   ├── images/
│   │   ├── logo.webp
│   │   ├── hero/
│   │   │   ├── banner-desktop.webp
│   │   │   └── banner-mobile.webp
│   │   ├── properties/
│   │   │   ├── apartment-placeholder.webp
│   │   │   └── house-placeholder.webp
│   │   └── icons/
│   │       ├── bed.svg
│   │       └── bath.svg
└── components/
    └── cards/
        └── property-card.astro
```

**Key rules:**
- Store images in `src/assets/` (not `public/`)
- Organize by semantic meaning (properties, hero, icons)
- Use kebab-case filenames
- Keep related images grouped in subdirectories

---

## 3. Responsive Image Strategies

### Option A: Astro-Managed Responsive Images

Enable in `astro.config.mjs`:
```javascript
export default defineConfig({
  image: {
    layout: 'constrained', // or 'full-width'
    responsiveStyles: true
  }
});
```

Result: Automatic `srcset` and `sizes` attributes generated.

```astro
<Image src={propertyImage} alt="Property" width={600} height={400} />
<!-- Output: <img srcset="...300w, ...600w" sizes="(min-width: 600px) 600px" /> -->
```

### Option B: Picture Element (Multi-Format)

```astro
import { Picture } from 'astro:assets';
import heroDesktop from '../assets/hero-desktop.webp';
import heroMobile from '../assets/hero-mobile.webp';

<Picture
  src={heroDesktop}
  alt="Hero"
  formats={['webp', 'jpeg']}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
/>
```

---

## 4. Handling Dynamic Image Sources

### Pattern C: getImage() for Data-Driven Images

**From component props or API data:**
```astro
---
import { Image, getImage } from 'astro:assets';
import defaultImage from '../assets/placeholder.webp';

interface Props {
  imageSrc?: ImageMetadata | string;
  title: string;
}

const { imageSrc, title } = Astro.props;

// Use getImage for programmatic access
const imageData = await getImage({
  src: imageSrc || defaultImage,
  alt: title,
  width: 400,
  height: 300
});
---

<Image src={imageData.src} alt={title} />
```

**From data arrays (mock-properties.ts):**
```typescript
// src/data/mock-properties.ts
import apartment1 from '../assets/images/properties/apartment-1.webp';
import apartment2 from '../assets/images/properties/apartment-2.webp';

export const mockProperties: Property[] = [
  {
    id: 1,
    title: 'Luxe Apartment',
    image: apartment1, // Import directly
    // ...
  },
  {
    id: 2,
    title: 'Modern Villa',
    image: apartment2,
    // ...
  }
];
```

Then in component:
```astro
---
import { Image } from 'astro:assets';
import { mockProperties } from '../data/mock-properties';
---

{mockProperties.map(property => (
  <Image src={property.image} alt={property.title} width={300} height={200} />
))}
```

---

## 5. Common Pitfalls & Solutions

| Pitfall | Cause | Solution |
|---------|-------|----------|
| **"src must be an imported image"** | Using string paths for static images | Always `import` local images at top of file |
| **CLS (layout shift)** | Missing dimensions | Specify `width` and `height` always |
| **No optimization on remote URLs** | Images from CDN/external hosts | Host images in `src/assets/` when possible |
| **Build fails with dynamic imports** | Trying `import(imagePath)` | Use `getImage()` for computed paths |
| **Large bundle size** | All images bundled | Keep images in `src/assets/` (tree-shakeable) |

---

## 6. Implementation Checklist for tongkho-web

- [ ] Create `src/assets/images/` folder structure
- [ ] Move property placeholder images to `src/assets/images/properties/`
- [ ] Move logo/hero images to `src/assets/images/icons/` and `src/assets/images/hero/`
- [ ] Import images in `src/data/mock-properties.ts`
- [ ] Update all `<img src="/images/...">` to `<Image />` in components
- [ ] Test responsive rendering (device emulation)
- [ ] Verify no CLS in DevTools Lighthouse
- [ ] Check bundle size reduction in `dist/`

---

## References

- [Astro Images Guide](https://docs.astro.build/en/guides/images/)
- [Astro Assets Guide](https://docs.astro.build/en/guides/assets/)
- [getImage() API](https://docs.astro.build/en/reference/image-api/)

---

## Unresolved Questions

- Optimal image dimensions for responsive cards (device-specific)?
- Should placeholder images be SVG or webp for faster load?
- Caching strategy for images on Netlify/Vercel deployment?
