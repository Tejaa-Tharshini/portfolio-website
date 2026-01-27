import SkillBadge from '../components/SkillBadge';

const skillCategories = [
    {
        title: 'Frontend',
        icon: '🎨',
        skills: [
            { name: 'React.js', level: 'advanced', icon: '⚛️' },
            { name: 'JavaScript', level: 'advanced', icon: '🟨' },
            { name: 'HTML5', level: 'expert', icon: '📄' },
            { name: 'CSS3', level: 'advanced', icon: '🎨' },
            { name: 'Tailwind CSS', level: 'advanced', icon: '💨' },
        ],
    },
    {
        title: 'Backend',
        icon: '⚙️',
        skills: [
            { name: 'Node.js', level: 'advanced', icon: '💚' },
            { name: 'Express.js', level: 'advanced', icon: '🚂' },
            { name: 'REST APIs', level: 'advanced', icon: '🔌' },
            { name: 'Python', level: 'intermediate', icon: '🐍' },
        ],
    },
    {
        title: 'Database',
        icon: '🗄️',
        skills: [
            { name: 'MongoDB', level: 'advanced', icon: '🍃' },
            { name: 'MySQL', level: 'intermediate', icon: '🐬' },
            { name: 'Firebase', level: 'intermediate', icon: '🔥' },
        ],
    },
    {
        title: 'Tools & Others',
        icon: '🛠️',
        skills: [
            { name: 'Git & GitHub', level: 'advanced', icon: '📦' },
            { name: 'VS Code', level: 'expert', icon: '💙' },
            { name: 'Postman', level: 'advanced', icon: '📮' },
            { name: 'Vercel', level: 'intermediate', icon: '▲' },
            { name: 'Render', level: 'intermediate', icon: '🚀' },
        ],
    },
];

function Skills() {
    return (
        <section className="section pt-32">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="section-title">
                        Technical <span className="gradient-text">Skills</span>
                    </h2>
                    <p className="section-subtitle">
                        Technologies and tools I work with to bring ideas to life.
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {skillCategories.map((category, index) => (
                        <div key={index} className="glass-card rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-3xl">{category.icon}</span>
                                <h3 className="font-display text-xl font-semibold text-white">
                                    {category.title}
                                </h3>
                            </div>

                            <div className="grid gap-3">
                                {category.skills.map((skill, skillIndex) => (
                                    <SkillBadge key={skillIndex} skill={skill} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Info */}
                <div className="mt-16 text-center">
                    <div className="glass-card rounded-xl p-8 max-w-3xl mx-auto">
                        <h3 className="font-display text-xl font-semibold text-white mb-4">
                            Always Learning 📚
                        </h3>
                        <p className="text-dark-400">
                            I'm constantly expanding my skill set. Currently exploring TypeScript,
                            Next.js, Docker, and cloud services like AWS. I believe in staying
                            curious and adapting to new technologies.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Skills;
