/**
 * @file Testimonials.jsx
 * @description Client testimonials section with infinite-scroll marquee.
 *
 * LAYOUT
 * ──────
 * Same sidebar+content pattern:
 *
 *  ┌──────────┬──────────────────────────────────┐
 *  │ Sidebar  │ ← Scrolling testimonial cards →  │
 *  └──────────┴──────────────────────────────────┘
 *
 * The content area is an auto-scrolling horizontal marquee containing
 * 3 testimonial cards + 1 duplicate (of the first card) for seamless looping.
 *
 * WHY duplicate the first card?
 * ────────────────────────────
 * With 3 cards, the marquee would leave a visible gap at the loop point.
 * Adding a 4th card (duplicate of card 1) fills the gap and ensures
 * the scrolling is seamless at the `translateX(-50%)` reset point.
 *
 * TESTIMONIAL DATA
 * ────────────────
 * The testimonials are stored in a `TESTIMONIALS` config array at the
 * top of this file. This makes it easy to add, remove, or edit
 * testimonials without touching the rendering logic.
 *
 * @returns {JSX.Element} The complete Testimonials section.
 */

import SectionSidebar from '../AreasOfExploration/SectionSidebar';
import TestimonialCard from './TestimonialCard';

/**
 * Testimonial data configuration.
 *
 * Each entry maps to a TestimonialCard component with matching props.
 * The `id` field is used as the React `key` for efficient list rendering.
 */
const TESTIMONIALS = [
    {
        id: 'alex-morgan',
        quote:
            'The attention to detail and creative direction provided completely redefined our brand identity.',
        initials: 'AM',
        name: 'Alex Morgan',
        role: 'CEO, Apex Dynamics',
    },
    {
        id: 'sarah-chen',
        quote:
            'A masterclass in design systems. The scalability and performance have exceeded our wildest expectations.',
        initials: 'SC',
        name: 'Sarah Chen',
        role: 'CTO, Nexus Corp',
    },
    {
        id: 'marcus-thorne',
        quote:
            'Transformation was instant. We saw metrics improve overnight thanks to the new user experience strategy.',
        initials: 'MT',
        name: 'Marcus Thorne',
        role: 'Director, Horizon Ventures',
    },
];

export default function Testimonials() {
    return (
        <section className="relative z-20 w-full border-t border-white/10 glass-section">
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
                {/* ── Sidebar ────────────────────────────────────────────────── */}
                <SectionSidebar
                    label="/// OBSERVATIONS"
                    title="Voices"
                    description="Perspectives from those who have interacted with the system."
                    buttonText="Read Observations"
                />

                {/* ── Marquee Track ──────────────────────────────────────────── */}
                <div className="md:col-span-3 relative overflow-hidden flex items-center bg-transparent">
                    {/* Gradient edge fades — identical logic to LogoMarquee */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 z-20 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 z-20 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />

                    {/* ── Scrolling Container ──────────────────────────────────
           *
           * All 3 testimonials + a duplicate of the first one.
           * The duplicate ensures seamless looping at the 50% reset.
           * ──────────────────────────────────────────────────────────── */}
                    <div className="flex gap-6 py-16 animate-marquee-infinite w-max pl-8">
                        {TESTIMONIALS.map((t) => (
                            <TestimonialCard key={t.id} {...t} />
                        ))}
                        {/* Duplicate of first card for seamless loop */}
                        <TestimonialCard
                            key={`dup-${TESTIMONIALS[0].id}`}
                            {...TESTIMONIALS[0]}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
