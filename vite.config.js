/**
 * @file vite.config.js
 * @description Vite build configuration for the ZENTR landing page React app.
 *
 * WHY Vite?
 * ─────────
 * Vite offers near-instant Hot Module Replacement (HMR) during development and
 * optimised Rollup-based bundling for production. Combined with the official
 * React plugin (for Fast Refresh) and the Tailwind CSS v4 Vite plugin (for
 * JIT compilation without a separate PostCSS step), this gives us the fastest
 * possible developer experience with zero-config CSS processing.
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    /**
     * @vitejs/plugin-react
     * Enables React Fast Refresh (hot component reloading without losing state)
     * and automatic JSX runtime injection so we don't need to `import React`
     * in every file.
     */
    react(),

    /**
     * @tailwindcss/vite
     * Tailwind CSS v4 plugin — processes `@import "tailwindcss"` directives
     * directly inside Vite's transform pipeline, eliminating the need for a
     * separate PostCSS config or `tailwind.config.js` file.
     */
    tailwindcss(),
  ],
});
