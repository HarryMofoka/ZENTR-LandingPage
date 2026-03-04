/**
 * @file TestimonialCard.jsx
 * @description A single testimonial quote card for the scrolling marquee.
 *
 * PURPOSE
 * ───────
 * Displays a client quotation with their name, initials avatar, and
 * company/title. Used inside the Testimonials section's infinite-scroll
 * marquee, where multiple cards scroll horizontally in a loop.
 *
 * WHY initials instead of photos?
 * ──────────────────────────────
 * The design deliberately avoids photographs to maintain the abstract,
 * technical aesthetic. Monospace-font initials inside a bordered circle
 * feel consistent with the grid/engineering design language.
 *
 * @param {Object} props
 * @param {string} props.quote - The testimonial text.
 * @param {string} props.initials - Two-letter avatar text (e.g. "AM").
 * @param {string} props.name - Person's full name.
 * @param {string} props.role - Title and company (e.g. "CEO, Apex Dynamics").
 *
 * PERFORMANCE: React.memo — rendered 4× in the marquee, prevents re-renders.
 *
 * @returns {JSX.Element} A styled testimonial card.
 */

import { memo } from 'react';

export default memo(function TestimonialCard({ quote, initials, name, role }) {
    return (
        <div className="glass-card w-[450px] p-8 rounded-2xl flex flex-col justify-between shrink-0 hover:border-white/20 transition-all duration-300 group cursor-default">
            {/* ── Quote Icon ─────────────────────────────────────────────────
       *
       * A decorative quotation mark icon that transitions to red on hover,
       * visually reinforcing that the card contains a quote.
       * ──────────────────────────────────────────────────────────────── */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                className="text-neutral-500 mb-6 group-hover:text-red-500 transition-colors"
                aria-hidden="true"
            >
                <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1a6 6 0 0 0 6-6V5a2 2 0 0 0-2-2zM5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1a6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"
                />
            </svg>

            {/* ── Quote Text ─────────────────────────────────────────────── */}
            <blockquote className="text-xl text-neutral-200 font-light leading-snug mb-8 font-syne">
                &ldquo;{quote}&rdquo;
            </blockquote>

            {/* ── Author Info ────────────────────────────────────────────── */}
            <div className="flex items-center gap-4">
                {/* Initials avatar */}
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center font-mono text-xs text-white">
                    {initials}
                </div>
                <div>
                    <div className="text-white text-sm font-medium">{name}</div>
                    <div className="text-neutral-500 text-xs">{role}</div>
                </div>
            </div>
        </div>
    );
})
