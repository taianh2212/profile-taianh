import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Camera, Award, Eye, Users, Heart, Aperture, Star, TrendingUp, ChevronDown, ChevronUp, Edit } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { FallingIcons } from '@/app/components/FallingIcons';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { ManageContentModal } from './ManageContentModal';

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

  // Filter achievements that look like photographer achievements (have image/color)
  const displayAchievements = data.achievements.filter(a => a.image || a.color);

  // If no photographer achievements, maybe show 4 placeholder/hardcoded ones (optional, but better to use dynamic data directly)
  // For now we use dynamic data. If empty, it will be empty.

  const stats = [
    { number: '5+', label: 'Năm Kinh Nghiệm', icon: Star },
    { number: '500+', label: 'Dự Án Hoàn Thành', icon: Camera },
    { number: '50+', label: 'Giải Thưởng', icon: Award },
    { number: '1000+', label: 'Khách Hàng', icon: Users },
  ];

  const displayedPortfolioItems = showAllProjects ? data.portfolioCategories : data.portfolioCategories.slice(0, 6);


  return (
    <div className="min-h-screen py-8 md:py-12 px-4 relative overflow-hidden">
      <FallingIcons />

      <div className="max-w-6xl mx-auto relative z-10">
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
              defaultTab="services"
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

        {/* Expertise Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
                  animate={{ opacity: 1, x: 0 }}
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

        {/* Portfolio Gallery */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12 md:mb-16"
        >
          <h2
            className="text-3xl md:text-4xl mb-8 text-emerald-900 font-bold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Portfolio
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {displayedPortfolioItems.map((item, index) => (
                <motion.div
                  key={item.category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: showAllProjects ? 0 : 0.1 * index }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative aspect-square rounded-2xl overflow-hidden border-2 border-emerald-200 hover:border-emerald-400 transition-all shadow-lg hover:shadow-2xl group cursor-pointer"
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>

                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Aperture size={64} className="text-white/40" strokeWidth={1.5} />
                    </motion.div>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h4
                          className="text-xl md:text-2xl mb-2 font-bold"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {item.category}
                        </h4>
                        <p
                          className="text-sm text-white/80"
                          style={{ fontFamily: 'var(--font-sans)' }}
                        >
                          View Collection
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Show More/Less Button */}
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
        </motion.section>

        {/* Achievements Section with Images */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
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
                animate={{ opacity: 1, y: 0 }}
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
                  <div className={`absolute inset-0 bg-gradient-to-t ${achievement.color || 'from-emerald-500 to-teal-500'} opacity-30 group-hover:opacity-40 transition-opacity`}></div>
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