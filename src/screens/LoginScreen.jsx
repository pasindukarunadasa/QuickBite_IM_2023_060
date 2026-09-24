import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, UserCheck, Sparkles, School } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LoginScreen = () => {
  const { navigateTo, setUser, showToast } = useApp();
  const [email, setEmail] = useState('alex.im2023060@univ.edu');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [studentId, setStudentId] = useState('IM/2023/060');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please fill in your campus credentials', 'error');
      return;
    }

    setUser((prev) => ({
      ...prev,
      email,
      studentId,
      isLoggedIn: true
    }));

    showToast(`Welcome back, Alexander! 🎓`, 'success');
    navigateTo('home');
  };

  const handleQuickDemoFill = () => {
    setEmail('alex.im2023060@univ.edu');
    setStudentId('IM/2023/060');
    setPassword('Campus@2026');
    showToast('Demo student credentials filled!', 'info');
  };

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        background: '#FFFFFF',
        overflowY: 'auto'
      }}
      className="animate-fade-in"
    >
      {/* Top Header */}
      <div style={{ marginTop: '16px', marginBottom: '28px' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '16px',
            background: 'var(--primary-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)',
            marginBottom: '16px'
          }}
        >
          <School size={26} />
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0F172A', marginBottom: '6px' }}>
          Student Portal Sign In
        </h1>
        <p style={{ fontSize: '0.88rem', color: '#64748B' }}>
          Log in with your University ID to place meals & access campus discounts.
        </p>
      </div>

      {/* 1-Click Fill Banner */}
      <div
        onClick={handleQuickDemoFill}
        style={{
          background: 'linear-gradient(135deg, #FFF7ED, #FFEDD5)',
          border: '1px solid #FED7AA',
          padding: '12px 16px',
          borderRadius: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          marginBottom: '24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} color="#EA580C" />
          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#9A3412' }}>
            Auto-fill Student IM/2023/060
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', color: '#EA580C', fontWeight: '800' }}>Apply ✨</span>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Student ID / Email */}
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
            Campus Email or Student ID
          </label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#F8FAFC',
              border: '1.5px solid #E2E8F0',
              borderRadius: '12px',
              padding: '12px 14px',
              gap: '10px'
            }}
          >
            <Mail size={18} color="#94A3B8" />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. alex.im2023060@univ.edu"
              required
              id="input-login-email"
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                color: '#0F172A',
                fontSize: '0.9rem'
              }}
            />
          </div>
        </div>

        {/* Student Reg ID */}
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
            Registration Number
          </label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#F8FAFC',
              border: '1.5px solid #E2E8F0',
              borderRadius: '12px',
              padding: '12px 14px',
              gap: '10px'
            }}
          >
            <UserCheck size={18} color="#94A3B8" />
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="e.g. IM/2023/060"
              required
              id="input-login-regno"
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                color: '#0F172A',
                fontSize: '0.9rem'
              }}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
            Portal Password
          </label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#F8FAFC',
              border: '1.5px solid #E2E8F0',
              borderRadius: '12px',
              padding: '12px 14px',
              gap: '10px'
            }}
          >
            <Lock size={18} color="#94A3B8" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              id="input-login-password"
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                color: '#0F172A',
                fontSize: '0.9rem'
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ color: '#94A3B8' }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn-primary"
          style={{ width: '100%', marginTop: '12px', padding: '15px' }}
          id="btn-login-submit"
        >
          <span>Sign In to QuickBite</span>
          <ArrowRight size={18} />
        </button>
      </form>

      {/* Divider */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          margin: '24px 0',
          color: '#94A3B8',
          fontSize: '0.78rem'
        }}
      >
        <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
        <span>OR</span>
        <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
      </div>

      {/* Guest Mode */}
      <button
        onClick={() => {
          showToast('Browsing as Guest Student', 'info');
          navigateTo('home');
        }}
        className="btn-secondary"
        style={{ width: '100%' }}
        id="btn-login-guest"
      >
        <UserCheck size={18} />
        <span>Continue as Guest</span>
      </button>
    </div>
  );
};
