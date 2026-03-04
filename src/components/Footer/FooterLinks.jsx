/**
 * @file FooterLinks.jsx
 * @description Sitemap and social media link columns for the footer.
 *
 * PURPOSE
 * ───────
 * Renders two link columns:
 * 1. **Sitemap** — Internal navigation links (Experiment, Studies, Journal)
 * 2. **Socials** — External social media links (Instagram, Twitter, LinkedIn)
 *
 * WHY a separate component?
 * ─────────────────────────
 * Extracting the link columns from the Footer keeps the Footer component
 * focused on overall layout, while this component handles the specific
 * link data and hover styles.
 *
 * WHY `#` hrefs?
 * ─────────────
 * This is a single-page landing page with no routing. The links are
 * placeholder anchors. When routing is added (e.g. React Router),
 * these can be swapped to `<Link>` components with minimal effort.
 *
 * PERFORMANCE: React.memo — static link data, never needs to re-render.
 *
 * @returns {JSX.Element} Two columns of footer links.
 */

import { memo } from 'react';

/**
 * Link data configuration.
 * Centralised here for easy updates and potential internationalisation.
 */
const SITEMAP_LINKS = ['Experiment', 'Studies', 'Journal'];
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
