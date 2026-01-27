import express from 'express';
import Link from '../models/Link.js';

const router = express.Router();

// Default links data
const defaultLinks = [
    {
        platform: 'Email',
        username: 'tharshinitejaa@gmail.com',
        url: 'mailto:tharshinitejaa@gmail.com',
        label: 'Send me a message',
    },
    {
        platform: 'Phone',
        username: '+91 8668183045',
        url: 'tel:+918668183045',
        label: 'Give me a call',
    },
    {
        platform: 'GitHub',
        username: 'Tejaa-Tharshini',
        url: 'https://github.com/Tejaa-Tharshini',
        label: 'View my code repositories',
    },
    {
        platform: 'LinkedIn',
        username: 'tejaa-tharshini-93a30b265',
        url: 'https://linkedin.com/in/tejaa-tharshini-93a30b265',
        label: 'Connect professionally',
    },
];

// GET all links
router.get('/', async (req, res) => {
    try {
        const links = await Link.find().sort({ order: 1 });
        if (links.length === 0) {
            return res.json(defaultLinks);
        }
        res.json(links);
    } catch (error) {
        res.json(defaultLinks);
    }
});

// POST create link
router.post('/', async (req, res) => {
    try {
        const link = await Link.create(req.body);
        res.status(201).json(link);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT update link
router.put('/:id', async (req, res) => {
    try {
        const link = await Link.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!link) {
            return res.status(404).json({ error: 'Link not found' });
        }
        res.json(link);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE link
router.delete('/:id', async (req, res) => {
    try {
        const link = await Link.findByIdAndDelete(req.params.id);
        if (!link) {
            return res.status(404).json({ error: 'Link not found' });
        }
        res.json({ message: 'Link deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
