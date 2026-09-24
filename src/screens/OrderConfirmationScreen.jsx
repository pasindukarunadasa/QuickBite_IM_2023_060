import React from 'react';
import {
  CheckCircle2,
  Clock,
  MapPin,
  QrCode,
  ArrowRight,
  Utensils,
  Share2,
  Receipt
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OrderConfirmationScreen = () => {
  const { activeOrder, navigateTo } = useApp();

  if (!activeOrder) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <p>No active order found.</p>
        <button onClick={() => navigateTo('home')} className="btn-primary" style={{ marginTop: '12px' }}>
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#F8FAFC',
        padding: '24px 20px 90px',
        overflowY: 'auto'
      }}
      className="animate-fade-in"
    >
      {/* Success Animated Hero */}
      <div
        style={{
          width: '76px',
          height: '76px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #10B981, #059669)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          boxShadow: '0 12px 30px rgba(16, 185, 129, 0.4)',
          marginBottom: '16px'
        }}
      >
        <CheckCircle2 size={44} strokeWidth={2.5} />
      </div>

      <h1 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0F172A', textAlign: 'center', marginBottom: '4px' }}>
        Order Confirmed! 🎉
      </h1>
      <p style={{ fontSize: '0.85rem', color: '#64748B', textAlign: 'center', maxWidth: '300px', marginBottom: '20px' }}>
        The canteen kitchen has received your order and started preparation.
      </p>

      {/* Main Order Ticket Card */}
      <div
        style={{
          width: '100%',
          background: '#FFFFFF',
          borderRadius: '24px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
          overflow: 'hidden',
          marginBottom: '20px'
        }}
      >
        {/* Ticket Top Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0F172A, #1E293B)',
            color: 'white',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: '600' }}>ORDER TOKEN</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '0.05em', color: '#38BDF8' }}>
              {activeOrder.id}
            </div>
          </div>

          <div
            style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '6px 12px',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: '700',
              color: '#F8FAFC'
            }}
          >
            {activeOrder.status}
          </div>
        </div>

        {/* Estimated Pickup Time Box */}
        <div style={{ padding: '20px', borderBottom: '1px dashed #E2E8F0', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#FF5A1F', marginBottom: '4px' }}>
            <Clock size={20} />
            <span style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Estimated Pickup Time
            </span>
          </div>

          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.02em' }}>
            {activeOrder.estimatedPickupTime}
          </div>

          <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '4px' }}>
            Ready in approx <strong>12-15 minutes</strong>
          </div>
        </div>

        {/* Canteen Pickup Counter Info */}
        <div style={{ padding: '16px 20px', background: '#FFF7ED', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px dashed #FED7AA' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: '#FF5A1F',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <MapPin size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#9A3412', fontWeight: '700' }}>COLLECTION POINT</div>
            <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#7C2D12' }}>
              {activeOrder.pickupCounter}
            </div>
          </div>
        </div>

        {/* QR Code Simulation */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div
            style={{
              padding: '14px',
              background: '#F8FAFC',
              borderRadius: '16px',
              border: '1.5px solid #E2E8F0',
              display: 'inline-block',
              marginBottom: '10px'
            }}
          >
            <QrCode size={120} color="#0F172A" />
          </div>
          <p style={{ fontSize: '0.75rem', color: '#64748B' }}>
            Show this QR code at the canteen counter scanner to collect your meal without queuing.
          </p>
        </div>

        {/* Order Items Receipt Summary */}
        <div style={{ padding: '16px 20px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>
            <Receipt size={14} />
            <span>Order Summary</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem' }}>
            {activeOrder.items?.map((it, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>{it.qty}x {it.name}</span>
                <span style={{ fontWeight: '600' }}>${(it.itemTotal || it.price * it.qty).toFixed(2)}</span>
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', color: '#0F172A', marginTop: '6px', paddingTop: '6px', borderTop: '1px solid #E2E8F0' }}>
              <span>Total Paid ({activeOrder.paymentMethod})</span>
              <span style={{ color: '#FF5A1F' }}>${activeOrder.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button
          onClick={() => navigateTo('order-tracking', { orderId: activeOrder.id })}
          className="btn-primary"
          style={{ width: '100%', padding: '15px' }}
          id="btn-track-live-order"
        >
          <span>Track Live Order Status</span>
          <ArrowRight size={18} />
        </button>

        <button
          onClick={() => navigateTo('home')}
          className="btn-secondary"
          style={{ width: '100%' }}
          id="btn-back-to-home"
        >
          <Utensils size={18} />
          <span>Back to Menu</span>
        </button>
      </div>
    </div>
  );
};
