/**
 * @file FeatureCard.jsx
 * @description A single card in the "Core Principles" / Features section.
 *
 * PURPOSE
 * ───────
 * Each feature card presents one of ZENTR's core principles (Velocity,
 * Foundation, Scalability) with:
 * - An icon in a circular container
 * - A title and description
 * - A micro-animation visual (passed as `children`)
 *
 * The icon container transitions from a dark background to red on hover,
 * and the icon colour inverts (red → white). This provides clear
 * interactive feedback and highlights the active card.
 *
 * WHY `children` for the micro-animation?
 * ──────────────────────────────────────
 * Each card has a completely different animated visual (bar chart,
 * spinning lock, line graph). Using `children` allows the parent
 * component to supply card-specific markup without bloating this
 * component with conditional rendering logic.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.icon - SVG icon JSX for the circular container.
 * @param {string} props.title - Feature heading.
 * @param {string} props.description - Short description text.
 * @param {React.ReactNode} props.children - Micro-animation visual.
 *
 * @returns {JSX.Element} A styled feature card.
 */

export default function FeatureCard({ icon, title, description, children }) {
    return (
        <div className="group p-6 md:p-8 flex flex-col justify-between hover:bg-white/[0.05] transition-colors">
            <div>
                {/* ── Icon Container ─────────────────────────────────────────
         *
         * Circular container that transitions:
         * - Default: dark bg (white/5) + red icon
         * - Hover:   red bg (red-500) + white icon
         *
         * WHY this colour swap?
         * It creates a "fill" effect that feels like the feature is
         * being activated, reinforcing the interactive nature of the
         * card without needing JavaScript state changes.
         * ──────────────────────────────────────────────────────────── */}
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center mb-4 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                    {icon}
                </div>
                <h3 className="text-white font-medium mb-2 font-syne">{title}</h3>
                <p className="text-neutral-500 text-sm">{description}</p>
            </div>

            {/* ── Micro-Animation Visual ───────────────────────────────────
       *
       * Rendered at the bottom of the card. The parent component
       * supplies the specific animation (bars, spinner, graph).
       * ──────────────────────────────────────────────────────────── */}
            {children}
        </div>
    );
}
