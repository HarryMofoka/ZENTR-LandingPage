/**
 * @file Features.jsx
 * @description "Core Principles" section with three feature cards.
 *
 * LAYOUT
 * ──────
 * Same 4-column sidebar+content pattern as other sections:
 *
 *  ┌──────────┬──────────┬──────────┬──────────┐
 *  │ Sidebar  │ Velocity │Foundation│Scalability│
 *  └──────────┴──────────┴──────────┴──────────┘
 *
 * FEATURES
 * ────────
 * 1. **Velocity** — Performance bars that light up red on hover with
 *    staggered delays, visualising speed and efficiency.
 *
 * 2. **Foundation** — A spinning dashed circle with a lock icon inside,
 *    representing security and stability. The spin animation is pure CSS
 *    (`animate-[spin_10s_linear_infinite]`) for maximum performance.
 *
 * 3. **Scalability** — An SVG line graph with a gradient fill that
 *    intensifies on hover, representing upward growth.
 *
 * @returns {JSX.Element} The complete Features section.
 */

import SectionSidebar from '../AreasOfExploration/SectionSidebar';
import FeatureCard from './FeatureCard';

export default function Features() {
    return (
        <section className="relative z-20 w-full border-t border-white/10 glass-section">
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
                {/* ── Sidebar ────────────────────────────────────────────────── */}
                <SectionSidebar
                    label="/// FEATURES"
                    title="Core Principles"
                    description="Crafted with precision to enhance digital presence through cutting-edge technology."
                    buttonText="Explore Principles"
                />

                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
                    {/* ── Feature 1: Velocity ──────────────────────────────────
           *
           * Performance bars with staggered hover transitions.
           *
           * WHY different delays (0, 75ms, 100ms, 150ms)?
           * Staggered delays create a sequential "wave" effect that
           * feels more dynamic than all bars animating simultaneously.
           * The variation in default heights (40%, 60%, 80%, 50%)
           * prevents a monotonous staircase pattern.
           * ──────────────────────────────────────────────────────────── */}
                    <FeatureCard
                        title="Velocity"
                        description="Optimized for speed and efficiency."
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                            </svg>
                        }
                    >
                        <div className="relative h-24 w-full flex items-end gap-1.5 mt-8">
                            <div className="w-full bg-red-900/20 rounded-t-[2px] h-[40%] group-hover:bg-red-500/80 transition-all duration-500" />
                            <div className="w-full bg-red-900/20 rounded-t-[2px] h-[60%] group-hover:bg-red-500/80 transition-all duration-500 delay-75" />
                            <div className="w-full bg-red-900/20 rounded-t-[2px] h-[80%] group-hover:bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all duration-500 delay-100" />
                            <div className="w-full bg-red-900/20 rounded-t-[2px] h-[50%] group-hover:bg-red-500/80 transition-all duration-500 delay-150" />
                        </div>
                    </FeatureCard>

                    {/* ── Feature 2: Foundation ─────────────────────────────────
           *
           * Spinning dashed circle + lock icon representing security.
           *
           * WHY `animate-[spin_10s_linear_infinite]`?
           * Using Tailwind's arbitrary animation shorthand avoids the
           * need for a separate @keyframes rule. The slow 10s duration
           * keeps the spin subtle and non-distracting.
           * ──────────────────────────────────────────────────────────── */}
                    <FeatureCard
                        title="Foundation"
                        description="Built with stability as a priority."
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                                    <path d="m9 12l2 2l4-4" />
                                </g>
                            </svg>
                        }
                    >
                        <div className="relative w-full h-24 mt-8 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full border border-dashed border-neutral-700 animate-[spin_10s_linear_infinite] group-hover:border-red-500 transition-colors" />
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="absolute text-neutral-600 group-hover:text-red-500 transition-colors" aria-hidden="true">
                                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </g>
                            </svg>
                        </div>
                    </FeatureCard>

                    {/* ── Feature 3: Scalability ────────────────────────────────
           *
           * SVG line chart with area fill.
           *
           * WHY `preserveAspectRatio="none"`?
           * This stretches the SVG to fill the container width,
           * making the chart responsive. The viewBox coordinates
           * (0 0 100 50) are simple integers for easy path authoring.
           *
           * The line stroke and area fill both transition from a
           * muted red (red-500/20) to full red-500 on hover.
           * ──────────────────────────────────────────────────────────── */}
                    <FeatureCard
                        title="Scalability"
                        description="Grows with system requirements."
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                    <path d="M12 3v18m7-13l3 8a5 5 0 0 1-6 0zV7" />
                                    <path d="M3 7h1a17 17 0 0 0 8-2a17 17 0 0 0 8 2h1M5 8l3 8a5 5 0 0 1-6 0zV7m2 14h10" />
                                </g>
                            </svg>
                        }
                    >
                        <div className="relative w-full h-24 mt-8 bg-neutral-900/50 border border-white/5 rounded overflow-hidden flex items-end">
                            <svg className="w-full h-full text-red-500/20" preserveAspectRatio="none" viewBox="0 0 100 50">
                                <path
                                    d="M0,50 L20,40 L40,45 L60,20 L80,25 L100,5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="group-hover:text-red-500 transition-colors duration-500"
                                />
                                <path
                                    d="M0,50 L20,40 L40,45 L60,20 L80,25 L100,5 V50 H0 Z"
                                    fill="currentColor"
                                    className="opacity-20 group-hover:opacity-40 transition-opacity"
                                />
                            </svg>
                        </div>
                    </FeatureCard>
                </div>
            </div>
        </section>
    );
}
