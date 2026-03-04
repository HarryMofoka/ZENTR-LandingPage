/**
 * @file StudiesPage.jsx
 * @description In-depth case studies with expandable cards and animated stats.
 *
 * PURPOSE
 * ───────
 * Showcases ZENTR's strategic work through 4 detailed case studies.
 * Each study features:
 * - Client info with South African names
 * - Key metrics with animated counters
 * - Expandable accordion for detailed content
 *
 * WHY useState for accordion?
 * ──────────────────────────
 * Each card manages its own open/closed state independently.
 * Using a single `openId` state at the parent level ensures only
 * one accordion is open at a time (closing the previous one when
 * a new one opens), which prevents the page from becoming too tall.
 *
 * @returns {JSX.Element} The Studies page.
 */

import { useState, useRef, useEffect } from 'react';
import useRevealAnimation from '../hooks/useRevealAnimation';
import Footer from '../components/Footer/Footer';

/**
 * Case study data — South African clients.
 */
const CASE_STUDIES = [
    {
        id: 'nkosi-ventures',
        client: 'Thabo Nkosi',
        company: 'Nkosi Ventures, Johannesburg',
        title: 'Digital Transformation at Scale',
        description: 'How we helped Nkosi Ventures transition from legacy systems to a fully integrated digital ecosystem, serving 2M+ users across Southern Africa.',
        details: 'The challenge was monumental — a 15-year-old system architecture that powered critical financial services. We designed a phased migration strategy that maintained 99.9% uptime throughout the transition. The new platform reduced page load times by 78% and increased mobile conversions by 340%.',
        stats: [
            { label: 'Users Served', value: '2.4M', suffix: '+' },
            { label: 'Load Time', value: '78', suffix: '% faster' },
            { label: 'Conversion Lift', value: '340', suffix: '%' },
        ],
        gradient: 'from-red-500/20 to-transparent',
    },
    {
        id: 'molefe-group',
        client: 'Naledi Molefe',
        company: 'Molefe Group, Cape Town',
        title: 'Brand Identity Revolution',
        description: 'A complete visual rebrand that positioned Molefe Group as the premier luxury real estate firm in the Western Cape.',
        details: 'Working closely with Naledi and her team, we conducted extensive research into luxury brand positioning across African markets. The resulting identity system — blending traditional African patterns with minimalist European design — won 3 international design awards and increased brand recognition by 210%.',
        stats: [
            { label: 'Brand Recognition', value: '210', suffix: '% up' },
            { label: 'Awards Won', value: '3', suffix: ' intl.' },
            { label: 'Markets Reached', value: '12', suffix: '' },
        ],
        gradient: 'from-emerald-500/20 to-transparent',
    },
    {
        id: 'dlamini-tech',
        client: 'Sipho Dlamini',
        company: 'Dlamini Technologies, Durban',
        title: 'Enterprise System Architecture',
        description: 'Building a modular SaaS platform that scales from township startups to enterprise clients across the continent.',
        details: 'Sipho\'s vision was ambitious — a platform flexible enough for a one-person startup in Soweto yet robust enough for a multinational in Sandton. We built a micro-frontend architecture with shared design tokens and component libraries that reduced development time for new clients by 60%.',
        stats: [
            { label: 'Dev Time Saved', value: '60', suffix: '%' },
            { label: 'Active Clients', value: '847', suffix: '' },
            { label: 'Uptime', value: '99.9', suffix: '%' },
        ],
        gradient: 'from-blue-500/20 to-transparent',
    },
    {
        id: 'mthembu-collective',
        client: 'Zanele Mthembu',
        company: 'Mthembu Collective, Pretoria',
        title: 'Data-Driven Design Strategy',
        description: 'Leveraging analytics and user research to create South Africa\'s most engaging e-commerce experience.',
        details: 'Through rigorous A/B testing and heatmap analysis, we identified key friction points in the existing checkout flow. The redesigned experience — informed by local payment preferences (EFT, SnapScan, Capitec Pay) — increased average order value by 45% and reduced cart abandonment to an industry-leading 18%.',
        stats: [
            { label: 'Order Value', value: '45', suffix: '% up' },
            { label: 'Cart Abandon', value: '18', suffix: '%' },
            { label: 'NPS Score', value: '72', suffix: '' },
        ],
        gradient: 'from-purple-500/20 to-transparent',
    },
];

/**
 * AnimatedCounter — rolls up a number when it enters the viewport.
 */
function AnimatedCounter({ value, suffix = '' }) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    const target = parseFloat(value);
                    const duration = 1500;
                    const startTime = performance.now();

                    const animate = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        /* Ease-out cubic for a smooth deceleration */
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Number((target * eased).toFixed(value.includes('.') ? 1 : 0)));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value, hasAnimated]);

    return (
        <span ref={ref} className="text-3xl md:text-4xl font-syne font-bold text-white">
            {count}{suffix}
        </span>
    );
}

export default function StudiesPage() {
    const [openId, setOpenId] = useState(null);
    const pageRef = useRef(null);
    useRevealAnimation(pageRef);

    const toggleStudy = (id) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <div ref={pageRef}>
            {/* ── Page Hero ──────────────────────────────────────────────── */}
            <section className="relative z-20 w-full min-h-[60vh] flex items-end glass-section border-b border-white/10">
                <div className="w-full grid grid-cols-1 md:grid-cols-4 px-6 md:px-8 pb-16 pt-32">
                    <div className="md:col-span-1">
                        <span className="font-mono text-red-500 text-xs block mb-4">/// STUDIES</span>
                    </div>
                    <div className="md:col-span-3">
                        <h1 className="text-5xl md:text-7xl font-syne font-medium text-white tracking-tight mb-6 reveal-hidden">
                            Case Studies
                        </h1>
                        <p className="text-neutral-400 text-lg max-w-2xl leading-relaxed reveal-hidden">
                            Deep dives into transformative projects. Real problems,
                            measurable outcomes, and the strategic thinking behind every decision.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Case Study Cards ───────────────────────────────────────── */}
            <section className="relative z-20 w-full glass-section border-b border-white/10">
                {CASE_STUDIES.map((study) => {
                    const isOpen = openId === study.id;
                    return (
                        <div key={study.id} className="border-b border-white/10 last:border-b-0">
                            {/* Card Header */}
                            <div
                                onClick={() => toggleStudy(study.id)}
                                className="grid grid-cols-1 md:grid-cols-4 p-6 md:p-8 cursor-pointer group hover:bg-white/[0.02] transition-colors"
                            >
                                {/* Client info */}
                                <div className="mb-4 md:mb-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        {/* Initials avatar */}
                                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center font-mono text-xs text-white">
                                            {study.client.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <div className="text-white text-sm font-medium">{study.client}</div>
                                            <div className="text-neutral-500 text-xs">{study.company}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Title + description */}
                                <div className="md:col-span-2">
                                    <h3 className="text-xl md:text-2xl text-white font-syne font-medium tracking-tight mb-2 group-hover:text-red-500 transition-colors">
                                        {study.title}
                                    </h3>
                                    <p className="text-neutral-500 text-sm leading-relaxed">
                                        {study.description}
                                    </p>
                                </div>

                                {/* Toggle icon */}
                                <div className="flex items-center justify-end mt-4 md:mt-0">
                                    <div className={`
                    w-10 h-10 rounded-full border border-white/10 flex items-center justify-center
                    transition-all duration-300
                    ${isOpen ? 'bg-red-500 border-red-500 rotate-45' : 'group-hover:border-white/20'}
                  `}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fill="none" stroke={isOpen ? '#fff' : 'currentColor'} strokeLinecap="round" strokeWidth="2" d="M12 5v14M5 12h14" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Expandable detail panel */}
                            <div className={`
                overflow-hidden transition-all duration-500 ease-in-out
                ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}
              `}>
                                <div className={`
                  grid grid-cols-1 md:grid-cols-4 p-6 md:p-8 pt-0 md:pt-0
                  bg-gradient-to-r ${study.gradient}
                `}>
                                    <div className="md:col-span-1" />
                                    <div className="md:col-span-3">
                                        {/* Stats row */}
                                        <div className="grid grid-cols-3 gap-6 mb-8 py-6 border-y border-white/10">
                                            {study.stats.map((stat) => (
                                                <div key={stat.label} className="text-center">
                                                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                                    <div className="text-neutral-500 text-xs uppercase tracking-wider mt-1">
                                                        {stat.label}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Detail text */}
                                        <p className="text-neutral-300 text-sm leading-relaxed max-w-2xl">
                                            {study.details}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>

            <Footer />
        </div>
    );
}
