import ExperienceCard from '../components/ExperienceCard';

const experiences = [
    {
        title: 'Full Stack Developer Intern',
        company: 'Tech Company',
        duration: 'Jan 2026 - Present',
        type: 'Internship',
        description: 'Working on developing and maintaining web applications using React.js and Node.js. Collaborating with the team to implement new features, fix bugs, and improve application performance. Gained hands-on experience with MongoDB and RESTful API development.',
        technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Git'],
    },
    {
        title: 'Web Development Intern',
        company: 'Startup ABC',
        duration: 'Jun 2025 - Dec 2025',
        type: 'Internship',
        description: 'Contributed to frontend development projects using React and Tailwind CSS. Participated in code reviews, implemented responsive designs, and worked closely with the UI/UX team to bring designs to life.',
        technologies: ['React.js', 'Tailwind CSS', 'JavaScript', 'Figma'],
    },
    {
        title: 'Freelance Developer',
        company: 'Self-Employed',
        duration: '2024 - 2025',
        type: 'Freelance',
        description: 'Developed custom websites and web applications for small businesses and individuals. Managed complete project lifecycle from requirements gathering to deployment and maintenance.',
        technologies: ['HTML/CSS', 'JavaScript', 'WordPress', 'React.js'],
    },
];

function Experience() {
    return (
        <section className="section pt-32 relative">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="section-title">
                        Work <span className="gradient-text">Experience</span>
                    </h2>
                    <p className="section-subtitle">
                        My professional journey and the experiences that have shaped my skills.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Experience Cards */}
                    {experiences.map((experience, index) => (
                        <ExperienceCard
                            key={index}
                            title={experience.title}
                            company={experience.company}
                            duration={experience.duration}
                            description={experience.description}
                            technologies={experience.technologies}
                            type={experience.type}
                        />
                    ))}
                </div>

                {/* Looking for opportunities */}
                <div className="mt-16 text-center">
                    <div className="glass-card rounded-2xl p-8 gradient-border">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-green-400 font-medium">Open to Opportunities</span>
                        </div>
                        <h3 className="font-display text-xl font-semibold text-white mb-3">
                            Looking for New Challenges
                        </h3>
                        <p className="text-gray-400 mb-6">
                            I'm actively seeking internship and entry-level positions where I can
                            apply my skills and continue growing as a developer.
                        </p>
                        <a href="mailto:tharshinitejaa@gmail.com" className="btn-primary inline-block">
                            Get in Touch
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Experience;
