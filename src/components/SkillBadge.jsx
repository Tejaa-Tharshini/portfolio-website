function SkillBadge({ name, icon, level, category }) {
    const getLevelWidth = () => {
        switch (level) {
            case 'expert': return 'w-full';
            case 'advanced': return 'w-4/5';
            case 'intermediate': return 'w-3/5';
            case 'beginner': return 'w-2/5';
            default: return 'w-3/5';
        }
    };

    return (
        <div className="group glass-card rounded-2xl p-5 hover:border-primary-500/40 transition-all duration-300">
            <div className="flex items-center gap-4 mb-3">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {icon || '💻'}
                </div>
                {/* Name */}
                <div>
                    <h3 className="font-semibold text-white group-hover:text-primary-400 transition-colors">
                        {name}
                    </h3>
                    <span className="text-xs text-gray-500 capitalize">{level || 'intermediate'}</span>
                </div>
            </div>

            {/* Skill level bar */}
            <div className="h-1.5 bg-dark-800 rounded-full overflow-hidden">
                <div
                    className={`h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full ${getLevelWidth()} transition-all duration-500 group-hover:opacity-100 opacity-70`}
                ></div>
            </div>
        </div>
    );
}

export default SkillBadge;
