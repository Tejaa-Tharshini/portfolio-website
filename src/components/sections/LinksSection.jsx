import { useState, useEffect, useCallback } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaLinkedin, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';

// Icon mapping
const iconMap = {
    'LinkedIn': FaLinkedin,
    'GitHub': FaGithub,
    'Email': FaEnvelope,
    'Phone': FaPhone,
};

function LinksSection({ data, slideFrom = 'left' }) {
    const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 });
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [exitingIndex, setExitingIndex] = useState(null);
    const [direction, setDirection] = useState('next');
    const slideClass = slideFrom === 'left' ? 'slide-from-left' : 'slide-from-right';

    const links = data || [];
    const totalCards = links.length;

    // Auto-rotate cards
    useEffect(() => {
        if (totalCards <= 1) return;

        const interval = setInterval(() => {
            if (!isAnimating) {
                goToNext();
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [totalCards, isAnimating, activeIndex]);

    const goToNext = useCallback(() => {
        if (isAnimating || totalCards <= 1) return;
        setIsAnimating(true);
        setDirection('next');
        setExitingIndex(activeIndex);

        setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % totalCards);
            setTimeout(() => {
                setExitingIndex(null);
                setIsAnimating(false);
            }, 400);
        }, 100);
    }, [totalCards, isAnimating, activeIndex]);

    const goToPrev = useCallback(() => {
        if (isAnimating || totalCards <= 1) return;
        setIsAnimating(true);
        setDirection('prev');
        setExitingIndex(activeIndex);

        setTimeout(() => {
            setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
            setTimeout(() => {
                setExitingIndex(null);
                setIsAnimating(false);
            }, 400);
        }, 100);
    }, [totalCards, isAnimating, activeIndex]);

    const goToIndex = useCallback((index) => {
        if (isAnimating || index === activeIndex) return;
        setIsAnimating(true);
        setDirection(index > activeIndex ? 'next' : 'prev');
        setExitingIndex(activeIndex);

        setTimeout(() => {
            setActiveIndex(index);
            setTimeout(() => {
                setExitingIndex(null);
                setIsAnimating(false);
            }, 400);
        }, 100);
    }, [isAnimating, activeIndex]);

    // Get label and action text
    const getLabel = (name) => {
        const labels = { 'LinkedIn': 'LINKEDIN PROFILE', 'GitHub': 'GITHUB PROFILE', 'Email': 'EMAIL ADDRESS', 'Phone': 'PHONE NUMBER' };
        return labels[name] || name?.toUpperCase() || 'CONTACT';
    };

    const getActionText = (name) => {
        const actions = { 'LinkedIn': 'Connect', 'GitHub': 'Follow', 'Email': 'Send Email', 'Phone': 'Call Now' };
        return actions[name] || 'Open';
    };

    // Calculate card style for stack effect
    const getCardStyle = (index) => {
        const stackPos = (index - activeIndex + totalCards) % totalCards;
        const isExiting = index === exitingIndex;

        // Exiting card - flies off based on direction
        if (isExiting) {
            const exitX = direction === 'next' ? 120 : -120;
            const exitRotate = direction === 'next' ? 15 : -15;
            return {
                zIndex: 30,
                transform: `translateX(${exitX}%) translateY(-50px) rotate(${exitRotate}deg) scale(0.9)`,
                opacity: 0,
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            };
        }

        // Active card (top of stack)
        if (stackPos === 0) {
            return {
                zIndex: 20,
                transform: 'translateY(0) scale(1) rotate(0deg)',
                opacity: 1,
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            };
        }

        // Cards in stack (visible behind)
        if (stackPos <= 3) {
            const yOffset = stackPos * 15;
            const scale = 1 - (stackPos * 0.03);
            const rotate = stackPos * 1.5;
            const opacity = 1 - (stackPos * 0.2);

            return {
                zIndex: 15 - stackPos,
                transform: `translateY(${yOffset}px) scale(${scale}) rotate(${rotate}deg)`,
                opacity: Math.max(0.3, opacity),
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                pointerEvents: 'none',
            };
        }

        // Hidden cards
        return {
            zIndex: 0,
            transform: 'translateY(60px) scale(0.85)',
            opacity: 0,
            pointerEvents: 'none',
        };
    };

    return (
        <section
            id="links"
            className={`py-32 relative slide-section ${slideClass} ${isVisible ? 'visible' : ''}`}
            ref={sectionRef}
        >
            <div className="max-w-2xl mx-auto px-6">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="section-title">
                        Connect <span className="gradient-text">With Me</span>
                    </h2>
                </div>

                {/* Stacked Cards Container */}
                <div className="relative h-[350px] flex items-start justify-center perspective-1000">
                    {links.map((link, index) => {
                        const style = getCardStyle(index);
                        const isTop = (index - activeIndex + totalCards) % totalCards === 0 && exitingIndex !== index;
                        const IconComponent = iconMap[link.name] || FaArrowRight;

                        return (
                            <div
                                key={link.id || index}
                                className="absolute w-full max-w-lg origin-bottom"
                                style={style}
                            >
                                <div className={`bg-dark-800 rounded-3xl p-8 border border-white/10 ${isTop ? 'shadow-2xl shadow-primary-500/20' : 'shadow-lg'}`}>
                                    {/* Icon */}
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                                        style={{ backgroundColor: link.color ? `${link.color}20` : 'rgba(99, 102, 241, 0.1)' }}
                                    >
                                        <IconComponent size={28} style={{ color: link.color || '#6366f1' }} />
                                    </div>

                                    {/* Label */}
                                    <p className="text-xs font-medium tracking-widest text-gray-500 mb-2">
                                        {getLabel(link.name)}
                                    </p>

                                    {/* Title */}
                                    <h3 className="font-display text-2xl font-bold text-white mb-8">
                                        {link.description || link.name}
                                    </h3>

                                    {/* Bottom row */}
                                    <div className="flex items-center justify-between">
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-primary-400 font-medium hover:text-primary-300 transition-colors"
                                        >
                                            {getActionText(link.name)}
                                            <FaArrowRight size={12} />
                                        </a>

                                        {/* Navigation Buttons */}
                                        {totalCards > 1 && (
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={(e) => { e.preventDefault(); goToPrev(); }}
                                                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all"
                                                >
                                                    <FaChevronLeft size={14} />
                                                </button>
                                                <button
                                                    onClick={(e) => { e.preventDefault(); goToNext(); }}
                                                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all"
                                                >
                                                    <FaChevronRight size={14} />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Dots */}
                                    {totalCards > 1 && (
                                        <div className="flex justify-center gap-2 mt-6">
                                            {links.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={(e) => { e.preventDefault(); goToIndex(idx); }}
                                                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/30 hover:bg-white/50'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default LinksSection;
