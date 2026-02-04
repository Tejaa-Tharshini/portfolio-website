import { useState, useEffect, useRef } from 'react';

function CustomCursor() {
    const mouseRef = useRef({ x: 0, y: 0 });
    const cursorRef = useRef({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const animationRef = useRef(null);

    // Smooth follow with lerp
    useEffect(() => {
        const animate = () => {
            const ease = 0.12;
            cursorRef.current.x += (mouseRef.current.x - cursorRef.current.x) * ease;
            cursorRef.current.y += (mouseRef.current.y - cursorRef.current.y) * ease;
            setPosition({ x: cursorRef.current.x, y: cursorRef.current.y });
            animationRef.current = requestAnimationFrame(animate);
        };
        animationRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationRef.current);
    }, []);

    // Mouse tracking
    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
        };
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isVisible]);

    // Hover detection
    useEffect(() => {
        const handleMouseOver = (e) => {
            const target = e.target;
            const isInteractive =
                target.closest('a') ||
                target.closest('button') ||
                target.closest('[data-cursor-hover]');
            setIsHovering(!!isInteractive);
        };

        document.addEventListener('mouseover', handleMouseOver, { passive: true });
        return () => document.removeEventListener('mouseover', handleMouseOver);
    }, []);

    // Don't render on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null;
    }

    return (
        <div
            className={`
                fixed pointer-events-none z-[9999] mix-blend-difference
                transition-opacity duration-300
                ${isVisible ? 'opacity-100' : 'opacity-0'}
            `}
            style={{
                left: position.x,
                top: position.y,
                transform: 'translate(-50%, -50%)',
            }}
        >
            {/* Minimal dot cursor */}
            <div
                className={`
                    rounded-full bg-white transition-all duration-200 ease-out
                    ${isHovering ? 'w-8 h-8 opacity-30' : 'w-2 h-2 opacity-80'}
                `}
            />
        </div>
    );
}

export default CustomCursor;
