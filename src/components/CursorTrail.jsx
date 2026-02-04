import { useEffect, useRef } from 'react';

function CursorTrail() {
    const canvasRef = useRef(null);
    const pointsRef = useRef([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef(null);

    const MAX_POINTS = 50;
    const POINT_LIFETIME = 800; // ms

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
        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        // Add points with timing
        let lastPointTime = 0;
        const addPoint = (time) => {
            const timeDiff = time - lastPointTime;

            // Add points at intervals based on movement
            if (timeDiff > 8) {
                const lastPoint = pointsRef.current[pointsRef.current.length - 1];
                const dx = lastPoint ? mouseRef.current.x - lastPoint.x : 0;
                const dy = lastPoint ? mouseRef.current.y - lastPoint.y : 0;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Only add point if cursor moved enough
                if (!lastPoint || distance > 2) {
                    pointsRef.current.push({
                        x: mouseRef.current.x,
                        y: mouseRef.current.y,
                        time: time,
                        velocity: distance
                    });

                    // Limit points
                    if (pointsRef.current.length > MAX_POINTS) {
                        pointsRef.current.shift();
                    }

                    lastPointTime = time;
                }
            }
        };

        // Draw smooth curve through points
        const drawSpline = (time) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Remove old points
            pointsRef.current = pointsRef.current.filter(
                p => time - p.time < POINT_LIFETIME
            );

            const points = pointsRef.current;
            if (points.length < 3) return;

            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            // Draw curve segments with varying opacity and thickness
            for (let i = 2; i < points.length; i++) {
                const p0 = points[i - 2];
                const p1 = points[i - 1];
                const p2 = points[i];

                // Calculate age (0 = newest, 1 = oldest)
                const age = (time - p1.time) / POINT_LIFETIME;
                const opacity = Math.max(0, 1 - age);

                // Position in trail (0 = start, 1 = end/cursor)
                const position = i / points.length;

                // Thickness varies: thicker near cursor
                const baseThickness = 2;
                const thickness = baseThickness * (0.3 + position * 0.7) * opacity;

                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
                ctx.lineWidth = Math.max(0.5, thickness);

                // Catmull-Rom spline for smooth curves
                const tension = 0.5;

                // Control points
                const t = 0.5;
                const t2 = t * t;
                const t3 = t2 * t;

                // Simplified curve - quadratic bezier through points
                const cpX = p1.x;
                const cpY = p1.y;

                ctx.moveTo(p0.x, p0.y);
                ctx.quadraticCurveTo(cpX, cpY, p2.x, p2.y);
                ctx.stroke();
            }
        };

        // Animation loop
        const animate = (time) => {
            addPoint(time);
            drawSpline(time);
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
            style={{
                mixBlendMode: 'difference'
            }}
        />
    );
}

export default CursorTrail;
