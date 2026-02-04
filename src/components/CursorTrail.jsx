import { useEffect, useRef } from 'react';

function CursorTrail() {
    const canvasRef = useRef(null);
    const butterfliesRef = useRef([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef(null);

    const MAX_BUTTERFLIES = 60;

    // Neon cyberpunk colors matching theme
    const butterflyColors = [
        { primary: 'rgba(6, 182, 212, 0.9)', glow: 'rgba(6, 182, 212, 0.5)' },     // Cyan
        { primary: 'rgba(217, 70, 239, 0.9)', glow: 'rgba(217, 70, 239, 0.5)' },   // Magenta/Purple
        { primary: 'rgba(34, 211, 238, 0.9)', glow: 'rgba(34, 211, 238, 0.5)' },   // Light cyan
        { primary: 'rgba(232, 121, 249, 0.85)', glow: 'rgba(232, 121, 249, 0.4)' }, // Light purple
        { primary: 'rgba(99, 102, 241, 0.9)', glow: 'rgba(99, 102, 241, 0.5)' },   // Indigo
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Mouse tracking
        let lastX = 0, lastY = 0;
        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        // Create a butterfly
        const createButterfly = () => {
            const color = butterflyColors[Math.floor(Math.random() * butterflyColors.length)];
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 2 + 1;

            return {
                x: mouseRef.current.x + (Math.random() - 0.5) * 30,
                y: mouseRef.current.y + (Math.random() - 0.5) * 30,
                size: Math.random() * 10 + 6,
                rotation: Math.random() * Math.PI * 2,
                velocityX: Math.cos(angle) * speed,
                velocityY: Math.sin(angle) * speed - 1,
                wingPhase: Math.random() * Math.PI * 2,
                wingSpeed: Math.random() * 0.3 + 0.2,
                wobble: Math.random() * Math.PI * 2,
                wobbleSpeed: Math.random() * 0.05 + 0.02,
                color: color,
                opacity: 1,
                life: 1,
                decay: Math.random() * 0.006 + 0.004
            };
        };

        // Draw a butterfly
        const drawButterfly = (b) => {
            ctx.save();
            ctx.translate(b.x, b.y);
            ctx.rotate(b.rotation + Math.sin(b.wobble) * 0.3);
            ctx.globalAlpha = b.opacity * b.life;

            const wingFlap = Math.sin(b.wingPhase) * 0.5 + 0.5; // 0 to 1
            const size = b.size;

            // Glow effect
            ctx.shadowColor = b.color.glow;
            ctx.shadowBlur = 15;

            // Left wing
            ctx.save();
            ctx.scale(wingFlap * 0.6 + 0.4, 1);
            ctx.beginPath();
            ctx.fillStyle = b.color.primary;
            // Upper wing
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-size * 1.2, -size * 0.8, -size * 1.5, -size * 0.3, -size * 0.8, size * 0.2);
            ctx.bezierCurveTo(-size * 0.4, size * 0.1, 0, 0, 0, 0);
            ctx.fill();
            // Lower wing
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-size * 0.8, size * 0.3, -size * 1, size * 0.8, -size * 0.5, size * 0.6);
            ctx.bezierCurveTo(-size * 0.2, size * 0.4, 0, 0, 0, 0);
            ctx.fill();
            ctx.restore();

            // Right wing
            ctx.save();
            ctx.scale(wingFlap * 0.6 + 0.4, 1);
            ctx.beginPath();
            ctx.fillStyle = b.color.primary;
            // Upper wing
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(size * 1.2, -size * 0.8, size * 1.5, -size * 0.3, size * 0.8, size * 0.2);
            ctx.bezierCurveTo(size * 0.4, size * 0.1, 0, 0, 0, 0);
            ctx.fill();
            // Lower wing
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(size * 0.8, size * 0.3, size * 1, size * 0.8, size * 0.5, size * 0.6);
            ctx.bezierCurveTo(size * 0.2, size * 0.4, 0, 0, 0, 0);
            ctx.fill();
            ctx.restore();

            // Body
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.fillStyle = b.color.primary;
            ctx.ellipse(0, size * 0.1, size * 0.12, size * 0.4, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        };

        // Add butterflies based on movement
        let lastButterflyTime = 0;
        const addButterflies = (time) => {
            const dx = mouseRef.current.x - lastX;
            const dy = mouseRef.current.y - lastY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (time - lastButterflyTime > 30 && distance > 2) {
                // Add more butterflies based on speed
                const count = Math.min(4, Math.floor(distance / 8) + 1);
                for (let i = 0; i < count; i++) {
                    if (butterfliesRef.current.length < MAX_BUTTERFLIES) {
                        butterfliesRef.current.push(createButterfly());
                    }
                }
                lastButterflyTime = time;
            }

            lastX = mouseRef.current.x;
            lastY = mouseRef.current.y;
        };

        // Animation loop
        const animate = (time) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            addButterflies(time);

            // Update and draw butterflies
            butterfliesRef.current = butterfliesRef.current.filter(b => {
                // Update physics
                b.wingPhase += b.wingSpeed;
                b.wobble += b.wobbleSpeed;
                b.x += b.velocityX + Math.sin(b.wobble) * 0.8;
                b.y += b.velocityY + Math.cos(b.wobble * 0.7) * 0.3;
                b.rotation += (Math.random() - 0.5) * 0.05;
                b.life -= b.decay;

                // Gentle upward drift
                b.velocityY -= 0.02;
                // Slow down
                b.velocityX *= 0.995;
                b.velocityY *= 0.995;

                // Draw if still alive
                if (b.life > 0) {
                    drawButterfly(b);
                    return true;
                }
                return false;
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Don't render on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null;
    }

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[9990]"
        />
    );
}

export default CursorTrail;
