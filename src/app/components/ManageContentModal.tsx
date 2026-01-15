import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { X, Plus, Trash, Edit, Upload } from 'lucide-react';
import { Project, Skill, Achievement, Experience, Service, PortfolioCategory } from '@/types/data';
import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload';

interface ManageContentModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultTab?: 'projects' | 'skills' | 'achievements' | 'experience' | 'services' | 'portfolio';
}

export function ManageContentModal({ isOpen, onClose, defaultTab = 'projects' }: ManageContentModalProps) {
    const {
        data,
        addProject, deleteProject, updateProject,
        addSkill, deleteSkill, updateSkill,
        addAchievement, updateAchievement, deleteAchievement,
        addExperience, updateExperience, deleteExperience,
        addService, updateService, deleteService,
        addPortfolioCategory, updatePortfolioCategory, deletePortfolioCategory
    } = useData();
    const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'achievements' | 'experience' | 'services' | 'portfolio'>(defaultTab);

    // Form states
    const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
    const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
    const [editingAchievement, setEditingAchievement] = useState<Partial<Achievement> | null>(null);
    const [editingExperience, setEditingExperience] = useState<Partial<Experience> | null>(null);
    const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
    const [editingPortfolioCategory, setEditingPortfolioCategory] = useState<Partial<PortfolioCategory> | null>(null);

    // Cloudinary upload hooks
    const projectImageUpload = useCloudinaryUpload({
        onSuccess: (url) => setEditingProject(prev => ({ ...prev!, image: url })),
        onError: (error) => alert(`Lỗi upload: ${error.message}`)
    });

    const achievementImageUpload = useCloudinaryUpload({
        onSuccess: (url) => setEditingAchievement(prev => ({ ...prev!, image: url })),
        onError: (error) => alert(`Lỗi upload: ${error.message}`)
    });

    const portfolioImageUpload = useCloudinaryUpload({
        onSuccess: (url) => setEditingPortfolioCategory(prev => ({ ...prev!, image: url })),
        onError: (error) => alert(`Lỗi upload: ${error.message}`)
    });

    const handleFileUpload = async (file: File) => {
        // This function is no longer used but kept for compatibility
        console.error('handleFileUpload is deprecated, use Cloudinary widget instead');
        return null;
    };

    if (!isOpen) return null;

    const handleSaveProject = () => {
        if (editingProject) {
            if (editingProject.id) {
                updateProject(editingProject.id, editingProject);
            } else {
                addProject({ ...editingProject, id: Date.now().toString(), technologies: editingProject.technologies || [] } as Project);
            }
            setEditingProject(null);
        }
    };

    const handleSaveSkill = () => {
        if (editingSkill) {
            if (editingSkill.id) {
                updateSkill(editingSkill.id, editingSkill);
            } else {
                addSkill({ ...editingSkill, id: Date.now().toString() } as Skill);
            }
            setEditingSkill(null);
        }
    };

    const handleSaveAchievement = () => {
        if (editingAchievement) {
            if (editingAchievement.id) {
                updateAchievement(editingAchievement.id, editingAchievement);
            } else {
                addAchievement({ ...editingAchievement, id: Date.now().toString(), date: editingAchievement.date || new Date().toISOString() } as Achievement);
            }
            setEditingAchievement(null);
        }
    };

    const handleSaveExperience = () => {
        if (editingExperience) {
            if (editingExperience.id) {
                updateExperience(editingExperience.id, editingExperience);
            } else {
                addExperience({ ...editingExperience, id: Date.now().toString(), description: editingExperience.description || [] } as Experience);
            }
            setEditingExperience(null);
        }
    };

    const handleSaveService = () => {
        if (editingService) {
            if (editingService.id) {
                updateService(editingService.id, editingService);
            } else {
                addService({ ...editingService, id: Date.now().toString() } as Service);
            }
            setEditingService(null);
        }
    };

    const handleSavePortfolioCategory = () => {
        if (editingPortfolioCategory) {
            if (editingPortfolioCategory.id) {
                updatePortfolioCategory(editingPortfolioCategory.id, editingPortfolioCategory);
            } else {
                addPortfolioCategory({ ...editingPortfolioCategory, id: Date.now().toString() } as PortfolioCategory);
            }
            setEditingPortfolioCategory(null);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-4xl shadow-2xl relative max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Quản Lý Nội Dung</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex flex-col gap-4 mb-6 border-b pb-4">
                    {/* Software Engineer Section */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Software Engineer</h3>
                        <div className="flex gap-2">
                            <button
                                className={`px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === 'projects' ? 'bg-emerald-100 text-emerald-700 font-bold' : 'text-gray-600 hover:bg-gray-100'}`}
                                onClick={() => setActiveTab('projects')}
                            >
                                Dự Án
                            </button>
                            <button
                                className={`px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === 'skills' ? 'bg-emerald-100 text-emerald-700 font-bold' : 'text-gray-600 hover:bg-gray-100'}`}
                                onClick={() => setActiveTab('skills')}
                            >
                                Kỹ Năng
                            </button>
                            <button
                                className={`px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === 'experience' ? 'bg-emerald-100 text-emerald-700 font-bold' : 'text-gray-600 hover:bg-gray-100'}`}
                                onClick={() => setActiveTab('experience')}
                            >
                                Kinh Nghiệm
                            </button>
                        </div>
                    </div>

                    {/* Photographer Section */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Photographer</h3>
                        <div className="flex gap-2">
                            <button
                                className={`px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === 'portfolio' ? 'bg-emerald-100 text-emerald-700 font-bold' : 'text-gray-600 hover:bg-gray-100'}`}
                                onClick={() => setActiveTab('portfolio')}
                            >
                                Danh Mục Ảnh
                            </button>
                            <button
                                className={`px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === 'achievements' ? 'bg-emerald-100 text-emerald-700 font-bold' : 'text-gray-600 hover:bg-gray-100'}`}
                                onClick={() => setActiveTab('achievements')}
                            >
                                Thành Tựu
                            </button>
                            <button
                                className={`px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === 'services' ? 'bg-emerald-100 text-emerald-700 font-bold' : 'text-gray-600 hover:bg-gray-100'}`}
                                onClick={() => setActiveTab('services')}
                            >
                                Dịch Vụ
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {activeTab === 'projects' && (
                        <div>
                            {!editingProject ? (
                                <>
                                    <button
                                        onClick={() => setEditingProject({ title: '', description: '', technologies: [], status: 'Live' })}
                                        className="mb-4 flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-200"
                                    >
                                        <Plus size={18} /> Thêm Dự Án
                                    </button>
                                    <div className="space-y-4">
                                        {data.projects.map(p => (
                                            <div key={p.id} className="border rounded-lg p-4 flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-bold text-lg">{p.title}</h3>
                                                    <p className="text-gray-600 text-sm">{p.description}</p>
                                                    <div className="flex gap-2 mt-2">
                                                        {p.technologies.map(t => <span key={t} className="text-xs bg-gray-100 px-2 py-1 rounded">{t}</span>)}
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => setEditingProject(p)} className="p-2 text-blue-500 hover:bg-blue-50 rounded"><Edit size={18} /></button>
                                                    <button onClick={() => deleteProject(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash size={18} /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-4">
                                    <input
                                        className="w-full border p-2 rounded"
                                        placeholder="Tiêu đề"
                                        value={editingProject.title}
                                        onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                                    />
                                    <textarea
                                        className="w-full border p-2 rounded"
                                        placeholder="Mô tả"
                                        value={editingProject.description}
                                        onChange={e => setEditingProject({ ...editingProject, description: e.target.value })}
                                    />
                                    <div className="flex gap-2 items-center">
                                        <div className="flex-1">
                                            <input
                                                className="w-full border p-2 rounded"
                                                placeholder="URL Hình ảnh"
                                                value={editingProject.image || ''}
                                                onChange={e => setEditingProject({ ...editingProject, image: e.target.value })}
                                            />
                                            {editingProject.image && <img src={editingProject.image} alt="Preview" className="mt-2 h-20 w-auto rounded border" />}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={projectImageUpload.openUploadWidget}
                                            className="cursor-pointer bg-emerald-50 text-emerald-600 border border-emerald-200 p-2 rounded hover:bg-emerald-100 flex-shrink-0 flex items-center gap-2"
                                        >
                                            <Upload size={20} />
                                        </button>
                                    </div>
                                    <input
                                        className="w-full border p-2 rounded"
                                        placeholder="Công nghệ (phân cách bằng dấu phẩy)"
                                        value={editingProject.technologies?.join(', ')}
                                        onChange={e => setEditingProject({ ...editingProject, technologies: e.target.value.split(',').map(s => s.trim()) })}
                                    />
                                    <input
                                        className="w-full border p-2 rounded"
                                        placeholder="Link dự án (URL)"
                                        value={editingProject.link || ''}
                                        onChange={e => setEditingProject({ ...editingProject, link: e.target.value })}
                                    />
                                    <select
                                        className="w-full border p-2 rounded"
                                        value={editingProject.status}
                                        onChange={e => setEditingProject({ ...editingProject, status: e.target.value as any })}
                                    >
                                        <option value="Live">Live</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Concept">Concept</option>
                                    </select>
                                    <div className="flex gap-2">
                                        <button onClick={handleSaveProject} className="bg-emerald-600 text-white px-4 py-2 rounded">Lưu</button>
                                        <button onClick={() => setEditingProject(null)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded">Hủy</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'skills' && (
                        <div>
                            {!editingSkill ? (
                                <>
                                    <button
                                        onClick={() => setEditingSkill({ name: '', level: 'Intermediate', yearsOfExperience: 1, category: 'frontend' })}
                                        className="mb-4 flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-200"
                                    >
                                        <Plus size={18} /> Thêm Kỹ Năng
                                    </button>
                                    <div className="space-y-4">
                                        {data.skills.map(s => (
                                            <div key={s.id} className="border rounded-lg p-4 flex justify-between items-center">
                                                <div>
                                                    <h3 className="font-bold">{s.name}</h3>
                                                    <p className="text-sm text-gray-500">{s.level} • {s.yearsOfExperience} years</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => setEditingSkill(s)} className="p-2 text-blue-500 hover:bg-blue-50 rounded"><Edit size={18} /></button>
                                                    <button onClick={() => deleteSkill(s.id)} className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash size={18} /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-4">
                                    <input
                                        className="w-full border p-2 rounded"
                                        placeholder="Tên"
                                        value={editingSkill.name}
                                        onChange={e => setEditingSkill({ ...editingSkill, name: e.target.value })}
                                    />
                                    <select
                                        className="w-full border p-2 rounded"
                                        value={editingSkill.level}
                                        onChange={e => setEditingSkill({ ...editingSkill, level: e.target.value as any })}
                                    >
                                        <option>Beginner</option>
                                        <option>Intermediate</option>
                                        <option>Advanced</option>
                                        <option>Expert</option>
                                    </select>
                                    <input
                                        type="number"
                                        className="w-full border p-2 rounded"
                                        placeholder="Số năm"
                                        value={editingSkill.yearsOfExperience}
                                        onChange={e => setEditingSkill({ ...editingSkill, yearsOfExperience: Number(e.target.value) })}
                                    />
                                    <div className="flex gap-2 items-center">
                                        <div className="flex-1">
                                            <input
                                                className="w-full border p-2 rounded"
                                                placeholder="URL Biểu tượng (tùy chọn)"
                                                value={editingSkill.iconUrl || ''}
                                                onChange={e => setEditingSkill({ ...editingSkill, iconUrl: e.target.value })}
                                            />
                                            {editingSkill.iconUrl && <img src={editingSkill.iconUrl} alt="Preview" className="mt-2 h-10 w-10 rounded-full border bg-gray-50 object-contain" />}
                                        </div>
                                        <label className={`cursor-pointer bg-gray-100 border p-2 rounded hover:bg-gray-200 flex-shrink-0 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                            {isUploading ? <span className="text-xs">Uploading...</span> : <Upload size={20} />}
                                            <input type="file" className="hidden" accept="image/*" disabled={isUploading} onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const url = await handleFileUpload(file);
                                                    if (url) setEditingSkill(prev => ({ ...prev!, iconUrl: url }));
                                                }
                                            }} />
                                        </label>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={handleSaveSkill} className="bg-emerald-600 text-white px-4 py-2 rounded">Lưu</button>
                                        <button onClick={() => setEditingSkill(null)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded">Hủy</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'achievements' && (
                        <div>
                            {!editingAchievement ? (
                                <>
                                    <button
                                        onClick={() => setEditingAchievement({ title: '', description: '', date: '' })}
                                        className="mb-4 flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-200"
                                    >
                                        <Plus size={18} /> Thêm Thành Tựu
                                    </button>
                                    <div className="space-y-4">
                                        {data.achievements.map(a => (
                                            <div key={a.id} className="border rounded-lg p-4 flex justify-between items-center">
                                                <div>
                                                    <h3 className="font-bold">{a.title}</h3>
                                                    <p className="text-sm text-gray-500">{a.description}</p>
                                                    <p className="text-xs text-gray-400">{a.date}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => setEditingAchievement(a)} className="p-2 text-blue-500 hover:bg-blue-50 rounded"><Edit size={18} /></button>
                                                    <button onClick={() => deleteAchievement(a.id)} className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash size={18} /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-4">
                                    <input
                                        className="w-full border p-2 rounded"
                                        placeholder="Tiêu đề"
                                        value={editingAchievement.title}
                                        onChange={e => setEditingAchievement({ ...editingAchievement, title: e.target.value })}
                                    />
                                    <textarea
                                        className="w-full border p-2 rounded"
                                        placeholder="Mô tả"
                                        value={editingAchievement.description}
                                        onChange={e => setEditingAchievement({ ...editingAchievement, description: e.target.value })}
                                    />
                                    <input
                                        type="date"
                                        className="w-full border p-2 rounded"
                                        value={editingAchievement.date}
                                        onChange={e => setEditingAchievement({ ...editingAchievement, date: e.target.value })}
                                    />
                                    <div className="flex gap-2 items-center">
                                        <div className="flex-1">
                                            <input
                                                className="w-full border p-2 rounded"
                                                placeholder="URL Hình ảnh"
                                                value={editingAchievement.image || ''}
                                                onChange={e => setEditingAchievement({ ...editingAchievement, image: e.target.value })}
                                            />
                                            {editingAchievement.image && <img src={editingAchievement.image} alt="Preview" className="mt-2 h-20 w-auto rounded border" />}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={achievementImageUpload.openUploadWidget}
                                            className="cursor-pointer bg-emerald-50 text-emerald-600 border border-emerald-200 p-2 rounded hover:bg-emerald-100 flex-shrink-0 flex items-center gap-2"
                                        >
                                            <Upload size={20} />
                                        </button>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={handleSaveAchievement} className="bg-emerald-600 text-white px-4 py-2 rounded">Lưu</button>
                                        <button onClick={() => setEditingAchievement(null)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded">Hủy</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'experience' && (
                        <div>
                            {!editingExperience ? (
                                <>
                                    <button
                                        onClick={() => setEditingExperience({ company: '', role: '', startDate: '', description: [] })}
                                        className="mb-4 flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-200"
                                    >
                                        <Plus size={18} /> Thêm Kinh Nghiệm
                                    </button>
                                    <div className="space-y-4">
                                        {data.experiences.map(e => (
                                            <div key={e.id} className="border rounded-lg p-4 flex justify-between items-center">
                                                <div>
                                                    <h3 className="font-bold">{e.role} tại {e.company}</h3>
                                                    <p className="text-sm text-gray-500">{e.startDate} - {e.endDate || 'Hiện tại'}</p>
                                                    <ul className="text-sm text-gray-600 list-disc ml-4">
                                                        {e.description.slice(0, 2).map((d, i) => <li key={i}>{d}</li>)}
                                                        {e.description.length > 2 && <li>...</li>}
                                                    </ul>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => setEditingExperience(e)} className="p-2 text-blue-500 hover:bg-blue-50 rounded"><Edit size={18} /></button>
                                                    <button onClick={() => deleteExperience(e.id)} className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash size={18} /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-4">
                                    <input
                                        className="w-full border p-2 rounded"
                                        placeholder="Công ty"
                                        value={editingExperience.company}
                                        onChange={e => setEditingExperience({ ...editingExperience, company: e.target.value })}
                                    />
                                    <input
                                        className="w-full border p-2 rounded"
                                        placeholder="Vai trò"
                                        value={editingExperience.role}
                                        onChange={e => setEditingExperience({ ...editingExperience, role: e.target.value })}
                                    />
                                    <div className="flex gap-4">
                                        <div className="w-1/2">
                                            <label className="text-xs text-gray-500 block mb-1">Ngày bắt đầu</label>
                                            <input
                                                type="date"
                                                className="w-full border p-2 rounded"
                                                value={editingExperience.startDate}
                                                onChange={e => setEditingExperience({ ...editingExperience, startDate: e.target.value })}
                                            />
                                        </div>
                                        <div className="w-1/2">
                                            <label className="text-xs text-gray-500 block mb-1">Ngày kết thúc (Để trống nếu là Hiện tại)</label>
                                            <input
                                                type="date"
                                                className="w-full border p-2 rounded"
                                                value={editingExperience.endDate || ''}
                                                onChange={e => setEditingExperience({ ...editingExperience, endDate: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <textarea
                                        className="w-full border p-2 rounded h-32"
                                        placeholder="Mô tả (mỗi dòng một mục)"
                                        value={editingExperience.description?.join('\n')}
                                        onChange={e => setEditingExperience({ ...editingExperience, description: e.target.value.split('\n') })}
                                    />
                                    <div className="flex gap-2">
                                        <button onClick={handleSaveExperience} className="bg-emerald-600 text-white px-4 py-2 rounded">Lưu</button>
                                        <button onClick={() => setEditingExperience(null)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded">Hủy</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'services' && (
                        <div>
                            {!editingService ? (
                                <>
                                    <button
                                        onClick={() => setEditingService({ name: '', icon: 'Camera', description: '', color: 'from-pink-500 to-rose-500' })}
                                        className="mb-4 flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-200"
                                    >
                                        <Plus size={18} /> Thêm Dịch Vụ
                                    </button>
                                    <div className="space-y-4">
                                        {data.services?.map(s => (
                                            <div key={s.id} className="border rounded-lg p-4 flex justify-between items-center">
                                                <div>
                                                    <h3 className="font-bold">{s.name}</h3>
                                                    <p className="text-sm text-gray-500">{s.description}</p>
                                                    <p className="text-xs text-gray-400">Icon: {s.icon}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => setEditingService(s)} className="p-2 text-blue-500 hover:bg-blue-50 rounded"><Edit size={18} /></button>
                                                    <button onClick={() => deleteService(s.id)} className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash size={18} /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-4">
                                    <input
                                        className="w-full border p-2 rounded"
                                        placeholder="Tên Dịch Vụ"
                                        value={editingService.name}
                                        onChange={e => setEditingService({ ...editingService, name: e.target.value })}
                                    />
                                    <input
                                        className="w-full border p-2 rounded"
                                        placeholder="Mô tả"
                                        value={editingService.description}
                                        onChange={e => setEditingService({ ...editingService, description: e.target.value })}
                                    />
                                    <input
                                        className="w-full border p-2 rounded"
                                        placeholder="Tên Icon (ví dụ: Users, Heart, Camera...)"
                                        value={editingService.icon}
                                        onChange={e => setEditingService({ ...editingService, icon: e.target.value })}
                                    />
                                    <input
                                        className="w-full border p-2 rounded"
                                        placeholder="Màu Gradient (ví dụ: from-pink-500 to-rose-500)"
                                        value={editingService.color}
                                        onChange={e => setEditingService({ ...editingService, color: e.target.value })}
                                    />
                                    <div className="flex gap-2">
                                        <button onClick={handleSaveService} className="bg-emerald-600 text-white px-4 py-2 rounded">Lưu</button>
                                        <button onClick={() => setEditingService(null)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded">Hủy</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'portfolio' && (
                        <div>
                            {!editingPortfolioCategory ? (
                                <>
                                    <button
                                        onClick={() => setEditingPortfolioCategory({ category: '', gradient: 'from-blue-500 to-cyan-500' })}
                                        className="mb-4 flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-200"
                                    >
                                        <Plus size={18} /> Thêm Danh Mục
                                    </button>
                                    <div className="space-y-4">
                                        {data.portfolioCategories?.map(c => (
                                            <div key={c.id} className="border rounded-lg p-4 flex justify-between items-center">
                                                <div>
                                                    <h3 className="font-bold">{c.category}</h3>
                                                    <p className="text-xs text-gray-400">{c.gradient}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => setEditingPortfolioCategory(c)} className="p-2 text-blue-500 hover:bg-blue-50 rounded"><Edit size={18} /></button>
                                                    <button onClick={() => deletePortfolioCategory(c.id)} className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash size={18} /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-4">
                                    <input
                                        className="w-full border p-2 rounded"
                                        placeholder="Tên Danh Mục"
                                        value={editingPortfolioCategory.category}
                                        onChange={e => setEditingPortfolioCategory({ ...editingPortfolioCategory, category: e.target.value })}
                                    />
                                    <div className="flex gap-2 items-center">
                                        <div className="flex-1">
                                            <label className="text-sm font-medium text-gray-700 mb-1 block">Ảnh bìa</label>
                                            <input
                                                className="w-full border p-2 rounded"
                                                placeholder="URL Hình ảnh (Tùy chọn)"
                                                value={editingPortfolioCategory.image || ''}
                                                onChange={e => setEditingPortfolioCategory({ ...editingPortfolioCategory, image: e.target.value })}
                                            />
                                            {editingPortfolioCategory.image && <img src={editingPortfolioCategory.image} alt="Preview" className="mt-2 h-20 w-auto rounded border" />}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={portfolioImageUpload.openUploadWidget}
                                            className="cursor-pointer bg-emerald-50 text-emerald-600 border border-emerald-200 p-2 rounded hover:bg-emerald-100 flex-shrink-0 flex items-center gap-2 mt-6"
                                        >
                                            <Upload size={20} />
                                        </button>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">Thư viện ảnh chi tiết (URLs phân cách bằng dấu phẩy)</label>
                                        <textarea
                                            className="w-full border p-2 rounded"
                                            placeholder="URL1, URL2, URL3..."
                                            rows={3}
                                            value={editingPortfolioCategory.images?.join(', ') || ''}
                                            onChange={e => setEditingPortfolioCategory({ 
                                                ...editingPortfolioCategory, 
                                                images: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                                            })}
                                        />
                                        {editingPortfolioCategory.images && editingPortfolioCategory.images.length > 0 && (
                                            <div className="grid grid-cols-4 gap-2 mt-2">
                                                {editingPortfolioCategory.images.map((img, idx) => (
                                                    <img key={idx} src={img} alt="" className="w-full h-24 object-cover rounded border" />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={handleSavePortfolioCategory} className="bg-emerald-600 text-white px-4 py-2 rounded">Lưu</button>
                                        <button onClick={() => setEditingPortfolioCategory(null)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded">Hủy</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}
