import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

// Default projects data
const defaultProjects = [
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
];

// GET all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ order: 1, createdAt: -1 });
        if (projects.length === 0) {
            return res.json(defaultProjects);
        }
        res.json(projects);
    } catch (error) {
        res.json(defaultProjects);
    }
});

// GET single project
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST create project
router.post('/', async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT update project
router.put('/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE project
router.delete('/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json({ message: 'Project deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
