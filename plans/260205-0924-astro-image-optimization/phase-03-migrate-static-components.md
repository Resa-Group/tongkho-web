# Phase 03: Migrate Static Components

## Context Links

- [Research: Migration Patterns](./research/researcher-02-migration-patterns.md)
- Components: header, footer, hero-section, download-app-section, auth-modal

## Overview

- **Priority:** High
- **Status:** pending
- **Effort:** 1.5 hours

Update components with hardcoded image paths to use Astro `<Image />` component with imported assets.

## Key Insights

- Static imports enable dimension inference (no width/height needed)
- `<Image />` for single-format, `<Picture />` for multi-format
- SVGs: use native `<img>` or `?raw` import for inline

## Requirements

### Functional

- All static `<img>` tags replaced with `<Image />`
- Maintain current visual appearance
- Preserve alt text and classes

### Non-Functional

- Zero CLS on image load
- Build-time optimization only

## Architecture

```
Component → Import → <Image />
├── header.astro → logo.webp → <Image src={logo} />
├── footer.astro → logo-light.webp, bct.svg
├── hero-section.astro → hero-bg.webp (background)
├── download-app-section.astro → 8 images
└── auth-modal.astro → modal-login.webp, logo.webp
```

## Related Code Files

### Files to Modify

| File | Images | Lines |
|------|--------|-------|
| `src/components/header/header.astro` | logo.webp | 11 |
| `src/components/footer/footer.astro` | logo-light.webp, da-dang-ky-bct.svg | 59, 176 |
| `src/components/home/hero-section.astro` | hero-bg.webp | 9 |
| `src/components/home/download-app-section.astro` | 8 images | multiple |
| `src/components/auth/auth-modal.astro` | modal-login.webp, logo.webp | 32, 39, 63 |

## Implementation Steps

### 1. Header Component (header.astro)

```astro
---
import { Image } from 'astro:assets';
import logo from '@/assets/images/branding/logo.webp';
import { mainNavItems } from './header-nav-data';
import HeaderMobileMenu from './header-mobile-menu';
---

<!-- Line 11: Replace -->
<Image src={logo} alt="TongkhoBDS.com" class="h-10 lg:h-12 w-auto" />
```

### 2. Footer Component (footer.astro)

```astro
---
import { Image } from 'astro:assets';
import logoLight from '@/assets/images/branding/logo-light.webp';
// SVG: use native img for external link requirement
---

<!-- Line 59: Replace -->
<Image src={logoLight} alt="TongkhoBDS.com" class="h-12 w-auto" />

<!-- Line 176: Keep native img for SVG -->
<img src="/images/icons/da-dang-ky-bct.svg" alt="Đã đăng ký Bộ Công Thương" class="h-12 w-auto" />
```

Note: Move SVG to `public/images/icons/` since it's an external link badge.

### 3. Hero Section (hero-section.astro)

```astro
---
import { Image } from 'astro:assets';
import heroBg from '@/assets/images/hero/hero-bg.webp';
import HeroSearch from './hero-search.astro';
---

<!-- Line 8-13: Replace background div -->
<div class="absolute inset-0 pointer-events-none">
  <Image
    src={heroBg}
    alt="Thành phố Việt Nam"
    class="w-full h-full object-cover"
  />
  <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
</div>
```

### 4. Download App Section (download-app-section.astro)

```astro
---
import { Image } from 'astro:assets';
import qrCustomer from '@/assets/images/download-app/qr-customer.webp';
import qrAgent from '@/assets/images/download-app/qr-agent.webp';
import appStore from '@/assets/images/download-app/appstore.png';
import googlePlay from '@/assets/images/download-app/googleplay.png';
import phoneBack from '@/assets/images/download-app/phone-back.webp';
import phoneFront from '@/assets/images/download-app/phone-front.webp';

const customerApp = {
  title: "Tìm thuê, mua bán đến đầu tư",
  description: "Tất cả bất động sản bạn cần đều có tại",
  qrCode: qrCustomer,
  phoneImage: phoneBack,
  appStoreUrl: "https://apps.apple.com/...",
  playStoreUrl: "https://play.google.com/...",
};
// ... agentApp similarly
---

<!-- Replace all <img> with <Image /> -->
<Image src={customerApp.qrCode} alt="Mã QR..." class="w-20 h-20" />
<Image src={appStore} alt="Tải từ App Store" class="h-11 w-auto" />
```

Note: Background images (`NEN_DTH_1/2.webp`) use CSS `background-image` - keep in public or convert to inline style with import.

### 5. Auth Modal (auth-modal.astro)

```astro
---
import { Image } from 'astro:assets';
import modalLogin from '@/assets/images/auth/modal-login.webp';
import logo from '@/assets/images/branding/logo.webp';
---

<!-- Line 32: Replace -->
<Image src={modalLogin} alt="Đăng ký tài khoản TongkhoBDS" class="absolute inset-0 w-full h-full object-cover" />

<!-- Line 39, 63: Replace -->
<Image src={logo} alt="TongkhoBDS" class="h-10" />
```

## Todo List

- [ ] Migrate header.astro (1 image)
- [ ] Migrate footer.astro (1 image + 1 SVG)
- [ ] Migrate hero-section.astro (1 image)
- [ ] Migrate download-app-section.astro (8 images)
- [ ] Migrate auth-modal.astro (2 images)
- [ ] Run `npm run build` to verify
- [ ] Run `npm run dev` to test visually

## Success Criteria

- All static components use `<Image />`
- Build succeeds without warnings
- Visual appearance unchanged
- No CLS on image load

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| CSS class incompatibility | Layout breaks | Test each component individually |
| Background image handling | Style breaks | Keep CSS bg-url in public |
| SVG optimization issues | Badge not shown | Use native img for SVGs |

## Security Considerations

- External links (App Store, Google Play) unchanged
- BCT badge link preserved

## Next Steps

- Proceed to Phase 04: Migrate Data-Driven Components
