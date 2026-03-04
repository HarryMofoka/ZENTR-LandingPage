/**
 * @file AreasOfExploration.jsx
 * @description Section showcasing ZENTR's four core capability areas.
 *
 * LAYOUT
 * ──────
 * 4-column grid on desktop, full-width stack on mobile:
 *
 *  ┌──────────┬──────────────────────────────────┐
 *  │ Sidebar  │  Exploration Cards (2×2 grid)    │
 *  │ (1 col)  │  Identity │ Interface            │
 *  │          │  System   │ Analysis             │
 *  └──────────┴──────────────────────────────────┘
 *
 * CARD VISUALS
 * ────────────
 * Each card has a unique illustration embedded directly in this file:
 *
 * 1. **Identity** — Three isometric cubes (grey, grey, red) representing
 *    brand building blocks. The outer cubes shift on hover to suggest
 *    modularity and flexibility.
 *
 * 2. **Interface** — A minimal browser mockup with a sidebar and content
 *    grid, representing web/UI design. Floats upward on hover.
 *
 * 3. **System** — A syntax-highlighted code block representing product
 *    development and technical engineering.
 *
 * 4. **Analysis** — An animated bar chart that grows on hover, representing
 *    data-driven strategy and growth.
 *
 * WHY inline SVGs instead of image files?
 * ───────────────────────────────────────
 * SVGs are resolution-independent, animate smoothly with CSS transitions,
 * and add zero network requests. The cubes, browser, and chart are simple
 * enough to maintain as inline markup and benefit from hover-driven
 * CSS transforms (scale, translate) that would be impossible with raster images.
 *
 * @returns {JSX.Element} The Areas of Exploration section.
 */

import SectionSidebar from './SectionSidebar';
import ExplorationCard from './ExplorationCard';

export default function AreasOfExploration() {
    return (
        <section className="z-20 glass-section w-full border-t border-white/10 relative">
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
                {/* ── Sidebar ────────────────────────────────────────────────── */}
                <SectionSidebar
                    label="/// AREAS OF EXPLORATION"
                    title="Areas of Exploration"
                    description="Investigating the boundaries between static design and fluid motion through systematic experimentation."
                    buttonText="View Studies"
                />

                {/* ── Cards Grid ─────────────────────────────────────────────── */}
                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 divide-y divide-x divide-white/10">
                    {/* ── Card 1: Identity ──────────────────────────────────────
           *
           * Isometric cubes SVG — three cubes arranged in a triangular
           * formation. The red cube (right) is the brand accent.
           * Outer cubes shift left/right on hover (`group-hover:-translate-x-2`
           * / `group-hover:translate-x-2`) to suggest modularity.
           * ──────────────────────────────────────────────────────────── */}
                    <ExplorationCard
                        number="01"
                        title="Identity"
                        description="Visual systems that adapt and evolve."
                        linkText="Explore Concept"
                    >
                        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(circle,black_50%,transparent_100%)]" />
                        <div className="z-10 transform transition-transform duration-700 group-hover:scale-110">
                            <svg viewBox="0 0 200 160" className="w-48 h-auto drop-shadow-2xl">
                                {/* Centre cube (light grey) */}
                                <g transform="translate(100, 100)">
                                    <path d="M0,-14 L24,0 L0,14 L-24,0 Z" fill="#e5e5e5" className="opacity-90" />
                                    <path d="M-24,0 L0,14 V40 L-24,26 Z" fill="#525252" />
                                    <path d="M0,14 L24,0 V26 L0,40 Z" fill="#262626" />
                                </g>
                                {/* Left cube (medium grey) — shifts left on hover */}
                                <g transform="translate(60, 80)" className="transition-transform duration-500 group-hover:-translate-x-2">
                                    <path d="M0,-14 L24,0 L0,14 L-24,0 Z" fill="#a3a3a3" />
                                    <path d="M-24,0 L0,14 V40 L-24,26 Z" fill="#404040" />
                                    <path d="M0,14 L24,0 V26 L0,40 Z" fill="#171717" />
                                </g>
                                {/* Right cube (red accent) — shifts right on hover */}
                                <g transform="translate(140, 80)" className="transition-transform duration-500 group-hover:translate-x-2">
                                    <path d="M0,-14 L24,0 L0,14 L-24,0 Z" fill="#ef4444" />
                                    <path d="M-24,0 L0,14 V40 L-24,26 Z" fill="#b91c1c" />
                                    <path d="M0,14 L24,0 V26 L0,40 Z" fill="#991b1b" />
                                </g>
                            </svg>
                        </div>
                    </ExplorationCard>

                    {/* ── Card 2: Interface ─────────────────────────────────────
           *
           * Minimal browser mockup with traffic-light dots, a sidebar,
           * and content placeholders. Floats upward on hover
           * (`group-hover:-translate-y-2`).
           * ──────────────────────────────────────────────────────────── */}
                    <ExplorationCard
                        number="02"
                        title="Interface"
                        description="Crafting immersive digital environments."
                        linkText="View Interaction"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                        <div className="w-3/4 h-3/4 bg-neutral-950 border border-white/10 rounded-lg shadow-2xl flex flex-col overflow-hidden transform group-hover:-translate-y-2 transition-transform duration-500">
                            {/* Browser chrome — traffic light dots */}
                            <div className="h-6 border-b border-white/5 bg-white/[0.02] flex items-center px-2 gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                <div className="w-2 h-2 rounded-full bg-white/20" />
                                <div className="w-2 h-2 rounded-full bg-white/20" />
                            </div>
                            {/* Content area */}
                            <div className="flex-1 p-3 flex gap-3">
                                <div className="w-1/4 h-full bg-white/[0.03] rounded animate-pulse" />
                                <div className="flex-1 h-full flex flex-col gap-2">
                                    <div className="w-full h-16 bg-white/[0.03] rounded" />
                                    <div className="flex gap-2 h-full">
                                        <div className="flex-1 bg-white/[0.03] rounded" />
                                        <div className="flex-1 bg-white/[0.03] rounded" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ExplorationCard>

                    {/* ── Card 3: System ────────────────────────────────────────
           *
           * A styled code block with syntax highlighting using the
           * monospace font. Represents technical/engineering capability.
           *
           * WHY hardcoded code content?
           * The code snippet is purely decorative — it's not functional
           * code. Hardcoding it ensures the visual stays consistent
           * and doesn't break if a code formatter processes the file.
           * ──────────────────────────────────────────────────────────── */}
                    <ExplorationCard
                        number="03"
                        title="System"
                        description="Functional logic for complex structures."
                        linkText="Analyze Code"
                    >
                        <div className="w-5/6 bg-[#09090b] rounded-lg border border-white/10 p-4 font-mono text-[10px] shadow-2xl relative">
                            <div className="absolute -top-3 -right-3 w-8 h-8 bg-red-500/10 rounded-full blur-xl" />
                            <div className="flex flex-col gap-1.5 text-neutral-400">
                                <div>
                                    <span className="text-red-500">const</span>{' '}
                                    <span className="text-white">init</span> ={' '}
                                    <span className="text-red-500">()</span> =&gt; {'{'}
                                </div>
                                <div className="pl-4">
                                    <span className="text-neutral-500">{'// Initialize core'}</span>
                                </div>
                                <div className="pl-4">
                                    <span className="text-orange-400">System</span>.
                                    <span className="text-yellow-400">boot</span>({'{'}
                                </div>
                                <div className="pl-8">
                                    mode: <span className="text-green-400">&apos;secure&apos;</span>,
                                </div>
                                <div className="pl-8">
                                    sync: <span className="text-red-500">true</span>
                                </div>
                                <div className="pl-4">{'})'}</div>
                                <div>{'}'}</div>
                            </div>
                        </div>
                    </ExplorationCard>

                    {/* ── Card 4: Analysis ──────────────────────────────────────
           *
           * Animated bar chart — 4 bars that grow on hover using
           * `group-hover:h-[XX%]` transitions. The tallest bar (4th)
           * has a red glow shadow to draw attention.
           *
           * WHY CSS height transitions on bars?
           * Each bar has a different `transition-delay` (0ms → 150ms),
           * creating a staggered "wave" growth effect that feels organic
           * and data-driven.
           * ──────────────────────────────────────────────────────────── */}
                    <ExplorationCard
                        number="04"
                        title="Analysis"
                        description="Data-driven insights to navigate the future."
                        linkText="Read Methodology"
                    >
                        <div className="w-3/4 h-1/2 flex items-end justify-between gap-2 px-4 border-b border-white/10 pb-px">
                            <div className="w-full bg-neutral-800 h-[30%] rounded-t-sm group-hover:h-[40%] transition-all duration-700" />
                            <div className="w-full bg-neutral-700 h-[50%] rounded-t-sm group-hover:h-[70%] transition-all duration-700 delay-75" />
                            <div className="w-full bg-red-900/50 h-[40%] rounded-t-sm group-hover:h-[50%] transition-all duration-700 delay-100" />
                            <div className="w-full bg-red-600 h-[75%] rounded-t-sm group-hover:h-[85%] transition-all duration-700 delay-150 shadow-[0_0_15px_rgba(220,38,38,0.4)]" />
                        </div>
                    </ExplorationCard>
                </div>
            </div>
        </section>
    );
}
