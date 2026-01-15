import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Code, Terminal, Database, Cloud, GitBranch, Rocket, Award, Briefcase, CheckCircle2, Star, Zap, ChevronDown, ChevronUp, Edit, Calendar } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { FallingIcons } from '@/app/components/FallingIcons';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { ManageContentModal } from './ManageContentModal';
import { Skill } from '@/types/data';

interface SoftwareEngineerProfileProps {
  onBack: () => void;
}

export function SoftwareEngineerProfile({ onBack }: SoftwareEngineerProfileProps) {
  const { data } = useData();
  const { isAuthenticated } = useAuth();
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);

  const getIconForSkill = (skill: Skill) => {
    const n = skill.name.toLowerCase();
    if (n.includes('react') || n.includes('frontend')) return Code;
    if (n.includes('node') || n.includes('backend')) return Terminal;
    if (n.includes('data') || n.includes('sql')) return Database;
    if (n.includes('cloud') || n.includes('aws')) return Cloud;
    if (n.includes('git')) return GitBranch;
    return Rocket;
  };

  const getGradient = (index: number) => {
    const gradients = [
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-purple-500 to-pink-500',
      'from-orange-500 to-red-500',
      'from-teal-500 to-cyan-500',
      'from-indigo-500 to-purple-500'
    ];
    return gradients[index % gradients.length];
  };

  // Sort projects - newest first (reverse order)
  const sortedProjects = [...data.projects].reverse();
  const displayedProjects = showAllProjects ? sortedProjects : sortedProjects.slice(0, 4);

  const experience = [
    { years: `${data.profile.seStats?.years || data.profile.yearsOfExperience}+`, label: 'Năm Kinh Nghiệm' },
    { years: `${data.profile.seStats?.projects || data.profile.projectsCount}+`, label: 'Dự Án' },
    { years: `${data.profile.seStats?.clients || data.profile.clientsCount}+`, label: 'Khách Hàng' },
    { years: `${data.profile.seStats?.technologies || data.profile.technologiesCount}+`, label: 'Công Nghệ' },
  ];

  const levelColors: Record<string, string> = {
    'Expert': 'bg-emerald-500',
    'Advanced': 'bg-blue-500',
    'Intermediate': 'bg-orange-500',
    'Beginner': 'bg-gray-500'
  };

  return (
    <div className="min-h-screen py-8 md:py-12 px-4 relative overflow-hidden">
      <FallingIcons />
      <ManageContentModal isOpen={isManageOpen} onClose={() => setIsManageOpen(false)} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 text-emerald-700 hover:text-emerald-900 group px-4 py-2 bg-white/70 backdrop-blur-sm rounded-xl border-2 border-emerald-200 hover:border-emerald-400 transition-all"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5, scale: 1.02 }}
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Quay lại</span>
          </motion.button>

          {isAuthenticated && (
            <button
              onClick={() => setIsManageOpen(true)}
              className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700"
            >
              <Edit size={16} /> Manage Content
            </button>
          )}
        </div>

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
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-3xl blur-2xl opacity-40"></div>
            <div className="relative inline-flex items-center justify-center w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl shadow-2xl">
              <Code size={56} className="text-white" strokeWidth={2.5} />
            </div>
          </motion.div>

          <h1
            className="text-4xl md:text-6xl mb-4 text-emerald-900 font-bold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Software Engineer
          </h1>
          <p
            className="text-lg md:text-xl text-emerald-700 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Đam mê xây dựng các giải pháp công nghệ sáng tạo và hiệu quả.
            Chuyên về phát triển full-stack và kiến trúc hệ thống.
          </p>
        </motion.div>

        {/* Experience Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 md:mb-16"
        >
          {experience.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border-2 border-emerald-200 text-center shadow-lg hover:shadow-xl transition-all"
            >
              <div
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {item.years}
              </div>
              <div
                className="text-sm md:text-base text-emerald-800 font-medium"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {item.label}
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* Work Experience Section */}
        {data.experiences.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-12 md:mb-16"
          >
            <h2
              className="text-3xl md:text-4xl mb-8 text-emerald-900 font-bold"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Kinh Nghiệm Làm Việc
            </h2>
            <div className="relative border-l-2 border-emerald-200 ml-4 md:ml-6 space-y-8 md:space-y-12">
              {data.experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="relative pl-8 md:pl-12"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white shadow-md"></div>

                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 hover:border-emerald-300 transition-all shadow-sm hover:shadow-md">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-emerald-900">{exp.role}</h3>
                        <p className="text-lg text-emerald-700 font-medium">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full w-fit">
                        <Calendar size={16} />
                        <span className="text-sm font-medium whitespace-nowrap">
                          {exp.startDate} - {exp.endDate || 'Present'}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="flex items-start gap-2 text-emerald-800/80">
                          <div className="mt-1.5 min-w-[6px] h-1.5 bg-emerald-400 rounded-full"></div>
                          <span className="leading-relaxed">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}


        {/* Skills Section */}
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
            Kỹ Năng Chuyên Môn
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {data.skills.map((skill, index) => {
              const Icon = getIconForSkill(skill);
              return (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border-2 border-emerald-200 hover:border-emerald-400 transition-all shadow-lg hover:shadow-xl group"
                >
                  {/* Icon and Level Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      className={`p-3 bg-gradient-to-br ${getGradient(index)} rounded-xl shadow-lg flex items-center justify-center overflow-hidden`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {skill.iconUrl ? (
                        <img src={skill.iconUrl} alt={skill.name} className="w-7 h-7 object-contain" />
                      ) : (
                        <Icon size={28} className="text-white" strokeWidth={2.5} />
                      )}
                    </motion.div>
                    <span className={`px-3 py-1 ${levelColors[skill.level] || 'bg-gray-500'} text-white text-xs font-bold rounded-full`}>
                      {skill.level}
                    </span>
                  </div>

                  {/* Skill Name */}
                  <h3
                    className="text-xl font-bold text-emerald-900 mb-2"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {skill.name}
                  </h3>

                  {/* Years of Experience */}
                  <div className="flex items-center gap-2 text-emerald-600">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-sans)' }}>
                      {skill.yearsOfExperience}+ years
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Achievements Section */}
        {data.achievements.length > 0 && (
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
              Thành Tựu & Giải Thưởng
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {data.achievements.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border-2 border-emerald-200 flex items-start gap-4 hover:shadow-lg transition-all"
                >
                  {item.image ? (
                    <div className="shrink-0 w-24 h-24 rounded-xl overflow-hidden border border-emerald-100 shadow-md">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg shrink-0">
                      {item.iconUrl ? (
                        <img src={item.iconUrl} alt={item.title} className="w-6 h-6 object-contain" />
                      ) : (
                        <Award size={24} className="text-white" />
                      )}
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-emerald-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-emerald-600 font-medium mb-2">{item.date}</p>
                    <p className="text-emerald-700 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Projects Section with Images */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2
            className="text-3xl md:text-4xl mb-8 text-emerald-900 font-bold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Dự Án Tiêu Biểu
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((project, index) => {
                const ProjectWrapper = project.link 
                  ? ({ children }: { children: React.ReactNode }) => (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                        {children}
                      </a>
                    )
                  : ({ children }: { children: React.ReactNode }) => <>{children}</>;
                
                return (
                  <ProjectWrapper key={project.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, delay: showAllProjects ? 0 : 0.1 * index }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className={`relative bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-emerald-200 hover:border-emerald-400 transition-all shadow-lg hover:shadow-2xl group ${project.link ? 'cursor-pointer' : ''}`}
                    >
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <ImageWithFallback
                      src={project.image || ''}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-30 group-hover:opacity-40 transition-opacity`}></div>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${project.status === 'Live'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-orange-500 text-white'
                        }`}>
                        {project.status || 'Concept'}
                      </span>
                    </div>

                    {/* Icon */}
                    <motion.div
                      className="absolute top-4 left-4 p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Briefcase size={24} className="text-emerald-600" strokeWidth={2.5} />
                    </motion.div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <h3
                      className="text-xl md:text-2xl mb-2 text-emerald-900 font-bold"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="text-emerald-700 leading-relaxed mb-4"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium hover:bg-emerald-200 transition-colors"
                          style={{ fontFamily: 'var(--font-sans)' }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </ProjectWrapper>
            );
          })}
            </AnimatePresence>
          </div>

          {/* Show More/Less Button */}
          {data.projects.length > 4 && (
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
          )}
        </motion.section>
      </div>
    </div>
  );
}
