import { FaGraduationCap, FaCode, FaHeart } from 'react-icons/fa';

function About() {
    return (
        <section className="section pt-32 relative">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="section-title">
                        About <span className="gradient-text">Me</span>
                    </h2>
                    <p className="section-subtitle">
                        Get to know more about my background, interests, and what drives me as a developer.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Profile Image Section */}
                    <div className="relative">
                        <div className="relative w-80 h-80 mx-auto">
                            {/* Decorative glass panels */}
                            <div className="absolute inset-0 glass-panel rotate-6 scale-95 opacity-50"></div>
                            <div className="absolute inset-0 glass-panel -rotate-3 opacity-70"></div>

                            {/* Profile container */}
                            <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center glass overflow-hidden">
                                <span className="text-8xl">👩‍💻</span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                        <div className="glass-card rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center">
                                    <FaGraduationCap className="text-primary-400 text-xl" />
                                </div>
                                <h3 className="font-display text-xl font-semibold text-white">Education</h3>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                Currently pursuing my degree in Computer Science, with a strong foundation
                                in software development, algorithms, and data structures. Passionate about
                                continuous learning and staying updated with the latest technologies.
                            </p>
                        </div>

                        <div className="glass-card rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center">
                                    <FaCode className="text-accent-400 text-xl" />
                                </div>
                                <h3 className="font-display text-xl font-semibold text-white">What I Do</h3>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                I specialize in full-stack web development, building modern applications
                                using React.js for the frontend and Node.js with Express for the backend.
                                I enjoy creating responsive, user-friendly interfaces backed by robust APIs.
                            </p>
                        </div>

                        <div className="glass-card rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                                    <FaHeart className="text-green-400 text-xl" />
                                </div>
                                <h3 className="font-display text-xl font-semibold text-white">Interests</h3>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                Beyond coding, I'm interested in UI/UX design, open-source contributions,
                                and exploring emerging technologies like AI and cloud computing. I believe
                                in building software that makes a positive impact.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                    {[
                        { value: '10+', label: 'Projects Completed' },
                        { value: '5+', label: 'Technologies' },
                        { value: '1+', label: 'Years Learning' },
                        { value: '100%', label: 'Passion' },
                    ].map((stat, index) => (
                        <div key={index} className="glass-card rounded-2xl p-6 text-center group hover:border-primary-500/40 transition-all">
                            <div className="font-display text-3xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform">
                                {stat.value}
                            </div>
                            <div className="text-gray-500 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default About;
