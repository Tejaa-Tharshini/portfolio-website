function SkillBadge({ skill, showLevel = true }) {
    const levelColors = {
        beginner: 'from-yellow-500 to-orange-500',
        intermediate: 'from-blue-500 to-cyan-500',
        advanced: 'from-green-500 to-emerald-500',
        expert: 'from-purple-500 to-pink-500',
    };

    const levelWidth = {
        beginner: '25%',
        intermediate: '50%',
        advanced: '75%',
        expert: '100%',
    };

    return (
        <div className="glass-card rounded-lg p-4 group">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    {skill.icon && (
                        <span className="text-2xl">{skill.icon}</span>
                    )}
                    <span className="font-medium text-white">{skill.name}</span>
                </div>
                {showLevel && skill.level && (
                    <span className="text-xs text-dark-400 capitalize">{skill.level}</span>
                )}
            </div>

            {showLevel && skill.level && (
                <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden mt-3">
                    <div
                        className={`h-full bg-gradient-to-r ${levelColors[skill.level] || 'from-primary-500 to-accent-500'} rounded-full transition-all duration-500 group-hover:scale-x-110 origin-left`}
                        style={{ width: levelWidth[skill.level] || '50%' }}
                    />
                </div>
            )}
        </div>
    );
}

export default SkillBadge;
