# Astro 5.x Image Component Best Practices Research

**Date:** 2026-02-05
**Focus:** Image optimization, asset management, responsive images, performance benefits

---

## Component Selection Guide

| Component | Use Case | Output | Best For |
|-----------|----------|--------|----------|
| `<Image />` | Single format, local/authorized remote | `<img>` tag | Basic images, optimized single format |
| `<Picture />` | Multi-format responsive | `<picture>` tag | Modern format support (AVIF/WebP fallback) |
| Native `<img>` | Public assets, no optimization needed | Direct HTML | Favicons, external URLs, static files |

---

## Static vs Public Assets

### **src/assets/** (Recommended)
- ✅ Automatic build-time processing and bundling
- ✅ Images imported directly in components
- ✅ Optimized, bundled with output
- ✅ Supports automatic dimension inference
- ✅ Cache between builds for faster rebuilds

**Usage:**
```astro
---
import { Image } from 'astro:assets'
import heroImage from '../assets/hero.png'
---

<Image src={heroImage} alt="Hero" width={1200} height={600} />
```

### **public/** (Static)
- Use only for: favicons, robots.txt, direct public URLs
- No optimization applied
- Direct file server access
- Files not bundled

---

## Image Optimization Architecture

### Build-Time (Prerendered Static Sites)
- All transformations occur during `npm run build`
- Zero runtime overhead
- Ideal for static-first Astro sites (like tongkho-web)
- Sharp handles conversions by default

### On-Demand (Server/SSR)
- Dynamic optimization for server-rendered pages
- Handles runtime parameter changes
- Alternative services available for restricted environments

---

## Responsive Image Configuration

### Auto Layout System
Enable global responsive styling to prevent Cumulative Layout Shift (CLS):

```javascript
// astro.config.mjs
export default defineConfig({
  image: {
    layout: 'constrained',  // or 'fixed', 'full-width'
    responsiveStyles: true, // Generate automatic CSS sizing
    objectFit: 'cover',
    objectPosition: 'center',
    breakpoints: [320, 640, 1024, 1280], // Generate variants for these widths
  }
})
```

**Result:** Automatic `srcset` + `sizes` attributes, proper CSS preventing layout shift.

---

## Format Conversion & WebP/AVIF

### Picture Component for Multi-Format
```astro
---
import { Picture } from 'astro:assets'
import myImage from '../assets/property.png'
---

<Picture
  src={myImage}
  formats={['avif', 'webp', 'png']}
  alt="Modern apartment"
  width={800}
  height={600}
/>
```

**Generated HTML:**
```html
<picture>
  <source srcset="...property.avif" type="image/avif" />
  <source srcset="...property.webp" type="image/webp" />
  <img src="...property.png" alt="Modern apartment" />
</picture>
```

**Performance:** AVIF/WebP reduce file size 25-40% vs PNG/JPEG, improving Core Web Vitals.

---

## SVG & External URL Handling

### SVGs (Best Practice)
```astro
---
import LogoSVG from '../assets/logo.svg?raw'
---

<!-- Import as raw component -->
<div set:html={LogoSVG} class="w-10 h-10" />

<!-- Or use direct import with size hint -->
<img src={new URL('../assets/logo.svg', import.meta.url).href} alt="Logo" />
```

### External URLs
Whitelist remote domains for processing:

```javascript
// astro.config.mjs
export default defineConfig({
  image: {
    domains: ['api.example.com', 'cdn.example.com'],
    remotePatterns: [{
      protocol: 'https',
      hostname: '*.example.com',
      pathname: '/images/**'
    }]
  }
})
```

---

## Remote Image Processing

```astro
---
import { Image } from 'astro:assets'
---

<Image
  src="https://api.example.com/property-1.jpg"
  alt="Remote property"
  width={800}
  height={600}
/>
```

**Note:** Remote processing requires explicit domain allowlisting; dimensions must be specified (not inferred).

---

## Performance & Lighthouse Impact

### Core Web Vitals Improvements
1. **CLS (Cumulative Layout Shift):** Automatic dimension inference prevents image reflow
2. **LCP (Largest Contentful Paint):** Optimized formats reduce load time
3. **File Size:** AVIF/WebP 25-40% smaller than PNG/JPEG

### Build Metrics (Tongkho-Web Context)
- Build-time optimization (no runtime overhead)
- Zero additional JavaScript
- Static HTML output (already zero-JS framework)
- Faster subsequent builds via cached transformations

---

## Current Project Configuration

**tongkho-web** (`astro.config.mjs`):
- Output: `server` (Node.js adapter)
- No explicit image configuration
- **Opportunity:** Add `image.layout: 'constrained'` + `responsiveStyles: true` for automatic responsive behavior

---

## Recommendations for Tongkho-Web

1. **Store images in `src/assets/`** — already doing via components
2. **Adopt `<Picture />` for property/project cards** — convert PNG→AVIF/WebP for 30% size reduction
3. **Enable responsive layout in config** — prevents CLS on featured sections
4. **Add image breakpoints** — generate variants for mobile (320px), tablet (640px), desktop (1024px+)
5. **Configure remote domains** — if integrating backend image CDN later

---

## Unresolved Questions

- SVG optimization strategy (embedded vs imported vs external)?
- Remote CDN domain configuration plan for Phase 3 backend integration?
- Image quality settings (default Sharp settings vs custom)?
