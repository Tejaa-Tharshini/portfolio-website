import SocialLink from '../components/SocialLink';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

const links = [
    {
        platform: 'Email',
        username: 'tharshinitejaa@gmail.com',
        url: 'mailto:tharshinitejaa@gmail.com',
        icon: <FaEnvelope size={24} />,
        label: 'Send me a message',
    },
    {
        platform: 'Phone',
        username: '+91 8668183045',
        url: 'tel:+918668183045',
        icon: <FaPhone size={24} />,
        label: 'Give me a call',
    },
    {
        platform: 'GitHub',
        username: 'Tejaa-Tharshini',
        url: 'https://github.com/Tejaa-Tharshini',
        icon: <FaGithub size={24} />,
        label: 'View my code repositories',
    },
    {
        platform: 'LinkedIn',
        username: 'tejaa-tharshini-93a30b265',
        url: 'https://linkedin.com/in/tejaa-tharshini-93a30b265',
        icon: <FaLinkedin size={24} />,
        label: 'Connect professionally',
    },
];

function Links() {
    return (
        <section className="section pt-32">
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
                        <SocialLink key={index} link={link} />
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-16 text-center">
                    <div className="glass-card rounded-xl p-8">
                        <h3 className="font-display text-2xl font-bold text-white mb-4">
                            Let's Work Together! 🚀
                        </h3>
                        <p className="text-dark-400 mb-6 max-w-lg mx-auto">
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
                        className="text-dark-400 hover:text-primary-400 text-sm transition-colors"
                    >
                        📋 Copy Email
                    </button>
                    <button
                        onClick={() => navigator.clipboard.writeText('https://github.com/Tejaa-Tharshini')}
                        className="text-dark-400 hover:text-primary-400 text-sm transition-colors"
                    >
                        📋 Copy GitHub
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Links;
