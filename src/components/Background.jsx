/**
 * @file Background.jsx
 * @description Lightweight animated background with shooting stars and
 * orbiting particle field.
 *
 * ARCHITECTURE
 * ────────────
 * Three visual layers, all lightweight:
 *
 * 1. **Shooting stars** — CSS-animated streaks that appear at random
 *    positions and angles, flying across the viewport. Each star has
 *    randomised delay, duration, and starting position for variety.
 *
 * 2. **Canvas particle field** — ~80 small dots drifting across the
 *    entire viewport (not just the centre), creating a starfield.
 *
 * 3. **Very subtle centre glow** — A faint red radial gradient at the
 *    centre, barely visible, just enough to warm the colour palette.
 *
 * @returns {JSX.Element} The lightweight animated background.
 */

import { useEffect, useRef, useState } from 'react';

const PARTICLE_COUNT = 80;
const SHOOTING_STAR_COUNT = 6;

/**
 * Create a particle that drifts across the full viewport.
 * Unlike the previous version, particles are NOT locked to orbits —
 * they float freely for a starfield effect.
 */
function createParticle(w, h) {
    return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.15,
        size: 0.4 + Math.random() * 1.5,
        opacity: 0.15 + Math.random() * 0.45,
        isRed: Math.random() < 0.12,
        /* Twinkle — particles fade in and out */
        twinkleSpeed: 0.005 + Math.random() * 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
    };
}

/**
 * Generate random shooting star CSS properties.
 * Each star gets a unique start position, angle, delay, and duration.
 */
function generateShootingStars() {
    return Array.from({ length: SHOOTING_STAR_COUNT }, (_, i) => ({
        id: i,
        top: `${5 + Math.random() * 60}%`,
        left: `${Math.random() * 80}%`,
        angle: 20 + Math.random() * 30,       // degrees — diagonal
        delay: `${Math.random() * 12}s`,       // staggered over 12s
        duration: `${1.5 + Math.random() * 2}s`, // 1.5–3.5s per streak
        length: `${80 + Math.random() * 120}px`, // streak trail length
    }));
}

export default function Background() {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const animFrameRef = useRef(null);
    const [stars] = useState(generateShootingStars);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width, height;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(dpr, dpr);
            particlesRef.current = Array.from(
                { length: PARTICLE_COUNT },
                () => createParticle(width, height)
            );
        };

        resize();
        window.addEventListener('resize', resize);

        let time = 0;
        const animate = () => {
            time += 1;
            ctx.clearRect(0, 0, width, height);

            particlesRef.current.forEach((p) => {
                /* Drift */
                p.x += p.vx;
                p.y += p.vy;

                /* Wrap around viewport edges */
                if (p.x < -10) p.x = width + 10;
                if (p.x > width + 10) p.x = -10;
                if (p.y < -10) p.y = height + 10;
                if (p.y > height + 10) p.y = -10;

                /* Twinkle — sinusoidal opacity modulation */
                const twinkle = 0.5 + 0.5 * Math.sin(time * p.twinkleSpeed + p.twinklePhase);
                const alpha = p.opacity * twinkle;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

                if (p.isRed) {
                    ctx.fillStyle = `rgba(239, 68, 68, ${alpha})`;
                    ctx.shadowColor = 'rgba(239, 68, 68, 0.25)';
                    ctx.shadowBlur = 6;
                } else {
                    ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
                    ctx.shadowColor = 'transparent';
                    ctx.shadowBlur = 0;
                }
                ctx.fill();
            });

            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            animFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* ── Very subtle centre warmth (barely visible) ──────────── */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 60%)',
                }}
            />

            {/* ── Canvas starfield (fills entire viewport) ───────────── */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />

            {/* ── Shooting Stars (pure CSS) ──────────────────────────────
       *
       * Each star is a small element that flies diagonally across
       * the viewport with a glowing trail. The trail is achieved
       * with a linear-gradient background that fades from white
       * to transparent.
       *
       * WHY CSS instead of Canvas?
       * Shooting stars are infrequent, fast-moving elements that
       * benefit from GPU-accelerated transforms. CSS animations
       * run on the compositor thread, so they don't compete with
       * the Canvas particle loop on the main thread.
       * ──────────────────────────────────────────────────────── */}
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute pointer-events-none"
                    style={{
                        top: star.top,
                        left: star.left,
                        width: star.length,
                        height: '1px',
                        transform: `rotate(${star.angle}deg)`,
                        background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(239,68,68,0.8) 100%)',
                        borderRadius: '999px',
                        boxShadow: '0 0 6px rgba(255,255,255,0.3), 0 0 12px rgba(239,68,68,0.2)',
                        animation: `shoot ${star.duration} ${star.delay} linear infinite`,
                        opacity: 0,
                    }}
                />
            ))}
        </div>
    );
}
