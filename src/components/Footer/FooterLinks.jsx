/**
 * @file FooterLinks.jsx
 * @description Sitemap and social media link columns for the footer.
 *
 * PURPOSE
 * ───────
 * Renders two link columns:
 * 1. **Sitemap** — Internal navigation links using React Router
 * 2. **Socials** — External social media links
 *
 * PERFORMANCE: React.memo — static link data, never needs to re-render.
 *
 * @returns {JSX.Element} Two columns of footer links.
 */

import { memo } from 'react';
import { Link } from 'react-router-dom';

/**
 * Link data configuration.
 * Sitemap uses React Router paths; socials remain external anchors.
 */
const SITEMAP_LINKS = [
    { label: 'Experiment', to: '/experiment' },
    { label: 'Studies', to: '/studies' },
    { label: 'Journal', to: '/journal' },
];
const SOCIAL_LINKS = ['Instagram', 'Twitter', 'LinkedIn'];

export default memo(function FooterLinks() {
    return (
        <>
            {/* ── Sitemap Column ─────────────────────────────────────────── */}
            <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">
                    Sitemap
                </h4>
                <ul className="space-y-3">
                    {SITEMAP_LINKS.map((link) => (
                        <li key={link.label}>
                            <Link
                                to={link.to}
                                className="text-neutral-500 text-sm hover:text-white transition-colors"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* ── Socials Column ─────────────────────────────────────────── */}
            <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">
                    Socials
                </h4>
                <ul className="space-y-3">
                    {SOCIAL_LINKS.map((link) => (
                        <li key={link}>
                            <a
                                href="#"
                                className="text-neutral-500 text-sm hover:text-white transition-colors"
                            >
                                {link}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
})
