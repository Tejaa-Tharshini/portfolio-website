import { useState, useRef, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

function ProjectsSection({ data }) {
    const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 });
    const containerRef = useRef(null);
    const [scrollState, setScrollState] = useState({
        progress: 0,
        fixed: false,
        bottom: false
    });
    const [activeIndex, setActiveIndex] = useState(0);

    // One viewport per card + 1 for start/end buffer
    const scrollHeightMultiplier = (data?.length || 1) + 1;

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const containerHeight = rect.height;
            const scrollableDist = containerHeight - viewportHeight;

            // Check if we are "inside" the container's scroll zone
            const isInside = rect.top <= 0 && rect.bottom >= viewportHeight;
            const isPast = rect.bottom < viewportHeight;

            // Calculate progress 0 to 1
            let progress = 0;
            if (rect.top <= 0) {
                progress = Math.abs(rect.top) / scrollableDist;
            }
            progress = Math.max(0, Math.min(1, progress));

            setScrollState({
                progress,
                fixed: isInside,
                bottom: isPast
            });

            // Calculate active index
            const totalCards = data?.length || 1;
            const currentIndex = Math.min(
                Math.floor(progress * totalCards),
                totalCards - 1
            );
            setActiveIndex(currentIndex);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [data]);

    return (
        /* Dummy container */
        <div
            ref={containerRef}
            className="relative w-full"
            style={{ height: `${scrollHeightMultiplier * 100}vh` }}
        >
            {/* Sticky Content - Transparent Background as requested */}
            <div
                className={`w-full h-screen overflow-hidden flex flex-col justify-center
                ${scrollState.fixed ? 'fixed top-0 left-0 z-20' : 'absolute left-0 z-20'}
                ${scrollState.bottom ? 'bottom-0 top-auto' : 'top-0'}
                `}
            >
                {/* Header */}
                <div
                    ref={sectionRef}
                    className={`absolute top-10 md:top-20 left-0 right-0 px-6 md:px-24 z-30 transition-all duration-700
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    <p className="text-primary-400 text-sm font-medium tracking-widest uppercase mb-2">
                        Portfolio
                    </p>
                    <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                        Selected <span className="gradient-text">Projects</span>
                    </h2>
                </div>

                {/* 3D Cylindrical Carousel */}
                <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center perspective-1000">
                    {data?.map((project, index) => {
                        const floatIndex = scrollState.progress * ((data?.length || 1) - 0.01);
                        const offset = index - floatIndex;

                        // Visibility optimization
                        if (Math.abs(offset) > 2) return null;

                        // Refined 3D Logic - Smoother, less drastic
                        const activeScale = 1;
                        const inactiveScale = 0.9;

                        // Use a Gaussian-like curve for scale to make it smooth
                        const scale = activeScale - (Math.abs(offset) * (activeScale - inactiveScale));

                        // Smoother depth and rotation
                        const translateZ = Math.abs(offset) * -150;
                        const rotateY = offset * -10;

                        // Spread
                        const translateX = offset * 55;

                        // Z-Index for proper layering
                        const zIndex = 100 - Math.abs(Math.round(offset * 10));

                        return (
                            <div
                                key={project.id || index}
                                className="absolute w-[85vw] md:w-[60vw] max-w-4xl aspect-[16/9] md:aspect-[2/1]
                                rounded-3xl shadow-2xl will-change-transform"
                                style={{
                                    transform: `
                                        perspective(1000px)
                                        translateX(${translateX}%)
                                        translateZ(${translateZ}px) 
                                        rotateY(${rotateY}deg)
                                        scale(${Math.max(0, scale)})
                                    `,
                                    zIndex: zIndex,
                                    // No opacity fade on the card container itself, fully visible
                                    opacity: 1
                                }}
                            >
                                {/* Solid opaque background card */}
                                <div className="relative w-full h-full bg-dark-800 rounded-3xl overflow-hidden border border-white/5 shadow-2xl group">

                                    {/* Content Grid */}
                                    <div className="relative h-full grid grid-cols-1 md:grid-cols-2">
                                        {/* Image/Visual Side */}
                                        <div className="relative h-full overflow-hidden bg-dark-900">
                                            {/* Gradient Background for visual interest */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 to-dark-900" />

                                            <div className="absolute inset-0 flex items-center justify-center text-8xl text-primary-500/20 group-hover:scale-110 transition-transform duration-700">
                                                {project.icon || '💻'}
                                            </div>

                                            {/* Links Overlay - Always visible on mobile, hover on desktop */}
                                            <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-[2px]">
                                                <a
                                                    href={project.githubUrl || '#'}
                                                    className="px-6 py-3 rounded-full bg-white text-dark-900 font-bold hover:scale-105 transition-transform flex items-center gap-2"
                                                >
                                                    <FaGithub /> Source
                                                </a>
                                                {(project.liveUrl) && (
                                                    <a
                                                        href={project.liveUrl}
                                                        className="px-6 py-3 rounded-full border-2 border-white text-white font-bold hover:bg-white/10 hover:scale-105 transition-all flex items-center gap-2"
                                                    >
                                                        <FaExternalLinkAlt /> Live
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Info Side - Solid Opaque */}
                                        <div className="p-8 md:p-12 flex flex-col justify-center bg-dark-800">
                                            <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                                                {project.title}
                                            </h3>
                                            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8">
                                                {project.description}
                                            </p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies?.map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-4 py-1.5 rounded-full text-sm font-medium 
                                                        bg-dark-900 border border-white/10 text-primary-300"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Progress Indicators */}
                <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 z-30">
                    {data?.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all duration-300 shadow-lg
                            ${idx === activeIndex ? 'w-12 bg-primary-500' : 'w-2 bg-white/20'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProjectsSection;
