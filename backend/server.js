import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json({ limit: '10mb' })); // Increased limit for base64 images

// Path to data file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data', 'portfolio.json');

// Helper to ensure data directory exists
const ensureDataFile = async () => {
    try {
        await fs.access(DATA_FILE);
    } catch (error) {
        // Create directory if it doesn't exist
        const dir = path.dirname(DATA_FILE);
        try {
            await fs.access(dir);
        } catch {
            await fs.mkdir(dir, { recursive: true });
        }
        // Create default empty object if file unavailable
        await fs.writeFile(DATA_FILE, JSON.stringify({}, null, 2));
    }
};

// Initialize
ensureDataFile();

// API Routes

// GET /api/data - Retrieve all portfolio data
app.get('/api/data', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Error reading data file:', error);
        res.status(500).json({ error: 'Failed to read data' });
    }
});

// POST /api/data - Save all portfolio data
app.post('/api/data', async (req, res) => {
    try {
        const newData = req.body;
        // Validate payload (basic)
        if (!newData || typeof newData !== 'object') {
            return res.status(400).json({ error: 'Invalid data format' });
        }

        await fs.writeFile(DATA_FILE, JSON.stringify(newData, null, 2), 'utf8');
        res.json({ message: 'Data saved successfully', success: true });
    } catch (error) {
        console.error('Error writing data file:', error);
        res.status(500).json({ error: 'Failed to save data' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        storage: 'json-file',
        file: DATA_FILE,
        timestamp: new Date().toISOString()
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Tejaa Tharshini Portfolio API (JSON Storage Mode)',
        endpoints: {
            data: '/api/data'
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📂 Data storage: ${DATA_FILE}`);
});

