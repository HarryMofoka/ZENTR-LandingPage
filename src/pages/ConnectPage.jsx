/**
 * @file ConnectPage.jsx
 * @description Contact / about page with form, team cards, and location info.
 *
 * PURPOSE
 * ───────
 * The "Connect" page serves as both a contact page and a brief about section.
 * It features:
 * - A styled contact form (non-functional, for visual completeness)
 * - Team member cards with initials avatars and South African names
 * - Location cards for Johannesburg and Cape Town offices
 * - Interactive elements with hover effects and glassmorphism
 *
 * WHY no form submit handler?
 * ─────────────────────────
 * This is a static landing page with no backend. The form is present
 * for visual completeness and can be wired to a service like Formspree,
 * Netlify Forms, or a custom API when the backend is ready.
 *
 * @returns {JSX.Element} The Connect page.
 */

import { useRef } from 'react';
import useRevealAnimation from '../hooks/useRevealAnimation';
import Footer from '../components/Footer/Footer';

/**
 * Team data — South African team members.
 */
const TEAM = [
    {
        name: 'Kagiso Mokoena',
        role: 'Creative Director',
        location: 'Johannesburg',
        bio: 'Former lead designer at Ogilvy SA. Passionate about merging African visual traditions with modern digital craft.',
    },
    {
        name: 'Lindiwe Ndaba',
        role: 'Head of Engineering',
        location: 'Cape Town',
        bio: 'Full-stack architect with 12 years in fintech. Built payment systems processing R2B+ annually.',
    },
    {
        name: 'Bongani Cele',
        role: 'Strategy Lead',
        location: 'Durban',
        bio: 'Data strategist who believes every pixel should be backed by insight. Ex-McKinsey, now building brands that matter.',
    },
    {
        name: 'Amahle Dube',
        role: 'Motion Designer',
        location: 'Pretoria',
        bio: 'Brings interfaces to life with purposeful animation. Her work has been featured at Design Indaba 3 years running.',
    },
];

/**
 * Office locations.
 */
const LOCATIONS = [
    {
        city: 'Johannesburg',
        address: 'The Zone @ Rosebank, 177 Oxford Road',
        area: 'Rosebank, Gauteng',
        timezone: 'SAST (UTC+2)',
    },
    {
        city: 'Cape Town',
        address: 'Workshop17, V&A Waterfront',
        area: 'Victoria & Alfred Waterfront',
        timezone: 'SAST (UTC+2)',
    },
];

export default function ConnectPage() {
    const pageRef = useRef(null);
    useRevealAnimation(pageRef);

    return (
        <div ref={pageRef}>
            {/* ── Page Hero ──────────────────────────────────────────────── */}
            <section className="relative z-20 w-full min-h-[60vh] flex items-end glass-section border-b border-white/10">
                <div className="w-full grid grid-cols-1 md:grid-cols-4 px-6 md:px-8 pb-16 pt-32">
                    <div className="md:col-span-1">
                        <span className="font-mono text-red-500 text-xs block mb-4">/// CONNECT</span>
                    </div>
                    <div className="md:col-span-3">
                        <h1 className="text-5xl md:text-7xl font-syne font-medium text-white tracking-tight mb-6 reveal-hidden">
                            Let&apos;s Connect
                        </h1>
                        <p className="text-neutral-400 text-lg max-w-2xl leading-relaxed reveal-hidden">
                            Ready to build something extraordinary? Reach out and let&apos;s
                            start a conversation about your next project.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Contact Form + Info ────────────────────────────────────── */}
            <section className="relative z-20 w-full glass-section border-b border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
                    {/* Form */}
                    <div className="p-6 md:p-12">
                        <span className="font-mono text-red-500 text-xs block mb-6">/// SEND A MESSAGE</span>
                        <form className="flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-xs text-neutral-500 uppercase tracking-wider block mb-2">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your full name"
                                        className="w-full bg-transparent border-b border-white/20 py-3 text-white text-sm focus:outline-none focus:border-red-500 transition-colors placeholder:text-neutral-700"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-neutral-500 uppercase tracking-wider block mb-2">Email</label>
                                    <input
                                        type="email"
                                        placeholder="you@company.co.za"
                                        className="w-full bg-transparent border-b border-white/20 py-3 text-white text-sm focus:outline-none focus:border-red-500 transition-colors placeholder:text-neutral-700"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs text-neutral-500 uppercase tracking-wider block mb-2">Subject</label>
                                <input
                                    type="text"
                                    placeholder="Project brief / General enquiry"
                                    className="w-full bg-transparent border-b border-white/20 py-3 text-white text-sm focus:outline-none focus:border-red-500 transition-colors placeholder:text-neutral-700"
                                />
                            </div>

                            <div>
                                <label className="text-xs text-neutral-500 uppercase tracking-wider block mb-2">Message</label>
                                <textarea
                                    rows="5"
                                    placeholder="Tell us about your project..."
                                    className="w-full bg-transparent border border-white/10 rounded-lg p-4 text-white text-sm focus:outline-none focus:border-red-500 transition-colors placeholder:text-neutral-700 resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="self-start px-8 py-3 bg-red-600 text-white rounded-full text-xs font-medium uppercase tracking-widest hover:bg-red-700 transition-colors shadow-[0_0_20px_rgba(239,68,68,0.4)] reveal-hidden"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Locations */}
                    <div className="p-6 md:p-12">
                        <span className="font-mono text-red-500 text-xs block mb-6">/// OUR OFFICES</span>
                        <div className="space-y-6">
                            {LOCATIONS.map((loc) => (
                                <div
                                    key={loc.city}
                                    className="glass-card p-6 rounded-xl group hover:border-white/20 transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-white font-syne text-xl font-medium group-hover:text-red-500 transition-colors">
                                            {loc.city}
                                        </h3>
                                        <span className="text-neutral-600 text-xs font-mono">{loc.timezone}</span>
                                    </div>
                                    <p className="text-neutral-400 text-sm mb-1">{loc.address}</p>
                                    <p className="text-neutral-600 text-xs">{loc.area}</p>
                                </div>
                            ))}

                            {/* Social links */}
                            <div className="pt-6 border-t border-white/10">
                                <span className="text-xs text-neutral-500 uppercase tracking-wider block mb-4">Follow Us</span>
                                <div className="flex gap-4">
                                    {['Instagram', 'Twitter', 'LinkedIn', 'Dribbble'].map((social) => (
                                        <a
                                            key={social}
                                            href="#"
                                            className="px-4 py-2 border border-white/10 rounded-full text-xs text-neutral-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-300"
                                        >
                                            {social}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Team Section ───────────────────────────────────────────── */}
            <section className="relative z-20 w-full glass-section border-b border-white/10">
                <div className="p-6 md:p-12">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <span className="font-mono text-red-500 text-xs block mb-2">/// THE TEAM</span>
                            <h2 className="text-3xl md:text-4xl font-syne font-medium text-white tracking-tight reveal-hidden">
                                The Minds Behind ZENTR
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {TEAM.map((member) => (
                            <div
                                key={member.name}
                                className="glass-card p-6 rounded-xl group hover:border-white/20 transition-all duration-500 cursor-default"
                            >
                                {/* Initials avatar */}
                                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono text-lg text-white mb-6 group-hover:bg-red-500/20 group-hover:border-red-500/30 transition-all duration-300">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                </div>

                                <h3 className="text-white font-syne font-medium text-lg mb-1 group-hover:text-red-500 transition-colors">
                                    {member.name}
                                </h3>
                                <div className="text-red-500/60 text-xs uppercase tracking-wider mb-1">
                                    {member.role}
                                </div>
                                <div className="text-neutral-600 text-xs mb-4">
                                    {member.location}
                                </div>
                                <p className="text-neutral-500 text-sm leading-relaxed">
                                    {member.bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
