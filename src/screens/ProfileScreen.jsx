import React, { useState } from 'react';
import {
  User,
  School,
  Wallet,
  Clock,
  Heart,
  ChevronRight,
  ShieldCheck,
  Plus,
  CreditCard,
  LogOut,
  RotateCcw,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MENU_ITEMS } from '../data/menuData';

export const ProfileScreen = () => {
  const { user, setUser, orders, topUpWallet, addToCart, navigateTo, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'favorites' | 'wallet'
  const [topUpAmount, setTopUpAmount] = useState(20);

  const favoriteItems = MENU_ITEMS.filter((m) => user.favorites?.includes(m.id));

  const handleReorder = (order) => {
    order.items?.forEach((it) => {
      const match = MENU_ITEMS.find((m) => m.name === it.name) || MENU_ITEMS[0];
      addToCart(match, it.qty || 1, [], '');
    });
    showToast(`Items from order ${order.id} added to cart! 🍔`, 'success');
    navigateTo('cart');
  };

  const handleLogout = () => {
    showToast('Logged out of student session', 'info');
    navigateTo('splash');
  };

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
      {/* Profile Top Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          color: 'white',
          padding: '24px 20px',
          borderBottomLeftRadius: '28px',
          borderBottomRightRadius: '28px',
          boxShadow: '0 10px 25px rgba(15,23,42,0.2)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #FF5A1F, #FF8A00)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.4rem',
              fontWeight: '800',
              boxShadow: '0 4px 15px rgba(255,90,31,0.4)',
              border: '2px solid rgba(255,255,255,0.2)'
            }}
          >
            {user.name ? user.name[0] : 'S'}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>{user.name}</h2>
              <span
                style={{
                  background: 'rgba(16,185,129,0.2)',
                  color: '#34D399',
                  fontSize: '0.65rem',
                  fontWeight: '700',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  border: '1px solid rgba(16,185,129,0.3)'
                }}
              >
                Active Student
              </span>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '2px' }}>
              ID: <strong style={{ color: '#38BDF8' }}>{user.studentId}</strong> • {user.email}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#CBD5E1', marginTop: '1px' }}>
              {user.faculty}
            </div>
          </div>
        </div>

        {/* SmartCard Wallet Banner Inside Profile */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '18px',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: '600' }}>
              CAMPUS SMARTCARD WALLET
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#FFFFFF', marginTop: '2px' }}>
              ${user.walletBalance.toFixed(2)}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => topUpWallet(10)}
              style={{
                background: 'rgba(255, 90, 31, 0.25)',
                border: '1px solid #FF5A1F',
                color: '#FF8A00',
                padding: '6px 12px',
                borderRadius: '10px',
                fontSize: '0.75rem',
                fontWeight: '700'
              }}
            >
              +$10
            </button>
            <button
              onClick={() => topUpWallet(25)}
              style={{
                background: 'linear-gradient(135deg, #FF5A1F, #FF7A00)',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '10px',
                fontSize: '0.75rem',
                fontWeight: '700',
                boxShadow: '0 2px 8px rgba(255,90,31,0.3)'
              }}
            >
              +$25 Reload
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div style={{ padding: '16px 16px 8px', display: 'flex', gap: '8px' }}>
        <button
          onClick={() => setActiveTab('orders')}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '12px',
            fontSize: '0.82rem',
            fontWeight: '700',
            textAlign: 'center',
            background: activeTab === 'orders' ? '#0F172A' : '#FFFFFF',
            color: activeTab === 'orders' ? '#FFFFFF' : '#475569',
            border: '1px solid #E2E8F0',
            boxShadow: activeTab === 'orders' ? '0 4px 10px rgba(15,23,42,0.15)' : 'none'
          }}
        >
          Order History ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '12px',
            fontSize: '0.82rem',
            fontWeight: '700',
            textAlign: 'center',
            background: activeTab === 'favorites' ? '#0F172A' : '#FFFFFF',
            color: activeTab === 'favorites' ? '#FFFFFF' : '#475569',
            border: '1px solid #E2E8F0',
            boxShadow: activeTab === 'favorites' ? '0 4px 10px rgba(15,23,42,0.15)' : 'none'
          }}
        >
          Favorites ({user.favorites.length})
        </button>
      </div>

      {/* Tab Content Area */}
      <div style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {activeTab === 'orders' && (
          <>
            {orders.length > 0 ? (
              orders.map((ord) => (
                <div
                  key={ord.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '18px',
                    padding: '16px',
                    border: '1px solid #E2E8F0',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '0.92rem', fontWeight: '800', color: '#0F172A' }}>
                        {ord.id}
                      </span>
                      <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '2px' }}>
                        {new Date(ord.placedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })} at {ord.estimatedPickupTime}
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: '700',
                        padding: '3px 10px',
                        borderRadius: '999px',
                        background:
                          ord.status === 'Completed'
                            ? '#F1F5F9'
                            : ord.status === 'Ready for pickup'
                            ? '#ECFDF5'
                            : '#FFFBEB',
                        color:
                          ord.status === 'Completed'
                            ? '#475569'
                            : ord.status === 'Ready for pickup'
                            ? '#059669'
                            : '#D97706',
                        border:
                          ord.status === 'Ready for pickup'
                            ? '1px solid #A7F3D0'
                            : '1px solid #E2E8F0'
                      }}
                    >
                      {ord.status}
                    </span>
                  </div>

                  {/* Items summary */}
                  <div style={{ fontSize: '0.8rem', color: '#475569', background: '#F8FAFC', padding: '10px 12px', borderRadius: '10px' }}>
                    {ord.items?.map((it, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                        <span>{it.qty}x {it.name}</span>
                        <span style={{ fontWeight: '600' }}>${(it.itemTotal || it.price * it.qty).toFixed(2)}</span>
                      </div>
                    ))}
                    <div style={{ height: '1px', background: '#E2E8F0', margin: '4px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', color: '#0F172A' }}>
                      <span>Total</span>
                      <span style={{ color: '#FF5A1F' }}>${ord.total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => navigateTo('order-tracking', { orderId: ord.id })}
                      className="btn-outline"
                      style={{ flex: 1, padding: '8px', fontSize: '0.78rem' }}
                    >
                      <Clock size={14} />
                      <span>Track Details</span>
                    </button>

                    <button
                      onClick={() => handleReorder(ord)}
                      className="btn-secondary"
                      style={{ flex: 1, padding: '8px', fontSize: '0.78rem' }}
                    >
                      <RotateCcw size={14} />
                      <span>Re-order</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '30px', color: '#94A3B8' }}>
                No past orders found.
              </div>
            )}
          </>
        )}

        {activeTab === 'favorites' && (
          <>
            {favoriteItems.length > 0 ? (
              favoriteItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '12px 14px',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '50px', height: '50px', borderRadius: '10px', objectFit: 'cover' }}
                    />
                    <div>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0F172A' }}>{item.name}</h4>
                      <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#FF5A1F' }}>
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(item, 1, [], '');
                    }}
                    className="btn-primary"
                    style={{ padding: '6px 14px', fontSize: '0.75rem' }}
                  >
                    <ShoppingBag size={14} /> Add
                  </button>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '30px', color: '#94A3B8' }}>
                No favorite meals saved yet. Tap the heart icon on any dish!
              </div>
            )}
          </>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            marginTop: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px',
            color: '#EF4444',
            fontSize: '0.85rem',
            fontWeight: '700',
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: '14px'
          }}
        >
          <LogOut size={16} /> Sign Out Student Account
        </button>
      </div>
    </div>
  );
};
