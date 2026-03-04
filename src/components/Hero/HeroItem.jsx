/**
 * @file HeroItem.jsx
 * @description A single column in the hero section's 4-column grid.
 *
 * PURPOSE
 * ───────
 * The hero section is divided into 4 vertical columns with thin animated
 * beam dividers between them. Each column can contain arbitrary content
 * (text, buttons, etc.) passed as `children`. This component handles:
 *
 * 1. The animated red beam on the right-edge divider
 * 2. The decorative "+" corner marker
 * 3. Responsive visibility (some columns are hidden on mobile)
 *
 * WHY a separate component?
 * ─────────────────────────
 * Extracting the column into its own component eliminates the repeated
 * beam-divider + corner-marker markup that was duplicated 4× in the
 * original HTML. Now each column is declared with a single `<HeroItem>`
 * tag, making the Hero section's structure much easier to scan.
 *
 * WHY animated beams?
 * ──────────────────
 * The falling beam effect on column borders reinforces the "data scanning"
 * / "high-tech monitoring" aesthetic. Each beam has a different
 * `animation-delay` so they don't all fire in sync, creating a natural,
 * organic rhythm.
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.children] - Content rendered inside the column.
 * @param {boolean} [props.showBeam=true] - Whether to render the animated beam divider.
 * @param {string} [props.beamDelay='0s'] - CSS animation-delay for the beam (staggers beams across columns).
 * @param {boolean} [props.hiddenOnMobile=false] - If true, the column is hidden below the `md` breakpoint.
 * @param {string} [props.className] - Additional CSS classes to merge with the column's base styles.
 *
 * @returns {JSX.Element} A hero grid column.
 */

export default function HeroItem({
    children,
    showBeam = true,
    beamDelay = '0s',
    hiddenOnMobile = false,
    className = '',
}) {
    return (
        <div
            className={`
        ${hiddenOnMobile ? 'hidden md:flex' : 'flex'}
        flex-col p-6 md:p-8 border-b md:border-b-0 border-r border-white/10
        relative justify-between group
        ${className}
      `}
        >
            {/* ── Animated Beam Divider ──────────────────────────────────────
       *
       * A 1px-wide container on the right edge of the column.
       * Inside it, a gradient div slides downward continuously using
       * the `beam-drop` keyframe animation.
       *
       * The red glow is achieved with `shadow-[0_0_15px_rgba(239,68,68,0.5)]`,
       * which adds a colored box-shadow that simulates light emission.
       * ──────────────────────────────────────────────────────────────── */}
            {showBeam && (
                <div className="absolute right-0 top-0 h-full w-[1px] bg-white/5 hidden md:block overflow-hidden">
                    <div
                        className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-red-500 to-transparent animate-beam opacity-80 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                        style={{ animationDelay: beamDelay }}
                    />
                </div>
            )}

            {/* ── Corner "+" Marker ──────────────────────────────────────────
       *
       * A small typographic detail placed at the top-right corner of
       * each column. These markers reinforce the grid/blueprint aesthetic
       * and serve as subtle alignment indicators.
       *
       * WHY negative positioning (-5px)?
       * The "+" is offset outside the column boundary so it sits exactly
       * on the intersection of the column border and the top edge,
       * overlapping both — this is a common print/engineering drawing
       * convention for crop/registration marks.
       * ──────────────────────────────────────────────────────────────── */}
            <div className="absolute -right-[5px] -top-[5px] text-white/30 text-[10px] hidden md:block z-20">
                +
            </div>

            {children}
        </div>
    );
}
