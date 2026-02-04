import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

function ProjectCard({ title, description, technologies, githubUrl, liveUrl, image }) {
    return (
        <div className="group glass-card rounded-3xl overflow-hidden">
            {/* Project Image/Preview */}
            <div className="h-48 bg-gradient-to-br from-primary-500/20 to-accent-500/20 relative overflow-hidden">
                {image ? (
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center">
                            <span className="text-3xl">🚀</span>
                        </div>
                    </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                    {title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-5">
                    {technologies?.map((tech, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 text-xs rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                    {githubUrl && (
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-gray-300 hover:text-primary-400 transition-colors"
                        >
                            <FaGithub size={16} />
                            Code
                        </a>
                    )}
                    {liveUrl && (
                        <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500/20 text-sm text-primary-400 hover:bg-primary-500/30 transition-colors"
                        >
                            <FaExternalLinkAlt size={14} />
                            Live
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;
