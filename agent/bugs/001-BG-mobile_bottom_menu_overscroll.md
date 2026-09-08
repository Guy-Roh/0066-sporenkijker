# 001-BG-mobile_bottom_menu_overscroll

## Root of the task
Plain explanation:
On mobile devices, touching and dragging or holding down the bottom menu panel causes the browser window to scroll and overscroll rubber-band, showing empty space under the app.

Technical explanation:
The html, body, and main containers lack explicit height boundaries (100dvh), overflow hidden constraints, and overscroll-behavior none rules. In addition, touch-action is not constrained on the panels or viewport, which allows touchmove gestures on the bottom menu to propagate to the window scroll container on mobile browsers.

## Proposed Implementation
1. Add html, body, and main viewport styles in globals.scss with height 100dvh, width 100%, overflow hidden, and overscroll-behavior none.
2. Add touch-action none to .main-panel and .platform-panel to block gesture scrolling from propagating to the document.
3. Export a Viewport configuration in layout.tsx to constrain viewport scaling and sizing on mobile devices according to Next.js documentation [Next.js Viewport Documentation](https://nextjs.org/docs/app/api-reference/functions/generate-viewport).

## Scope
Touches:
- src/app/styles/globals.scss
- src/app/layout.tsx

Does not touch:
- 3D scene components or WebGPU canvas logic
- API routes or train data handlers

## Attempts

### Attempt 1
- Added 100dvh, overflow: hidden, and overscroll-behavior: none to html, body, and main in globals.scss.
- Added touch-action: none to aside.main-panel and .platform-panel.
- Exported Viewport configuration in layout.tsx with width device-width, initialScale 1, maximumScale 1, and userScalable false.
- Build succeeded with bun run build.
