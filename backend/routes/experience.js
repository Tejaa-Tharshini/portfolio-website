import express from 'express';
import Experience from '../models/Experience.js';

const router = express.Router();

// Default experience data
const defaultExperiences = [
    {
        role: 'Full Stack Developer Intern',
        company: 'Tech Company',
        duration: 'Jan 2026 - Present',
        description: 'Working on developing and maintaining web applications using React.js and Node.js. Collaborating with the team to implement new features, fix bugs, and improve application performance.',
        technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Git'],
        current: true
    },
    {
        role: 'Web Development Intern',
        company: 'Startup ABC',
        duration: 'Jun 2025 - Dec 2025',
        description: 'Contributed to frontend development projects using React and Tailwind CSS. Participated in code reviews, implemented responsive designs.',
        technologies: ['React.js', 'Tailwind CSS', 'JavaScript', 'Figma'],
        current: false
    },
    {
        role: 'Freelance Developer',
        company: 'Self-Employed',
        duration: '2024 - 2025',
        description: 'Developed custom websites and web applications for small businesses and individuals. Managed complete project lifecycle.',
        technologies: ['HTML/CSS', 'JavaScript', 'WordPress', 'React.js'],
        current: false
    },
];

// GET all experiences
router.get('/', async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
        if (experiences.length === 0) {
            return res.json(defaultExperiences);
        }
        res.json(experiences);
    } catch (error) {
        res.json(defaultExperiences);
    }
});

// POST create experience
router.post('/', async (req, res) => {
    try {
        const experience = await Experience.create(req.body);
        res.status(201).json(experience);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT update experience
router.put('/:id', async (req, res) => {
    try {
        const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!experience) {
            return res.status(404).json({ error: 'Experience not found' });
        }
        res.json(experience);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE experience
router.delete('/:id', async (req, res) => {
    try {
        const experience = await Experience.findByIdAndDelete(req.params.id);
        if (!experience) {
            return res.status(404).json({ error: 'Experience not found' });
        }
        res.json({ message: 'Experience deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
