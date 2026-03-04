/**
 * @file LogoMarquee.jsx
 * @description Infinite-scroll logo/capability strip.
 *
 * PURPOSE
 * ───────
 * A horizontal marquee that continuously scrolls icon+label pairs
 * (Layers, Command, Modules, Energy, Vertex, Pulse, Global) to
 * showcase ZENTR's core capabilities. The marquee pauses on hover
 * so users can read individual items.
 *
 * HOW THE INFINITE LOOP WORKS
 * ───────────────────────────
 * The item set is duplicated: the same 7 items appear twice inside
 * a flex container. The CSS `marquee` keyframe scrolls the container
 * by exactly 50% of its width. When the first set scrolls out of view,
 * the second set is in the exact same position where the first started,
 * creating a seamless loop with no visible "jump" or gap.
 *
 * WHY CSS animation instead of JavaScript?
 * ────────────────────────────────────────
 * CSS animations for simple translateX transforms run on the compositor
 * thread, meaning they're buttery smooth (60fps) even when the main
 * thread is busy with React rendering. A JS-based scroll solution would
 * be less performant and harder to sync with the 40s duration.
 *
 * WHY gradient edge fades?
 * ───────────────────────
 * The left and right edges have gradient overlays that fade the items
 * to the background colour (#0a0a0a / neutral-950). This hides the
 * hard cut-off where items appear/disappear and creates a polished
 * "window" effect.
 *
 * @returns {JSX.Element} The complete marquee section.
 */

import LogoItem from './LogoItem';

/**
 * Configuration array for all marquee items.
 *
 * Each entry is an object with:
 * - `label`    — Display text
 * - `svgContent` — JSX for the SVG inner paths
 *
 * WHY a config array?
 * ──────────────────
 * Extracting the data from the JSX makes it trivial to add, remove,
 * or reorder items without touching the rendering logic. It also
 * enables the duplication trick (we map over the array twice).
 */
const LOGO_ITEMS = [
    {
        label: 'Layers',
        svgContent: (
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
                <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
                <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
            </g>
        ),
    },
    {
        label: 'Command',
        svgContent: (
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        ),
    },
    {
        label: 'Modules',
        svgContent: (
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                <path d="m3.3 7l8.7 5l8.7-5M12 22V12" />
            </g>
        ),
    },
    {
        label: 'Energy',
        svgContent: (
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
        ),
    },
    {
        label: 'Vertex',
        svgContent: (
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16" />
        ),
    },
    {
        label: 'Pulse',
        svgContent: (
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
        ),
    },
    {
        label: 'Global',
        svgContent: (
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20M2 12h20" />
            </g>
        ),
    },
];

export default function LogoMarquee() {
    return (
        <section className="z-20 overflow-hidden glass-section w-full border-t border-white/10 relative">
            {/* ── Decorative Grid Overlay ──────────────────────────────────
       *
       * A 4-column grid with vertical divider lines and "+" corner
       * markers, matching the hero section's grid structure.
       * This creates visual continuity between sections.
       * ──────────────────────────────────────────────────────────────── */}
            <div className="absolute inset-0 w-full h-full grid grid-cols-4 pointer-events-none z-10">
                {[0, 1, 2].map((i) => (
                    <div key={i} className="border-r border-white/10 h-full hidden md:block relative">
                        <div className="absolute -right-[5px] -top-[5px] text-white/30 text-[10px]">+</div>
                    </div>
                ))}
                <div className="hidden md:block" />
            </div>

            {/* ── Marquee Track ────────────────────────────────────────────── */}
            <div className="flex z-0 overflow-hidden py-12 relative items-center">
                {/* Left edge gradient fade */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
                {/* Right edge gradient fade */}
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />

                {/* ── Scrolling Container ──────────────────────────────────────
         *
         * `animate-marquee-infinite` applies the CSS `marquee` keyframe.
         * `min-w-full` ensures the container is at least as wide as
         * the viewport, preventing items from wrapping.
         * The items are rendered twice to achieve the seamless loop.
         * ──────────────────────────────────────────────────────────── */}
                <div className="flex gap-20 animate-marquee-infinite whitespace-nowrap min-w-full">
                    {/* First set of items */}
                    <div className="flex items-center gap-20 shrink-0">
                        {LOGO_ITEMS.map((item) => (
                            <LogoItem key={item.label} label={item.label}>
                                {item.svgContent}
                            </LogoItem>
                        ))}
                    </div>
                    {/* Duplicated set for seamless loop */}
                    <div className="flex items-center gap-20 shrink-0">
                        {LOGO_ITEMS.map((item) => (
                            <LogoItem key={`dup-${item.label}`} label={item.label}>
                                {item.svgContent}
                            </LogoItem>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
