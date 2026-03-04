/**
 * @file ExplorationCard.jsx
 * @description A single card in the "Areas of Exploration" grid.
 *
 * PURPOSE
 * ───────
 * Each card showcases one of ZENTR's capability areas (Identity, Interface,
 * System, Analysis) with:
 * - A visual illustration (passed as `children`)
 * - A numbered label
 * - A title and description
 * - A "call-to-action" link at the bottom
 *
 * WHY `children` for the visual?
 * ─────────────────────────────
 * Each card has a unique visual (isometric cubes, browser mockup, code block,
 * bar chart). These are too different to parameterise with props, so we
 * accept them as `children` and render them inside the standard card frame.
 * This keeps the card component focused on layout and typography, while the
 * parent component handles the bespoke visuals.
 *
 * @param {Object} props
 * @param {string} props.number - Two-digit label (e.g. "01", "02").
 * @param {string} props.title - Card heading.
 * @param {string} props.description - Short description text.
 * @param {string} props.linkText - Label for the bottom link.
 * @param {React.ReactNode} props.children - Visual/illustration content.
 *
 * @returns {JSX.Element} A styled exploration card.
 */

export default function ExplorationCard({
    number,
    title,
    description,
    linkText,
    children,
}) {
    return (
        <div className="group flex flex-col hover:bg-white/[0.05] transition-colors duration-500 p-6 md:p-8 relative">
            {/* ── Visual Area ───────────────────────────────────────────────
       *
       * `aspect-video` maintains a 16:9 ratio regardless of content,
       * ensuring all cards have uniform visual heights.
       *
       * The dot-grid background (`bg-[radial-gradient(#ffffff_1px,...)]`)
       * inside some cards is rendered by the parent component via children.
       * ──────────────────────────────────────────────────────────────── */}
            <div className="aspect-video overflow-hidden flex flex-col group transition-all duration-500 bg-neutral-900/50 w-full border border-white/5 rounded mb-8 relative items-center justify-center">
                {children}
            </div>

            {/* ── Text Content ─────────────────────────────────────────────── */}
            <div className="flex flex-col flex-grow">
                <span className="font-mono text-neutral-500 text-xs block mb-3">
                    {number}
                </span>
                <h3 className="text-xl text-white font-medium uppercase tracking-wide mb-3 font-syne">
                    {title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                    {description}
                </p>
            </div>

            {/* ── Bottom Link ──────────────────────────────────────────────
       *
       * Separated from the text content by a thin border-top.
       * The arrow icon shifts right on hover for interactive feedback.
       * `mt-auto` pushes this to the bottom of the flex container,
       * keeping all card links vertically aligned even when descriptions
       * have different lengths.
       * ──────────────────────────────────────────────────────────────── */}
            <div className="mt-auto pt-6 border-t border-white/5">
                <a
                    href="#"
                    className="text-xs text-neutral-500 group-hover:text-white transition-colors flex items-center gap-2"
                >
                    {linkText}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        className="group-hover:translate-x-1 transition-transform"
                        aria-hidden="true"
                    >
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h14m-7-7l7 7l-7 7"
                        />
                    </svg>
                </a>
            </div>
        </div>
    );
}
