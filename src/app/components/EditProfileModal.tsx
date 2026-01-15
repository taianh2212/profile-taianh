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

    if (!isOpen) return null;

    const [isUploading, setIsUploading] = useState(false);

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

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Kinh Nghiệm (Năm)</label>
                            <input type="number" value={formData.yearsOfExperience} onChange={(e) => setFormData({ ...formData, yearsOfExperience: Number(e.target.value) })} className="w-full border rounded p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Dự Án</label>
                            <input type="number" value={formData.projectsCount} onChange={(e) => setFormData({ ...formData, projectsCount: Number(e.target.value) })} className="w-full border rounded p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Khách Hàng</label>
                            <input type="number" value={formData.clientsCount} onChange={(e) => setFormData({ ...formData, clientsCount: Number(e.target.value) })} className="w-full border rounded p-2" />
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
