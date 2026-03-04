/**
 * @file GridOverlay.jsx
 * @description Decorative thin grid overlay that spans the hero section.
 *
 * PURPOSE
 * ───────
 * This component renders a full-viewport, transparent grid with subtle
 * white border lines. It creates the structured "blueprint" aesthetic
 * that is central to the ZENTR design language.
 *
 * WHY a separate component?
 * ─────────────────────────
 * Although it's a simple `<div>`, isolating it makes the hero section's
 * JSX cleaner and makes the grid easy to toggle on/off or restyle
 * without touching the hero layout logic.
 *
 * WHY `pointer-events-none`?
 * ─────────────────────────
 * The grid sits on top of the page content (z-10) for visual layering,
 * but it must not block clicks on hero buttons or links beneath it.
 * `pointer-events-none` makes the element completely transparent to
 * mouse/touch interactions.
 *
 * @returns {JSX.Element} A transparent grid overlay.
 */

export default function GridOverlay() {
    return (
        <div className="absolute inset-0 z-10 w-full h-full pointer-events-none grid grid-cols-1 border-t border-white/10" />
    );
}
