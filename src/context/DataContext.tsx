import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AppData, Experience, ProfileData, Project, Skill, Achievement, Service, PortfolioCategory } from '@/types/data';
import avatarImage from '@/assets/TaiAnh-07259.jpg';

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
    moveProject: (id: string, direction: 'up' | 'down') => void;
    moveSkill: (id: string, direction: 'up' | 'down') => void;
    moveAchievement: (id: string, direction: 'up' | 'down') => void;
    moveExperience: (id: string, direction: 'up' | 'down') => void;
    moveService: (id: string, direction: 'up' | 'down') => void;
    movePortfolioCategory: (id: string, direction: 'up' | 'down') => void;
}

const initialData: AppData = {
    profile: {
        name: 'Tai Anh',
        role: 'Software Engineer & Photographer',
        welcomeMessage: 'Chào mừng bạn đến với trang cá nhân của tổi',
        avatarUrl: avatarImage,
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
    ],
    lastUpdated: Date.now()
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<AppData>(initialData);
    const [isSyncing, setIsSyncing] = useState(false);

    // Initial Fetch
    // Initial Fetch with Conflict Resolution
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get local data first
                const saved = localStorage.getItem('appData');
                let localData: AppData | null = null;
                if (saved) {
                    try {
                        localData = JSON.parse(saved);
                    } catch (e) {
                        console.error('Error parsing local data', e);
                    }
                }

                console.log('Fetching data from API...');
                const res = await fetch('/api/data');

                if (res.ok) {
                    const dbData = await res.json();
                    console.log('Data fetched from DB:', dbData);

                    if (dbData && dbData.profile) {
                        // CONFLICT RESOLUTION
                        if (localData && localData.lastUpdated && dbData.lastUpdated) {
                            if (localData.lastUpdated > dbData.lastUpdated) {
                                console.log(`Local data is newer (${localData.lastUpdated} vs ${dbData.lastUpdated}). Keeping local data and syncing to DB.`);
                                setData(localData);
                            } else {
                                console.log('DB data is newer or equal. Using DB data.');
                                setData(dbData);
                            }
                        } else {
                            // If missing timestamps, prioritize DB but log it
                            console.log('No timestamp comparison possible, using DB data');
                            setData(dbData);
                        }
                    } else {
                        console.log('No data in DB');
                        if (localData) {
                            console.log('Using local data');
                            setData(localData);
                            // Trigger save to DB since DB is empty
                            fetch('/api/data', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(localData)
                            });
                        } else {
                            console.log('No data in DB or Local, using initialData');
                            // First time, save initialData to DB
                            fetch('/api/data', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(initialData)
                            });
                        }
                    }
                } else {
                    console.error('API fetch failed with status:', res.status);
                    // Fallback to localStorage if API returns error (e.g. 404/500)
                    if (localData) {
                        console.log('Using localStorage data (fallback)');
                        setData(localData);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch data from backend, using local/initial data:', error);
                const saved = localStorage.getItem('appData');
                if (saved) {
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
        setData(prev => ({ ...prev, profile: { ...prev.profile, ...updates }, lastUpdated: Date.now() }));
    };

    const addProject = (project: Project) => {
        setData(prev => ({ ...prev, projects: [...prev.projects, project], lastUpdated: Date.now() }));
    };

    const updateProject = (id: string, updates: Partial<Project>) => {
        setData(prev => ({
            ...prev,
            projects: prev.projects.map(p => p.id === id ? { ...p, ...updates } : p),
            lastUpdated: Date.now()
        }));
    };

    const deleteProject = (id: string) => {
        setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id), lastUpdated: Date.now() }));
    };

    const addSkill = (skill: Skill) => {
        setData(prev => ({ ...prev, skills: [...prev.skills, skill], lastUpdated: Date.now() }));
    };

    const updateSkill = (id: string, updates: Partial<Skill>) => {
        setData(prev => ({
            ...prev,
            skills: prev.skills.map(s => s.id === id ? { ...s, ...updates } : s),
            lastUpdated: Date.now()
        }));
    };

    const deleteSkill = (id: string) => {
        setData(prev => ({ ...prev, skills: prev.skills.filter(s => s.id !== id), lastUpdated: Date.now() }));
    };

    const addAchievement = (achievement: Achievement) => {
        setData(prev => ({ ...prev, achievements: [...prev.achievements, achievement], lastUpdated: Date.now() }));
    };

    const updateAchievement = (id: string, updates: Partial<Achievement>) => {
        setData(prev => ({
            ...prev,
            achievements: prev.achievements.map(a => a.id === id ? { ...a, ...updates } : a),
            lastUpdated: Date.now()
        }));
    };

    const deleteAchievement = (id: string) => {
        setData(prev => ({ ...prev, achievements: prev.achievements.filter(a => a.id !== id), lastUpdated: Date.now() }));
    };

    const addExperience = (experience: Experience) => {
        setData(prev => ({ ...prev, experiences: [...prev.experiences, experience], lastUpdated: Date.now() }));
    };

    const updateExperience = (id: string, updates: Partial<Experience>) => {
        setData(prev => ({
            ...prev,
            experiences: prev.experiences.map(e => e.id === id ? { ...e, ...updates } : e),
            lastUpdated: Date.now()
        }));
    };

    const deleteExperience = (id: string) => {
        setData(prev => ({ ...prev, experiences: prev.experiences.filter(e => e.id !== id), lastUpdated: Date.now() }));
    };

    const addService = (service: Service) => {
        setData(prev => ({ ...prev, services: [...prev.services, service], lastUpdated: Date.now() }));
    };

    const updateService = (id: string, updates: Partial<Service>) => {
        setData(prev => ({
            ...prev,
            services: prev.services.map(s => s.id === id ? { ...s, ...updates } : s),
            lastUpdated: Date.now()
        }));
    };

    const deleteService = (id: string) => {
        setData(prev => ({ ...prev, services: prev.services.filter(s => s.id !== id), lastUpdated: Date.now() }));
    };

    const addPortfolioCategory = (category: PortfolioCategory) => {
        setData(prev => ({ ...prev, portfolioCategories: [...prev.portfolioCategories, category], lastUpdated: Date.now() }));
    };

    const updatePortfolioCategory = (id: string, updates: Partial<PortfolioCategory>) => {
        setData(prev => ({
            ...prev,
            portfolioCategories: prev.portfolioCategories.map(c => c.id === id ? { ...c, ...updates } : c),
            lastUpdated: Date.now()
        }));
    };

    const deletePortfolioCategory = (id: string) => {
        setData(prev => ({ ...prev, portfolioCategories: prev.portfolioCategories.filter(c => c.id !== id), lastUpdated: Date.now() }));
    };

    const moveItem = (key: keyof AppData, id: string, direction: 'up' | 'down') => {
        setData(prev => {
            const list = prev[key];
            if (!Array.isArray(list)) return prev;

            const index = list.findIndex((item: any) => item.id === id);
            if (index === -1) return prev;

            const newList = [...list];
            if (direction === 'up') {
                if (index === 0) return prev;
                [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
            } else {
                if (index === newList.length - 1) return prev;
                [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
            }

            return { ...prev, [key]: newList, lastUpdated: Date.now() };
        });
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
            moveProject: (id, direction) => moveItem('projects', id, direction),
            moveSkill: (id, direction) => moveItem('skills', id, direction),
            moveAchievement: (id, direction) => moveItem('achievements', id, direction),
            moveExperience: (id, direction) => moveItem('experiences', id, direction),
            moveService: (id, direction) => moveItem('services', id, direction),
            movePortfolioCategory: (id, direction) => moveItem('portfolioCategories', id, direction),
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
