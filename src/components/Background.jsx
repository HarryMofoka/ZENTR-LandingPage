/**
 * @file Background.jsx
 * @description Animated starfield background with twinkling particles
 * and randomised shooting stars.
 *
 * LAYERS
 * ──────
 * 1. Canvas starfield — 120 twinkling particles across the full viewport
 * 2. Shooting stars — 5 CSS-animated streaks with fully random directions
 * 3. Faint centre warmth — barely-visible red radial gradient
 *
 * @returns {JSX.Element} The animated background.
 */

import { useEffect, useRef, useState } from 'react';

const PARTICLE_COUNT = 120;
const SHOOTING_STAR_COUNT = 5;

/**
 * Create a free-drifting particle.
 */
function createParticle(w, h) {
    return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.15,
        size: 0.3 + Math.random() * 1.8,
        opacity: 0.1 + Math.random() * 0.5,
        isRed: Math.random() < 0.12,
        twinkleSpeed: 0.004 + Math.random() * 0.012,
        twinklePhase: Math.random() * Math.PI * 2,
    };
}

/**
 * Generate shooting stars with fully random directions.
 *
 * WHY random angles between 0–360?
 * ────────────────────────────────
 * Real shooting stars can streak in any direction. The previous version
 * only used 20–50° (upper-left to lower-right). Now each star gets a
 * fully random angle, starting position spread across the viewport,
 * and varied delay/duration for organic randomness.
 */
function generateShootingStars() {
    return Array.from({ length: SHOOTING_STAR_COUNT }, (_, i) => ({
        id: i,
        top: `${Math.random() * 80}%`,
        left: `${Math.random() * 80}%`,
        angle: Math.random() * 360,
        delay: `${2 + Math.random() * 15}s`,
        duration: `${2 + Math.random() * 2.5}s`,
        length: `${60 + Math.random() * 140}px`,
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
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < -10) p.x = width + 10;
                if (p.x > width + 10) p.x = -10;
                if (p.y < -10) p.y = height + 10;
                if (p.y > height + 10) p.y = -10;

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
            {/* Faint centre warmth */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 60%)',
                }}
            />

            {/* Canvas starfield */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            {/* ── Shooting Stars ─────────────────────────────────────────
       *
       * Each star uses the `shoot` CSS keyframe. The animation makes
       * the star fade in from total invisibility, streak across ~600px
       * in its randomised direction, then fade out again.
       *
       * The `rotate()` transform sets the travel direction — since
       * angles are 0–360, stars can fly in any direction.
       * ──────────────────────────────────────────────────────────── */}
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute pointer-events-none"
                    style={{
                        top: star.top,
                        left: star.left,
                        width: star.length,
                        height: '1px',
                        background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 40%, rgba(239,68,68,0.7) 100%)',
                        borderRadius: '999px',
                        boxShadow: '0 0 4px rgba(255,255,255,0.2), 0 0 10px rgba(239,68,68,0.15)',
                        animation: `shoot ${star.duration} ${star.delay} ease-in-out infinite`,
                        transform: `rotate(${star.angle}deg)`,
                        opacity: 0,
                    }}
                />
            ))}
        </div>
    );
}
