/**
 * @file JournalPage.jsx
 * @description Blog / insights page with article cards.
 *
 * PURPOSE
 * ───────
 * Displays journal entries / blog articles in a staggered grid.
 * Cards alternate between featured (tall) and regular (standard) sizes.
 * All author names are South African.
 *
 * WHY staggered heights?
 * ─────────────────────
 * Alternating featured/regular cards creates visual rhythm and breaks
 * the monotony of a uniform grid. The featured card (first in each row)
 * draws the eye and signals "start reading here".
 *
 * @returns {JSX.Element} The Journal page.
 */

import { useRef } from 'react';
import useRevealAnimation from '../hooks/useRevealAnimation';
import Footer from '../components/Footer/Footer';

/**
 * Article data — South African authors.
 */
const ARTICLES = [
    {
        id: 'design-systems-africa',
        date: '28 Feb 2026',
        category: 'Design Systems',
        title: 'Building Design Systems for the African Market',
        excerpt: 'Why Western design patterns fail in diverse South African contexts, and how we build systems that respect both Zulu cultural aesthetics and modern minimalism.',
        author: 'Lerato Khumalo',
        readTime: '8 min read',
        featured: true,
    },
    {
        id: 'motion-language',
        date: '21 Feb 2026',
        category: 'Motion Design',
        title: 'The Language of Motion in Digital Interfaces',
        excerpt: 'How micro-animations create emotional connections and guide user behaviour without a single word.',
        author: 'Andile Zulu',
        readTime: '5 min read',
        featured: false,
    },
    {
        id: 'typography-identity',
        date: '14 Feb 2026',
        category: 'Typography',
        title: 'Typography as Identity: Lessons from Johannesburg Street Art',
        excerpt: 'The vibrant lettering of Braamfontein and Maboneng taught us more about brand identity than any design school.',
        author: 'Mpho Sithole',
        readTime: '6 min read',
        featured: false,
    },
    {
        id: 'data-driven-creativity',
        date: '07 Feb 2026',
        category: 'Strategy',
        title: 'When Data Meets Creativity: A South African Perspective',
        excerpt: 'Balancing analytics with intuition in markets where user behaviour defies global assumptions.',
        author: 'Palesa Mokoena',
        readTime: '7 min read',
        featured: true,
    },
    {
        id: 'sustainable-web',
        date: '01 Feb 2026',
        category: 'Engineering',
        title: 'Designing for Low-Bandwidth Africa',
        excerpt: 'Performance isn\'t a luxury. Building experiences that work on 2G networks and decade-old devices in rural KwaZulu-Natal.',
        author: 'Andile Zulu',
        readTime: '10 min read',
        featured: false,
    },
    {
        id: 'glassmorphism-dark',
        date: '25 Jan 2026',
        category: 'Visual Design',
        title: 'The Rise of Dark Glassmorphism in Enterprise Design',
        excerpt: 'Why dark, frosted-glass interfaces signal trust and sophistication — and how to implement them without killing performance.',
        author: 'Lerato Khumalo',
        readTime: '4 min read',
        featured: false,
    },
];

export default function JournalPage() {
    const pageRef = useRef(null);
    useRevealAnimation(pageRef);

    return (
        <div ref={pageRef}>
            {/* ── Page Hero ──────────────────────────────────────────────── */}
            <section className="relative z-20 w-full min-h-[60vh] flex items-end glass-section border-b border-white/10">
                <div className="w-full grid grid-cols-1 md:grid-cols-4 px-6 md:px-8 pb-16 pt-32">
                    <div className="md:col-span-1">
                        <span className="font-mono text-red-500 text-xs block mb-4">/// JOURNAL</span>
                    </div>
                    <div className="md:col-span-3">
                        <h1 className="text-5xl md:text-7xl font-syne font-medium text-white tracking-tight mb-6 reveal-hidden">
                            Journal
                        </h1>
                        <p className="text-neutral-400 text-lg max-w-2xl leading-relaxed reveal-hidden">
                            Insights, reflections, and technical explorations from the ZENTR team.
                            Where strategy meets craft.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Article Grid ───────────────────────────────────────────── */}
            <section className="relative z-20 w-full glass-section border-b border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {ARTICLES.map((article) => (
                        <div
                            key={article.id}
                            className={`
                group border-b border-r border-white/10 p-6 md:p-8
                flex flex-col justify-between cursor-pointer
                hover:bg-white/[0.02] transition-all duration-500
                ${article.featured ? 'md:row-span-2 min-h-[400px]' : 'min-h-[280px]'}
              `}
                        >
                            {/* Top: date + category */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-neutral-600 text-xs font-mono">{article.date}</span>
                                    <span className="text-xs font-mono text-red-500/60 uppercase tracking-wider px-3 py-1 border border-red-500/20 rounded-full">
                                        {article.category}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className={`
                  text-white font-syne font-medium tracking-tight mb-4
                  group-hover:text-red-500 transition-colors
                  ${article.featured ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}
                `}>
                                    {article.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-neutral-500 text-sm leading-relaxed">
                                    {article.excerpt}
                                </p>
                            </div>

                            {/* Bottom: author + read time */}
                            <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center font-mono text-[10px] text-white">
                                        {article.author.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <span className="text-neutral-400 text-xs">{article.author}</span>
                                </div>
                                <span className="text-neutral-600 text-xs">{article.readTime}</span>
                            </div>

                            {/* Hover glow effect */}
                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/0 to-transparent group-hover:via-red-500/50 transition-all duration-500" />
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
