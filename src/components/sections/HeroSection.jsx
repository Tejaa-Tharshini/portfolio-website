import { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useMouseParallax } from '../../hooks/useScrollAnimation';
import { ProximityField } from '../../hooks/useCursorField.jsx';

function HeroSection({ data }) {
    const [mounted, setMounted] = useState(false);
    const mousePos = useMouseParallax(0.02);

    useEffect(() => {
        setMounted(true);
    }, []);

    const nameLetters = (data?.name || "TEJAA THARSHINI").toUpperCase().split('');

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
            {/* Parallax background blobs */}
            <div
                className="bg-blob bg-blob-1"
                style={{ transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)` }}
            />
            <div
                className="bg-blob bg-blob-2"
                style={{ transform: `translate(${mousePos.x * -1.5}px, ${mousePos.y * -1.5}px)` }}
            />
            <div
                className="bg-blob bg-blob-3"
                style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
            />

            {/* Glassmorphism layered panels */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] pointer-events-none">
                <ProximityField strength={8} radius={400} easing={0.03}>
                    <div
                        className="absolute inset-0 glass-panel rotate-[-8deg] scale-95 opacity-30"
                        style={{ transform: `rotate(-8deg) scale(0.95) translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
                    />
                </ProximityField>
                <ProximityField strength={6} radius={350} easing={0.04}>
                    <div
                        className="absolute inset-0 glass-panel rotate-[-4deg] scale-[0.98] opacity-50"
                        style={{ transform: `rotate(-4deg) scale(0.98) translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` }}
                    />
                </ProximityField>
                <div className="absolute inset-0 glass-panel opacity-70" />
            </div>

            <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
                <div className="text-center">
                    {/* Availability badge */}
                    <ProximityField strength={10} radius={200} easing={0.05}>
                        <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-sm text-gray-300">{data?.tagline || "Available for opportunities"}</span>
                        </div>
                    </ProximityField>

                    {/* Kinetic Typography - Name with individual letter proximity */}
                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight relative">
                        <div className="flex flex-wrap justify-center gap-1 md:gap-2">
                            {nameLetters.map((letter, index) => (
                                <ProximityField
                                    key={index}
                                    strength={8 + (index % 4) * 2}
                                    radius={100}
                                    easing={0.04 + (index % 3) * 0.01}
                                >
                                    <span
                                        className={`inline-block transition-all duration-700 hover:text-primary-400 cursor-default
                                            ${letter === ' ' ? 'w-4 md:w-8' : ''}
                                            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                                        `}
                                        style={{
                                            transitionDelay: `${index * 50}ms`,
                                            textShadow: '0 0 40px rgba(99, 102, 241, 0.3)',
                                        }}
                                    >
                                        {letter === ' ' ? '\u00A0' : letter}
                                    </span>
                                </ProximityField>
                            ))}
                        </div>
                        <div className={`h-1 w-48 md:w-72 mx-auto mt-4 rounded-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} />
                    </h1>

                    {/* Subtitle */}
                    <ProximityField strength={12} radius={180} easing={0.045}>
                        <div className={`inline-block px-6 py-3 rounded-2xl glass mb-6 transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <p className="text-xl md:text-2xl font-light gradient-text">
                                {data?.title || "Full Stack Developer"}
                            </p>
                        </div>
                    </ProximityField>

                    <ProximityField strength={10} radius={220} easing={0.04}>
                        <p className={`text-gray-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed transition-all duration-700 delay-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            {data?.description || "Passionate about building modern, scalable web applications."}
                        </p>
                    </ProximityField>

                    {/* CTA Buttons */}
                    <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-700 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <ProximityField strength={18} radius={150} easing={0.06}>
                            <button
                                onClick={() => scrollToSection('projects')}
                                className="group relative px-8 py-4 rounded-2xl glass-card overflow-hidden hover:scale-105 transition-transform"
                                data-cursor-hover
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="relative flex items-center gap-2 font-semibold text-white">
                                    <span className="w-2 h-2 rounded-full bg-primary-400" />
                                    Projects
                                    <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </ProximityField>
                        <ProximityField strength={18} radius={150} easing={0.055}>
                            <button
                                onClick={() => scrollToSection('about')}
                                className="group relative px-8 py-4 rounded-2xl glass-card overflow-hidden hover:scale-105 transition-transform"
                                data-cursor-hover
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="relative flex items-center gap-2 font-semibold text-white">
                                    <span className="w-2 h-2 rounded-full bg-accent-400" />
                                    About
                                </span>
                            </button>
                        </ProximityField>
                        {data?.resumeUrl && (
                            <ProximityField strength={18} radius={150} easing={0.05}>
                                <a
                                    href={data.resumeUrl}
                                    download
                                    className="group relative px-8 py-4 rounded-2xl glass-card overflow-hidden hover:scale-105 transition-transform"
                                    data-cursor-hover
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <span className="relative flex items-center gap-2 font-semibold text-white">
                                        📄 Resume
                                    </span>
                                </a>
                            </ProximityField>
                        )}
                    </div>

                    {/* Scroll indicator */}
                    <div className={`transition-all duration-700 delay-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                        <ProximityField strength={12} radius={120} easing={0.05}>
                            <button
                                onClick={() => scrollToSection('about')}
                                className="mx-auto flex flex-col items-center gap-2 text-gray-500 hover:text-primary-400 transition-colors"
                            >
                                <span className="text-sm">Scroll Down</span>
                                <div className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2">
                                    <div className="w-1 h-2 rounded-full bg-current animate-bounce" />
                                </div>
                            </button>
                        </ProximityField>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
