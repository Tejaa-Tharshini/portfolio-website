function SocialLink({ name, url, icon, color, description }) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group glass-card rounded-2xl p-6 flex items-center gap-5 hover:border-primary-500/40 transition-all duration-300"
        >
            {/* Icon container */}
            <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${color}20` }}
            >
                {icon}
            </div>

            {/* Content */}
            <div className="flex-1">
                <h3 className="font-semibold text-white group-hover:text-primary-400 transition-colors">
                    {name}
                </h3>
                {description && (
                    <p className="text-sm text-gray-500">{description}</p>
                )}
            </div>

            {/* Arrow */}
            <div className="text-gray-600 group-hover:text-primary-400 group-hover:translate-x-1 transition-all">
                →
            </div>
        </a>
    );
}

export default SocialLink;
