import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

function ProjectCard({ project }) {
    return (
        <div className="glass-card rounded-xl overflow-hidden group">
            {/* Project Image */}
            <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl opacity-30">{project.icon || '🚀'}</span>
                </div>
                <div className="absolute inset-0 bg-dark-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                            aria-label="View on GitHub"
                        >
                            <FaGithub size={18} />
                        </a>
                    )}
                    {project.demo && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                            aria-label="View Demo"
                        >
                            <FaExternalLinkAlt size={16} />
                        </a>
                    )}
                </div>
            </div>

            {/* Project Info */}
            <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-white mb-2">
                    {project.title}
                </h3>
                <p className="text-dark-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;
