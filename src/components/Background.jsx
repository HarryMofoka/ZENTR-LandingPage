/**
 * @file Background.jsx
 * @description Renders the layered animated background of the ZENTR landing page.
 *
 * ARCHITECTURE
 * ────────────
 * The background is composed of two independent layers, both fixed to the
 * viewport so they remain visible as the user scrolls:
 *
 * 1. **Spline 3D scene** — An interactive WebGL particle animation embedded
 *    via an `<iframe>` from Spline (my.spline.design). It renders a glowing
 *    planet with orbiting particles that react to mouse movement.
 *
 * 2. **Unicorn Studio effect** — A lightweight WebGL overlay loaded from
 *    Unicorn Studio's CDN. It adds a subtle atmospheric shader effect
 *    (brightness + saturation boosted via CSS filters) on top of the Spline
 *    scene for extra depth.
 *
 * WHY two layers instead of one?
 * ─────────────────────────────
 * Layering two independent visual effects creates a richer, more dimensional
 * background than either could achieve alone. The Spline scene provides the
 * hero 3D element, while Unicorn Studio adds atmospheric colour grading.
 * Both are loaded asynchronously, so one failing won't break the other.
 *
 * WHY iframe for Spline?
 * ─────────────────────
 * Spline provides an embed URL that handles all WebGL initialisation,
 * asset loading, and interaction. Using an `<iframe>` keeps the 3D scene
 * sandboxed and avoids bundling the Spline runtime into our React app,
 * which would significantly increase bundle size.
 *
 * WHY load Unicorn Studio dynamically?
 * ─────────────────────────────────────
 * Unicorn Studio's SDK is not available as an npm package. We load it from
 * their CDN at runtime and initialise it once the script is ready. The
 * `isInitialized` flag prevents double-initialisation in React Strict Mode
 * (which mounts components twice in development).
 *
 * PERFORMANCE OPTIMIZATIONS
 * ─────────────────────────
 * 1. Spline iframe uses `loading="lazy"` — the browser defers loading the
 *    iframe until it's near the viewport. Since the background is fixed and
 *    always visible, this effectively defers it until after the initial HTML
 *    has been parsed, preventing the iframe from blocking first paint.
 *
 * 2. Unicorn Studio script is loaded via `requestIdleCallback` — the browser
 *    waits for an idle period before injecting the script, ensuring it
 *    doesn't compete with critical rendering work (React mount, CSS parsing).
 *    Falls back to a 200ms `setTimeout` in browsers that don't support
 *    `requestIdleCallback` (e.g. Safari < 16.4).
 *
 * @returns {JSX.Element} The fixed background layers.
 */

import { useEffect } from 'react';

export default function Background() {
    /**
     * Load and initialise the Unicorn Studio script on mount.
     *
     * PERFORMANCE: Deferred via requestIdleCallback
     * ──────────────────────────────────────────────
     * `requestIdleCallback` tells the browser: "run this function when you
     * have nothing more important to do". This prevents the Unicorn Studio
     * script from competing with React's initial render, CSS parsing, and
     * font loading — all of which directly affect Time to Interactive (TTI).
     *
     * WHY 200ms fallback timeout?
     * Safari versions before 16.4 don't support `requestIdleCallback`.
     * A 200ms `setTimeout` is long enough to let the initial paint complete
     * but short enough that the atmospheric effect appears before the user
     * notices it's missing.
     */
    useEffect(() => {
        /* Prevent re-injection if the script was already loaded (e.g. HMR) */
        if (window.UnicornStudio?.isInitialized) return;

        const loadUnicornStudio = () => {
            window.UnicornStudio = { isInitialized: false };
            const script = document.createElement('script');
            script.src =
                'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js';

            /**
             * Once the script loads, call UnicornStudio.init() to scan the DOM
             * for elements with `data-us-project` attributes and render the
             * corresponding WebGL effects inside them.
             */
            script.onload = () => {
                if (!window.UnicornStudio.isInitialized) {
                    window.UnicornStudio.init();
                    window.UnicornStudio.isInitialized = true;
                }
            };

            document.head.appendChild(script);
        };

        /*
         * Defer script injection to an idle period.
         *
         * WHY check for `requestIdleCallback`?
         * It's not universally supported. The fallback `setTimeout(fn, 200)`
         * achieves a similar effect — a 200ms delay lets critical rendering
         * finish before we start loading a non-essential visual effect.
         */
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(loadUnicornStudio);
        } else {
            setTimeout(loadUnicornStudio, 200);
        }
    }, []);

    return (
        <>
            {/* ── LAYER 1: Spline 3D Scene ────────────────────────────────────
       *
       * Fixed to the viewport with `-z-10` so all page content renders
       * on top. The CSS mask-image creates a soft fade-out at the bottom
       * edge, preventing a harsh cut-off when the scene meets page content.
       *
       * PERFORMANCE: `loading="lazy"` defers the iframe's network request
       * until the browser has finished higher-priority work, preventing
       * the heavy 3D scene from blocking first contentful paint.
       * ──────────────────────────────────────────────────────────────── */}
            <div
                className="aura-background-component fixed top-0 w-full h-screen -z-10"
                style={{
                    maskImage:
                        'linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)',
                    WebkitMaskImage:
                        'linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)',
                }}
            >
                <div className="spline-container absolute top-0 left-0 w-full h-full z-0">
                    <iframe
                        src="https://my.spline.design/glowingplanetparticles-HmCVKutonlFn3Oqqe6DI9nWi/"
                        frameBorder="0"
                        width="100%"
                        height="100%"
                        id="aura-spline"
                        title="ZENTR 3D background scene"
                        loading="lazy"
                    />
                </div>
            </div>

            {/* ── LAYER 2: Unicorn Studio Atmospheric Effect ──────────────────
       *
       * `pointer-events-none` prevents this layer from intercepting
       * clicks meant for page content underneath.
       *
       * `brightness-110 saturate-125` boosts the effect's vibrancy to
       * complement the Spline scene's colour palette.
       * ──────────────────────────────────────────────────────────────── */}
            <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none brightness-110 saturate-125">
                <div
                    data-us-project="7WRlj4TRuUxuldc6GVDM"
                    className="absolute inset-0 w-full h-full"
                />
            </div>
        </>
    );
}
