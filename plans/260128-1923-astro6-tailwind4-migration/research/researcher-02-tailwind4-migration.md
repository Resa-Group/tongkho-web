# Tailwind CSS 4 Migration Research Report

**Date:** 2026-01-28  
**Context:** Migration from Tailwind CSS 3.4 → 4.x for Astro 6 project  
**Current Config:** JS-based (tailwind.config.mjs) with custom colors, fonts, container

---

## Executive Summary

Tailwind v4 represents complete rewrite with CSS-first configuration replacing JS config. Major improvements: 5x faster full builds, 100x faster incremental builds. Key breaking changes: `@tailwind` directives removed, PostCSS plugin separated, utility class renames, container customization approach changed.

**Browser Requirements:** Safari 16.4+, Chrome 111+, Firefox 128+  
**Node.js:** v20+ required for upgrade tool

---

## 1. Configuration Paradigm Shift

### v3 Approach (Current)
```javascript
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js}'],
  theme: { extend: { colors: {...}, fontFamily: {...} } }
}
```

### v4 Approach (Target)
```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  --color-primary-50: #fff7ed;
  --color-primary-500: #f97316;
  /* ... */
  
  --font-sans: Inter, system-ui, sans-serif;
  --font-heading: "Be Vietnam Pro", system-ui, sans-serif;
}
```

**Key Differences:**
- No `tailwind.config.js` auto-detection (must use `@config` directive if needed)
- Theme variables defined in CSS with `@theme {}` block
- All design tokens exposed as CSS variables by default
- Content detection is automatic (no config needed)

**Sources:**
- [CSS-First Configuration Guide](https://medium.com/@oumuamuaa/transitioning-from-tailwind-config-js-to-css-first-in-tailwind-css-v4-4afb3bfca4ee)
- [Tailwind v4 Official Blog](https://tailwindcss.com/blog/tailwindcss-v4)
- [CSS-First vs JS Config Discussion](https://github.com/tailwindlabs/tailwindcss/discussions/16803)

---

## 2. Import Directives Changes

### v3 Syntax (Remove)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### v4 Syntax (Use)
```css
@import "tailwindcss";
```

**Granular Import Alternative:**
```css
@import "tailwindcss/theme.css";
@import "tailwindcss/preflight.css";
@import "tailwindcss/utilities.css";
```

**Critical:** `@tailwind base` and `@tailwind components` deprecated. Single `@import` statement handles all layers.

**Sources:**
- [Upgrade Guide - Directives](https://tailwindcss.com/docs/upgrade-guide)
- [Functions & Directives Docs](https://tailwindcss.com/docs/functions-and-directives)

---

## 3. Custom Colors Migration

### Current Setup (v3)
```javascript
colors: {
  primary: { 50-900: orange scale },
  secondary: { 50-900: slate scale }
}
```

### v4 Migration
```css
@theme {
  --color-primary-50: #fff7ed;
  --color-primary-100: #ffedd5;
  --color-primary-200: #fed7aa;
  --color-primary-300: #fdba74;
  --color-primary-400: #fb923c;
  --color-primary-500: #f97316;
  --color-primary-600: #ea580c;
  --color-primary-700: #c2410c;
  --color-primary-800: #9a3412;
  --color-primary-900: #7c2d12;
  
  --color-secondary-50: #f8fafc;
  --color-secondary-100: #f1f5f9;
  /* ... remaining secondary scale ... */
}
```

**Usage in Components:**
- Utilities: `bg-primary-500`, `text-secondary-700` (same as v3)
- CSS vars: `background-color: var(--color-primary-500)` (runtime access)

**Multi-Theme Pattern:**
```css
@theme inline {
  --color-primary: var(--theme-primary);
}

.theme-orange { --theme-primary: #f97316; }
.theme-blue { --theme-primary: #3b82f6; }
```

**Sources:**
- [Theme Variables Docs](https://tailwindcss.com/docs/theme)
- [Custom Colors Migration](https://bryananthonio.com/blog/configuring-tailwind-css-v4/)
- [Multi-Theme Strategy](https://simonswiss.com/posts/tailwind-v4-multi-theme)

---

## 4. Custom Fonts Migration

### Current Setup (v3)
```javascript
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  heading: ['Be Vietnam Pro', 'system-ui', 'sans-serif']
}
```

### v4 Migration

**IMPORTANT:** Variable renamed `--font-family` → `--font`

```css
/* Import fonts first (Google Fonts, local, etc.) */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap');

/* THEN import tailwindcss */
@import "tailwindcss";

@theme {
  --font-sans: Inter, ui-sans-serif, system-ui, sans-serif;
  --font-heading: "Be Vietnam Pro", ui-sans-serif, system-ui, sans-serif;
  
  /* Optional: Set global default */
  --default-font-family: Inter, ui-sans-serif, system-ui, sans-serif;
}
```

**Order Requirement:** Must import Tailwind BEFORE `@theme` block, but font imports BEFORE Tailwind.

**Sources:**
- [Custom Fonts in Tailwind v4](https://harrisonbroadbent.com/blog/tailwind-custom-fonts/)
- [Font Family Discussion](https://github.com/tailwindlabs/tailwindcss/discussions/13890)
- [Multiple Custom Fonts Guide](https://www.flexyui.com/blogs/multiple-custom-fonts-in-tailwindcss)

---

## 5. Container Customization

### Current Setup (v3)
```javascript
container: {
  center: true,
  padding: {
    DEFAULT: '1rem',
    sm: '2rem',
    lg: '4rem',
    xl: '5rem'
  }
}
```

### v4 Migration Options

**Option A: Utility Classes (Recommended)**
```html
<div class="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-20">
  <!-- content -->
</div>
```

**Option B: Custom Component Layer**
```css
@layer components {
  .container-custom {
    @apply max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-20;
  }
}
```

**Option C: CSS Variable Approach**
```css
@theme {
  --container-padding: 1rem;
  --container-padding-sm: 2rem;
  --container-padding-lg: 4rem;
  --container-padding-xl: 5rem;
}

.container {
  margin-inline: auto;
  padding-inline: var(--container-padding);
  max-width: 80rem;
}

@media (min-width: 640px) {
  .container { padding-inline: var(--container-padding-sm); }
}
/* ... */
```

**Note:** `container` utility still exists in v4 but no longer has built-in `center`/`padding` config options.

**Sources:**
- [Container Changes Discussion](https://github.com/tailwindlabs/tailwindcss/discussions/14801)
- [Responsive Padding in v4](https://iifx.dev/en/articles/456660775/goodbye-container-handling-responsive-padding-in-tailwind-css-v4)

---

## 6. Astro Integration Setup

### Remove Old Integration
```bash
npm uninstall @astrojs/tailwind tailwindcss postcss autoprefixer
```

### Install v4 Vite Plugin
```bash
npm install -D @tailwindcss/vite
```

### Update astro.config.mjs
```javascript
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### Create CSS Entry
```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  /* custom theme here */
}
```

### Import in Layout
```astro
---
// src/layouts/Layout.astro
import '../styles/global.css';
---
```

**Critical:** Delete `postcss.config.js` and remove `postcss`/`autoprefixer` from package.json. Vite plugin replaces PostCSS workflow.

**Automatic Setup:**
```bash
npx astro add tailwind  # Astro 5.2+ auto-configures v4
```

**Sources:**
- [Official Astro Guide](https://tailwindcss.com/docs/installation/framework-guides/astro)
- [Astro + Tailwind v4 Setup](https://tailkits.com/blog/astro-tailwind-setup/)
- [Complete Migration Guide](https://dipankarmaikap.com/how-to-use-tailwind-css-v4-in-astro)

---

## 7. Breaking Changes - Utility Class Renames

### Shadow Utilities
```css
/* v3 → v4 */
shadow    → shadow-sm
shadow-sm → shadow-xs
```

### Blur Utilities
```css
/* v3 → v4 */
blur    → blur-sm
blur-sm → blur-xs
```

### Radius Utilities
Similar pattern: bare utility → `-sm`, `-sm` → `-xs`

**Backward Compat:** Bare versions (`shadow`, `blur`) still work but render differently. Must update to `-xs` versions for identical appearance.

**Automated Fix:** Upgrade tool handles these replacements in templates.

**Sources:**
- [Upgrade Guide - Breaking Changes](https://tailwindcss.com/docs/upgrade-guide)
- [v4 Beta Documentation](https://v3.tailwindcss.com/docs/v4-beta)

---

## 8. PostCSS vs Vite Plugin Decision

### Option 1: Vite Plugin (Recommended for Astro)
**Pros:**
- Best performance (5-10x faster builds)
- Best DX (HMR optimized)
- No PostCSS config needed
- Automatic content detection

**Cons:**
- Vite-specific (not usable with other bundlers)

**Setup:**
```bash
npm install -D @tailwindcss/vite
```

### Option 2: PostCSS Plugin
**Pros:**
- Bundler-agnostic
- Compatible with existing PostCSS pipelines

**Cons:**
- Slower than Vite plugin
- Requires postcss.config.js maintenance

**Setup:**
```bash
npm install -D @tailwindcss/postcss
```

```javascript
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {}
  }
}
```

**Critical Error:** Cannot use `tailwindcss` directly as PostCSS plugin in v4. Must use `@tailwindcss/postcss` package.

**Sources:**
- [PostCSS Plugin Separation](https://github.com/tailwindlabs/tailwindcss/issues/15735)
- [Vite vs PostCSS Discussion](https://iifx.dev/en/articles/456646231/from-postcss-to-vite-plugin-modernizing-your-tailwind-css-setup)

---

## 9. Migration Automation Tool

### Requirements
- Node.js 20+
- Run from project root

### Usage
```bash
npx @tailwindcss/upgrade@next
```

### What It Automates
- Dependency updates (`package.json`)
- Config file migration (JS → CSS)
- Template file updates (directive changes, utility renames)
- Content path detection

### Manual Review Required
- Custom plugins (v3 plugins incompatible)
- Complex theme functions
- Dynamic class generation
- Third-party integrations

**Sources:**
- [Official Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)
- [Automated Tool Discussion](https://github.com/tailwindlabs/tailwindcss/discussions/15764)

---

## 10. Migration Steps Summary

1. **Backup:** Commit current state
2. **Run upgrade tool:** `npx @tailwindcss/upgrade@next`
3. **Remove old packages:** Uninstall `@astrojs/tailwind`, `postcss`, `autoprefixer`
4. **Install Vite plugin:** `npm install -D @tailwindcss/vite`
5. **Update astro.config.mjs:** Add `@tailwindcss/vite` to Vite plugins
6. **Migrate CSS file:**
   - Replace `@tailwind` directives with `@import "tailwindcss"`
   - Create `@theme {}` block
   - Migrate colors: `--color-primary-500: #f97316`
   - Migrate fonts: `--font-sans: Inter, system-ui, sans-serif`
7. **Handle container:** Choose utility class approach or custom component
8. **Update templates:** Fix `shadow-sm` → `shadow-xs`, `blur-sm` → `blur-xs`
9. **Delete:** `tailwind.config.mjs`, `postcss.config.js`
10. **Test:** Verify build, HMR, visual appearance

---

## Unresolved Questions

1. **Plugin Compatibility:** Are any v3 Tailwind plugins in use? (e.g., forms, typography, aspect-ratio). Need migration strategy.
2. **Dynamic Classes:** Any programmatic class generation (e.g., `bg-${color}-500`)? v4 CSS variables may require refactor.
3. **Build Performance:** Current build times? Need baseline to measure 5x improvement claim.
4. **Browser Support:** Do target users meet Safari 16.4+/Chrome 111+ requirements? May affect adoption timeline.
5. **Component Library:** Any third-party components relying on v3 config structure? Check compatibility.

---

## Sources

- [Tailwind CSS v4.0 Official Blog](https://tailwindcss.com/blog/tailwindcss-v4)
- [Upgrade Guide - Official Docs](https://tailwindcss.com/docs/upgrade-guide)
- [CSS-First Configuration Medium Article](https://medium.com/@oumuamuaa/transitioning-from-tailwind-config-js-to-css-first-in-tailwind-css-v4-4afb3bfca4ee)
- [Theme Variables Documentation](https://tailwindcss.com/docs/theme)
- [Astro + Tailwind v4 Guide](https://tailkits.com/blog/astro-tailwind-setup/)
- [PostCSS Plugin Issue #15735](https://github.com/tailwindlabs/tailwindcss/issues/15735)
- [Container Changes Discussion](https://github.com/tailwindlabs/tailwindcss/discussions/14801)
- [Custom Fonts in v4](https://harrisonbroadbent.com/blog/tailwind-custom-fonts/)
- [Multi-Theme Strategy](https://simonswiss.com/posts/tailwind-v4-multi-theme)
- [Complete Migration Guide - DEV.to](https://dev.to/elechipro/migrating-from-tailwind-css-v3-to-v4-a-complete-developers-guide-cjd)
