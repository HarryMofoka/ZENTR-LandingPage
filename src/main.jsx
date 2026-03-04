/**
 * @file main.jsx
 * @description Vite application entry point.
 *
 * PURPOSE
 * ───────
 * This is the file that Vite uses as the entry point for the React application.
 * It mounts the root `<App />` component into the `#root` DOM element defined
 * in `index.html`.
 *
 * WHY `StrictMode`?
 * ────────────────
 * React.StrictMode enables additional development-time checks:
 * - Warns about deprecated lifecycle methods
 * - Detects unexpected side effects by intentionally double-invoking
 *   certain functions (render, constructors, effect setup/cleanup)
 * - Helps identify potential issues before they reach production
 *
 * It has NO performance impact in production builds — it is completely
 * stripped out during the build process.
 *
 * WHY import `index.css` here?
 * ───────────────────────────
 * Importing the global stylesheet at the entry point ensures it loads
 * before any component renders, preventing a flash of unstyled content
 * (FOUC). The CSS is processed by Vite's pipeline (incl. Tailwind v4
 * JIT compilation) and injected into the document `<head>`.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
