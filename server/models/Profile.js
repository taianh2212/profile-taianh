import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
    profile: {
        name: String,
        role: String,
        welcomeMessage: String,
        yearsOfExperience: Number,
        projectsCount: Number,
        customIcons: {
            se: String,
            photographer: String
        },
        backgroundImageUrl: String,
        seStats: {
            years: Number,
            projects: Number,
            clients: Number,
            technologies: Number
        },
        photoStats: {
            years: Number,
            projects: Number,
            clients: Number,
            awards: Number
        }
    },
    skills: [{
        id: String,
        name: String,
        level: String,
        yearsOfExperience: Number,
        category: String,
        iconUrl: String
    }],
    experiences: [{
        id: String,
        company: String,
        role: String,
        startDate: String,
        endDate: String,
        description: [String]
    }],
    projects: [{
        id: String,
        title: String,
        description: String,
        technologies: [String],
        status: String,
        image: String
    }],
    achievements: [{
        id: String,
        title: String,
        description: String,
        date: String,
        iconUrl: String,
        image: String,
        category: String,
        color: String
    }],
    services: [{
        id: String,
        name: String,
        description: String,
        icon: String,
        color: String
    }],
    portfolioCategories: [{
        id: String,
        category: String,
        gradient: String,
        image: String,
        images: [String] // Array of image URLs
    }]
}, { timestamps: true });

export default mongoose.model('Profile', ProfileSchema);
