import React from 'react';
import { Home, ShoppingBag, Clock, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BottomNav = () => {
  const { currentScreen, navigateTo, cartItemCount, orders } = useApp();

  // Hide bottom nav on splash and login screens
  if (currentScreen === 'splash' || currentScreen === 'login') {
    return null;
  }

  const activeOrdersCount = orders.filter(
    (o) => o.status === 'Placed' || o.status === 'Preparing' || o.status === 'Ready for pickup'
  ).length;

  return (
    <nav className="app-bottom-nav">
      <button
        className={`bottom-nav-item ${currentScreen === 'home' ? 'active' : ''}`}
        onClick={() => navigateTo('home')}
        id="nav-btn-home"
      >
        <div className="nav-icon-wrap">
          <Home size={22} strokeWidth={currentScreen === 'home' ? 2.5 : 1.8} />
        </div>
        <span>Menu</span>
      </button>

      <button
        className={`bottom-nav-item ${currentScreen === 'cart' ? 'active' : ''}`}
        onClick={() => navigateTo('cart')}
        id="nav-btn-cart"
      >
        <div className="nav-icon-wrap" style={{ position: 'relative' }}>
          <ShoppingBag size={22} strokeWidth={currentScreen === 'cart' ? 2.5 : 1.8} />
          {cartItemCount > 0 && (
            <span className="nav-badge-pill" id="cart-badge-count">{cartItemCount}</span>
          )}
        </div>
        <span>Cart</span>
      </button>

      <button
        className={`bottom-nav-item ${
          currentScreen === 'order-tracking' || currentScreen === 'order-confirmation' ? 'active' : ''
        }`}
        onClick={() => navigateTo('order-tracking')}
        id="nav-btn-orders"
      >
        <div className="nav-icon-wrap" style={{ position: 'relative' }}>
          <Clock size={22} strokeWidth={currentScreen === 'order-tracking' ? 2.5 : 1.8} />
          {activeOrdersCount > 0 && (
            <span
              className="nav-badge-pill"
              style={{ background: 'var(--accent-green)', color: 'white' }}
            >
              {activeOrdersCount}
            </span>
          )}
        </div>
        <span>Track</span>
      </button>

      <button
        className={`bottom-nav-item ${currentScreen === 'profile' ? 'active' : ''}`}
        onClick={() => navigateTo('profile')}
        id="nav-btn-profile"
      >
        <div className="nav-icon-wrap">
          <User size={22} strokeWidth={currentScreen === 'profile' ? 2.5 : 1.8} />
        </div>
        <span>Profile</span>
      </button>
    </nav>
  );
};
