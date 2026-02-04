import { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaArrowRight, FaChevronRight, FaChevronLeft, FaInstagram } from 'react-icons/fa';

function ContactSection({ data, slideFrom = 'right' }) {
    const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 });
    const slideClass = slideFrom === 'left' ? 'slide-from-left' : 'slide-from-right';
    const containerRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Cursor parallax state
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const animationRef = useRef(null);

    // Lerp function
    const lerp = (start, end, factor) => start + (end - start) * factor;

    useEffect(() => {
        const animate = () => {
            const easing = isHovering ? 0.08 : 0.04;
            setSmoothPos(prev => ({
                x: lerp(prev.x, mousePos.x, easing),
                y: lerp(prev.y, mousePos.y, easing)
            }));
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationRef.current);
    }, [mousePos, isHovering]);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        setMousePos({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
        setIsHovering(false);
        setMousePos({ x: 0, y: 0 });
    };

    const email = data?.email || 'tharshinitejaa@gmail.com';
    const phone = data?.phone || '+91 8668183045';
    // const location = data?.location || 'India';

    const slides = [
        {
            id: 'email',
            icon: FaEnvelope,
            label: 'Email Details',
            value: email,
            action: `mailto:${email}`,
            actionLabel: 'Send Email',
            color: 'text-primary-400',
            bg: 'bg-primary-500/10'
        },
        {
            id: 'phone',
            icon: FaPhone,
            label: 'Phone Number',
            value: phone,
            action: `tel:${phone.replace(/\s/g, '')}`,
            actionLabel: 'Call Now',
            color: 'text-accent-400',
            bg: 'bg-accent-500/10'
        },
        {
            id: 'linkedin',
            icon: FaLinkedin,
            label: 'LinkedIn Profile',
            value: 'Tejaa Tharshini',
            action: 'https://linkedin.com/in/tejaa-tharshini',
            actionLabel: 'Connect',
            color: 'text-blue-400',
            bg: 'bg-blue-500/10'
        },
        {
            id: 'github',
            icon: FaGithub,
            label: 'GitHub Profile',
            value: 'Tejaa-Tharshini',
            action: 'https://github.com/Tejaa-Tharshini',
            actionLabel: 'Follow',
            color: 'text-gray-400',
            bg: 'bg-white/10'
        },
        {
            id: 'instagram',
            icon: FaInstagram,
            label: 'Instagram',
            value: '@tharshini_tejaa',
            action: 'https://www.instagram.com/tharshini_tejaa?igsh=MWRrZTE3b3J4dXA5bA==',
            actionLabel: 'Follow',
            color: 'text-pink-400',
            bg: 'bg-pink-500/10'
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    // Parallax style for cards
    const getParallaxStyle = (depth) => {
        const moveX = smoothPos.x * depth * 15;
        const moveY = smoothPos.y * depth * 10;
        const rotateX = smoothPos.y * depth * -3;
        const rotateY = smoothPos.x * depth * 3;

        return {
            transform: `perspective(1000px) translate(${moveX}px, ${moveY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: 'transform 0.1s ease-out'
        };
    };

    const activeData = slides[currentSlide];

    return (
        <section
            id="contact"
            className={`py-32 relative slide-section ${slideClass} ${isVisible ? 'visible' : ''}`}
            ref={sectionRef}
        >
            <div className="max-w-5xl mx-auto px-6">

                {/* Single Stacked Card Slider */}
                <div
                    ref={containerRef}
                    className="relative max-w-lg mx-auto"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Background stacked cards effect */}
                    <div
                        className="absolute inset-0 rounded-3xl bg-dark-800/40 rotate-6 scale-90 translate-y-4"
                        style={{ ...getParallaxStyle(0.3), zIndex: 0 }}
                    />
                    <div
                        className="absolute inset-0 rounded-3xl bg-dark-800/60 rotate-3 scale-95 translate-y-2"
                        style={{ ...getParallaxStyle(0.5), zIndex: 1 }}
                    />

                    {/* Main Active Card */}
                    <div
                        className="relative z-10 bg-gradient-to-br from-dark-800 to-dark-900 border border-white/10 
                            rounded-3xl p-10 shadow-2xl overflow-hidden aspect-[4/3] flex flex-col justify-between"
                        style={getParallaxStyle(1)}
                    >
                        {/* Glow accent */}
                        <div className={`absolute -top-20 -right-20 w-60 h-60 rounded-full 
                            bg-gradient-to-br from-primary-500/10 to-accent-500/10 blur-3xl pointer-events-none transition-all duration-500
                            ${currentSlide === 1 ? 'opacity-100' : 'opacity-50'}`} />

                        {/* Top: Icon */}
                        <div className="transition-all duration-500 key={currentSlide}">
                            <div className={`w-16 h-16 rounded-2xl ${activeData.bg} flex items-center justify-center mb-6`}>
                                <activeData.icon className={`text-3xl ${activeData.color}`} />
                            </div>

                            {/* Content */}
                            <div className="space-y-2">
                                <h3 className="text-gray-400 text-sm uppercase tracking-widest font-medium">
                                    {activeData.label}
                                </h3>
                                <p className="font-display text-2xl md:text-3xl font-bold text-white break-words">
                                    {activeData.value}
                                </p>
                            </div>
                        </div>

                        {/* Bottom: Action & Nav */}
                        <div className="flex items-end justify-between mt-8">
                            {/* Action Button */}
                            <a
                                href={activeData.action}
                                target={activeData.id === 'email' || activeData.id === 'phone' ? '_self' : '_blank'}
                                rel="noreferrer"
                                className="flex items-center gap-2 group/btn"
                            >
                                <span className="text-white font-medium group-hover/btn:underline decoration-primary-500 decoration-2 underline-offset-4">
                                    {activeData.actionLabel}
                                </span>
                                <FaArrowRight className={`text-sm ${activeData.color} group-hover/btn:translate-x-1 transition-transform`} />
                            </a>

                            {/* Navigation */}
                            <div className="flex gap-2">
                                <button
                                    onClick={prevSlide}
                                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                                >
                                    <FaChevronLeft size={14} />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                                >
                                    <FaChevronRight size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Slide Indicators */}
                        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 pointer-events-none">
                            {slides.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 
                                        ${idx === currentSlide ? 'bg-white w-4' : 'bg-white/20'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactSection;
