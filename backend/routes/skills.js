import express from 'express';
import Skill from '../models/Skill.js';

const router = express.Router();

// Default skills data
const defaultSkills = [
    { name: 'React.js', category: 'Frontend', level: 'advanced', icon: '⚛️' },
    { name: 'JavaScript', category: 'Frontend', level: 'advanced', icon: '🟨' },
    { name: 'HTML5', category: 'Frontend', level: 'expert', icon: '📄' },
    { name: 'CSS3', category: 'Frontend', level: 'advanced', icon: '🎨' },
    { name: 'Tailwind CSS', category: 'Frontend', level: 'advanced', icon: '💨' },
    { name: 'Node.js', category: 'Backend', level: 'advanced', icon: '💚' },
    { name: 'Express.js', category: 'Backend', level: 'advanced', icon: '🚂' },
    { name: 'REST APIs', category: 'Backend', level: 'advanced', icon: '🔌' },
    { name: 'Python', category: 'Backend', level: 'intermediate', icon: '🐍' },
    { name: 'MongoDB', category: 'Database', level: 'advanced', icon: '🍃' },
    { name: 'MySQL', category: 'Database', level: 'intermediate', icon: '🐬' },
    { name: 'Git & GitHub', category: 'Tools & Others', level: 'advanced', icon: '📦' },
    { name: 'VS Code', category: 'Tools & Others', level: 'expert', icon: '💙' },
    { name: 'Postman', category: 'Tools & Others', level: 'advanced', icon: '📮' },
];

// GET all skills
router.get('/', async (req, res) => {
    try {
        const skills = await Skill.find().sort({ category: 1, order: 1 });
        if (skills.length === 0) {
            return res.json(defaultSkills);
        }
        res.json(skills);
    } catch (error) {
        res.json(defaultSkills);
    }
});

// GET skills by category
router.get('/category/:category', async (req, res) => {
    try {
        const skills = await Skill.find({ category: req.params.category }).sort({ order: 1 });
        res.json(skills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST create skill
router.post('/', async (req, res) => {
    try {
        const skill = await Skill.create(req.body);
        res.status(201).json(skill);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT update skill
router.put('/:id', async (req, res) => {
    try {
        const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!skill) {
            return res.status(404).json({ error: 'Skill not found' });
        }
        res.json(skill);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE skill
router.delete('/:id', async (req, res) => {
    try {
        const skill = await Skill.findByIdAndDelete(req.params.id);
        if (!skill) {
            return res.status(404).json({ error: 'Skill not found' });
        }
        res.json({ message: 'Skill deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
