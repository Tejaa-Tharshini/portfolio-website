import { useEffect, useState } from 'react';
import { FaArrowRight, FaDownload, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useMouseParallax } from '../../hooks/useScrollAnimation';

function HeroSection({ data }) {
    const [mounted, setMounted] = useState(false);
    const [textIndex, setTextIndex] = useState(0);
    const mousePos = useMouseParallax(0.015);

    // Rotating titles for dynamic feel
    const titles = [
        data?.title || "Full Stack Developer",
        "UI/UX Enthusiast",
        "Problem Solver",
        "Creative Coder"
    ];

    useEffect(() => {
        setMounted(true);

        // Rotate titles every 3 seconds
        const interval = setInterval(() => {
            setTextIndex(prev => (prev + 1) % titles.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [titles.length]);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
            {/* Main content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex flex-col items-center text-center">

                    {/* Availability badge */}
                    <div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full 
                        bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm
                        border border-white/10 mb-8 sm:mb-12
                        transition-all duration-1000 ease-out
                        ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-8 scale-95'}`}
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs sm:text-sm text-gray-300 font-medium">
                            {data?.tagline || "Available for opportunities"}
                        </span>
                    </div>

                    {/* Name with gradient effect */}
                    <h1
                        className={`font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 
                        font-bold mb-4 sm:mb-6 leading-[1.1] tracking-tighter
                        transition-all duration-1000 delay-200 ease-out
                        ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400">
                            {(data?.name || "TEJAA THARSHINI").split(' ')[0]}
                        </span>
                        <br className="sm:hidden" />
                        <span className="sm:ml-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 animate-gradient-x">
                            {(data?.name || "TEJAA THARSHINI").split(' ').slice(1).join(' ')}
                        </span>
                    </h1>

                    {/* Animated line */}
                    <div
                        className={`h-px w-24 sm:w-32 md:w-48 mb-6 sm:mb-8
                        bg-gradient-to-r from-transparent via-primary-500 to-transparent
                        transition-all duration-1000 delay-400
                        ${mounted ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
                    />

                    {/* Rotating title */}
                    <div
                        className={`h-8 sm:h-10 mb-4 sm:mb-6 overflow-hidden
                        transition-all duration-1000 delay-500
                        ${mounted ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <p
                            className="text-lg sm:text-xl md:text-2xl font-medium gradient-text transition-transform duration-500"
                            style={{ transform: `translateY(-${textIndex * 100}%)` }}
                        >
                            {titles.map((title, i) => (
                                <span key={i} className="block h-8 sm:h-10 leading-8 sm:leading-10">
                                    {title}
                                </span>
                            ))}
                        </p>
                    </div>

                    {/* Description */}
                    <p
                        className={`text-gray-400 max-w-lg mx-auto mb-10 sm:mb-12 
                        text-sm sm:text-base md:text-lg leading-relaxed px-4
                        transition-all duration-1000 delay-600
                        ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    >
                        {data?.description || "Crafting digital experiences with clean code and thoughtful design. Building the future, one pixel at a time."}
                    </p>

                    {/* CTA Buttons */}
                    <div
                        className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto
                        transition-all duration-1000 delay-700
                        ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    >
                        <button
                            onClick={() => scrollToSection('projects')}
                            className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full 
                            bg-gradient-to-r from-primary-500 to-accent-500 
                            text-white font-semibold text-sm sm:text-base
                            hover:shadow-2xl hover:shadow-primary-500/30 hover:-translate-y-1 
                            transition-all duration-300 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                View My Work
                                <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-accent-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>

                        <button
                            onClick={() => scrollToSection('about')}
                            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full 
                            border border-white/20 text-white font-semibold text-sm sm:text-base
                            hover:bg-white/5 hover:border-white/40 hover:-translate-y-1 
                            backdrop-blur-sm transition-all duration-300"
                        >
                            Learn More
                        </button>

                        {data?.resumeUrl && (
                            <a
                                href={data.resumeUrl}
                                download
                                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full 
                                border border-white/20 text-white font-semibold text-sm sm:text-base
                                hover:bg-white/5 hover:border-white/40 hover:-translate-y-1 
                                backdrop-blur-sm transition-all duration-300
                                flex items-center justify-center gap-2"
                            >
                                <FaDownload size={14} />
                                Resume
                            </a>
                        )}
                    </div>

                    {/* Social links */}
                    <div
                        className={`flex items-center gap-4 mt-12 sm:mt-16
                        transition-all duration-1000 delay-1000
                        ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    >
                        <a
                            href="#"
                            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center
                            text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/5
                            transition-all duration-300"
                        >
                            <FaGithub size={18} />
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center
                            text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/5
                            transition-all duration-300"
                        >
                            <FaLinkedin size={18} />
                        </a>
                        <div className="h-6 w-px bg-white/10 mx-2" />
                        <span className="text-xs text-gray-500">Scroll to explore</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
