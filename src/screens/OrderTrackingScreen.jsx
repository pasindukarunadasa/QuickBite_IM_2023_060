import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  ChefHat,
  BellRing,
  PackageCheck,
  Clock,
  MapPin,
  Sparkles,
  Phone,
  RefreshCw,
  FastForward,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OrderTrackingScreen = () => {
  const { activeOrder, orders, advanceOrderStatus, navigateTo, goBack, showToast } = useApp();
  const [selectedOrderId, setSelectedOrderId] = useState(activeOrder ? activeOrder.id : orders[0]?.id);
  const [autoSimulate, setAutoSimulate] = useState(false);

  // Pick order
  const currentOrder = orders.find((o) => o.id === selectedOrderId) || activeOrder || orders[0];

  // Auto progression simulation effect
  useEffect(() => {
    let timer;
    if (autoSimulate && currentOrder && currentOrder.status !== 'Completed') {
      timer = setTimeout(() => {
        advanceOrderStatus(currentOrder.id);
        showToast(`Order status updated to: ${getNextStatus(currentOrder.status)} 🚀`, 'info');
      }, 3500);
    }
    return () => clearTimeout(timer);
  }, [autoSimulate, currentOrder]);

  const getNextStatus = (curr) => {
    if (curr === 'Placed') return 'Preparing';
    if (curr === 'Preparing') return 'Ready for pickup';
    if (curr === 'Ready for pickup') return 'Completed';
    return 'Completed';
  };

  if (!currentOrder) {
    return (
      <div style={{ padding: '32px 20px', textAlign: 'center', background: '#FFFFFF', flex: 1 }}>
        <Clock size={48} color="#94A3B8" style={{ marginBottom: '16px' }} />
        <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A' }}>No Active Orders</h2>
        <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '6px', marginBottom: '20px' }}>
          You haven't placed an order yet today.
        </p>
        <button onClick={() => navigateTo('home')} className="btn-primary" style={{ margin: '0 auto' }}>
          Explore Menu
        </button>
      </div>
    );
  }

  const steps = [
    {
      id: 'Placed',
      title: 'Order Received & Placed',
      desc: 'Sent directly to the canteen kitchen terminal',
      icon: CheckCircle2,
      time: 'Instant'
    },
    {
      id: 'Preparing',
      title: 'In Kitchen / Cooking',
      desc: 'Fresh ingredients being grilled and assembled',
      icon: ChefHat,
      time: '5-8 mins'
    },
    {
      id: 'Ready for pickup',
      title: 'Ready for Collection',
      desc: 'Packed at counter shelf with your order token',
      icon: BellRing,
      time: 'Ready Now!'
    },
    {
      id: 'Completed',
      title: 'Picked Up & Enjoyed',
      desc: 'Order collected successfully',
      icon: PackageCheck,
      time: 'Done'
    }
  ];

  const getStepIndex = (status) => {
    return steps.findIndex((s) => s.id.toLowerCase() === status.toLowerCase());
  };

  const currentStepIdx = getStepIndex(currentOrder.status);

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: '#F8FAFC',
        overflowY: 'auto',
        paddingBottom: '90px'
      }}
      className="animate-fade-in"
    >
      {/* Header */}
      <div
        style={{
          padding: '16px 20px',
          background: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 20
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigateTo('home')} style={{ color: '#0F172A' }} aria-label="Back">
            <ArrowLeft size={22} />
          </button>
          <div>
            <h1 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A' }}>Live Order Tracker</h1>
            <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
              Token: <strong>{currentOrder.id}</strong>
            </span>
          </div>
        </div>

        {/* Order Selector dropdown if multiple */}
        {orders.length > 1 && (
          <select
            value={currentOrder.id}
            onChange={(e) => setSelectedOrderId(e.target.value)}
            style={{
              padding: '4px 8px',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              fontSize: '0.75rem',
              fontWeight: '700',
              background: '#F8FAFC',
              color: '#0F172A'
            }}
          >
            {orders.map((ord) => (
              <option key={ord.id} value={ord.id}>
                {ord.id} ({ord.status})
              </option>
            ))}
          </select>
        )}
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Status Highlight Hero */}
        <div
          style={{
            background:
              currentOrder.status === 'Ready for pickup'
                ? 'linear-gradient(135deg, #064E3B 0%, #047857 100%)'
                : currentOrder.status === 'Preparing'
                ? 'linear-gradient(135deg, #78350F 0%, #B45309 100%)'
                : 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            color: 'white',
            borderRadius: '24px',
            padding: '20px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span
              style={{
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(6px)',
                padding: '4px 10px',
                borderRadius: '999px',
                fontSize: '0.72rem',
                fontWeight: '800',
                letterSpacing: '0.05em'
              }}
            >
              LIVE CANTEEN STATUS
            </span>

            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#CBD5E1' }}>
              Pickup ~ {currentOrder.estimatedPickupTime}
            </span>
          </div>

          <h2 style={{ fontSize: '1.45rem', fontWeight: '800', marginBottom: '6px' }}>
            {currentOrder.status === 'Placed' && 'Order Received 📋'}
            {currentOrder.status === 'Preparing' && 'Cooking Your Meal 🍳'}
            {currentOrder.status === 'Ready for pickup' && 'Ready for Pickup! 🔔'}
            {currentOrder.status === 'Completed' && 'Order Completed ✨'}
          </h2>

          <p style={{ fontSize: '0.85rem', opacity: 0.9, lineHeight: 1.4, maxWidth: '280px' }}>
            {currentOrder.status === 'Placed' && 'Your order is queued in the kitchen. Prep begins shortly.'}
            {currentOrder.status === 'Preparing' && 'The chef is preparing and grilling your items right now.'}
            {currentOrder.status === 'Ready for pickup' && `Please head to ${currentOrder.pickupCounter} with your token.`}
            {currentOrder.status === 'Completed' && 'Hope you enjoyed your campus meal! Have a great lecture.'}
          </p>
        </div>

        {/* Interactive Simulation & Test Control Panel */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            padding: '14px 16px',
            border: '1.5px dashed #FF5A1F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: '800', color: '#FF5A1F' }}>
              <FastForward size={16} />
              <span>Assignment Simulation Controls</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '2px' }}>
              Advance status manually or auto-progress
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => advanceOrderStatus(currentOrder.id)}
              disabled={currentOrder.status === 'Completed'}
              className="btn-primary"
              style={{
                padding: '6px 12px',
                fontSize: '0.75rem',
                borderRadius: '8px',
                background: currentOrder.status === 'Completed' ? '#94A3B8' : 'var(--primary)'
              }}
              id="btn-advance-status-manual"
            >
              <span>Next Stage ➔</span>
            </button>

            <button
              onClick={() => setAutoSimulate(!autoSimulate)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: '700',
                border: '1px solid #CBD5E1',
                background: autoSimulate ? '#ECFDF5' : '#F8FAFC',
                color: autoSimulate ? '#059669' : '#475569'
              }}
            >
              {autoSimulate ? 'Auto: ON ⏱' : 'Auto: OFF'}
            </button>
          </div>
        </div>

        {/* Stepper Timeline */}
        <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '20px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#0F172A', marginBottom: '16px' }}>
            Preparation Progress
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
            {steps.map((step, index) => {
              const isPast = index < currentStepIdx;
              const isCurrent = index === currentStepIdx;
              const isFuture = index > currentStepIdx;
              const StepIcon = step.icon;

              return (
                <div key={step.id} style={{ display: 'flex', gap: '14px', position: 'relative' }}>
                  {/* Left Line & Icon column */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '36px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: isPast
                          ? '#10B981'
                          : isCurrent
                          ? '#FF5A1F'
                          : '#F1F5F9',
                        color: isPast || isCurrent ? 'white' : '#94A3B8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: isCurrent ? '0 0 0 4px rgba(255, 90, 31, 0.25)' : 'none',
                        zIndex: 2,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <StepIcon size={18} />
                    </div>

                    {/* Connecting Vertical Line */}
                    {index < steps.length - 1 && (
                      <div
                        style={{
                          width: '3px',
                          flex: 1,
                          minHeight: '40px',
                          background: isPast ? '#10B981' : '#E2E8F0',
                          margin: '4px 0',
                          borderRadius: '999px'
                        }}
                      />
                    )}
                  </div>

                  {/* Right Description column */}
                  <div style={{ paddingBottom: index === steps.length - 1 ? '0' : '22px', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <h4
                        style={{
                          fontSize: '0.88rem',
                          fontWeight: '800',
                          color: isCurrent ? '#0F172A' : isPast ? '#059669' : '#94A3B8'
                        }}
                      >
                        {step.title}
                      </h4>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: '700',
                          color: isCurrent ? '#FF5A1F' : '#94A3B8'
                        }}
                      >
                        {step.time}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px' }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pickup Counter Location Box */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            padding: '16px',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: '#FFF7ED',
                color: '#FF5A1F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <MapPin size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: '700' }}>PICKUP LOCATION</div>
              <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0F172A' }}>
                {currentOrder.pickupCounter}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Main Student Canteen Hall, Level 1</div>
            </div>
          </div>
        </div>

        {/* Items Summary in this Order */}
        <div style={{ background: '#FFFFFF', borderRadius: '18px', padding: '16px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0F172A', marginBottom: '10px' }}>
            Ordered Items ({currentOrder.items?.length || 0})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {currentOrder.items?.map((it, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <span style={{ color: '#334155' }}>
                  <strong>{it.qty}x</strong> {it.name}
                </span>
                <span style={{ fontWeight: '700', color: '#0F172A' }}>
                  ${(it.itemTotal || it.price * it.qty).toFixed(2)}
                </span>
              </div>
            ))}

            <div style={{ height: '1px', background: '#E2E8F0', margin: '4px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: '800' }}>
              <span>Total Paid</span>
              <span style={{ color: '#FF5A1F' }}>${currentOrder.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
