import { useState, useRef, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ProximityField } from '../../hooks/useCursorField.jsx';

function ProjectsSection({ data, slideFrom = 'right' }) {
    const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 });
    const sliderRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

    // Physics state
    const targetScroll = useRef(0);
    const currentScroll = useRef(0);
    const animationFrame = useRef(null);
    const isHovering = useRef(false);

    // Lerp function
    const lerp = (start, end, factor) => start + (end - start) * factor;

    // Initialize
    useEffect(() => {
        if (sliderRef.current) {
            targetScroll.current = sliderRef.current.scrollLeft;
            currentScroll.current = sliderRef.current.scrollLeft;
        }
    }, []);

    // Animation Loop for Smooth Inertia
    useEffect(() => {
        const animate = () => {
            if (!sliderRef.current) return;

            // Smoothly interpolate current scroll to target
            // If dragging, follow tightly. If released, ease out.
            const ease = isDragging ? 0.2 : 0.08;
            currentScroll.current = lerp(currentScroll.current, targetScroll.current, ease);

            // Apply scroll
            sliderRef.current.scrollLeft = currentScroll.current;

            // Calculate active index based on scroll position
            if (sliderRef.current) {
                const center = currentScroll.current + sliderRef.current.clientWidth / 2;
                // Assuming card width + gap approx 400px + 32px gap = 432px
                // A better way is to find the element closest to center
                const cardWidth = 450; // Approximated card width + gap
                const index = Math.round((center - sliderRef.current.clientWidth / 2) / cardWidth);
                setActiveIndex(Math.max(0, Math.min(index, (data?.length || 0) - 1)));
            }

            animationFrame.current = requestAnimationFrame(animate);
        };

        animationFrame.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame.current);
    }, [isDragging, data]);

    // Mouse Events for Drag
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        setScrollLeft(targetScroll.current); // Use target to prevent jump
        isHovering.current = true;
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
        isHovering.current = false;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        isHovering.current = true;
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast multiplier
        targetScroll.current = scrollLeft - walk;
    };

    const handleWheel = (e) => {
        // Horizontal scroll with wheel
        if (sectionRef.current && sectionRef.current.contains(e.target)) {
            // Optional: capture wheel only if hovering slider
        }
    };

    return (
        <section
            id="projects"
            className={`py-32 relative overflow-hidden bg-dark-900 ${isVisible ? 'visible' : ''}`}
            ref={sectionRef}
        >
            <div className="max-w-[1920px] mx-auto px-6">
                {/* Header */}
                <div className={`mb-16 ml-6 md:ml-12 lg:ml-24 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-primary-400 text-sm font-medium tracking-widest uppercase mb-4">
                        Portfolio
                    </p>
                    <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
                        Selected <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-xl">
                        Swipe to explore. Click to view code.
                    </p>
                </div>

                {/* Slider Container */}
                <div
                    ref={sliderRef}
                    className="flex gap-8 overflow-x-auto pb-20 pt-10 px-6 md:px-12 lg:px-24 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    style={{
                        scrollBehavior: 'auto', // We handle smoothing via JS for mouse
                        WebkitOverflowScrolling: 'touch' // Smooth native touch
                    }}
                >
                    {data?.map((project, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <div
                                key={project.id || index}
                                className={`relative flex-shrink-0 w-[350px] md:w-[450px] snap-center transition-all duration-500 ease-out
                                    ${isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-40 hover:opacity-100'}`}
                            >
                                <a
                                    href={project.githubUrl || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block h-full bg-dark-800/50 rounded-3xl overflow-hidden border border-white/5 hover:border-white/10 transition-all"
                                    onClick={(e) => {
                                        // Prevent click if dragging happened
                                        if (isDragging) e.preventDefault();
                                    }}
                                >
                                    {/* Image Area */}
                                    <div className="relative aspect-[16/10] overflow-hidden bg-dark-950">
                                        <div className="absolute inset-0 bg-gradient-to-br from-dark-800 to-dark-900" />

                                        {/* Fallback Icon / Visual */}
                                        <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                                            <span className="text-6xl opacity-20 group-hover:opacity-40 transition-opacity">
                                                {project.icon || '⚡'}
                                            </span>
                                        </div>

                                        {/* Overlay & Action */}
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 
                                                text-white font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                                <FaGithub /> View Source
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="font-display text-2xl font-bold text-white group-hover:text-primary-400 transition-colors">
                                                {project.title}
                                            </h3>
                                            <FaExternalLinkAlt className="text-gray-600 group-hover:text-white transition-colors" size={14} />
                                        </div>

                                        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                            {project.description}
                                        </p>

                                        {/* Tech Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies?.slice(0, 3).map((tech, i) => (
                                                <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-400 border border-white/5">
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.technologies?.length > 3 && (
                                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-500 border border-white/5">
                                                    +{project.technologies.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </a>
                            </div>
                        );
                    })}

                    {/* Padding at end for centering last item */}
                    <div className="w-12 md:w-24 flex-shrink-0" />
                </div>

                {/* Progress Indicators */}
                <div className="flex justify-center gap-2 mt-8">
                    {data?.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                if (sliderRef.current) {
                                    // Calculate target position for this index
                                    // 482px is approx card width + gap (450 + 32)
                                    // This is rough approximation, ideally we query the element
                                    const cardWidth = window.innerWidth < 768 ? 382 : 482;
                                    targetScroll.current = idx * cardWidth;
                                }
                            }}
                            className={`h-1 rounded-full transition-all duration-300 
                                ${idx === activeIndex ? 'w-8 bg-primary-500' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ProjectsSection;
