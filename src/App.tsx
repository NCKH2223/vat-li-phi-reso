import React, { useState, useEffect } from 'react';
import { MainPage } from './components/MainPage';
import { ThankYouPage } from './components/ThankYouPage';
import { AdminRegistrationsModal } from './components/AdminRegistrationsModal';
import { RegistrationData } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'thank_you'>('landing');
  const [activeRegistration, setActiveRegistration] = useState<RegistrationData | null>(null);
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Load existing registrations from localStorage on initial mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('phi_reso_registrations');
      if (stored) {
        setRegistrations(JSON.parse(stored));
      } else {
        // Initial sample registration for immediate demo
        const initialSample: RegistrationData = {
          id: 'RESO-DEMO-888',
          fullName: 'Trần Nguyễn Hoàng Nam',
          phone: '0903471106',
          currentGrade: '12A1',
          address: 'Xã Tân Triều, Thanh Trì, Hà Nội',
          selectedProgram: 'Vật lí 12',
          grade12Tracks: ['Luyện thi THPT'],
          grade: '12A1',
          schoolCity: 'Xã Tân Triều, Thanh Trì, Hà Nội',
          currentChallenge: 'Chương trình: Vật lí 12 (Luyện thi THPT)',
          learningMode: 'online_live',
          preferredTime: 'weekend_evening',
          notes: 'Muốn luyện chuyên đề dao động cơ và lượng tử ánh sáng',
          createdAt: new Date().toISOString(),
        };
        setRegistrations([initialSample]);
        localStorage.setItem('phi_reso_registrations', JSON.stringify([initialSample]));
      }
    } catch (e) {
      console.error('Storage error', e);
    }
  }, []);

  const handleRegistrationSuccess = (data: RegistrationData) => {
    setActiveRegistration(data);
    setRegistrations((prev) => [data, ...prev]);
    setCurrentView('thank_you');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearAllRegistrations = () => {
    setRegistrations([]);
    localStorage.removeItem('phi_reso_registrations');
  };

  const handleDeleteOneRegistration = (id: string) => {
    const updated = registrations.filter((r) => r.id !== id);
    setRegistrations(updated);
    localStorage.setItem('phi_reso_registrations', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased physics-grid">
      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'landing' ? (
          <MainPage
            onSubmitSuccess={handleRegistrationSuccess}
            onOpenAdmin={() => setIsAdminOpen(true)}
            regCount={registrations.length}
          />
        ) : (
          activeRegistration && (
            <ThankYouPage
              registration={activeRegistration}
              onBackToHome={() => {
                setCurrentView('landing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )
        )}
      </main>

      {/* Admin Registration Manager Modal */}
      <AdminRegistrationsModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        registrations={registrations}
        onClearAll={handleClearAllRegistrations}
        onDeleteOne={handleDeleteOneRegistration}
      />
    </div>
  );
}
