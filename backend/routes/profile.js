import express from 'express';
import Profile from '../models/Profile.js';

const router = express.Router();

// Default profile data (used when DB is not connected)
const defaultProfile = {
    name: 'Tejaa Tharshini R',
    title: 'Full Stack Developer',
    bio: 'Passionate about building modern, scalable web applications with React, Node.js, and MongoDB. Creating impactful digital experiences through clean code and thoughtful design.',
    email: 'tejaa@example.com',
    location: 'India',
    available: true
};

// GET profile
router.get('/', async (req, res) => {
    try {
        let profile = await Profile.findOne();
        if (!profile) {
            // Return default data if no profile in DB
            return res.json(defaultProfile);
        }
        res.json(profile);
    } catch (error) {
        // Return default data if DB error
        res.json(defaultProfile);
    }
});

// PUT update profile
router.put('/', async (req, res) => {
    try {
        let profile = await Profile.findOne();
        if (profile) {
            Object.assign(profile, req.body);
            await profile.save();
        } else {
            profile = await Profile.create(req.body);
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
