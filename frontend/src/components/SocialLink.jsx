import { FaExternalLinkAlt } from 'react-icons/fa';

function SocialLink({ link }) {
    return (
        <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-xl p-6 flex items-center gap-4 group hover:border-primary-500/30"
        >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                {link.icon}
            </div>

            <div className="flex-1">
                <h3 className="font-semibold text-white group-hover:text-primary-400 transition-colors">
                    {link.platform}
                </h3>
                <p className="text-dark-400 text-sm">{link.username || link.label}</p>
            </div>

            <FaExternalLinkAlt className="text-dark-500 group-hover:text-primary-400 transition-colors" />
        </a>
    );
}

export default SocialLink;
