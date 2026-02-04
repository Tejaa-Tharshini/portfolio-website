import { useState, useEffect, useRef } from 'react';

// Global smooth mouse position
let globalMouse = { x: 0, y: 0, smoothX: 0, smoothY: 0, initialized: false };
const listeners = new Set();

function initGlobalMouse() {
    if (typeof window === 'undefined' || globalMouse.initialized) return;
    globalMouse.initialized = true;

    window.addEventListener('mousemove', (e) => {
        globalMouse.x = e.clientX;
        globalMouse.y = e.clientY;
    }, { passive: true });

    const animate = () => {
        // Smooth mouse position
        const ease = 0.1;
        globalMouse.smoothX += (globalMouse.x - globalMouse.smoothX) * ease;
        globalMouse.smoothY += (globalMouse.y - globalMouse.smoothY) * ease;

        listeners.forEach(cb => cb({
            x: globalMouse.smoothX,
            y: globalMouse.smoothY
        }));
        requestAnimationFrame(animate);
    };
    animate();
}

/**
 * Hook for proximity-based displacement
 * Elements are pushed away from the cursor based on distance
 */
export function useProximityField(options = {}) {
    const {
        strength = 15,      // Max displacement in pixels (subtle)
        radius = 250,       // Effect radius
        easing = 0.06,      // Smooth return (slow = more inertia)
    } = options;

    const elementRef = useRef(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const currentRef = useRef({ x: 0, y: 0 });
    const targetRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef(null);

    useEffect(() => {
        initGlobalMouse();
        const element = elementRef.current;
        if (!element) return;

        // Animation loop with inertia
        const animate = () => {
            // Ease toward target with inertia
            currentRef.current.x += (targetRef.current.x - currentRef.current.x) * easing;
            currentRef.current.y += (targetRef.current.y - currentRef.current.y) * easing;

            // Update state if meaningful change
            const hasChange = Math.abs(currentRef.current.x) > 0.1 || Math.abs(currentRef.current.y) > 0.1;
            if (hasChange || offset.x !== 0 || offset.y !== 0) {
                setOffset({
                    x: Math.abs(currentRef.current.x) < 0.1 ? 0 : currentRef.current.x,
                    y: Math.abs(currentRef.current.y) < 0.1 ? 0 : currentRef.current.y
                });
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        // Mouse update handler
        const handleMouse = (mouse) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = mouse.x - centerX;
            const dy = mouse.y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < radius && distance > 0) {
                // Displacement strength based on proximity
                const factor = 1 - (distance / radius);
                const power = factor * factor * factor; // Cubic falloff for soft feel

                // Direction away from cursor (displacement not follow)
                const nx = -(dx / distance);
                const ny = -(dy / distance);

                targetRef.current.x = nx * power * strength;
                targetRef.current.y = ny * power * strength;
            } else {
                // Smoothly return to origin
                targetRef.current.x = 0;
                targetRef.current.y = 0;
            }
        };

        listeners.add(handleMouse);
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            listeners.delete(handleMouse);
            cancelAnimationFrame(animationRef.current);
        };
    }, [strength, radius, easing, offset.x, offset.y]);

    return {
        ref: elementRef,
        style: {
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            willChange: offset.x !== 0 || offset.y !== 0 ? 'transform' : 'auto'
        }
    };
}

/**
 * Component wrapper for proximity effect
 */
export function ProximityField({
    children,
    as: Component = 'div',
    strength = 15,
    radius = 250,
    easing = 0.06,
    className = '',
    style: propStyle = {},
    ...props
}) {
    const { ref, style } = useProximityField({ strength, radius, easing });

    return (
        <Component
            ref={ref}
            className={className}
            style={{ ...propStyle, ...style }}
            {...props}
        >
            {children}
        </Component>
    );
}

export default useProximityField;
