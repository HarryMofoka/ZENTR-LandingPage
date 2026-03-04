/**
 * @file ExperimentPage.jsx
 * @description Design experiments showcase — 6 project cards with hover effects.
 *
 * PURPOSE
 * ───────
 * Displays ZENTR's portfolio of design experiments. Each project card
 * features a CSS gradient thumbnail, category tag, title, description,
 * and a hovering animated border effect.
 *
 * All project names use South African geographical/cultural references.
 *
 * @returns {JSX.Element} The Experiment page.
 */

import { useRef } from 'react';
import useRevealAnimation from '../hooks/useRevealAnimation';
import Footer from '../components/Footer/Footer';

/**
 * Project data — South African themed.
 * Each project has a unique gradient thumbnail created via CSS.
 */
const PROJECTS = [
    {
        id: 'karoo-dunes',
        category: 'Identity',
        title: 'Karoo Dunes',
        description: 'A brand identity system inspired by the shifting sands of the Great Karoo. Adaptive, resilient, and endlessly evolving.',
        gradient: 'from-amber-900/40 via-orange-800/30 to-neutral-900',
        accent: 'bg-amber-500',
    },
    {
        id: 'table-mountain',
        category: 'Interface',
        title: 'Table Mountain Rebrand',
        description: 'Digital presence overhaul for Cape Town\'s iconic landmark. Merging heritage with cutting-edge interaction design.',
        gradient: 'from-emerald-900/40 via-teal-800/30 to-neutral-900',
        accent: 'bg-emerald-500',
    },
    {
        id: 'kalahari-grid',
        category: 'System',
        title: 'Kalahari Grid',
        description: 'A modular design system built for scale. From Johannesburg startups to global enterprises — one grid to rule them all.',
        gradient: 'from-red-900/40 via-rose-800/30 to-neutral-900',
        accent: 'bg-red-500',
    },
    {
        id: 'drakensberg-motion',
        category: 'Motion',
        title: 'Drakensberg Motion',
        description: 'Cinematic micro-animations inspired by the dramatic peaks and valleys of the Drakensberg mountain range.',
        gradient: 'from-blue-900/40 via-indigo-800/30 to-neutral-900',
        accent: 'bg-blue-500',
    },
    {
        id: 'soweto-pulse',
        category: 'Experience',
        title: 'Soweto Pulse',
        description: 'An immersive digital experience capturing the vibrant energy, rhythm, and cultural heartbeat of Soweto.',
        gradient: 'from-purple-900/40 via-violet-800/30 to-neutral-900',
        accent: 'bg-purple-500',
    },
    {
        id: 'cape-winelands',
        category: 'Strategy',
        title: 'Cape Winelands',
        description: 'Data-driven brand strategy for South Africa\'s premier wine region. Blending tradition with digital sophistication.',
        gradient: 'from-rose-900/40 via-pink-800/30 to-neutral-900',
        accent: 'bg-rose-500',
    },
];

export default function ExperimentPage() {
    const pageRef = useRef(null);
    useRevealAnimation(pageRef);

    return (
        <div ref={pageRef}>
            {/* ── Page Hero ──────────────────────────────────────────────── */}
            <section className="relative z-20 w-full min-h-[60vh] flex items-end glass-section border-b border-white/10">
                <div className="w-full grid grid-cols-1 md:grid-cols-4 px-6 md:px-8 pb-16 pt-32">
                    <div className="md:col-span-1">
                        <span className="font-mono text-red-500 text-xs block mb-4">/// EXPERIMENT</span>
                    </div>
                    <div className="md:col-span-3">
                        <h1 className="text-5xl md:text-7xl font-syne font-medium text-white tracking-tight mb-6 reveal-hidden">
                            Design Experiments
                        </h1>
                        <p className="text-neutral-400 text-lg max-w-2xl leading-relaxed reveal-hidden">
                            Exploring the boundaries between static design and fluid motion.
                            Each experiment pushes the limits of what digital experiences can become.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Project Grid ───────────────────────────────────────────── */}
            <section className="relative z-20 w-full glass-section border-b border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {PROJECTS.map((project) => (
                        <div
                            key={project.id}
                            className="group relative border-b border-r border-white/10 p-6 md:p-8 flex flex-col 
                         hover:bg-white/[0.03] transition-all duration-500 cursor-pointer"
                        >
                            {/* Thumbnail gradient */}
                            <div className={`
                w-full aspect-[4/3] rounded-lg mb-6 bg-gradient-to-br ${project.gradient}
                border border-white/5 overflow-hidden relative
                group-hover:scale-[1.02] transition-transform duration-500
              `}>
                                {/* Decorative dot grid */}
                                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
                                {/* Animated corner accent */}
                                <div className={`
                  absolute bottom-0 right-0 w-16 h-16 ${project.accent}/20 rounded-tl-full
                  group-hover:w-24 group-hover:h-24 transition-all duration-500
                `} />
                            </div>

                            {/* Category tag */}
                            <div className="flex items-center gap-2 mb-3">
                                <div className={`w-2 h-2 rounded-full ${project.accent}`} />
                                <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                                    {project.category}
                                </span>
                            </div>

                            {/* Title + description */}
                            <h3 className="text-xl text-white font-medium font-syne tracking-tight mb-2 group-hover:text-red-500 transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-neutral-500 text-sm leading-relaxed mb-6 flex-grow">
                                {project.description}
                            </p>

                            {/* View link */}
                            <div className="flex items-center gap-2 text-xs text-neutral-600 group-hover:text-white transition-colors">
                                <span className="uppercase tracking-widest">View Project</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                                    className="group-hover:translate-x-1 transition-transform" aria-hidden="true">
                                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="2" d="M5 12h14m-7-7l7 7l-7 7" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
