import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePortfolioData } from '../hooks/usePortfolioData';

const navLinks = [
    { name: 'Home', href: '#home', icon: '🏠' },
    { name: 'About', href: '#about', icon: '👤' },
    { name: 'Work', href: '#projects', icon: '💼' },
    { name: 'Skills', href: '#skills', icon: '⚡' },
    { name: 'Experience', href: '#experience', icon: '🎯' },
    { name: 'Contact', href: '#contact', icon: '✉️' },
    { name: 'Links', href: '#links', icon: '🔗' },
];

function Navbar() {
    const [activeSection, setActiveSection] = useState('home');
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();
    const { data } = usePortfolioData();

    // Get logo from siteSettings - prefer base64 data if available
    const logoSrc = data?.siteSettings?.logoData || data?.siteSettings?.logoUrl || '/logo.png';

    // Check if on admin page
    const isAdminPage = location.pathname.startsWith('/admin');

    useEffect(() => {
        const handleScroll = () => {
            // Update active section based on scroll position
            const sections = navLinks.map(link => link.href.substring(1));
            for (const section of sections.reverse()) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 200) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (href) => {
        const sectionId = href.substring(1);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Don't show navbar on admin pages
    if (isAdminPage) return null;

    return (
        <>
            {/* Right Side Vertical Navigation */}
            <nav
                className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:block"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className={`
                    flex flex-col items-end gap-3 p-3 rounded-2xl transition-all duration-500
                    ${isHovered ? 'bg-dark-850/90 backdrop-blur-xl border border-primary-500/20 shadow-lg shadow-primary-500/10' : ''}
                `}>
                    {/* Logo at top */}
                    <button
                        onClick={() => scrollToSection('#home')}
                        className={`
                            flex items-center justify-center rounded-xl overflow-hidden 
                            bg-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-300
                            ${isHovered ? 'w-12 h-12' : 'w-10 h-10'}
                        `}
                    >
                        <img
                            src={logoSrc}
                            alt="Logo"
                            className="w-8 h-8 object-contain"
                        />
                    </button>

                    {/* Divider */}
                    <div className={`w-8 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

                    {/* Nav Links */}
                    {navLinks.map((link) => (
                        <button
                            key={link.href}
                            onClick={() => scrollToSection(link.href)}
                            className={`
                                group flex items-center gap-3 transition-all duration-300
                                ${isHovered ? 'px-4 py-2' : 'p-2'}
                                rounded-xl
                                ${activeSection === link.href.substring(1)
                                    ? 'bg-primary-500/20 text-primary-400'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }
                            `}
                        >
                            {/* Label - shows on hover */}
                            <span className={`
                                text-sm font-medium whitespace-nowrap transition-all duration-300
                                ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 w-0 overflow-hidden'}
                            `}>
                                {link.name}
                            </span>

                            {/* Dot/Icon indicator */}
                            <span className={`
                                flex items-center justify-center transition-all duration-300
                                ${activeSection === link.href.substring(1)
                                    ? 'scale-125'
                                    : 'group-hover:scale-110'
                                }
                                ${isHovered ? 'text-lg' : 'text-xs'}
                            `}>
                                {isHovered ? link.icon : (
                                    <span className={`
                                        block rounded-full transition-all
                                        ${activeSection === link.href.substring(1)
                                            ? 'w-2.5 h-2.5 bg-primary-400'
                                            : 'w-1.5 h-1.5 bg-gray-500 group-hover:bg-white'
                                        }
                                    `} />
                                )}
                            </span>
                        </button>
                    ))}
                </div>
            </nav>

            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden">
                <div className="flex items-center gap-1 p-2 rounded-2xl bg-dark-850/90 backdrop-blur-xl border border-primary-500/20">
                    {navLinks.map((link) => (
                        <button
                            key={link.href}
                            onClick={() => scrollToSection(link.href)}
                            className={`
                                p-3 rounded-xl text-lg transition-all
                                ${activeSection === link.href.substring(1)
                                    ? 'bg-primary-500/20 scale-110'
                                    : 'hover:bg-white/5'
                                }
                            `}
                        >
                            {link.icon}
                        </button>
                    ))}
                </div>
            </nav>
        </>
    );
}

export default Navbar;
