import { useEffect, useRef, useState } from 'react';

// Hook for scroll-triggered animations using Intersection Observer
export function useScrollAnimation(options = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Once visible, stop observing (animate only once)
                    if (!options.repeat) {
                        observer.unobserve(element);
                    }
                } else if (options.repeat) {
                    setIsVisible(false);
                }
            },
            {
                threshold: options.threshold || 0.1,
                rootMargin: options.rootMargin || '0px'
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [options.threshold, options.rootMargin, options.repeat]);

    return [ref, isVisible];
}

// Hook for parallax scrolling effect
export function useParallax(speed = 0.5) {
    const ref = useRef(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const scrolled = window.scrollY;
            const rate = scrolled * speed;
            setOffset(rate);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return [ref, offset];
}

// Hook for mouse parallax effect
export function useMouseParallax(intensity = 0.02) {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX - window.innerWidth / 2) * intensity;
            const y = (e.clientY - window.innerHeight / 2) * intensity;
            setPosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [intensity]);

    return position;
}
