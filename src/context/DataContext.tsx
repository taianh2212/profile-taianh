import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AppData, Experience, ProfileData, Project, Skill, Achievement, Service, PortfolioCategory } from '@/types/data';

interface DataContextType {
    data: AppData;
    updateProfile: (data: Partial<ProfileData>) => void;
    addProject: (project: Project) => void;
    updateProject: (id: string, project: Partial<Project>) => void;
    deleteProject: (id: string) => void;
    addSkill: (skill: Skill) => void;
    updateSkill: (id: string, skill: Partial<Skill>) => void;
    deleteSkill: (id: string) => void;
    addAchievement: (achievement: Achievement) => void;
    updateAchievement: (id: string, achievement: Partial<Achievement>) => void;
    deleteAchievement: (id: string) => void;
    addExperience: (experience: Experience) => void;
    updateExperience: (id: string, experience: Partial<Experience>) => void;
    deleteExperience: (id: string) => void;
    addService: (service: Service) => void;
    updateService: (id: string, service: Partial<Service>) => void;
    deleteService: (id: string) => void;
    addPortfolioCategory: (category: PortfolioCategory) => void;
    updatePortfolioCategory: (id: string, category: Partial<PortfolioCategory>) => void;
    deletePortfolioCategory: (id: string) => void;
    // Add other handlers
}

const initialData: AppData = {
    profile: {
        name: 'Tai Anh',
        role: 'Software Engineer & Photographer',
        welcomeMessage: 'Chào mừng bạn đến với trang cá nhân của tổi',
        yearsOfExperience: 5,
        projectsCount: 100,
        clientsCount: 50,
        technologiesCount: 15,
    },
    skills: [
        { id: '1', name: 'React & TypeScript', level: 'Expert', yearsOfExperience: 5, category: 'frontend' },
        { id: '2', name: 'Node.js & Express', level: 'Advanced', yearsOfExperience: 4, category: 'backend' },
    ],
    experiences: [],
    projects: [
        {
            id: '1',
            title: 'E-Commerce Platform',
            description: 'Nền tảng thương mại điện tử full-stack với React, Node.js và MongoDB',
            technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
            status: 'Live'
        },
        {
            id: '2',
            title: 'Real-time Chat Application',
            description: 'Ứng dụng chat thời gian thực sử dụng WebSocket và Redis',
            technologies: ['Socket.io', 'Redis', 'Express', 'React'],
            status: 'Live'
        }
    ],
    achievements: [],
    services: [
        {
            id: '1',
            name: 'Portrait Photography',
            icon: 'Users',
            description: 'Chụp ảnh chân dung chuyên nghiệp',
            color: 'from-pink-500 to-rose-500'
        },
        {
            id: '2',
            name: 'Landscape',
            icon: 'Eye',
            description: 'Nhiếp ảnh phong cảnh thiên nhiên',
            color: 'from-green-500 to-emerald-500'
        }
    ],
    portfolioCategories: [
        { id: '1', category: 'Portrait', gradient: 'from-pink-500 to-rose-600' },
        { id: '2', category: 'Landscape', gradient: 'from-green-500 to-emerald-600' }
    ]
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<AppData>(initialData);
    const [isSyncing, setIsSyncing] = useState(false);

    // Initial Fetch
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching data from API...');
                // Use relative URL for both dev (via proxy) and prod (Vercel)
                const res = await fetch('/api/data');
                if (res.ok) {
                    const dbData = await res.json();
                    console.log('Data fetched from DB:', dbData);
                    if (dbData && dbData.profile) {
                        // Use DB data completely, don't merge with initialData
                        setData(dbData);
                    } else {
                        console.log('No data in DB, using initialData');
                        // First time, save initialData to DB
                        const saveRes = await fetch('/api/data', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(initialData)
                        });
                        if (saveRes.ok) {
                            console.log('Initial data saved to DB');
                        }
                    }
                } else {
                    console.error('API fetch failed with status:', res.status);
                }
            } catch (error) {
                console.error('Failed to fetch data from backend, using local/initial data:', error);
                // Fallback to localStorage if API fails
                const saved = localStorage.getItem('appData');
                if (saved) {
                    console.log('Using localStorage data');
                    setData(JSON.parse(saved));
                }
            }
        };
        fetchData();
    }, []);

    // Save to Backend on Change (Debounced)
    useEffect(() => {
        // Skip saving on initial mount
        const isInitialMount = data === initialData;
        if (isInitialMount) return;

        // Save to localStorage as backup immediately
        localStorage.setItem('appData', JSON.stringify(data));

        const timer = setTimeout(async () => {
            setIsSyncing(true);
            try {
                console.log('Saving data to API...', data);
                const res = await fetch('/api/data', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (res.ok) {
                    console.log('Data saved successfully to DB');
                } else {
                    console.error('Failed to save, status:', res.status);
                }
            } catch (err) {
                console.error('Failed to save to backend:', err);
            } finally {
                setIsSyncing(false);
            }
        }, 1000); // Debounce 1s

        return () => clearTimeout(timer);
    }, [data]);

    const updateProfile = (updates: Partial<ProfileData>) => {
        setData(prev => ({ ...prev, profile: { ...prev.profile, ...updates } }));
    };

    const addProject = (project: Project) => {
        setData(prev => ({ ...prev, projects: [...prev.projects, project] }));
    };

    const updateProject = (id: string, updates: Partial<Project>) => {
        setData(prev => ({
            ...prev,
            projects: prev.projects.map(p => p.id === id ? { ...p, ...updates } : p)
        }));
    };

    const deleteProject = (id: string) => {
        setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
    };

    const addSkill = (skill: Skill) => {
        setData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    };

    const updateSkill = (id: string, updates: Partial<Skill>) => {
        setData(prev => ({
            ...prev,
            skills: prev.skills.map(s => s.id === id ? { ...s, ...updates } : s)
        }));
    };

    const deleteSkill = (id: string) => {
        setData(prev => ({ ...prev, skills: prev.skills.filter(s => s.id !== id) }));
    };

    const addAchievement = (achievement: Achievement) => {
        setData(prev => ({ ...prev, achievements: [...prev.achievements, achievement] }));
    };

    const updateAchievement = (id: string, updates: Partial<Achievement>) => {
        setData(prev => ({
            ...prev,
            achievements: prev.achievements.map(a => a.id === id ? { ...a, ...updates } : a)
        }));
    };

    const deleteAchievement = (id: string) => {
        setData(prev => ({ ...prev, achievements: prev.achievements.filter(a => a.id !== id) }));
    };

    const addExperience = (experience: Experience) => {
        setData(prev => ({ ...prev, experiences: [...prev.experiences, experience] }));
    };

    const updateExperience = (id: string, updates: Partial<Experience>) => {
        setData(prev => ({
            ...prev,
            experiences: prev.experiences.map(e => e.id === id ? { ...e, ...updates } : e)
        }));
    };

    const deleteExperience = (id: string) => {
        setData(prev => ({ ...prev, experiences: prev.experiences.filter(e => e.id !== id) }));
    };

    const addService = (service: Service) => {
        setData(prev => ({ ...prev, services: [...prev.services, service] }));
    };

    const updateService = (id: string, updates: Partial<Service>) => {
        setData(prev => ({
            ...prev,
            services: prev.services.map(s => s.id === id ? { ...s, ...updates } : s)
        }));
    };

    const deleteService = (id: string) => {
        setData(prev => ({ ...prev, services: prev.services.filter(s => s.id !== id) }));
    };

    const addPortfolioCategory = (category: PortfolioCategory) => {
        setData(prev => ({ ...prev, portfolioCategories: [...prev.portfolioCategories, category] }));
    };

    const updatePortfolioCategory = (id: string, updates: Partial<PortfolioCategory>) => {
        setData(prev => ({
            ...prev,
            portfolioCategories: prev.portfolioCategories.map(c => c.id === id ? { ...c, ...updates } : c)
        }));
    };

    const deletePortfolioCategory = (id: string) => {
        setData(prev => ({ ...prev, portfolioCategories: prev.portfolioCategories.filter(c => c.id !== id) }));
    };

    return (
        <DataContext.Provider value={{
            data,
            updateProfile,
            addProject,
            updateProject,
            deleteProject,
            addSkill,
            updateSkill,
            deleteSkill,
            addAchievement,
            updateAchievement,
            deleteAchievement,
            addExperience,
            updateExperience,
            deleteExperience,
            addService,
            updateService,
            deleteService,
            addPortfolioCategory,
            updatePortfolioCategory,
            deletePortfolioCategory,
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
