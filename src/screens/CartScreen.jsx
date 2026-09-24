import React, { useState } from 'react';
import {
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  Tag,
  ArrowRight,
  ShoppingBag,
  Clock,
  Sparkles,
  Check,
  X,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartScreen = () => {
  const {
    cart,
    updateCartItemQty,
    removeCartItem,
    clearCart,
    cartItemCount,
    cartSubtotal,
    cartDiscount,
    packagingFee,
    cartGrandTotal,
    appliedPromo,
    applyPromo,
    removePromo,
    pickupSlot,
    setPickupSlot,
    navigateTo,
    goBack
  } = useApp();

  const [promoInput, setPromoInput] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    if (res.success) {
      setPromoInput('');
    }
  };

  const pickupSlotsList = [
    'Immediate (10-15 mins)',
    'Next Break (12:30 PM)',
    'After Lecture (1:15 PM)',
    'Later Today (3:00 PM)'
  ];

  if (cart.length === 0) {
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 24px',
          textAlign: 'center',
          background: '#FFFFFF'
        }}
        className="animate-fade-in"
      >
        <div
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            background: '#F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94A3B8',
            marginBottom: '20px'
          }}
        >
          <ShoppingBag size={44} />
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
          Your QuickBite Cart is Empty
        </h2>
        <p style={{ fontSize: '0.88rem', color: '#64748B', maxWidth: '280px', marginBottom: '24px' }}>
          Looks like you haven't added any campus favorites yet! Check out our freshly prepared daily menu.
        </p>

        <button
          onClick={() => navigateTo('home')}
          className="btn-primary"
          style={{ padding: '14px 28px', fontSize: '0.95rem' }}
          id="cart-empty-browse-btn"
        >
          <span>Browse Canteen Menu</span>
          <ArrowRight size={18} />
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
            <h1 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A' }}>My Cart</h1>
            <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
              {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} selected
            </span>
          </div>
        </div>

        <button
          onClick={clearCart}
          style={{
            fontSize: '0.75rem',
            color: '#EF4444',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 8px',
            borderRadius: '6px'
          }}
        >
          <Trash2 size={14} /> Clear All
        </button>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Cart Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              style={{
                background: '#FFFFFF',
                borderRadius: '18px',
                padding: '14px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                gap: '12px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              {/* Item Image */}
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '12px',
                  objectFit: 'cover',
                  background: '#F1F5F9'
                }}
              />

              {/* Item Info */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0F172A', lineHeight: 1.3 }}>
                    {item.name}
                  </h3>
                  <button
                    onClick={() => removeCartItem(item.cartItemId)}
                    style={{ color: '#94A3B8', padding: '2px' }}
                    aria-label="Remove item"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Customizations display */}
                {item.selectedCustomizations && item.selectedCustomizations.length > 0 && (
                  <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '2px' }}>
                    + {item.selectedCustomizations.map((c) => c.name).join(', ')}
                  </div>
                )}

                {item.notes && (
                  <div style={{ fontSize: '0.7rem', color: '#EA580C', fontStyle: 'italic', marginTop: '2px' }}>
                    Note: "{item.notes}"
                  </div>
                )}

                {/* Bottom Row: Price & Quantity Controls */}
                <div style={{ marginTop: 'auto', paddingTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#FF5A1F' }}>
                    ${item.itemTotal.toFixed(2)}
                  </span>

                  {/* Qty Stepper */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: '#F1F5F9',
                      borderRadius: '10px',
                      padding: '2px'
                    }}
                  >
                    <button
                      onClick={() => updateCartItemQty(item.cartItemId, item.qty - 1)}
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '8px',
                        background: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0F172A',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                      }}
                      id={`cart-minus-${item.id}`}
                    >
                      <Minus size={13} />
                    </button>

                    <span style={{ width: '28px', textAlign: 'center', fontWeight: '700', fontSize: '0.85rem' }}>
                      {item.qty}
                    </span>

                    <button
                      onClick={() => updateCartItemQty(item.cartItemId, item.qty + 1)}
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '8px',
                        background: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0F172A',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                      }}
                      id={`cart-plus-${item.id}`}
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pickup Time Slot Selection */}
        <div style={{ background: '#FFFFFF', borderRadius: '18px', padding: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Clock size={16} color="#FF5A1F" />
            <h3 style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0F172A' }}>Estimated Pickup Schedule</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {pickupSlotsList.map((slot) => {
              const isSelected = pickupSlot === slot;
              return (
                <button
                  key={slot}
                  onClick={() => setPickupSlot(slot)}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '10px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    textAlign: 'center',
                    border: isSelected ? '1.5px solid #FF5A1F' : '1px solid #E2E8F0',
                    background: isSelected ? '#FFF7ED' : '#F8FAFC',
                    color: isSelected ? '#EA580C' : '#475569'
                  }}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        {/* Promo Code Box */}
        <div style={{ background: '#FFFFFF', borderRadius: '18px', padding: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Tag size={16} color="#10B981" />
            <h3 style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0F172A' }}>Campus Promo Code</h3>
          </div>

          {appliedPromo ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#ECFDF5',
                border: '1px solid #A7F3D0',
                padding: '10px 14px',
                borderRadius: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={16} color="#059669" />
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#065F46' }}>
                    Code: {appliedPromo.code}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#047857' }}>{appliedPromo.label}</div>
                </div>
              </div>
              <button onClick={removePromo} style={{ color: '#EF4444', fontSize: '0.75rem', fontWeight: '700' }}>
                Remove
              </button>
            </div>
          ) : (
            <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Enter promo (e.g. STUDENT10)"
                id="input-cart-promo"
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: '1.5px solid #E2E8F0',
                  background: '#F8FAFC',
                  fontSize: '0.85rem',
                  textTransform: 'uppercase'
                }}
              />
              <button
                type="submit"
                className="btn-secondary"
                style={{ padding: '10px 16px', fontSize: '0.85rem', fontWeight: '700' }}
                id="btn-apply-promo"
              >
                Apply
              </button>
            </form>
          )}

          {/* Quick coupon helper */}
          {!appliedPromo && (
            <div
              onClick={() => applyPromo('STUDENT10')}
              style={{
                marginTop: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.72rem',
                color: '#FF5A1F',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              <Sparkles size={12} /> Tap to apply 10% Campus Discount (STUDENT10)
            </div>
          )}
        </div>

        {/* Bill Summary */}
        <div style={{ background: '#FFFFFF', borderRadius: '18px', padding: '16px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0F172A', marginBottom: '12px' }}>
            Payment Breakdown
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
              <span>Item Subtotal ({cartItemCount} items)</span>
              <span style={{ fontWeight: '600', color: '#0F172A' }}>${cartSubtotal.toFixed(2)}</span>
            </div>

            {cartDiscount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669' }}>
                <span>Student Promo Discount</span>
                <span style={{ fontWeight: '700' }}>-${cartDiscount.toFixed(2)}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
              <span>Canteen Eco-Box Packaging Fee</span>
              <span style={{ fontWeight: '600', color: '#0F172A' }}>${packagingFee.toFixed(2)}</span>
            </div>

            <div style={{ height: '1px', background: '#E2E8F0', margin: '4px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: '800' }}>
              <span style={{ color: '#0F172A' }}>Total Amount</span>
              <span style={{ color: '#FF5A1F' }}>${cartGrandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Checkout Dock */}
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
          <span style={{ fontSize: '0.72rem', color: '#94A3B8', display: 'block' }}>Grand Total</span>
          <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A' }}>
            ${cartGrandTotal.toFixed(2)}
          </span>
        </div>

        <button
          onClick={() => navigateTo('checkout')}
          className="btn-primary"
          style={{ padding: '14px 28px', fontSize: '0.95rem' }}
          id="btn-proceed-checkout"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
