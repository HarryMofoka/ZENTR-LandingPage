/**
 * @file HeroCenterTitle.jsx
 * @description The large "ZENTR" display text centred over the hero grid.
 *
 * PURPOSE
 * ───────
 * This is the single most prominent typographic element on the page.
 * It sits absolutely centred (both horizontally and vertically) over the
 * 4-column hero grid, creating a bold brand statement that overlaps the
 * structural columns underneath.
 *
 * WHY `mix-blend-plus-lighter`?
 * ────────────────────────────
 * This blend mode adds the luminance values of the text and the layers
 * below (Spline 3D background, grid lines). The result is that the text
 * appears to "glow" where it overlaps bright background elements, creating
 * a seamless integration with the animated 3D scene rather than sitting
 * flatly on top of it.
 *
 * WHY `pointer-events-none`?
 * ─────────────────────────
 * The title overlaps clickable hero buttons. Disabling pointer events on
 * the title container ensures clicks "pass through" to the interactive
 * elements underneath.
 *
 * WHY hidden on mobile (`hidden md:block`)?
 * ─────────────────────────────────────────
 * The `text-huge` size (up to 20rem) causes overflow issues on narrow
 * viewports. On mobile devices, the hero description text and CTA button
 * serve as the primary entry point instead.
 *
 * @returns {JSX.Element} The centred hero title.
 */

export default function HeroCenterTitle() {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-10 pointer-events-none hidden md:block">
            <h1 className="text-huge leading-[0.85] text-white tracking-tighter font-syne font-semibold opacity-90 mix-blend-plus-lighter animate-in">
                ZENTR
            </h1>
        </div>
    );
}
