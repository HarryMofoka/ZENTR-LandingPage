/**
 * @file useRevealAnimation.js
 * @description Custom React hook for scroll-triggered reveal animations.
 *
 * PURPOSE
 * ───────
 * Replaces the original inline `<script>` that used a vanilla JavaScript
 * IntersectionObserver. By wrapping this logic in a React hook, we gain:
 * 1. Automatic cleanup when the component unmounts (prevents memory leaks)
 * 2. A declarative API — components simply call the hook instead of managing
 *    DOM class mutations manually
 * 3. Compatibility with React's rendering lifecycle (avoids race conditions
 *    between React's virtual DOM and manual DOM manipulation)
 *
 * HOW IT WORKS
 * ────────────
 * 1. The hook accepts a `ref` to a container element.
 * 2. On mount, it queries all headings, paragraphs, buttons, and `.reveal-hidden`
 *    elements inside that container.
 * 3. Each matching element is observed by an IntersectionObserver.
 * 4. When an element scrolls into view (≥10% visible), the `reveal-hidden`
 *    class is removed and `animate-in` is added, triggering the CSS animation.
 * 5. The element is then unobserved to avoid re-triggering the animation.
 *
 * WHY 10% threshold?
 * ──────────────────
 * A small threshold (0.1) means the animation fires as soon as the element
 * peeks into the viewport, giving users immediate visual feedback as they
 * scroll. A higher threshold would delay the animation, making the page
 * feel sluggish.
 *
 * @param {React.RefObject} containerRef - A ref to the DOM container whose
 *   children should be animated on scroll.
 *
 * @example
 * function MySection() {
 *   const sectionRef = useRef(null);
 *   useRevealAnimation(sectionRef);
 *   return <section ref={sectionRef}>...</section>;
 * }
 */

import { useEffect } from 'react';

export default function useRevealAnimation(containerRef) {
    useEffect(() => {
        /* ─── Guard clause ────────────────────────────────────────────────
         * If the ref hasn't been attached to a DOM node yet (e.g. during
         * SSR or before the first paint), bail out early.
         * ─────────────────────────────────────────────────────────────── */
        if (!containerRef.current) return;

        /**
         * IntersectionObserver callback.
         *
         * For each observed entry that enters the viewport:
         * - Remove `reveal-hidden` (opacity: 0)
         * - Add `animate-in` (triggers fadeInUpBlur keyframe)
         * - Unobserve the element so the animation plays only once
         *
         * WHY unobserve after triggering?
         * We want a one-shot reveal — once the user has seen the element,
         * scrolling it out and back in should NOT replay the animation.
         * This matches the original HTML behaviour.
         */
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.remove('reveal-hidden');
                        entry.target.classList.add('animate-in');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        /**
         * Query all elements that should participate in the scroll reveal.
         *
         * WHY these selectors?
         * The original HTML targeted `h1, h2, h3, p, button, .reveal-hidden`.
         * We replicate the same selector list to maintain identical behaviour.
         *
         * WHY skip elements inside `.animate-marquee-infinite`?
         * The marquee elements are continuously scrolling and should NOT
         * be hidden/revealed — they need to remain visible at all times.
         * The original HTML had this same exclusion.
         */
        const targets = containerRef.current.querySelectorAll(
            'h1, h2, h3, p, button, .reveal-hidden'
        );

        targets.forEach((el) => {
            /* Skip elements inside the marquee — they should always be visible */
            if (!el.closest('.animate-marquee-infinite')) {
                el.classList.add('reveal-hidden');
                observer.observe(el);
            }
        });

        /**
         * Cleanup function — disconnect the observer when the component
         * unmounts to prevent memory leaks from orphaned observers.
         */
        return () => observer.disconnect();
    }, [containerRef]);
}
