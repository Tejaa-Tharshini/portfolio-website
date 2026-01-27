import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'Tejaa Tharshini R'
    },
    title: {
        type: String,
        required: true,
        default: 'Full Stack Developer'
    },
    bio: {
        type: String,
        default: 'Passionate about building modern, scalable web applications with React, Node.js, and MongoDB. Creating impactful digital experiences through clean code and thoughtful design.'
    },
    email: {
        type: String,
        default: 'tejaa@example.com'
    },
    location: {
        type: String,
        default: 'India'
    },
    photoUrl: {
        type: String,
        default: ''
    },
    resumeUrl: {
        type: String,
        default: ''
    },
    available: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);
