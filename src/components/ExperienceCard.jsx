function ExperienceCard({ title, company, duration, description, technologies, type }) {
    return (
        <div className="group relative">
            {/* Timeline connector */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500/50 to-transparent"></div>

            {/* Timeline dot */}
            <div className="absolute left-4 top-6 w-5 h-5 rounded-full bg-primary-500 border-4 border-dark-950 z-10 group-hover:scale-125 transition-transform"></div>

            {/* Card */}
            <div className="ml-14 glass-card rounded-2xl p-6 mb-6">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                        <h3 className="font-display text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                            {title}
                        </h3>
                        <p className="text-primary-400 font-medium">{company}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs bg-primary-500/10 text-primary-400 border border-primary-500/20">
                            {type || 'Full-time'}
                        </span>
                        <span className="text-gray-500 text-sm">{duration}</span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {description}
                </p>

                {/* Technologies */}
                {technologies && technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {technologies.map((tech, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 text-xs rounded-lg bg-dark-800 text-gray-400 border border-white/5"
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
