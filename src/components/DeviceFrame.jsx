import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Tablet,
  Monitor,
  ShieldCheck,
  Wifi,
  Battery,
  Sliders,
  UtensilsCrossed,
  Layers,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BottomNav } from './BottomNav';
import { TestSuiteModal } from './TestSuiteModal';

export const DeviceFrame = ({ children }) => {
  const { deviceMode, setDeviceMode, currentScreen, navigateTo, toastMessage } = useApp();
  const [currentTime, setCurrentTime] = useState('12:15');
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [showScreenPicker, setShowScreenPicker] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const screenList = [
    { id: 'splash', label: '1. Splash Screen' },
    { id: 'login', label: '2. Login / Guest' },
    { id: 'home', label: '3. Home (Menu & Filter)' },
    { id: 'cart', label: '4. Cart & Subtotal' },
    { id: 'checkout', label: '5. Checkout & Counters' },
    { id: 'order-confirmation', label: '6. Order Confirmation' },
    { id: 'order-tracking', label: '7. Live Order Tracking' },
    { id: 'profile', label: '8. User Profile & Wallet' }
  ];

  const getContainerClass = () => {
    if (deviceMode === 'tablet') return 'device-container-tablet';
    if (deviceMode === 'desktop') return 'device-container-desktop';
    return 'device-container-phone';
  };

  return (
    <div className="app-viewport-shell">
      {/* Top Global Control Bar for Evaluator & Demonstration */}
      <header className="global-control-bar">
        {/* Brand & Project Metadata */}
        <div className="brand-badge">
          <div className="logo-icon-box">
            <UtensilsCrossed size={20} strokeWidth={2.6} />
          </div>
          <div>
            <div>QuickBite • Campus Food MVP</div>
            <div className="brand-sub">Student ID: IM/2023/060 • React Cross-Platform</div>
          </div>
        </div>

        {/* Device Viewport Mode Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div className="device-switcher-pill">
            <button
              className={`device-btn ${deviceMode === 'phone' ? 'active' : ''}`}
              onClick={() => setDeviceMode('phone')}
              title="Mobile Phone Viewport (390px)"
            >
              <Smartphone size={15} />
              <span>Phone</span>
            </button>
            <button
              className={`device-btn ${deviceMode === 'tablet' ? 'active' : ''}`}
              onClick={() => setDeviceMode('tablet')}
              title="Tablet Viewport (768px)"
            >
              <Tablet size={15} />
              <span>Tablet</span>
            </button>
            <button
              className={`device-btn ${deviceMode === 'desktop' ? 'active' : ''}`}
              onClick={() => setDeviceMode('desktop')}
              title="Full Responsive Web Viewport"
            >
              <Monitor size={15} />
              <span>Full Web</span>
            </button>
          </div>

          {/* Quick Screen Jump Selector */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowScreenPicker(!showScreenPicker)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#F8FAFC',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}
            >
              <Layers size={14} />
              <span>Screen: {currentScreen}</span>
            </button>

            {showScreenPicker && (
              <div
                style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  width: '210px',
                  background: '#0F172A',
                  border: '1px solid #334155',
                  borderRadius: '14px',
                  padding: '6px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                  zIndex: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px'
                }}
              >
                {screenList.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      navigateTo(sc.id);
                      setShowScreenPicker(false);
                    }}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      textAlign: 'left',
                      color: currentScreen === sc.id ? '#FF5A1F' : '#CBD5E1',
                      background: currentScreen === sc.id ? 'rgba(255,90,31,0.15)' : 'transparent'
                    }}
                  >
                    {sc.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* QA Test Suite Button */}
          <button
            className="qa-suite-btn"
            onClick={() => setIsTestModalOpen(true)}
            id="btn-open-qa-suite"
          >
            <ShieldCheck size={16} />
            <span>QA Test Suite (6 Cases)</span>
          </button>
        </div>
      </header>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className={`toast-banner ${toastMessage.type}`} id="app-toast-alert">
          <span>{toastMessage.message}</span>
        </div>
      )}

      {/* Device Physical Frame */}
      <div className={getContainerClass()}>
        {/* Phone Notch & Status Bar */}
        {deviceMode === 'phone' && (
          <div className="phone-top-bar">
            <span>{currentTime}</span>
            <div className="notch-island">
              <div className="notch-camera-dot" />
              <div className="notch-sensor-dot" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Wifi size={13} strokeWidth={2.5} />
              <Battery size={14} strokeWidth={2.5} />
            </div>
          </div>
        )}

        {/* Screen Dynamic Router Container */}
        <main className="app-screen-content">{children}</main>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>

      {/* QA Test Cases Modal */}
      <TestSuiteModal isOpen={isTestModalOpen} onClose={() => setIsTestModalOpen(false)} />
    </div>
  );
};
