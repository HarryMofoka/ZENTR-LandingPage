/**
 * @file LogoItem.jsx
 * @description A single icon + label pair in the logo marquee strip.
 *
 * PURPOSE
 * ───────
 * Renders one "partner/capability" badge consisting of an SVG icon
 * and a text label. Multiple `LogoItem`s are arranged side-by-side
 * inside the `LogoMarquee` component's infinite-scroll container.
 *
 * WHY accept `svgPath` instead of a full SVG component?
 * ────────────────────────────────────────────────────
 * All icons in the marquee share the same SVG wrapper attributes
 * (size, viewBox, stroke styles). Only the inner `<path>` or `<g>`
 * content differs. Accepting `children` for the SVG internals keeps
 * the API simple and avoids importing a separate icon library.
 *
 * @param {Object} props
 * @param {string} props.label - The text label displayed beside the icon.
 * @param {React.ReactNode} props.children - SVG inner content (`<path>`, `<g>`, etc.).
 *
 * @returns {JSX.Element} A styled icon + label pair.
 */

export default function LogoItem({ label, children }) {
    return (
        <div className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-300 group">
            {/* ── Icon Container ─────────────────────────────────────────────
       *
       * Shared SVG wrapper with consistent sizing (24×24).
       * On hover, the icon colour transitions to red-500 to provide
       * interactive feedback and reinforce the brand accent colour.
       * ──────────────────────────────────────────────────────────────── */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="w-6 h-6 group-hover:text-red-500 transition-colors"
                aria-hidden="true"
            >
                {children}
            </svg>

            <span className="text-lg font-semibold font-syne tracking-tight">
                {label}
            </span>
        </div>
    );
}
