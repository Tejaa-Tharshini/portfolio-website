import { Link } from 'react-router-dom';
import { FaArrowRight, FaGithub, FaLinkedin } from 'react-icons/fa';

function Home() {
    return (
        <section className="min-h-screen flex items-center justify-center relative pt-20">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-hero-gradient" />
            <div className="absolute inset-0 bg-gradient-radial from-primary-500/10 via-transparent to-transparent" />

            <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
                <div className="text-center animate-fade-in">
                    {/* Greeting */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-sm text-dark-300">Available for opportunities</span>
                    </div>

                    {/* Main heading */}
                    <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        Hi, I'm{' '}
                        <span className="gradient-text">Tejaa Tharshini R</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-dark-400 mb-4 font-light">
                        Full Stack Developer
                    </p>

                    <p className="text-dark-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
                        Passionate about building modern, scalable web applications with
                        React, Node.js, and MongoDB. Creating impactful digital experiences
                        through clean code and thoughtful design.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <Link to="/projects" className="btn-primary inline-flex items-center gap-2">
                            View My Work
                            <FaArrowRight size={14} />
                        </Link>
                        <a
                            href="/TEJAA THARSHINI R resume.pdf"
                            download="Tejaa_Tharshini_Resume.pdf"
                            className="btn-secondary inline-flex items-center gap-2"
                        >
                            📄 Download Resume
                        </a>
                        <Link to="/about" className="btn-secondary">
                            About Me
                        </Link>
                    </div>

                    {/* Social links */}
                    <div className="flex justify-center gap-4">
                        <a
                            href="https://github.com/Tejaa-Tharshini"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-dark-400 hover:text-primary-400 transition-all hover:glow"
                            aria-label="GitHub"
                        >
                            <FaGithub size={22} />
                        </a>
                        <a
                            href="https://linkedin.com/in/tejaa-tharshini-93a30b265"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-dark-400 hover:text-primary-400 transition-all hover:glow"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin size={22} />
                        </a>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
                    <div className="w-6 h-10 rounded-full border-2 border-dark-500 flex justify-center pt-2">
                        <div className="w-1 h-2 rounded-full bg-dark-500 animate-bounce" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;
