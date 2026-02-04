import { FaGraduationCap, FaCode, FaHeart } from 'react-icons/fa';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

function AboutSection({ data, slideFrom = 'left' }) {
    const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 });
    const slideClass = slideFrom === 'left' ? 'slide-from-left' : 'slide-from-right';

    return (
        <section
            id="about"
            className={`py-24 relative slide-section ${slideClass} ${isVisible ? 'visible' : ''}`}
            ref={sectionRef}
        >
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="section-title">
                        About <span className="gradient-text">Me</span>
                    </h2>
                    <p className="section-subtitle">
                        Get to know more about my background, interests, and what drives me.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Profile Image Section */}
                    <div className={`relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                        <div className="relative w-72 h-72 mx-auto">
                            {/* Decorative circles */}
                            <div className="absolute inset-0 rounded-full glass-panel rotate-6 scale-95 opacity-50" />
                            <div className="absolute inset-0 rounded-full glass-panel -rotate-3 opacity-70" />
                            {/* Main photo circle */}
                            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 glass overflow-hidden">
                                {/* Profile Photo - Place your photo at public/profile.jpg */}
                                <img
                                    src={data?.photoUrl || "/profile.jpg"}
                                    alt={data?.name || "Profile Photo"}
                                    className="w-full h-full object-cover"
                                    style={{
                                        transform: `scale(${data?.photoSettings?.zoom || 1})`,
                                        objectPosition: `${data?.photoSettings?.positionX || 50}% ${data?.photoSettings?.positionY || 50}%`
                                    }}
                                    onError={(e) => {
                                        // Fallback to emoji if image not found
                                        e.target.style.display = 'none';
                                        e.target.parentNode.innerHTML = '<span class="flex items-center justify-center w-full h-full text-8xl">👩‍💻</span>';
                                    }}
                                />
                            </div>
                            {/* Glow effect */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/10 to-accent-500/10 blur-xl -z-10" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-5">
                        <div className={`glass-card rounded-2xl p-6 transition-all duration-500 delay-300 hover:scale-[1.02] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center">
                                    <FaGraduationCap className="text-primary-400 text-xl" />
                                </div>
                                <h3 className="font-display text-xl font-semibold text-white">Education</h3>
                            </div>
                            <p className="text-gray-400 leading-relaxed">{data?.bio}</p>
                        </div>

                        <div className={`glass-card rounded-2xl p-6 transition-all duration-500 delay-400 hover:scale-[1.02] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center">
                                    <FaCode className="text-accent-400 text-xl" />
                                </div>
                                <h3 className="font-display text-xl font-semibold text-white">What I Do</h3>
                            </div>
                            <p className="text-gray-400 leading-relaxed">{data?.whatIDo}</p>
                        </div>

                        <div className={`glass-card rounded-2xl p-6 transition-all duration-500 delay-500 hover:scale-[1.02] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                                    <FaHeart className="text-green-400 text-xl" />
                                </div>
                                <h3 className="font-display text-xl font-semibold text-white">Interests</h3>
                            </div>
                            <p className="text-gray-400 leading-relaxed">{data?.interests}</p>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {data?.stats?.map((stat, index) => (
                        <div
                            key={index}
                            className="glass-card rounded-2xl p-6 text-center group hover:border-primary-500/40 hover:scale-105 transition-all"
                        >
                            <div className="font-display text-3xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform">
                                {stat.value}
                            </div>
                            <div className="text-gray-500 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Education Timeline */}
                {data?.education && data.education.length > 0 && (
                    <div className={`mt-16 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h3 className="font-display text-2xl font-bold text-white mb-8 text-center">
                            🎓 Education
                        </h3>
                        <div className="max-w-2xl mx-auto space-y-4">
                            {data.education.map((edu, index) => (
                                <div key={edu.id || index} className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-semibold text-white">{edu.degree}</h4>
                                        <span className="text-sm text-primary-400">{edu.duration}</span>
                                    </div>
                                    <p className="text-accent-400 text-sm mb-2">{edu.institution}</p>
                                    <p className="text-gray-500 text-sm">{edu.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default AboutSection;
