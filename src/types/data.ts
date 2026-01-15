export interface Project {
    id: string;
    title: string;
    description: string;
    image?: string;
    technologies: string[];
    link?: string;
    status?: 'Live' | 'In Progress' | 'Concept';
}

export interface Skill {
    id: string;
    name: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    yearsOfExperience: number;
    category: 'frontend' | 'backend' | 'devops' | 'design' | 'other';
    iconUrl?: string;
}

export interface Experience {
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate?: string; // If undefined, "Present"
    description: string[];
}

export interface ProfileData {
    name: string;
    role: string;
    welcomeMessage: string;
    avatarUrl?: string; // If present, use this instead of default
    yearsOfExperience: number;
    projectsCount: number;
    clientsCount: number;
    technologiesCount: number;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    date: string;
    iconUrl?: string;
    image?: string;
    category?: 'se' | 'photographer';
    color?: string; // Gradient class
}

export interface Service {
    id: string;
    name: string;
    description: string;
    icon: string; // Name of Lucide icon
    color: string; // Gradient class
}

export interface PortfolioCategory {
    id: string;
    category: string;
    gradient: string;
    image?: string; // Optional cover image?
}

export interface AppData {
    profile: ProfileData;
    skills: Skill[];
    experiences: Experience[];
    projects: Project[];
    achievements: Achievement[];
    services: Service[];
    portfolioCategories: PortfolioCategory[];
}
