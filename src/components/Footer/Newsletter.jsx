/**
 * @file Newsletter.jsx
 * @description Email subscription form for the footer.
 *
 * PURPOSE
 * ───────
 * A minimal newsletter signup form with an email input and a submit button.
 * Located in the bottom-right area of the footer alongside the sitemap
 * and social links.
 *
 * WHY no form action / onSubmit handler?
 * ─────────────────────────────────────
 * This is currently a static landing page with no backend. The form is
 * present for visual completeness and can be wired to a service like
 * Mailchimp, ConvertKit, or a custom API when the backend is ready.
 * The `<form>` element is used (instead of a plain `<div>`) so that
 * the HTML semantics are correct and screen readers announce it properly.
 *
 * @returns {JSX.Element} The newsletter subscription form.
 */

export default function Newsletter() {
    return (
        <div className="col-span-2 md:col-span-2">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">
                Newsletter
            </h4>
            <form className="flex flex-col gap-4">
                {/* ── Email Input ──────────────────────────────────────────────
         *
         * Uses a bottom-border-only style (no background, no side borders)
         * to match the minimal dark aesthetic. The border colour transitions
         * from muted white (white/20) to red-500 on focus.
         *
         * WHY `placeholder:text-neutral-700`?
         * The default placeholder colour would be too visible against the
         * dark background. A very dark neutral tone keeps the placeholder
         * subtle, drawing attention to the input only when the user focuses.
         * ──────────────────────────────────────────────────────────────── */}
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-transparent border-b border-white/20 py-2 text-white text-sm focus:outline-none focus:border-red-500 transition-colors placeholder:text-neutral-700"
                />

                {/* ── Submit Button ────────────────────────────────────────────
         *
         * Styled as a text link with an arrow, not a filled button.
         * This keeps the visual hierarchy clear — the primary CTA
         * is the red "Start Dialogue" button in the sidebar, while
         * this is a secondary action.
         * ──────────────────────────────────────────────────────────── */}
                <button
                    type="submit"
                    className="self-start text-xs text-neutral-400 uppercase tracking-widest hover:text-white transition-colors reveal-hidden flex items-center gap-2"
                >
                    Subscribe
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h14m-7-7l7 7l-7 7"
                        />
                    </svg>
                </button>
            </form>
        </div>
    );
}
