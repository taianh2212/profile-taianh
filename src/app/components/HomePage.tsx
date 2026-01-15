import { motion } from 'motion/react';
import { Code, Camera, Sparkles, Github, Facebook, Instagram, Phone, Lock, Edit } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { LoginModal } from './LoginModal';
import { EditProfileModal } from './EditProfileModal';

interface HomePageProps {
  onSelectSkill: (skill: 'se' | 'photographer') => void;
}

export function HomePage({ onSelectSkill }: HomePageProps) {
  const { data } = useData();
  const { isAuthenticated, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative">
      <div className="absolute top-4 right-4 z-50">
        {isAuthenticated ? (
          <div className="flex gap-2">
            <button onClick={() => setIsEditProfileOpen(true)} className="p-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200" title="Edit Profile">
              <Edit size={20} />
            </button>
            <button onClick={logout} className="p-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200" title="Logout">
              <Lock size={20} />
            </button>
          </div>
        ) : (
          <button onClick={() => setIsLoginOpen(true)} className="p-2 text-emerald-300 hover:text-emerald-500 transition-colors">
            <Lock size={16} />
          </button>
        )}
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <EditProfileModal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} />

      <div className="text-center max-w-5xl w-full">
        {/* Avatar and Name Section - Horizontal Layout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-6 md:gap-8 mb-8">
            {/* Avatar */}
            <motion.div
              className="relative flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full blur-xl opacity-60 animate-pulse"></div>
              <div className="relative w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full p-1">
                {data.profile.avatarUrl ? (
                  <img src={data.profile.avatarUrl} alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-white" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-white rounded-full flex items-center justify-center text-3xl md:text-5xl font-bold text-emerald-600" style={{ fontFamily: 'var(--font-display)' }}>
                    {data.profile.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                )}
              </div>
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="text-emerald-500" size={24} />
              </motion.div>
            </motion.div>

            {/* Name and Title */}
            <div className="text-left">
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent font-bold">
                  {data.profile.name}
                </span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-emerald-700/90 font-medium"
                style={{ fontFamily: 'var(--font-sans)' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {data.profile.role}
              </motion.p>
            </div>
          </div>

          <motion.p
            className="text-base md:text-lg text-emerald-600/80 max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-sans)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {data.profile.welcomeMessage}
          </motion.p>
        </motion.div>

        {/* Skills Selection Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-12"
        >
          {/* Software Engineer Card */}
          <motion.button
            onClick={() => onSelectSkill('se')}
            className="group relative overflow-hidden rounded-3xl p-8 md:p-10 transition-all duration-500"
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.1) 100%)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(16, 185, 129, 0.2)',
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: '0 20px 60px rgba(16, 185, 129, 0.3)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated Background Gradient */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
              }}
            />

            {/* Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-emerald-400/20 blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl md:rounded-3xl mb-6 shadow-2xl overflow-hidden"
                whileHover={{
                  rotate: [0, -10, 10, -10, 0],
                  scale: 1.1,
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-center w-full h-full bg-emerald-50 text-emerald-600">
                  <Code size={48} strokeWidth={1.5} />
                </div>
              </motion.div>

              <h2
                className="text-2xl md:text-3xl mb-3 text-emerald-900 font-bold"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Software Engineer
              </h2>
              <p
                className="text-emerald-700 text-base md:text-lg leading-relaxed"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Khám phá kỹ năng lập trình và dự án công nghệ
              </p>

              {/* Arrow indicator */}
              <motion.div
                className="mt-6 inline-flex items-center gap-2 text-emerald-600 font-medium"
                style={{ fontFamily: 'var(--font-sans)' }}
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                <span>Xem chi tiết</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </div>
          </motion.button>

          {/* Photographer Card */}
          <motion.button
            onClick={() => onSelectSkill('photographer')}
            className="group relative overflow-hidden rounded-3xl p-8 md:p-10 transition-all duration-500"
            style={{
              background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.05) 0%, rgba(13, 148, 136, 0.1) 100%)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(20, 184, 166, 0.2)',
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: '0 20px 60px rgba(20, 184, 166, 0.3)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated Background Gradient */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(circle at center, rgba(20, 184, 166, 0.15) 0%, transparent 70%)',
              }}
            />

            {/* Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-teal-400/20 blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl md:rounded-3xl mb-6 shadow-2xl overflow-hidden"
                whileHover={{
                  rotate: [0, 10, -10, 10, 0],
                  scale: 1.1,
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-center w-full h-full bg-teal-50 text-teal-600">
                  <Camera size={48} strokeWidth={1.5} />
                </div>
              </motion.div>

              <h2
                className="text-2xl md:text-3xl mb-3 text-teal-900 font-bold"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Photographer
              </h2>
              <p
                className="text-teal-700 text-base md:text-lg leading-relaxed"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Xem portfolio nhiếp ảnh và các tác phẩm
              </p>

              {/* Arrow indicator */}
              <motion.div
                className="mt-6 inline-flex items-center gap-2 text-teal-600 font-medium"
                style={{ fontFamily: 'var(--font-sans)' }}
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                <span>Xem chi tiết</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </div>
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-4"
        >
          <motion.a
            href="#"
            className="p-3 bg-white/50 backdrop-blur-sm rounded-xl border-2 border-emerald-200 hover:border-emerald-400 transition-all"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={24} className="text-emerald-700" />
          </motion.a>
          <motion.a
            href="#"
            className="p-3 bg-white/50 backdrop-blur-sm rounded-xl border-2 border-emerald-200 hover:border-emerald-400 transition-all"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Facebook size={24} className="text-emerald-700" />
          </motion.a>
          <motion.a
            href="#"
            className="p-3 bg-white/50 backdrop-blur-sm rounded-xl border-2 border-emerald-200 hover:border-emerald-400 transition-all"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram size={24} className="text-emerald-700" />
          </motion.a>
          <motion.a
            href="#"
            className="p-3 bg-white/50 backdrop-blur-sm rounded-xl border-2 border-emerald-200 hover:border-emerald-400 transition-all"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone size={24} className="text-emerald-700" />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}