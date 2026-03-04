/**
 * @file TextBanner.jsx
 * @description Full-width statement section — "+10 years in the game."
 *
 * PURPOSE
 * ───────
 * A bold typographic interlude that punctuates the scrolling experience.
 * Placed between the "Areas of Exploration" and "Features" sections,
 * it serves as a credibility statement that reinforces ZENTR's experience.
 *
 * WHY a dedicated component for a single heading?
 * ───────────────────────────────────────────────
 * Although the content is minimal, the section includes a complex grid
 * overlay with decorative "+" markers, the glassmorphism background,
 * and responsive padding. Isolating it keeps `App.jsx` clean and makes
 * it easy to swap the statement text (e.g. for A/B testing) without
 * touching unrelated components.
 *
 * WHY `drop-shadow-lg` on the heading?
 * ────────────────────────────────────
 * The text sits on a glass section with a semi-transparent background.
 * A subtle drop shadow lifts the text visually off the background,
 * improving legibility over the busy 3D scene behind the glass layer.
 *
 * @returns {JSX.Element} The text banner section.
 */

export default function TextBanner() {
    return (
        <section className="relative z-20 w-full border-t border-white/10 glass-section overflow-hidden">
            {/* ── Decorative Grid Overlay ──────────────────────────────────
       *
       * Same 4-column grid + "+" markers used in other sections.
       * Ensures visual continuity across the full page.
       * ──────────────────────────────────────────────────────────────── */}
            <div className="absolute inset-0 w-full h-full grid grid-cols-1 md:grid-cols-4 pointer-events-none">
                {[0, 1, 2].map((i) => (
                    <div key={i} className="border-r border-white/10 h-full hidden md:block relative">
                        <div className="absolute -right-[5px] -top-[5px] text-white/30 text-[10px]">+</div>
                    </div>
                ))}
                <div className="hidden md:block" />
            </div>

            {/* ── Content ──────────────────────────────────────────────────
       *
       * The heading spans 3 of 4 columns (md:col-span-3), leaving
       * the first column as whitespace. This right-alignment creates
       * asymmetry that draws the eye and avoids a centred-text look
       * which would feel too formal for a bold statement.
       * ──────────────────────────────────────────────────────────────── */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 w-full">
                <div className="hidden md:block" />
                <div className="md:col-span-3 flex items-center py-24 md:py-32 px-8">
                    <h2 className="text-5xl md:text-7xl lg:text-9xl font-syne tracking-tighter text-white leading-none font-medium drop-shadow-lg">
                        +10 years in the game.
                    </h2>
                </div>
            </div>
        </section>
    );
}
