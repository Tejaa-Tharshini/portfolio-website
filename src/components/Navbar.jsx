import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { FaHome, FaUser, FaBriefcase, FaBolt, FaStar, FaEnvelope } from 'react-icons/fa';

const navLinks = [
    { name: 'Home', href: '#home', icon: FaHome },
    { name: 'About', href: '#about', icon: FaUser },
    { name: 'Work', href: '#projects', icon: FaBriefcase },
    { name: 'Skills', href: '#skills', icon: FaBolt },
    { name: 'Experience', href: '#experience', icon: FaStar },
    { name: 'Contact', href: '#links', icon: FaEnvelope },
];

function Navbar() {
    const [activeSection, setActiveSection] = useState('home');
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();
    const { data } = usePortfolioData();

    const logoSrc = data?.siteSettings?.logoData || data?.siteSettings?.logoUrl || '/logo.png';
    const isAdminPage = location.pathname.startsWith('/admin');

    useEffect(() => {
        const handleScroll = () => {
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
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (href) => {
        const sectionId = href.substring(1);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (isAdminPage) return null;

    return (
        <>
            {/* Desktop - Right Side Vertical Navigation */}
            <nav
                className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:block"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className={`
                    flex flex-col items-center gap-2 p-3 rounded-2xl
                    bg-white/5 backdrop-blur-xl border border-white/10
                    shadow-[0_8px_32px_rgba(0,0,0,0.4)]
                    transition-all duration-300
                    ${isHovered ? 'bg-white/10' : ''}
                `}>

                    {/* Logo */}
                    <button
                        onClick={() => scrollToSection('#home')}
                        className="w-10 h-10 rounded-xl overflow-hidden bg-white/10 
                        hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
                    >
                        <img src={logoSrc} alt="Logo" className="w-7 h-7 object-contain" />
                    </button>

                    <div className="w-6 h-px bg-white/20 my-1" />

                    {/* Nav items */}
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.substring(1);
                        const Icon = link.icon;

                        return (
                            <button
                                key={link.href}
                                onClick={() => scrollToSection(link.href)}
                                className={`
                                    flex items-center gap-3 rounded-xl transition-all duration-300
                                    ${isHovered ? 'px-4 py-2.5 w-full' : 'p-2'}
                                    ${isActive
                                        ? 'bg-primary-500/20 text-primary-400'
                                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                                    }
                                `}
                            >
                                {/* Icon */}
                                <Icon size={16} className={isActive ? 'text-primary-400' : ''} />

                                {/* Label - visible on hover */}
                                <span className={`
                                    text-sm font-medium whitespace-nowrap transition-all duration-300 overflow-hidden
                                    ${isHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0'}
                                `}>
                                    {link.name}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* Mobile - Bottom Navigation with Icons */}
            <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden">
                <div className="flex items-center gap-2 p-2 rounded-2xl
                    bg-white/10 backdrop-blur-xl border border-white/10
                    shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.substring(1);
                        const Icon = link.icon;
                        return (
                            <button
                                key={link.href}
                                onClick={() => scrollToSection(link.href)}
                                className={`
                                    w-11 h-11 rounded-xl flex items-center justify-center
                                    transition-all duration-300
                                    ${isActive
                                        ? 'bg-primary-500/30 text-primary-400 shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                                    }
                                `}
                            >
                                <Icon size={18} />
                            </button>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}

export default Navbar;
