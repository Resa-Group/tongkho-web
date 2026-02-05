# Phase 01: Configure astro.config.mjs

## Context Links

- [Research: Astro Image Component](./research/researcher-01-astro-image-component.md)
- [Current config](../astro.config.mjs)

## Overview

- **Priority:** High (blocks other phases)
- **Status:** pending
- **Effort:** 30 minutes

Add image optimization settings to Astro config for responsive images, CLS prevention, and future remote domain support.

## Key Insights

- Astro 5.x supports `image.layout: 'constrained'` for automatic responsive styles
- `responsiveStyles: true` generates CSS to prevent layout shift
- Remote domains needed for future CDN integration

## Requirements

### Functional

- Enable responsive image layout
- Configure breakpoints for mobile/tablet/desktop
- Prepare remote domain patterns for future API

### Non-Functional

- Zero runtime JS (build-time only)
- Maintain SSR compatibility

## Architecture

```
astro.config.mjs
├── image.layout: 'constrained'
├── image.responsiveStyles: true
├── image.breakpoints: [320, 640, 1024, 1280]
└── image.remotePatterns: (prepared for future)
```

## Related Code Files

### Files to Modify

- `astro.config.mjs` - Add image configuration block

## Implementation Steps

1. Open `astro.config.mjs`
2. Add `image` configuration object after `build` section:

```javascript
image: {
  layout: 'constrained',
  responsiveStyles: true,
  breakpoints: [320, 640, 1024, 1280],
  // Prepared for future CDN integration
  // domains: ['api.tongkhobds.com'],
  // remotePatterns: [{
  //   protocol: 'https',
  //   hostname: '*.tongkhobds.com',
  //   pathname: '/images/**'
  // }]
},
```

3. Run `npm run build` to verify config is valid
4. Run `npm run dev` to test local development

## Todo List

- [ ] Add image config to astro.config.mjs
- [ ] Verify build succeeds
- [ ] Verify dev server starts

## Success Criteria

- Config added without syntax errors
- Build completes successfully
- Dev server starts without warnings

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Config syntax error | Build fails | Test immediately after change |
| Breaking SSR | Site down | Verify with `npm run preview` |

## Security Considerations

- Remote domains commented out until backend ready
- No external dependencies added

## Next Steps

- Proceed to Phase 02: Reorganize Assets
