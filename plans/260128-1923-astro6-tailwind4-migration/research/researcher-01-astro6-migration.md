# Astro 6 Beta Migration Research

**Research Date:** 2026-01-28  
**Current Setup:** Astro 5.2.0, @astrojs/react v4.2.0, @astrojs/tailwind v6.0.0, @astrojs/sitemap v3.3.0  
**Target:** Astro 6 Beta

---

## Executive Summary

Astro 6 beta introduces breaking changes: Node 22+ required, Vite 7.0, Zod 4, redesigned dev server, removed/deprecated APIs. Tailwind integration replaced by official Vite plugin. React and sitemap integrations remain compatible.

---

## Critical Breaking Changes

### Version Requirements
- **Node.js:** 22.12.0+ (drops Node 18/20 support)
- **Vite:** Upgraded to 7.0 (uses new Environment API)
- **Zod:** Upgraded to v4
- **Vitest:** v3.2 required (v4 not yet supported)

### Removed APIs
- `Astro.glob()` → use `import.meta.glob()` or content collections
- `<ViewTransitions />` → use `<ClientRouter />` 
- `emitESMImage()` → use `emitImageMetadata()`
- `astro:ssr-manifest` module → use `astro:config/server`
- CommonJS config files (.cjs, .cts) → convert to .mjs, .js, .ts, .mts
- Legacy content collections → migrate to Content Layer API with `glob()` loader
- Session `test` driver → remove from config

### Configuration Changes
- **i18n:** `redirectToDefaultLocale` default changed from `true` to `false` (only works when `prefixDefaultLocale: true`)
- **Script/Style Order:** Now rendered in code order (not reversed)
- **Image Service:** Default crops images, never upscales (may affect existing images)

### Zod 4 Migration
String format validators moved to top-level `z` namespace:
```javascript
// Before (Zod 3)
z.string().email()
views: z.string().transform(Number).default("0")

// After (Zod 4)
z.email()
views: z.string().transform(Number).default(0)
```
Default values must match output types after transforms.

### Content Collections
- Must use Content Layer API with `loader`
- Config moves from `src/content/config.ts` → `src/content.config.ts`
- Remove `type: 'content'` or `type: 'data'` declarations

---

## Integration Compatibility

### @astrojs/react (v4.2.0 → v5.x expected)
**Status:** Compatible with Astro 6 beta  
**Latest:** v4.4.2  
**Changes:** No breaking changes reported for basic usage. Upgrade to latest major when available.  
**Features:** Supports withState(), getActionState(), SSR, hydration, image optimization  
**Note:** Framework components hydration inside MDX improved in Astro 6

### @astrojs/tailwind (v6.0.0 → DEPRECATED)
**Status:** DEPRECATED for Tailwind 4  
**Replacement:** `@tailwindcss/vite` plugin (official Tailwind 4 method)  
**Action Required:** Uninstall @astrojs/tailwind, use `npx astro add tailwind` (Astro 5.2+)  
**Reason:** Tailwind CSS now provides native Vite plugin, preferred for Tailwind 4

**Migration Steps:**
1. Remove `@astrojs/tailwind` from package.json
2. Run `npx astro add tailwind` (auto-configures Vite plugin)
3. Or manually: `npm install @tailwindcss/vite`, add to `astro.config.mjs` vite.plugins
4. Create CSS file with Tailwind imports

### @astrojs/sitemap (v3.3.0 → v3.6.0+)
**Status:** Compatible, upgrade recommended  
**Latest:** v3.6.0  
**Changes:** No breaking changes. New features:
- `customSitemaps` option (include extra sitemaps in sitemap-index.xml)
- `filenameBase` config (customize sitemap XML filenames)
- `namespaces` config (exclude unused XML namespaces: news, xhtml, image, video)
**Limitation:** Cannot generate sitemap entries for dynamic routes in SSR mode

---

## New Features in Astro 6

### Redesigned Dev Server
- Uses Vite's Environment API
- Closes gap between prod and dev
- Better runtime environment alignment

### Live Content Collections (Stable)
- Real-time data updates without rebuild
- Perfect for: live stock prices, inventory, frequently updating data

### Content Security Policy (Stable)
- Protection against XSS and code injection

---

## Migration Steps

### 1. Pre-Migration Checks
- [ ] Verify Node.js 22.12.0+ installed
- [ ] Review Vite 7.0 migration guide for custom plugins/config
- [ ] Audit Zod schemas for v4 compatibility
- [ ] Check content collections config location

### 2. Upgrade Commands
```bash
# Automated upgrade (recommended)
npx @astrojs/upgrade beta

# Manual upgrade
npm install astro@beta
```

### 3. Update Dependencies
```bash
# Replace Tailwind integration
npm uninstall @astrojs/tailwind
npx astro add tailwind

# Update other integrations
npm install @astrojs/react@latest @astrojs/sitemap@latest
```

### 4. Code Changes
- [ ] Replace `Astro.glob()` with `import.meta.glob()`
- [ ] Replace `<ViewTransitions />` with `<ClientRouter />`
- [ ] Update Zod schemas (format validators, default values)
- [ ] Move content config: `src/content/config.ts` → `src/content.config.ts`
- [ ] Add Content Layer API loaders if using content collections
- [ ] Review i18n config (`redirectToDefaultLocale`, `prefixDefaultLocale`)
- [ ] Verify script/style tag ordering in components

### 5. Testing
- [ ] Run dev server: `npm run dev`
- [ ] Check for console errors/warnings
- [ ] Verify image rendering (new crop/upscale behavior)
- [ ] Test content collections
- [ ] Validate sitemap generation
- [ ] Check React component hydration

---

## Risk Assessment

**High Risk:**
- Node version requirement (breaks CI/CD if not Node 22+)
- Zod 4 schema changes (potential runtime errors)
- Content collections migration (significant refactor)
- Image service behavior changes

**Medium Risk:**
- Tailwind integration replacement (config changes)
- i18n routing defaults (affects URL structure)
- Vite 7.0 plugin compatibility

**Low Risk:**
- @astrojs/react upgrade (backward compatible)
- @astrojs/sitemap upgrade (no breaking changes)

---

## Unresolved Questions

1. Are there any custom Vite plugins in use that require Vite 7.0 compatibility checks?
2. Does the project use content collections? If yes, what's the current structure?
3. Are there any custom Zod schemas beyond basic types?
4. Is i18n routing configured? What are current `redirectToDefaultLocale` and `prefixDefaultLocale` values?
5. Are there any images relying on upscaling behavior?

---

## Sources

- [Astro 6 Beta | Astro](https://astro.build/blog/astro-6-beta/)
- [Upgrade to Astro v6 | Docs](https://v6.docs.astro.build/en/guides/upgrade-to/v6/)
- [What's new in Astro 6 | Medium](https://medium.com/@onix_react/whats-new-in-astro-6-cef95c05b62e)
- [Astro + Tailwind v4 Setup: 2026 Quick Guide | Tailkits](https://tailkits.com/blog/astro-tailwind-setup/)
- [@astrojs/tailwind | Docs](https://docs.astro.build/en/guides/integrations-guide/tailwind/)
- [@astrojs/react | Docs](https://docs.astro.build/en/guides/integrations-guide/react/)
- [@astrojs/sitemap | Docs](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- [Vite Migration Guide](https://vite.dev/guide/migration)
- [Zod 4 Changelog](https://zod.dev/v4/changelog)
