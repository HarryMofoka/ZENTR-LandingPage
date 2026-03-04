/**
 * @file Hero.jsx
 * @description The full-viewport hero section for the ZENTR landing page.
 *
 * LAYOUT
 * ──────
 * The hero is a 4-column grid (`md:grid-cols-4`) that fills the entire
 * viewport height (`min-h-screen`). Its visual structure is:
 *
 *  ┌──────────┬──────────┬──────────┬──────────┐
 *  │  Col 1   │  Col 2   │  Col 3   │  Col 4   │
 *  │ (label + │ (empty   │ (empty   │ (menu +  │
 *  │  desc)   │  spacer) │  spacer) │  CTA)    │
 *  └──────────┴──────────┴──────────┴──────────┘
 *              ↑ "ZENTR" title floats centred on top
 *
 * On mobile, only columns 1 and 4 are visible. The empty spacer columns
 * and the centred title are hidden to prevent overflow.
 *
 * SUB-COMPONENTS
 * ──────────────
 * • `HeroItem`        — Individual column with beam divider + corner marker
 * • `HeroCenterTitle` — The large floating "ZENTR" text
 *
 * WHY separate sub-components?
 * ───────────────────────────
 * The hero section's JSX is complex (4 columns + floating title + animations).
 * Breaking it into `HeroItem` and `HeroCenterTitle` keeps each file focused
 * on a single responsibility and under ~100 lines, which is much easier
 * to read and maintain than a monolithic 200-line component.
 *
 * @returns {JSX.Element} The complete hero section.
 */

import HeroItem from './HeroItem';
import HeroCenterTitle from './HeroCenterTitle';

export default function Hero() {
    return (
        <div className="relative z-20 w-full grid grid-cols-1 md:grid-cols-4 min-h-screen">
            {/* ── Column 1: Label + Description ────────────────────────────── */}
            <HeroItem beamDelay="0s">
                {/* Section label — monospace font with a red accent for the
         * numbering convention (/// 01) used throughout the site. */}
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-mono tracking-wider text-red-500">
            /// 01
                    </span>
                    <span className="text-xs tracking-widest uppercase text-neutral-400 font-medium mt-2">
                        Design Experiment
                    </span>
                </div>

                {/* Brief description — placed at the bottom of the column
         * using `mt-auto` to push it down in the flex container. */}
                <div className="mt-auto mb-8 max-w-xs">
                    <p className="text-sm text-neutral-300 leading-relaxed font-normal animate-in">
                        A motion-first design study exploring structure, rhythm, and digital
                        systems.
                    </p>
                </div>
            </HeroItem>

            {/* ── Columns 2 & 3: Empty Spacers ─────────────────────────────
       *
       * These columns are intentionally empty. They exist to maintain
       * the 4-column grid structure and provide visual breathing room
       * around the centred ZENTR title. Their beam dividers add to
       * the scanning/monitoring aesthetic.
       * ──────────────────────────────────────────────────────────────── */}
            <HeroItem hiddenOnMobile beamDelay="1.5s" />
            <HeroItem hiddenOnMobile beamDelay="3s" />

            {/* ── Column 4: Menu Button + CTA ──────────────────────────────── */}
            <HeroItem showBeam={false} className="md:p-8 pt-6 pr-6 pb-6 pl-6">
                {/* Menu button — positioned at the top-right on desktop */}
                <div className="flex justify-end md:justify-start">
                    <button className="flex items-center gap-2 text-xs text-white font-medium hover:text-red-500 transition-colors uppercase tracking-widest border border-white/10 px-4 py-2 rounded-full bg-neutral-900/50 backdrop-blur-sm animate-in">
                        Menu
                        {/* Hamburger icon (three horizontal lines) */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 5h16M4 12h16M4 19h16"
                            />
                        </svg>
                    </button>
                </div>

                {/* ── CTA Button with Spinning Border ──────────────────────────
         *
         * The "Explore the System" button features a conic-gradient border
         * that rotates on hover. This is achieved by layering:
         * 1. An outer div with the conic-gradient background + blur
         *    (visible only on hover via `opacity-0 group-hover:opacity-100`)
         * 2. The actual button on top with a solid dark background
         *
         * WHY a pseudo-element-like approach with two divs?
         * CSS conic-gradient borders cannot be animated with just
         * `border-image`. The two-div layering technique with `absolute`
         * positioning and `-inset-[1px]` creates a 1px gradient border
         * that can rotate independently.
         * ──────────────────────────────────────────────────────────────── */}
                <div className="flex justify-end md:justify-start mt-auto mb-8">
                    <div className="relative group cursor-pointer">
                        {/* Spinning gradient border (only visible on hover) */}
                        <div className="absolute -inset-[1px] rounded-full bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_300deg,#ef4444_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-border-spin blur-[0.5px]" />

                        <button className="relative bg-neutral-950/80 backdrop-blur-md border border-white/10 text-neutral-300 px-6 py-3 rounded-full flex items-center gap-3 shadow-lg group-hover:text-white group-hover:border-transparent transition-all duration-300 animate-in">
                            <span className="text-xs font-medium tracking-widest uppercase">
                                Explore the System
                            </span>
                            {/* Arrow icon — shifts right on hover for interactive feedback */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="group-hover:translate-x-1 transition-transform"
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
                        </button>
                    </div>
                </div>
            </HeroItem>

            {/* ── Centred Brand Title ───────────────────────────────────────── */}
            <HeroCenterTitle />
        </div>
    );
}
