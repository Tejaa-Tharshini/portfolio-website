import { FaEnvelope } from 'react-icons/fa';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

function LinksSection({ data, slideFrom = 'left' }) {
    const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 });
    const slideClass = slideFrom === 'left' ? 'slide-from-left' : 'slide-from-right';

    return (
        <section
            id="links"
            className={`py-24 relative slide-section ${slideClass} ${isVisible ? 'visible' : ''}`}
            ref={sectionRef}
        >
            <div className="max-w-3xl mx-auto px-6">

                {/* Links Grid */}
                <div className="grid gap-4">
                    {data?.map((link, index) => (
                        <a
                            key={link.id || index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group glass-card rounded-2xl p-6 flex items-center gap-5 hover:border-primary-500/40 hover:scale-[1.02] transition-all duration-300`}
                            style={{
                                transitionDelay: `${index * 100}ms`,
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
                            }}
                        >
                            {/* Icon container */}
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110"
                                style={{ backgroundColor: `${link.color}20` }}
                            >
                                {link.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="font-semibold text-white group-hover:text-primary-400 transition-colors">
                                    {link.name}
                                </h3>
                                {link.description && (
                                    <p className="text-sm text-gray-500">{link.description}</p>
                                )}
                            </div>

                            {/* Arrow */}
                            <div className="text-gray-600 group-hover:text-primary-400 group-hover:translate-x-1 transition-all text-xl">
                                →
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default LinksSection;
