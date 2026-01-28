import ProjectCard from '../components/ProjectCard';

const projects = [
    {
        title: 'Portfolio Website',
        description: 'A modern, responsive portfolio website built with React.js and Tailwind CSS, featuring a Node.js backend with MongoDB.',
        technologies: ['React', 'Tailwind CSS', 'Node.js', 'MongoDB'],
        icon: '🌐',
        github: 'https://github.com',
        demo: '#',
    },
    {
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce application with user authentication, product management, and payment integration.',
        technologies: ['React', 'Express.js', 'MongoDB', 'Stripe'],
        icon: '🛒',
        github: 'https://github.com',
        demo: '#',
    },
    {
        title: 'Task Management App',
        description: 'A collaborative task management tool with real-time updates, team features, and progress tracking.',
        technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
        icon: '✅',
        github: 'https://github.com',
        demo: '#',
    },
    {
        title: 'Weather Dashboard',
        description: 'Interactive weather application displaying real-time weather data with beautiful visualizations.',
        technologies: ['React', 'OpenWeather API', 'Chart.js'],
        icon: '🌤️',
        github: 'https://github.com',
        demo: '#',
    },
    {
        title: 'Blog Platform',
        description: 'A full-featured blog platform with markdown support, comments, and user authentication.',
        technologies: ['Next.js', 'MongoDB', 'Tailwind CSS'],
        icon: '📝',
        github: 'https://github.com',
        demo: '#',
    },
    {
        title: 'Chat Application',
        description: 'Real-time chat application with private messaging, group chats, and file sharing capabilities.',
        technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
        icon: '💬',
        github: 'https://github.com',
        demo: '#',
    },
];

function Projects() {
    return (
        <section className="section pt-32">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="section-title">
                        My <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="section-subtitle">
                        A collection of projects I've worked on, showcasing my skills in
                        full-stack development and problem-solving.
                    </p>
                </div>

                {/* Project Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>

                {/* GitHub CTA */}
                <div className="text-center mt-12">
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary inline-flex items-center gap-2"
                    >
                        View More on GitHub
                        <span>→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Projects;
