/**
 * @file main.jsx
 * @description Vite application entry point.
 *
 * PURPOSE
 * ───────
 * Mounts the root `<App />` component into the `#root` DOM node,
 * wrapped in React StrictMode for development warnings and
 * BrowserRouter for client-side routing.
 *
 * WHY BrowserRouter here (not in App.jsx)?
 * ────────────────────────────────────────
 * The router must wrap the entire component tree so that every
 * component (including App itself) can access routing context
 * via hooks like `useNavigate`, `useLocation`, etc.
 *
 * WHY StrictMode?
 * ──────────────
 * StrictMode intentionally double-invokes effects and renders in
 * development mode to help catch:
 * - Side effects that aren't properly cleaned up
 * - Deprecated API usage
 * - Components with legacy patterns
 * It has zero impact in production builds.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
