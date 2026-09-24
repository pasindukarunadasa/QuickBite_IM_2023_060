import React from 'react';
import { Utensils, ArrowRight, Zap, ShieldCheck, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SplashScreen = () => {
  const { navigateTo } = useApp();

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '36px 24px',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF7ED 50%, #FFEDD5 100%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
      className="animate-fade-in"
    >
      {/* Background Decorative Rings */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,90,31,0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      {/* Top University Canteen Header */}
      <div style={{ marginTop: '20px', zIndex: 2 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255, 90, 31, 0.1)',
            color: '#FF5A1F',
            padding: '6px 14px',
            borderRadius: '999px',
            fontSize: '0.78rem',
            fontWeight: '700',
            letterSpacing: '0.02em',
            marginBottom: '16px'
          }}
        >
          <Zap size={14} /> UNIVERSITY CANTEEN EXPRESS
        </div>
      </div>

      {/* Hero Visual & Branding */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, margin: '20px 0' }}>
        <div
          style={{
            width: '110px',
            height: '110px',
            borderRadius: '32px',
            background: 'linear-gradient(135deg, #FF5A1F 0%, #FF8A00 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 40px rgba(255, 90, 31, 0.35)',
            marginBottom: '24px',
            position: 'relative'
          }}
        >
          <Utensils size={54} color="#FFFFFF" strokeWidth={2.4} />
          
          <div
            style={{
              position: 'absolute',
              bottom: '-8px',
              right: '-8px',
              background: '#0F172A',
              color: 'white',
              fontSize: '0.65rem',
              fontWeight: '800',
              padding: '4px 8px',
              borderRadius: '999px',
              border: '2px solid white'
            }}
          >
            MVP
          </div>
        </div>

        <h1
          style={{
            fontSize: '2.4rem',
            fontWeight: '800',
            color: '#0F172A',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '10px'
          }}
        >
          Quick<span style={{ color: '#FF5A1F' }}>Bite</span>
        </h1>

        <p
          style={{
            fontSize: '1rem',
            color: '#475569',
            maxWidth: '300px',
            lineHeight: 1.5,
            fontWeight: '500'
          }}
        >
          Skip the canteen lines. Order fresh campus food ahead of your lecture breaks!
        </p>

        {/* Feature Pills */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginTop: '24px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#FFFFFF',
              padding: '6px 12px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#334155',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
            }}
          >
            <Clock size={14} color="#FF5A1F" /> Zero Queue
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#FFFFFF',
              padding: '6px 12px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#334155',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
            }}
          >
            <ShieldCheck size={14} color="#10B981" /> Live Order Tracking
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ width: '100%', maxWidth: '360px', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button
          className="btn-primary"
          style={{ width: '100%', fontSize: '1.05rem', padding: '16px' }}
          onClick={() => navigateTo('login')}
          id="splash-get-started-btn"
        >
          <span>Get Started</span>
          <ArrowRight size={20} />
        </button>

        <button
          className="btn-secondary"
          style={{ width: '100%', background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(4px)' }}
          onClick={() => navigateTo('home')}
          id="splash-guest-access-btn"
        >
          <span>Continue as Guest Student</span>
        </button>

        <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '6px' }}>
          Coursework Activity: IM/2023/060 • Mobile Dev MVP
        </div>
      </div>
    </div>
  );
};
