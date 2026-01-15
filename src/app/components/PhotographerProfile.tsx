import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Camera, Award, Eye, Users, Heart, Aperture, Star, TrendingUp, ChevronDown, ChevronUp, Edit, X } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { FallingIcons } from '@/app/components/FallingIcons';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { ManageContentModal } from './ManageContentModal';
import { PortfolioCategory } from '@/types/data';

// Icon mapping for dynamic services
const iconMap: Record<string, any> = {
  Camera, Users, Heart, Eye, TrendingUp, Star, Award, Aperture
};

interface PhotographerProfileProps {
  onBack: () => void;
}

export function PhotographerProfile({ onBack }: PhotographerProfileProps) {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const { data } = useData();
  const { isAuthenticated } = useAuth();
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioCategory | null>(null);

  // Filter achievements that look like photographer achievements (have image/color)
  const displayAchievements = data.achievements.filter(a => a.image || a.color);

  // If no photographer achievements, maybe show 4 placeholder/hardcoded ones (optional, but better to use dynamic data directly)
  // For now we use dynamic data. If empty, it will be empty.

  const stats = [
    { number: `${data.profile.photoStats?.years || 0}+`, label: 'Năm Kinh Nghiệm', icon: Star },
    { number: `${data.profile.photoStats?.projects || 0}+`, label: 'Dự Án Hoàn Thành', icon: Camera },
    { number: `${data.profile.photoStats?.awards || 0}+`, label: 'Giải Thưởng', icon: Award },
    { number: `${data.profile.photoStats?.clients || 0}+`, label: 'Khách Hàng', icon: Users },
  ];

  const displayedPortfolioItems = showAllProjects ? data.portfolioCategories : data.portfolioCategories.slice(0, 5);


  return (
    <div className="min-h-screen py-8 md:py-12 px-4 relative overflow-hidden">
      <FallingIcons />

      {/* Portfolio Detail Modal (Lightbox) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex flex-col p-4 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6 text-white sticky top-0 bg-black/50 backdrop-blur-md p-4 rounded-xl z-10 w-full max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold font-display">{selectedProject.category} Gallery</h2>
              <button onClick={() => setSelectedProject(null)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <X size={32} />
              </button>
            </div>

            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
              {/* Cover Image */}
              {selectedProject.image && (
                <div className="rounded-lg overflow-hidden bg-gray-900">
                  <ImageWithFallback src={selectedProject.image} alt="Cover" className="w-full h-full object-cover" />
                </div>
              )}
              {/* Additional Images */}
              {selectedProject.images?.map((img, idx) => (
                <div key={idx} className="rounded-lg overflow-hidden bg-gray-900">
                  <ImageWithFallback src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
              {(!selectedProject.images || selectedProject.images.length === 0) && !selectedProject.image && (
                <p className="text-white col-span-full text-center py-20">Chưa có hình ảnh nào trong bộ sưu tập này.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back Button */}
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-emerald-700 hover:text-emerald-900 mb-8 group px-4 py-2 bg-white/70 backdrop-blur-sm rounded-xl border-2 border-emerald-200 hover:border-emerald-400 transition-all"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5, scale: 1.02 }}
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Quay lại</span>
        </motion.button>

        {isAuthenticated && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsManageOpen(true)}
              className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700"
            >
              <Edit size={16} /> Quản Lý Nội Dung
            </button>
            <ManageContentModal
              isOpen={isManageOpen}
              onClose={() => setIsManageOpen(false)}
              defaultTab="portfolio"
            />
          </div>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            className="relative inline-block mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-3xl blur-2xl opacity-40"></div>
            <div className="relative inline-flex items-center justify-center w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl shadow-2xl">
              <Camera size={56} className="text-white" strokeWidth={2.5} />
            </div>
          </motion.div>

          <h1
            className="text-4xl md:text-6xl mb-4 text-emerald-900 font-bold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Photographer
          </h1>
          <p
            className="text-lg md:text-xl text-emerald-700 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Ghi lại những khoảnh khắc đẹp nhất của cuộc sống.
            Chuyên về nhiếp ảnh chân dung, sự kiện và phong cảnh.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 md:mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border-2 border-emerald-200 text-center shadow-lg hover:shadow-xl transition-all group"
            >
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl mb-3"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon size={24} className="text-white" strokeWidth={2.5} />
              </motion.div>
              <div
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {stat.number}
              </div>
              <div
                className="text-sm md:text-base text-emerald-800 font-medium"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* Portfolio Gallery - UPDATED LAYOUT */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12 md:mb-16"
        >
          <h2
            className="text-3xl md:text-4xl mb-12 text-center text-emerald-900 font-bold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Portfolio
          </h2>

          <div className="flex flex-col gap-16 md:gap-24">
            <AnimatePresence mode="popLayout">
              {displayedPortfolioItems.map((item, index) => (
                <motion.div
                  key={item.category}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(item)}
                >
                  <div className="w-full relative shadow-2xl rounded-sm overflow-hidden bg-gray-100">
                    {/* Main Image - Full Width, No Crop */}
                    {item.image ? (
                      <ImageWithFallback
                        src={item.image}
                        alt={item.category}
                        className="w-full h-auto block"
                      />
                    ) : (
                      <div className={`w-full aspect-video bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                        <Aperture size={64} className="text-white/40" />
                      </div>
                    )}

                    {/* Hover Hint */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
                      <div className="bg-white/90 backdrop-blur text-emerald-900 px-4 py-2 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 font-medium flex items-center gap-2">
                        <Eye size={16} /> Xem tất cả ảnh ({item.images?.length || 0})
                      </div>
                    </div>
                  </div>

                  {/* Title Below Image */}
                  <div className="mt-4 text-center">
                    <h3
                      className="text-2xl md:text-3xl font-bold text-emerald-900 mb-1"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {item.category}
                    </h3>
                    <div className="h-1 w-12 bg-emerald-400 mx-auto rounded-full"></div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Show More/Less Button */}
          {data.portfolioCategories.length > 5 && (
            <motion.div
              className="flex justify-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="flex items-center gap-2 px-6 py-3 border-2 border-emerald-500 text-emerald-700 bg-transparent rounded-full font-semibold hover:bg-emerald-50 transition-all"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {showAllProjects ? (
                  <>
                    <span>Thu gọn</span>
                    <ChevronUp size={20} />
                  </>
                ) : (
                  <>
                    <span>Xem thêm dự án</span>
                    <ChevronDown size={20} />
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </motion.section>

        {/* Expertise Section (Moved down) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <h2
            className="text-3xl md:text-4xl mb-8 text-emerald-900 font-bold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Chuyên Môn
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {data.services.map((item, index) => {
              const Icon = iconMap[item.icon] || Camera;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border-2 border-emerald-200 hover:border-emerald-400 transition-all shadow-lg hover:shadow-xl group"
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className={`p-4 bg-gradient-to-br ${item.color} rounded-xl shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon size={28} className="text-white" strokeWidth={2.5} />
                    </motion.div>
                    <div>
                      <h3
                        className="text-lg md:text-xl mb-2 text-emerald-900 font-semibold"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {item.name}
                      </h3>
                      <p
                        className="text-emerald-700 leading-relaxed"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.section>


        {/* Achievements Section with Images */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl md:text-4xl mb-8 text-emerald-900 font-bold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Thành Tựu & Giải Thưởng
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {displayAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-emerald-200 hover:border-emerald-400 transition-all shadow-lg hover:shadow-xl group"
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={achievement.image || achievement.iconUrl}
                    alt={achievement.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <motion.div
                    className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Award size={24} className="text-emerald-600" strokeWidth={2.5} />
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3
                    className="text-lg md:text-xl mb-2 text-emerald-900 font-semibold"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {achievement.title}
                  </h3>
                  <p
                    className="text-emerald-700 leading-relaxed"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}