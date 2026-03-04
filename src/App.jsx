/**
 * @file App.jsx
 * @description Root application component with route definitions.
 *
 * PURPOSE
 * ───────
 * Defines all routes for the ZENTR site using React Router v6.
 * The `<Layout />` component wraps all routes, providing the
 * shared Navbar, Background, and GridOverlay without duplication.
 *
 * ROUTE STRUCTURE
 * ───────────────
 * /            → HomePage (landing page with all sections)
 * /experiment  → ExperimentPage (design experiments / project cards)
 * /studies     → StudiesPage (in-depth case studies)
 * /journal     → JournalPage (blog / insights articles)
 * /connect     → ConnectPage (contact form + team)
 *
 * LAZY LOADING
 * ────────────
 * All pages except HomePage are lazy-loaded via React.lazy().
 * This keeps the initial bundle small — only the landing page
 * code is downloaded on first visit. Other pages load on demand.
 *
 * @returns {JSX.Element} The routed application.
 */

import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';

/* ─── Lazy-loaded pages ──────────────────────────────────────────────────── */
const ExperimentPage = lazy(() => import('./pages/ExperimentPage'));
const StudiesPage = lazy(() => import('./pages/StudiesPage'));
const JournalPage = lazy(() => import('./pages/JournalPage'));
const ConnectPage = lazy(() => import('./pages/ConnectPage'));

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/experiment" element={<ExperimentPage />} />
          <Route path="/studies" element={<StudiesPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/connect" element={<ConnectPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
