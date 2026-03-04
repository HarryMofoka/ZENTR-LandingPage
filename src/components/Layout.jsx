/**
 * @file Layout.jsx
 * @description Shared layout wrapper for all pages.
 *
 * PURPOSE
 * ───────
 * Wraps every route with the common elements that appear on all pages:
 * - Navbar (fixed, always on top)
 * - Background (Spline 3D + Unicorn Studio layers)
 * - GridOverlay (decorative grid lines)
 * - <Outlet /> for page-specific content
 *
 * WHY a Layout component?
 * ───────────────────────
 * Without this, each page would need to import and render Navbar,
 * Background, and GridOverlay individually. The Layout ensures
 * visual consistency and prevents duplicated code across 5 routes.
 *
 * WHY `useEffect` for scroll-to-top?
 * ──────────────────────────────────
 * React Router preserves scroll position by default when navigating
 * between routes. This creates a jarring experience where a new page
 * opens scrolled halfway down. The `useEffect` scrolls to the top
 * on every route change, mimicking traditional page navigation.
 *
 * @returns {JSX.Element} The shared layout with Outlet for page content.
 */

import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Background from './Background';
import GridOverlay from './GridOverlay';

export default function Layout() {
    const { pathname } = useLocation();

    /* Scroll to top on route change */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="antialiased selection:bg-red-600/30 selection:text-white overflow-x-hidden w-full min-h-screen relative">
            <Navbar />
            <Background />
            <GridOverlay />
            <Outlet />
        </div>
    );
}
