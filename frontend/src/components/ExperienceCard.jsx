function ExperienceCard({ experience, isLeft = false }) {
    return (
        <div className={`flex gap-6 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            {/* Timeline dot */}
            <div className="hidden md:flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 glow" />
                <div className="w-0.5 h-full bg-gradient-to-b from-primary-500/50 to-transparent" />
            </div>

            {/* Card */}
            <div className="flex-1 glass-card rounded-xl p-6 mb-8">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                        <h3 className="font-display text-xl font-semibold text-white">
                            {experience.role}
                        </h3>
                        <p className="text-primary-400 font-medium">{experience.company}</p>
                    </div>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-accent-500/10 text-accent-400 border border-accent-500/20">
                        {experience.duration}
                    </span>
                </div>

                <p className="text-dark-400 text-sm leading-relaxed mb-4">
                    {experience.description}
                </p>

                {/* Technologies */}
                {experience.technologies && (
                    <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 text-xs rounded bg-dark-700/50 text-dark-300"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ExperienceCard;
