import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';
import { usePortfolioData } from '../hooks/usePortfolioData';

function Footer() {
    const { data } = usePortfolioData();
    const currentYear = new Date().getFullYear();
    const footer = data?.footer || {};

    const socialLinks = [
        {
            name: 'GitHub',
            url: 'https://github.com/Tejaa-Tharshini',
            icon: FaGithub,
        },
        {
            name: 'LinkedIn',
            url: 'https://linkedin.com/in/tejaa-tharshini-93a30b265',
            icon: FaLinkedin,
        },
        {
            name: 'Email',
            url: 'mailto:tharshinitejaa@gmail.com',
            icon: FaEnvelope,
        },
    ];

    return (
        <footer className="relative z-20 mt-20">
            {/* Glass divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

            <div className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Glass card footer */}
                    <div className="glass rounded-3xl p-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            {/* Brand */}
                            <div className="text-center md:text-left">
                                <h3 className="font-display text-2xl font-bold gradient-text mb-2">
                                    {footer.copyright || "Tejaa Tharshini"}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    {footer.tagline || "Full Stack Developer"}
                                </p>
                            </div>

                            {/* Social Links */}
                            <div className="flex items-center gap-3">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-gray-400 hover:text-primary-400 hover:scale-110 transition-all group"
                                        aria-label={link.name}
                                    >
                                        <link.icon size={20} className="group-hover:scale-110 transition-transform" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className="mt-8 pt-6 border-t border-white/10 text-center">
                            <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                                © {currentYear} {footer.copyright || "Tejaa Tharshini"}.
                                {footer.showMadeWith !== false && (
                                    <>
                                        Made with
                                        <FaHeart className="text-primary-500 animate-pulse" size={12} />
                                        in India
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
