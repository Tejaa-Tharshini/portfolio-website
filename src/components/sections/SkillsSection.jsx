import { useScrollAnimation } from '../../hooks/useScrollAnimation';

function SkillsSection({ data, slideFrom = 'left' }) {
    const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 });
    const slideClass = slideFrom === 'left' ? 'slide-from-left' : 'slide-from-right';

    const getLevelWidth = (level) => {
        switch (level) {
            case 'expert': return 'w-full';
            case 'advanced': return 'w-4/5';
            case 'intermediate': return 'w-3/5';
            case 'beginner': return 'w-2/5';
            default: return 'w-3/5';
        }
    };

    return (
        <section
            id="skills"
            className={`py-24 relative slide-section ${slideClass} ${isVisible ? 'visible' : ''}`}
            ref={sectionRef}
        >
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="section-title">
                        Technical <span className="gradient-text">Skills</span>
                    </h2>
                    <p className="section-subtitle">
                        Technologies and tools I work with to bring ideas to life.
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {data?.categories?.map((category, catIndex) => (
                        <div
                            key={category.id || catIndex}
                            className={`glass-card rounded-2xl p-6 transition-all duration-500 hover:scale-[1.02]`}
                            style={{
                                transitionDelay: `${catIndex * 150}ms`,
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
                            }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-2xl">
                                    {category.icon}
                                </div>
                                <h3 className="font-display text-xl font-semibold text-white">
                                    {category.title}
                                </h3>
                            </div>

                            <div className="grid gap-4">
                                {category.skills?.map((skill, skillIndex) => (
                                    <div
                                        key={skillIndex}
                                        className="group p-4 rounded-xl bg-dark-800/50 hover:bg-dark-800 transition-all"
                                    >
                                        <div className="flex items-center gap-4 mb-2">
                                            <span className="text-xl group-hover:scale-110 transition-transform">
                                                {skill.icon || '💻'}
                                            </span>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center">
                                                    <h4 className="font-medium text-white group-hover:text-primary-400 transition-colors">
                                                        {skill.name}
                                                    </h4>
                                                    <span className="text-xs text-gray-500 capitalize">
                                                        {skill.level}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden ml-10">
                                            <div
                                                className={`h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full ${getLevelWidth(skill.level)} transition-all duration-500 group-hover:opacity-100 opacity-70`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Learning Badge */}
                <div className={`mt-16 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="glass-card rounded-2xl p-8 max-w-3xl mx-auto hover:scale-[1.02] transition-transform">
                        <h3 className="font-display text-xl font-semibold text-white mb-4">
                            Always Learning 📚
                        </h3>
                        <p className="text-gray-400">
                            I'm constantly expanding my skill set. Currently exploring TypeScript,
                            Next.js, Docker, and cloud services. I believe in staying curious and adapting to new technologies.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SkillsSection;
