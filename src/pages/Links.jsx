import SocialLink from '../components/SocialLink';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

const links = [
    {
        name: 'Email',
        description: 'tharshinitejaa@gmail.com',
        url: 'mailto:tharshinitejaa@gmail.com',
        icon: '📧',
        color: '#6366f1',
    },
    {
        name: 'Phone',
        description: '+91 8668183045',
        url: 'tel:+918668183045',
        icon: '📱',
        color: '#22c55e',
    },
    {
        name: 'GitHub',
        description: 'Tejaa-Tharshini',
        url: 'https://github.com/Tejaa-Tharshini',
        icon: '💻',
        color: '#333333',
    },
    {
        name: 'LinkedIn',
        description: 'Connect professionally',
        url: 'https://linkedin.com/in/tejaa-tharshini-93a30b265',
        icon: '💼',
        color: '#0077b5',
    },
];

function Links() {
    return (
        <section className="section pt-32 relative">
            <div className="max-w-3xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="section-title">
                        Connect <span className="gradient-text">With Me</span>
                    </h2>
                    <p className="section-subtitle">
                        Find me across the web. Let's connect and build something amazing together!
                    </p>
                </div>

                {/* Links Grid */}
                <div className="grid gap-4">
                    {links.map((link, index) => (
                        <SocialLink
                            key={index}
                            name={link.name}
                            description={link.description}
                            url={link.url}
                            icon={link.icon}
                            color={link.color}
                        />
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-16 text-center">
                    <div className="glass-card rounded-2xl p-8">
                        <h3 className="font-display text-2xl font-bold text-white mb-4">
                            Let's Work Together! 🚀
                        </h3>
                        <p className="text-gray-400 mb-6 max-w-lg mx-auto">
                            Whether you have a project in mind, want to collaborate, or just want
                            to say hi — I'd love to hear from you!
                        </p>
                        <a
                            href="mailto:tharshinitejaa@gmail.com"
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            <FaEnvelope />
                            Send an Email
                        </a>
                    </div>
                </div>

                {/* Quick Copy */}
                <div className="mt-8 flex justify-center gap-4 flex-wrap">
                    <button
                        onClick={() => navigator.clipboard.writeText('tharshinitejaa@gmail.com')}
                        className="text-gray-500 hover:text-primary-400 text-sm transition-colors"
                    >
                        📋 Copy Email
                    </button>
                    <button
                        onClick={() => navigator.clipboard.writeText('https://github.com/Tejaa-Tharshini')}
                        className="text-gray-500 hover:text-primary-400 text-sm transition-colors"
                    >
                        📋 Copy GitHub
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Links;
