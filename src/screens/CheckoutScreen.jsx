import React, { useState } from 'react';
import {
  ArrowLeft,
  CreditCard,
  Wallet,
  Banknote,
  MapPin,
  Clock,
  ShieldCheck,
  User,
  School,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CANTEEN_COUNTERS } from '../data/menuData';

export const CheckoutScreen = () => {
  const {
    user,
    cart,
    cartSubtotal,
    cartDiscount,
    packagingFee,
    cartGrandTotal,
    pickupSlot,
    selectedCounter,
    setSelectedCounter,
    placeOrder,
    goBack,
    navigateTo,
    topUpWallet
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState('Campus SmartCard');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      placeOrder(paymentMethod);
      setIsProcessing(false);
    }, 600);
  };

  const isWalletSufficient = user.walletBalance >= cartGrandTotal;

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
          gap: '12px',
          position: 'sticky',
          top: 0,
          zIndex: 20
        }}
      >
        <button onClick={goBack} style={{ color: '#0F172A' }} aria-label="Back">
          <ArrowLeft size={22} />
        </button>
        <div>
          <h1 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A' }}>Order Checkout</h1>
          <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Confirm your campus meal details</span>
        </div>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Student Details Card */}
        <div style={{ background: '#FFFFFF', borderRadius: '18px', padding: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <School size={16} color="#FF5A1F" />
              <h3 style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0F172A' }}>Student Information</h3>
            </div>
            <span style={{ fontSize: '0.72rem', background: '#ECFDF5', color: '#059669', padding: '2px 8px', borderRadius: '6px', fontWeight: '700' }}>
              Verified Student
            </span>
          </div>

          <div style={{ fontSize: '0.82rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div><strong>Name:</strong> {user.name}</div>
            <div><strong>Registration ID:</strong> <code style={{ background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px', color: '#0F172A' }}>{user.studentId}</code></div>
            <div><strong>Faculty:</strong> {user.faculty}</div>
            <div><strong>Pickup Time:</strong> {pickupSlot}</div>
          </div>
        </div>

        {/* Pickup Counter Selection */}
        <div style={{ background: '#FFFFFF', borderRadius: '18px', padding: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <MapPin size={16} color="#FF5A1F" />
            <h3 style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0F172A' }}>Select Pickup Counter</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {CANTEEN_COUNTERS.map((counter) => {
              const isSelected = selectedCounter === counter.id;
              return (
                <div
                  key={counter.id}
                  onClick={() => setSelectedCounter(counter.id)}
                  id={`counter-select-${counter.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: isSelected ? '1.5px solid #FF5A1F' : '1px solid #E2E8F0',
                    background: isSelected ? '#FFF7ED' : '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0F172A' }}>
                      {counter.name}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '2px' }}>
                      Queue time: ~{counter.waitTime} • {counter.status} Lane
                    </div>
                  </div>

                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: isSelected ? '5px solid #FF5A1F' : '2px solid #CBD5E1',
                      background: 'white'
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Payment Method Selection */}
        <div style={{ background: '#FFFFFF', borderRadius: '18px', padding: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Wallet size={16} color="#FF5A1F" />
            <h3 style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0F172A' }}>Payment Method</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Campus SmartCard Wallet */}
            <div
              onClick={() => setPaymentMethod('Campus SmartCard')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '12px',
                border: paymentMethod === 'Campus SmartCard' ? '1.5px solid #FF5A1F' : '1px solid #E2E8F0',
                background: paymentMethod === 'Campus SmartCard' ? '#FFF7ED' : '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #0F172A, #334155)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#38BDF8'
                  }}
                >
                  <CreditCard size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0F172A' }}>
                    Campus SmartCard (Recommended)
                  </div>
                  <div style={{ fontSize: '0.72rem', color: isWalletSufficient ? '#059669' : '#DC2626', fontWeight: '600' }}>
                    Balance: ${user.walletBalance.toFixed(2)} {!isWalletSufficient && '(Insufficient)'}
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  border: paymentMethod === 'Campus SmartCard' ? '5px solid #FF5A1F' : '2px solid #CBD5E1',
                  background: 'white'
                }}
              />
            </div>

            {/* If insufficient balance, show quick reload button */}
            {paymentMethod === 'Campus SmartCard' && !isWalletSufficient && (
              <div
                style={{
                  background: '#FEF2F2',
                  border: '1px solid #FECACA',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#991B1B' }}>
                  <AlertCircle size={14} />
                  <span>Need ${(cartGrandTotal - user.walletBalance).toFixed(2)} more</span>
                </div>
                <button
                  onClick={() => topUpWallet(20)}
                  style={{
                    background: '#DC2626',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '700'
                  }}
                >
                  + Add $20.00
                </button>
              </div>
            )}

            {/* Cash on Pickup */}
            <div
              onClick={() => setPaymentMethod('Cash on Counter Pickup')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '12px',
                border: paymentMethod === 'Cash on Counter Pickup' ? '1.5px solid #FF5A1F' : '1px solid #E2E8F0',
                background: paymentMethod === 'Cash on Counter Pickup' ? '#FFF7ED' : '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: '#ECFDF5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#059669'
                  }}
                >
                  <Banknote size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0F172A' }}>
                    Cash on Counter Pickup
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                    Pay at Canteen cash register during pickup
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  border: paymentMethod === 'Cash on Counter Pickup' ? '5px solid #FF5A1F' : '2px solid #CBD5E1',
                  background: 'white'
                }}
              />
            </div>
          </div>
        </div>

        {/* Order Items Review */}
        <div style={{ background: '#FFFFFF', borderRadius: '18px', padding: '16px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0F172A', marginBottom: '10px' }}>
            Order Items ({cart.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {cart.map((item) => (
              <div key={item.cartItemId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <span style={{ color: '#334155' }}>
                  {item.qty}x {item.name}
                </span>
                <span style={{ fontWeight: '700', color: '#0F172A' }}>${item.itemTotal.toFixed(2)}</span>
              </div>
            ))}

            <div style={{ height: '1px', background: '#E2E8F0', margin: '4px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: '800' }}>
              <span>Total Payable</span>
              <span style={{ color: '#FF5A1F' }}>${cartGrandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Place Order Button */}
      <div
        style={{
          position: 'sticky',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid #E2E8F0',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 30
        }}
      >
        <div>
          <span style={{ fontSize: '0.72rem', color: '#94A3B8', display: 'block' }}>Payment via</span>
          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0F172A' }}>
            {paymentMethod.split(' ')[0]}
          </span>
        </div>

        <button
          onClick={handleConfirmOrder}
          disabled={isProcessing || (paymentMethod === 'Campus SmartCard' && !isWalletSufficient)}
          className="btn-primary"
          style={{ padding: '14px 28px', fontSize: '0.95rem' }}
          id="btn-confirm-place-order"
        >
          <ShieldCheck size={18} />
          <span>{isProcessing ? 'Placing Order...' : `Place Order • $${cartGrandTotal.toFixed(2)}`}</span>
        </button>
      </div>
    </div>
  );
};
