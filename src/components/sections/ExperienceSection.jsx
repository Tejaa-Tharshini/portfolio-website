import { useScrollAnimation } from '../../hooks/useScrollAnimation';

function ExperienceSection({ data, slideFrom = 'right' }) {
    const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 });
    const slideClass = slideFrom === 'left' ? 'slide-from-left' : 'slide-from-right';

    return (
        <section
            id="experience"
            className={`py-24 relative slide-section ${slideClass} ${isVisible ? 'visible' : ''}`}
            ref={sectionRef}
        >
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="section-title">
                        Work <span className="gradient-text">Experience</span>
                    </h2>
                    <p className="section-subtitle">
                        My professional journey and the experiences that have shaped my skills.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {data?.map((exp, index) => (
                        <div
                            key={exp.id || index}
                            className={`group relative transition-all duration-500`}
                            style={{
                                transitionDelay: `${index * 150}ms`,
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateX(0)' : 'translateX(-30px)'
                            }}
                        >
                            {/* Timeline connector */}
                            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500/50 to-transparent" />

                            {/* Timeline dot */}
                            <div className="absolute left-4 top-6 w-5 h-5 rounded-full bg-primary-500 border-4 border-dark-950 z-10 group-hover:scale-125 transition-transform" />

                            {/* Card */}
                            <div className="ml-14 glass-card rounded-2xl p-6 mb-6 hover:scale-[1.02] transition-transform">
                                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                                    <div>
                                        <h3 className="font-display text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                                            {exp.title}
                                        </h3>
                                        <p className="text-primary-400 font-medium">{exp.company}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-1 rounded-full text-xs bg-primary-500/10 text-primary-400 border border-primary-500/20">
                                            {exp.type || 'Full-time'}
                                        </span>
                                        <span className="text-gray-500 text-sm">{exp.duration}</span>
                                    </div>
                                </div>

                                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                    {exp.description}
                                </p>

                                {exp.technologies && exp.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {exp.technologies.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 text-xs rounded-lg bg-dark-800 text-gray-400 border border-white/5"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Open to opportunities */}
                <div className={`mt-12 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="glass-card rounded-2xl p-8 hover:scale-[1.02] transition-transform">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-green-400 font-medium">Open to Opportunities</span>
                        </div>
                        <h3 className="font-display text-xl font-semibold text-white mb-3">
                            Looking for New Challenges
                        </h3>
                        <p className="text-gray-400 mb-6">
                            I'm actively seeking positions where I can apply my skills and continue growing as a developer.
                        </p>
                        <a href="mailto:tharshinitejaa@gmail.com" className="btn-primary inline-block hover:scale-105 transition-transform">
                            Get in Touch
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ExperienceSection;
