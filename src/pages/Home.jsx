import { Link } from 'react-router-dom';
import { FaArrowRight, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useEffect, useState } from 'react';

function Home() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const nameLetters = "TEJAA THARSHINI".split('');

    return (
        <section className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
            {/* Aurora background blobs */}
            <div className="bg-blob bg-blob-1"></div>
            <div className="bg-blob bg-blob-2"></div>
            <div className="bg-blob bg-blob-3"></div>

            {/* Glassmorphism layered panels - background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] pointer-events-none">
                <div className="absolute inset-0 glass-panel rotate-[-8deg] scale-95 opacity-30"></div>
                <div className="absolute inset-0 glass-panel rotate-[-4deg] scale-[0.98] opacity-50"></div>
                <div className="absolute inset-0 glass-panel opacity-70"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
                <div className="text-center">
                    {/* Availability badge */}
                    <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-sm text-gray-300">Available for opportunities</span>
                    </div>

                    {/* Kinetic Typography - Name */}
                    <h1 className="font-display text-6xl md:text-8xl font-bold mb-6 leading-tight relative">
                        <div className="flex flex-wrap justify-center gap-1 md:gap-2">
                            {nameLetters.map((letter, index) => (
                                <span
                                    key={index}
                                    className={`inline-block transition-all duration-700 hover:text-primary-400 hover:scale-110 hover:-translate-y-2 cursor-default
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
                            ))}
                        </div>
                        {/* Gradient underline */}
                        <div className={`h-1 w-48 md:w-72 mx-auto mt-4 rounded-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
                    </h1>

                    {/* Subtitle with glass effect */}
                    <div className={`inline-block px-6 py-3 rounded-2xl glass mb-6 transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <p className="text-xl md:text-2xl font-light gradient-text">
                            Full Stack Developer
                        </p>
                    </div>

                    <p className={`text-gray-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed transition-all duration-700 delay-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        Passionate about building modern, scalable web applications with
                        React, Node.js, and MongoDB. Creating impactful digital experiences
                        through clean code and thoughtful design.
                    </p>

                    {/* CTA Buttons - Glassmorphism 2.0 style */}
                    <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-700 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <Link
                            to="/projects"
                            className="group relative px-8 py-4 rounded-2xl glass-card overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative flex items-center gap-2 font-semibold text-white">
                                <span className="w-2 h-2 rounded-full bg-primary-400"></span>
                                Projects
                                <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                        <Link
                            to="/about"
                            className="group relative px-8 py-4 rounded-2xl glass-card overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative flex items-center gap-2 font-semibold text-white">
                                <span className="w-2 h-2 rounded-full bg-accent-400"></span>
                                About
                            </span>
                        </Link>
                        <a
                            href="/TEJAA THARSHINI R resume.pdf"
                            download="Tejaa_Tharshini_Resume.pdf"
                            className="group relative px-8 py-4 rounded-2xl glass-card overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative flex items-center gap-2 font-semibold text-white">
                                📄 Resume
                            </span>
                        </a>
                    </div>

                    {/* Social links - Floating glass buttons */}
                    <div className={`flex justify-center gap-4 transition-all duration-700 delay-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <a
                            href="https://github.com/Tejaa-Tharshini"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-gray-400 hover:text-primary-400 transition-all group"
                            aria-label="GitHub"
                        >
                            <FaGithub size={24} className="group-hover:scale-110 transition-transform" />
                        </a>
                        <a
                            href="https://linkedin.com/in/tejaa-tharshini-93a30b265"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-gray-400 hover:text-primary-400 transition-all group"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin size={24} className="group-hover:scale-110 transition-transform" />
                        </a>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-700 delay-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="w-6 h-10 rounded-full border-2 border-primary-500/50 flex justify-center pt-2">
                        <div className="w-1 h-2 rounded-full bg-primary-400 animate-bounce" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;
