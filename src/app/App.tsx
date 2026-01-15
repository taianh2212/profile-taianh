import { useState } from 'react';
import { FallingIcons } from '@/app/components/FallingIcons';
import { HomePage } from '@/app/components/HomePage';
import { SoftwareEngineerProfile } from '@/app/components/SoftwareEngineerProfile';
import { PhotographerProfile } from '@/app/components/PhotographerProfile';
import bgImage from '@/assets/TaiAnh-07259.jpg';

type View = 'home' | 'se' | 'photographer';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');

  const handleSelectSkill = (skill: 'se' | 'photographer') => {
    setCurrentView(skill);
  };

  const handleBack = () => {
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ fontFamily: 'var(--font-sans)' }}>
      {/* Background with Image and Blur effect */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          filter: 'blur(8px)',
          opacity: 0.8
        }}
      />

      {/* Light Overlay to ensure text readability */}
      <div className="fixed inset-0 z-0 bg-white/30 pointer-events-none" />

      <FallingIcons />

      <div className="relative z-10">
        {currentView === 'home' && (
          <HomePage onSelectSkill={handleSelectSkill} />
        )}

        {currentView === 'se' && (
          <SoftwareEngineerProfile onBack={handleBack} />
        )}

        {currentView === 'photographer' && (
          <PhotographerProfile onBack={handleBack} />
        )}
      </div>
    </div>
  );
}