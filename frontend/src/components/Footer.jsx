import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="glass border-t border-white/10 mt-20">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <h3 className="font-display text-2xl font-bold gradient-text mb-3">
                            Tejaa Tharshini R
                        </h3>
                        <p className="text-dark-400 text-sm leading-relaxed">
                            Full Stack Developer passionate about building modern web applications
                            and creating impactful digital experiences.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Quick Links</h4>
                        <div className="grid grid-cols-2 gap-2">
                            <Link to="/about" className="text-dark-400 hover:text-primary-400 transition-colors text-sm">About</Link>
                            <Link to="/projects" className="text-dark-400 hover:text-primary-400 transition-colors text-sm">Projects</Link>
                            <Link to="/skills" className="text-dark-400 hover:text-primary-400 transition-colors text-sm">Skills</Link>
                            <Link to="/experience" className="text-dark-400 hover:text-primary-400 transition-colors text-sm">Experience</Link>
                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Connect</h4>
                        <div className="flex gap-4">
                            <a
                                href="https://github.com/Tejaa-Tharshini"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-dark-400 hover:text-primary-400 transition-all"
                                aria-label="GitHub"
                            >
                                <FaGithub size={18} />
                            </a>
                            <a
                                href="https://linkedin.com/in/tejaa-tharshini-93a30b265"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-dark-400 hover:text-primary-400 transition-all"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin size={18} />
                            </a>
                            <a
                                href="mailto:tharshinitejaa@gmail.com"
                                className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-dark-400 hover:text-primary-400 transition-all"
                                aria-label="Email"
                            >
                                <FaEnvelope size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-dark-500 text-sm">
                        © {currentYear} Tejaa Tharshini R. All rights reserved.
                    </p>
                    <p className="text-dark-500 text-sm flex items-center gap-1">
                        Made with <FaHeart className="text-accent-500" size={12} /> using React & Tailwind CSS
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
