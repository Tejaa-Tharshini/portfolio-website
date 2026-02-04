// Default portfolio data - used when no localStorage data exists
export const defaultPortfolioData = {
    profile: {
        name: "Tejaa Tharshini",
        title: "Full Stack Developer",
        tagline: "Available for opportunities",
        description: "Passionate about building modern, scalable web applications with React, Node.js, and MongoDB. Creating impactful digital experiences through clean code and thoughtful design.",
        resumeUrl: "/TEJAA THARSHINI R resume.pdf"
    },
    about: {
        bio: "Currently pursuing my degree in Computer Science, with a strong foundation in software development, algorithms, and data structures. Passionate about continuous learning and staying updated with the latest technologies.",
        whatIDo: "I specialize in full-stack web development, building modern applications using React.js for the frontend and Node.js with Express for the backend. I enjoy creating responsive, user-friendly interfaces backed by robust APIs.",
        interests: "Beyond coding, I'm interested in UI/UX design, open-source contributions, and exploring emerging technologies like AI and cloud computing. I believe in building software that makes a positive impact.",
        education: [
            {
                id: "edu1",
                degree: "B.Tech Computer Science",
                institution: "University Name",
                duration: "2022 - 2026",
                description: "Studying computer science with focus on software engineering and data structures."
            }
        ],
        stats: [
            { value: "10+", label: "Projects Completed" },
            { value: "5+", label: "Technologies" },
            { value: "1+", label: "Years Learning" },
            { value: "100%", label: "Passion" }
        ]
    },
    projects: [
        {
            id: "proj1",
            title: "Portfolio Website",
            description: "A modern, responsive portfolio website built with React.js and Tailwind CSS, featuring a Node.js backend with MongoDB.",
            technologies: ["React", "Tailwind CSS", "Node.js", "MongoDB"],
            githubUrl: "https://github.com/Tejaa-Tharshini/portfolio-website",
            liveUrl: ""
        },
        {
            id: "proj2",
            title: "E-Commerce Platform",
            description: "Full-stack e-commerce application with user authentication, product management, and payment integration.",
            technologies: ["React", "Express.js", "MongoDB", "Stripe"],
            githubUrl: "https://github.com",
            liveUrl: ""
        },
        {
            id: "proj3",
            title: "Task Management App",
            description: "A collaborative task management tool with real-time updates, team features, and progress tracking.",
            technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
            githubUrl: "https://github.com",
            liveUrl: ""
        }
    ],
    skills: {
        categories: [
            {
                id: "cat1",
                title: "Frontend",
                icon: "🎨",
                skills: [
                    { name: "React.js", level: "advanced", icon: "⚛️" },
                    { name: "JavaScript", level: "advanced", icon: "🟨" },
                    { name: "HTML5", level: "expert", icon: "📄" },
                    { name: "CSS3", level: "advanced", icon: "🎨" },
                    { name: "Tailwind CSS", level: "advanced", icon: "💨" }
                ]
            },
            {
                id: "cat2",
                title: "Backend",
                icon: "⚙️",
                skills: [
                    { name: "Node.js", level: "advanced", icon: "💚" },
                    { name: "Express.js", level: "advanced", icon: "🚂" },
                    { name: "REST APIs", level: "advanced", icon: "🔌" },
                    { name: "Python", level: "intermediate", icon: "🐍" }
                ]
            },
            {
                id: "cat3",
                title: "Database",
                icon: "🗄️",
                skills: [
                    { name: "MongoDB", level: "advanced", icon: "🍃" },
                    { name: "MySQL", level: "intermediate", icon: "🐬" },
                    { name: "Firebase", level: "intermediate", icon: "🔥" }
                ]
            },
            {
                id: "cat4",
                title: "Tools & Others",
                icon: "🛠️",
                skills: [
                    { name: "Git & GitHub", level: "advanced", icon: "📦" },
                    { name: "VS Code", level: "expert", icon: "💙" },
                    { name: "Postman", level: "advanced", icon: "📮" },
                    { name: "Vercel", level: "intermediate", icon: "▲" }
                ]
            }
        ]
    },
    experience: [
        {
            id: "exp1",
            title: "Full Stack Developer Intern",
            company: "Tech Company",
            duration: "Jan 2026 - Present",
            type: "Internship",
            description: "Working on developing and maintaining web applications using React.js and Node.js. Collaborating with the team to implement new features, fix bugs, and improve application performance.",
            technologies: ["React.js", "Node.js", "MongoDB", "Express.js", "Git"]
        },
        {
            id: "exp2",
            title: "Web Development Intern",
            company: "Startup ABC",
            duration: "Jun 2025 - Dec 2025",
            type: "Internship",
            description: "Contributed to frontend development projects using React and Tailwind CSS. Participated in code reviews and implemented responsive designs.",
            technologies: ["React.js", "Tailwind CSS", "JavaScript", "Figma"]
        }
    ],
    links: [
        {
            id: "link1",
            name: "Email",
            description: "tharshinitejaa@gmail.com",
            url: "mailto:tharshinitejaa@gmail.com",
            icon: "📧",
            color: "#6366f1"
        },
        {
            id: "link2",
            name: "Phone",
            description: "+91 8668183045",
            url: "tel:+918668183045",
            icon: "📱",
            color: "#22c55e"
        },
        {
            id: "link3",
            name: "GitHub",
            description: "Tejaa-Tharshini",
            url: "https://github.com/Tejaa-Tharshini",
            icon: "💻",
            color: "#333333"
        },
        {
            id: "link4",
            name: "LinkedIn",
            description: "Connect professionally",
            url: "https://linkedin.com/in/tejaa-tharshini-93a30b265",
            icon: "💼",
            color: "#0077b5"
        }
    ],
    siteSettings: {
        logoUrl: "/logo.png",
        logoData: null,  // Will store base64 if uploaded
        siteName: "Tejaa Tharshini",
        siteTitle: "Tejaa Tharshini R | Portfolio"
    },
    testimonials: [
        {
            id: "test1",
            quote: "Tejaa delivered exceptional work on our project. Her attention to detail and technical skills exceeded our expectations. Highly recommended!",
            name: "John Smith",
            role: "Project Manager",
            company: "Tech Startup"
        },
        {
            id: "test2",
            quote: "Working with Tejaa was a pleasure. She understood our requirements perfectly and delivered a beautiful, functional website ahead of schedule.",
            name: "Sarah Chen",
            role: "CEO",
            company: "Digital Agency"
        },
        {
            id: "test3",
            quote: "Tejaa's full-stack skills are impressive. She handled both frontend and backend seamlessly, creating a robust and scalable solution.",
            name: "Mike Johnson",
            role: "Tech Lead",
            company: "Software Company"
        }
    ],
    contact: {
        heading: "Let's Work Together",
        subheading: "Have a project in mind? I'd love to hear about it.",
        email: "tharshinitejaa@gmail.com"
    },
    footer: {
        copyright: "Tejaa Tharshini",
        tagline: "Full Stack Developer",
        showMadeWith: true
    }
};

// Pre-computed hashes for default credentials
// Username: naina, Password: Podapatti
export const defaultAdminAuth = {
    usernameHash: "7c4a0c4e5f5e5d5a4b3c2a1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c", // placeholder - will be computed
    passwordHash: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2"  // placeholder - will be computed
};

// Generate unique ID
export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
