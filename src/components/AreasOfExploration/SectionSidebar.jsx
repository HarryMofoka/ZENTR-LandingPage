/**
 * @file SectionSidebar.jsx
 * @description Reusable left sidebar used by multiple page sections.
 *
 * PURPOSE
 * ───────
 * Several sections (Areas of Exploration, Features, Testimonials, Footer)
 * share an identical sidebar pattern:
 *
 *  ┌───────────────┐
 *  │ /// LABEL      │  ← monospace red label
 *  │ Title          │  ← large Syne heading
 *  │ Description    │  ← neutral body text
 *  │                │
 *  │ [ Button ]     │  ← optional CTA at the bottom
 *  └───────────────┘
 *
 * Extracting this into a shared component eliminates ~30 lines of
 * duplicated markup per section and ensures visual consistency.
 *
 * WHY props instead of children?
 * ────────────────────────────
 * The sidebar's structure is rigid (label → title → text → button).
 * Using named props (`label`, `title`, `description`, `buttonText`)
 * makes the API self-documenting and prevents accidental misuse,
 * unlike a freeform `children` approach.
 *
 * @param {Object} props
 * @param {string} props.label - Monospace label (e.g. "/// AREAS OF EXPLORATION").
 * @param {string} props.title - Section heading.
 * @param {string} props.description - Section description text.
 * @param {string} [props.buttonText] - Optional CTA button label. If omitted, no button is rendered.
 * @param {string} [props.buttonVariant='outline'] - Button style: 'outline' (default bordered) or 'solid' (red filled).
 *
 * @returns {JSX.Element} The sidebar column.
 */

export default function SectionSidebar({
    label,
    title,
    description,
    buttonText,
    buttonVariant = 'outline',
}) {
    /**
     * Determine button CSS classes based on the variant.
     *
     * WHY two variants?
     * The "Connect" / footer section uses a filled red button to create
     * a stronger call-to-action, while other sections use a subtle
     * outline button that doesn't compete with the main content area.
     */
    const buttonClasses =
        buttonVariant === 'solid'
            ? 'w-max px-6 py-3 bg-red-600 text-white rounded-full text-xs font-medium uppercase tracking-widest hover:bg-red-700 transition-colors reveal-hidden shadow-[0_0_20px_rgba(239,68,68,0.4)]'
            : 'w-max px-6 py-2 border border-white/10 rounded-full text-xs font-medium uppercase tracking-widest hover:bg-white hover:text-black transition-colors reveal-hidden';

    return (
        <div className="p-6 md:p-8 md:col-span-1 flex flex-col justify-between h-full min-h-[280px] md:min-h-[400px] bg-white/[0.01]">
            <div>
                <span className="font-mono text-red-500 text-xs block mb-4">
                    {label}
                </span>
                <h2 className="text-3xl font-syne tracking-tight text-white mb-4 font-medium reveal-hidden">
                    {title}
                </h2>
                <p className="text-neutral-400 text-sm leading-relaxed mb-8 reveal-hidden">
                    {description}
                </p>
            </div>

            {/* Render the CTA button only if `buttonText` is provided */}
            {buttonText && (
                <button className={buttonClasses}>
                    {buttonText}
                </button>
            )}
        </div>
    );
}
