import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { X, Upload } from 'lucide-react';
import { ProfileData } from '@/types/data';

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
    const { data, updateProfile } = useData();
    const [formData, setFormData] = useState<ProfileData>(data.profile);
    const [isUploading, setIsUploading] = useState(false);

    // Sync state with data when modal opens or data updates
    React.useEffect(() => {
        if (isOpen) {
            setFormData(data.profile);
        }
    }, [isOpen, data.profile]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                setIsUploading(true);
                const formData = new FormData();
                formData.append('file', file);
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                });
                const data = await res.json();
                if (data.url) {
                    setFormData(prev => ({ ...prev, avatarUrl: data.url }));
                }
            } catch (error) {
                console.error('Upload failed:', error);
                alert('Upload thất bại');
            } finally {
                setIsUploading(false);
            }
        }
    };

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold mb-6 text-gray-900">Chỉnh Sửa Hồ Sơ</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-emerald-500">
                            {formData.avatarUrl ? (
                                <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">Không có ảnh</div>
                            )}
                        </div>
                        <div>
                            <label className={`cursor-pointer bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg font-medium hover:bg-emerald-100 transition-colors inline-flex items-center gap-2 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                <Upload size={18} />
                                {isUploading ? 'Đang Tải Lên...' : 'Tải Ảnh Đại Diện'}
                                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={isUploading} />
                            </label>
                        </div>
                    </div>

                    {/* Custom Icons Section */}
                    <div className="grid md:grid-cols-2 gap-4 border-t pt-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Icon Software Engineeer</label>
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center overflow-hidden">
                                    {formData.customIcons?.se ? (
                                        <img src={formData.customIcons.se} alt="SE Icon" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-xs text-gray-400">Default</span>
                                    )}
                                </div>
                                <label className={`cursor-pointer bg-white border border-gray-300 px-3 py-1.5 rounded text-sm hover:bg-gray-50 flex items-center gap-2 ${isUploading ? 'opacity-50' : ''}`}>
                                    <Upload size={14} /> Tải ảnh
                                    <input type="file" className="hidden" accept="image/*" disabled={isUploading} onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setIsUploading(true);
                                            const formDataUpload = new FormData();
                                            formDataUpload.append('file', file);
                                            try {
                                                const res = await fetch('/api/upload', { method: 'POST', body: formDataUpload });
                                                const data = await res.json();
                                                if (data.url) {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        customIcons: { ...prev.customIcons, se: data.url }
                                                    }));
                                                }
                                            } catch (err) { console.error(err); }
                                            setIsUploading(false);
                                        }
                                    }} />
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Icon Photographer</label>
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center overflow-hidden">
                                    {formData.customIcons?.photographer ? (
                                        <img src={formData.customIcons.photographer} alt="Photo Icon" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-xs text-gray-400">Default</span>
                                    )}
                                </div>
                                <label className={`cursor-pointer bg-white border border-gray-300 px-3 py-1.5 rounded text-sm hover:bg-gray-50 flex items-center gap-2 ${isUploading ? 'opacity-50' : ''}`}>
                                    <Upload size={14} /> Tải ảnh
                                    <input type="file" className="hidden" accept="image/*" disabled={isUploading} onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setIsUploading(true);
                                            const formDataUpload = new FormData();
                                            formDataUpload.append('file', file);
                                            try {
                                                const res = await fetch('/api/upload', { method: 'POST', body: formDataUpload });
                                                const data = await res.json();
                                                if (data.url) {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        customIcons: { ...prev.customIcons, photographer: data.url }
                                                    }));
                                                }
                                            } catch (err) { console.error(err); }
                                            setIsUploading(false);
                                        }
                                    }} />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tên</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Vai Trò</label>
                            <input
                                type="text"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lời Chào</label>
                        <textarea
                            value={formData.welcomeMessage}
                            onChange={(e) => setFormData({ ...formData, welcomeMessage: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            rows={3}
                        />
                    </div>

                    {/* SE Stats */}
                    <div className="border-t pt-4">
                        <h3 className="font-semibold text-emerald-800 mb-2">Chỉ số Software Engineer</h3>
                        <div className="grid grid-cols-4 gap-2">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Năm KN</label>
                                <input type="number" value={formData.seStats?.years || 0} onChange={(e) => setFormData({ ...formData, seStats: { ...formData.seStats!, years: Number(e.target.value) } })} className="w-full border rounded p-2" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Dự Án</label>
                                <input type="number" value={formData.seStats?.projects || 0} onChange={(e) => setFormData({ ...formData, seStats: { ...formData.seStats!, projects: Number(e.target.value) } })} className="w-full border rounded p-2" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Khách Hàng</label>
                                <input type="number" value={formData.seStats?.clients || 0} onChange={(e) => setFormData({ ...formData, seStats: { ...formData.seStats!, clients: Number(e.target.value) } })} className="w-full border rounded p-2" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Công Nghệ</label>
                                <input type="number" value={formData.seStats?.technologies || 0} onChange={(e) => setFormData({ ...formData, seStats: { ...formData.seStats!, technologies: Number(e.target.value) } })} className="w-full border rounded p-2" />
                            </div>
                        </div>
                    </div>

                    {/* Photo Stats */}
                    <div className="border-t pt-4">
                        <h3 className="font-semibold text-teal-800 mb-2">Chỉ số Photographer</h3>
                        <div className="grid grid-cols-4 gap-2">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Năm KN</label>
                                <input type="number" value={formData.photoStats?.years || 0} onChange={(e) => setFormData({ ...formData, photoStats: { ...formData.photoStats!, years: Number(e.target.value) } })} className="w-full border rounded p-2" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Dự Án</label>
                                <input type="number" value={formData.photoStats?.projects || 0} onChange={(e) => setFormData({ ...formData, photoStats: { ...formData.photoStats!, projects: Number(e.target.value) } })} className="w-full border rounded p-2" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Khách Hàng</label>
                                <input type="number" value={formData.photoStats?.clients || 0} onChange={(e) => setFormData({ ...formData, photoStats: { ...formData.photoStats!, clients: Number(e.target.value) } })} className="w-full border rounded p-2" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Giải Thưởng</label>
                                <input type="number" value={formData.photoStats?.awards || 0} onChange={(e) => setFormData({ ...formData, photoStats: { ...formData.photoStats!, awards: Number(e.target.value) } })} className="w-full border rounded p-2" />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors mt-4"
                    >
                        Lưu Thay Đổi
                    </button>
                </form>
            </div>
        </div>
    );
}
