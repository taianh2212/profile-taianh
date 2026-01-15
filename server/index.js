import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Profile from './models/Profile.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased limit for images if passed as base64 strings

// MongoDB Connection
const uri = process.env.MONGODB_URI;

const connectDB = async () => {
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    if (mongoose.connection.readyState >= 1) return;
    if (!uri) {
        console.warn('WARNING: MONGODB_URI is not defined in .env file.');
        return;
    }
    try {
        await mongoose.connect(uri);
        console.log('MongoDB Database Connected Successfully');
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
    }
};

// Ensure DB connected for routes
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// Routes

// Get Profile Data
app.get('/api/data', async (req, res) => {
    try {
        const data = await Profile.findOne();
        if (!data) {
            return res.json(null); // Return null so frontend uses initialData
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Save/Update Profile Data
app.post('/api/data', async (req, res) => {
    try {
        const newData = req.body;

        // Remove _id from nested objects if they cause conflicts, though typically fine.
        // Mongoose handles it.

        let existing = await Profile.findOne();
        if (existing) {
            // Update existing document
            // We can use findOneAndUpdate to replace content or just update fields
            // Since we send the WHOLE state, replacing/merging is safest.

            // However, for arrays, simple assignment works if we overwrite completely.
            Object.assign(existing, newData);

            // Problem: Object.assign doesn't simple replace MongooseArrays deeply sometimes?
            // Safer to set explicitly:
            existing.profile = newData.profile;
            existing.skills = newData.skills;
            existing.projects = newData.projects;
            existing.experiences = newData.experiences;
            existing.achievements = newData.achievements;
            existing.services = newData.services;
            existing.portfolioCategories = newData.portfolioCategories;

            await existing.save();
            res.json(existing);
        } else {
            const created = await Profile.create(newData);
            res.json(created);
        }
    } catch (err) {
        console.error('Save Error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Export for Vercel
export default app;

// Only listen if not running on Vercel
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
