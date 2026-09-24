import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MENU_ITEMS, PROMO_CODES, CANTEEN_COUNTERS } from '../data/menuData';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [screenHistory, setScreenHistory] = useState(['splash']);
  const [selectedItem, setSelectedItem] = useState(null);

  // User State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('quickbite_user');
    return saved ? JSON.parse(saved) : {
      name: 'Pasindu Maduranga',
      studentId: 'IM/2023/060',
      email: 'Pasindu.im2023060@univ.edu',
      phone: '+94 70 2345678',
      faculty: 'Faculty of Science',
      walletBalance: 45.50,
      isLoggedIn: true,
      favorites: ['m1', 'b1', 'c1']
    };
  });

  // Cart State
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('quickbite_cart');
    return saved ? JSON.parse(saved) : [
      {
        id: 'm1',
        cartItemId: 'm1_default',
        name: 'Spicy Crispy Chicken Rice Bowl',
        price: 6.50,
        qty: 1,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
        selectedCustomizations: [{ name: 'Extra Fried Egg', price: 1.00 }],
        notes: 'Less spicy please',
        unitPrice: 7.50,
        itemTotal: 7.50
      },
      {
        id: 'b1',
        cartItemId: 'b1_default',
        name: 'Iced Matcha Vanilla Cloud Latte',
        price: 3.80,
        qty: 1,
        image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
        selectedCustomizations: [],
        notes: '',
        unitPrice: 3.80,
        itemTotal: 3.80
      }
    ];
  });

  const [appliedPromo, setAppliedPromo] = useState(null);
  const [pickupSlot, setPickupSlot] = useState('Immediate (10-15 mins)');
  const [selectedCounter, setSelectedCounter] = useState(CANTEEN_COUNTERS[0].id);

  // Orders State
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('quickbite_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'QB-9104',
        placedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        items: [
          { name: 'Cheesy Angus Smash Burger', qty: 2, price: 7.20 },
          { name: 'Campus Cold Brew Nitro Coffee', qty: 1, price: 3.50 }
        ],
        subtotal: 17.90,
        discount: 1.79,
        packagingFee: 0.50,
        total: 16.61,
        status: 'Completed', // Placed -> Preparing -> Ready for pickup -> Completed
        estimatedPickupTime: '12:45 PM',
        pickupCounter: 'Counter A - Hot Meals & Bowls',
        paymentMethod: 'Campus SmartCard'
      }
    ];
  });

  const [activeOrderId, setActiveOrderId] = useState(null);

  // UI State: device preview mode ('phone' | 'tablet' | 'desktop')
  const [deviceMode, setDeviceMode] = useState('phone');
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('quickbite_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('quickbite_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('quickbite_orders', JSON.stringify(orders));
  }, [orders]);

  // Toast Notification helper
  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage((prev) => (prev?.message === message ? null : prev));
    }, 3500);
  };

  // Screen Navigation
  const navigateTo = (screen, params = null) => {
    if (params?.item) {
      setSelectedItem(params.item);
    }
    if (params?.orderId) {
      setActiveOrderId(params.orderId);
    }
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop();
      const prevScreen = newHistory[newHistory.length - 1];
      setScreenHistory(newHistory);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('home');
    }
  };

  // Cart Management
  const addToCart = (item, quantity = 1, selectedCustomizations = [], notes = '') => {
    const custTotal = selectedCustomizations.reduce((sum, c) => sum + c.price, 0);
    const unitPrice = item.price + custTotal;
    const cartItemId = `${item.id}_${Date.now()}`;

    const newCartItem = {
      id: item.id,
      cartItemId,
      name: item.name,
      price: item.price,
      qty: quantity,
      image: item.image,
      selectedCustomizations,
      notes,
      unitPrice,
      itemTotal: unitPrice * quantity
    };

    setCart((prev) => [...prev, newCartItem]);
    showToast(`Added ${quantity}x "${item.name}" to cart! 🍔`, 'success');
  };

  const updateCartItemQty = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeCartItem(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, qty: newQty, itemTotal: item.unitPrice * newQty }
          : item
      )
    );
  };

  const removeCartItem = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart Calculations
  const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.itemTotal, 0);

  let cartDiscount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountPercent) {
      cartDiscount = (cartSubtotal * appliedPromo.discountPercent) / 100;
    } else if (appliedPromo.discountFlat) {
      cartDiscount = Math.min(cartSubtotal, appliedPromo.discountFlat);
    }
  }

  const packagingFee = cart.length > 0 ? 0.50 : 0;
  const cartGrandTotal = Math.max(0, cartSubtotal - cartDiscount + packagingFee);

  const applyPromo = (codeStr) => {
    const cleanCode = codeStr.trim().toUpperCase();
    if (PROMO_CODES[cleanCode]) {
      setAppliedPromo({ code: cleanCode, ...PROMO_CODES[cleanCode] });
      showToast(`Promo "${cleanCode}" applied successfully! 🎉`, 'success');
      return { success: true, message: 'Promo applied!' };
    } else {
      showToast('Invalid promo code. Try "STUDENT10"', 'error');
      return { success: false, message: 'Invalid promo code' };
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    showToast('Promo code removed', 'info');
  };

  // Place Order Simulation
  const placeOrder = (paymentMethod = 'Campus SmartCard') => {
    if (cart.length === 0) {
      showToast('Your cart is empty!', 'error');
      return null;
    }

    if (paymentMethod === 'Campus SmartCard' && user.walletBalance < cartGrandTotal) {
      showToast('Insufficient SmartCard balance! Please top up.', 'error');
      return null;
    }

    const orderNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `QB-${orderNum}`;

    // Calculate pickup time 12 mins ahead
    const now = new Date();
    const pickupDate = new Date(now.getTime() + 15 * 60000);
    const timeString = pickupDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const counterObj = CANTEEN_COUNTERS.find((c) => c.id === selectedCounter) || CANTEEN_COUNTERS[0];

    const newOrder = {
      id: orderId,
      placedAt: new Date().toISOString(),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      packagingFee,
      total: cartGrandTotal,
      status: 'Placed', // Step 1: Placed -> Step 2: Preparing -> Step 3: Ready for pickup -> Step 4: Completed
      estimatedPickupTime: timeString,
      pickupSlot,
      pickupCounter: counterObj.name,
      paymentMethod,
      studentName: user.name,
      studentId: user.studentId
    };

    // Deduct wallet if paid via smart card
    if (paymentMethod === 'Campus SmartCard') {
      setUser((prev) => ({
        ...prev,
        walletBalance: parseFloat((prev.walletBalance - cartGrandTotal).toFixed(2))
      }));
    }

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrderId(orderId);
    clearCart();
    setAppliedPromo(null);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }

    showToast(`Order ${orderId} placed successfully! 🎉`, 'success');
    navigateTo('order-confirmation', { orderId });
    return newOrder;
  };

  // Advance Order Status (for testing & live simulation)
  const advanceOrderStatus = (orderId, targetStatus = null) => {
    const statusFlow = ['Placed', 'Preparing', 'Ready for pickup', 'Completed'];

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          let nextStatus = targetStatus;
          if (!nextStatus) {
            const currentIdx = statusFlow.indexOf(ord.status);
            if (currentIdx < statusFlow.length - 1) {
              nextStatus = statusFlow[currentIdx + 1];
            } else {
              nextStatus = 'Completed';
            }
          }
          return { ...ord, status: nextStatus };
        }
        return ord;
      })
    );
  };

  // Toggle Favorite Item
  const toggleFavorite = (itemId) => {
    setUser((prev) => {
      const exists = prev.favorites.includes(itemId);
      const newFavs = exists
        ? prev.favorites.filter((id) => id !== itemId)
        : [...prev.favorites, itemId];
      showToast(exists ? 'Removed from favorites' : 'Saved to favorites ❤️', 'info');
      return { ...prev, favorites: newFavs };
    });
  };

  // Top up Student SmartCard Wallet
  const topUpWallet = (amount) => {
    setUser((prev) => ({
      ...prev,
      walletBalance: parseFloat((prev.walletBalance + amount).toFixed(2))
    }));
    showToast(`Added $${amount.toFixed(2)} to SmartCard Wallet! 💳`, 'success');
  };

  // Active Order object helper
  const activeOrder = orders.find((o) => o.id === activeOrderId) || orders[0] || null;

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        screenHistory,
        navigateTo,
        goBack,
        selectedItem,
        setSelectedItem,
        user,
        setUser,
        cart,
        addToCart,
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
        selectedCounter,
        setSelectedCounter,
        orders,
        activeOrderId,
        setActiveOrderId,
        activeOrder,
        placeOrder,
        advanceOrderStatus,
        toggleFavorite,
        topUpWallet,
        deviceMode,
        setDeviceMode,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
