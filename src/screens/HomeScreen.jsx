import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  UtensilsCrossed,
  Soup,
  CupSoda,
  Pizza,
  Zap,
  MapPin,
  Clock,
  X,
  Flame,
  Leaf,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, MENU_ITEMS, CANTEEN_COUNTERS } from '../data/menuData';
import { FoodCard } from '../components/FoodCard';

export const HomeScreen = () => {
  const { user, navigateTo, activeOrder } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all' | 'veg' | 'spicy' | 'popular'
  const [sortBy, setSortBy] = useState('recommended'); // 'recommended' | 'price-low' | 'price-high' | 'time'

  // Dynamic Category Icon mapping
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Soup': return <Soup size={16} />;
      case 'CupSoda': return <CupSoda size={16} />;
      case 'Pizza': return <Pizza size={16} />;
      case 'Sparkles': return <Sparkles size={16} />;
      default: return <UtensilsCrossed size={16} />;
    }
  };

  // Filter and Sort items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(query));

      // Dietary filter match
      let matchDiet = true;
      if (dietaryFilter === 'veg') matchDiet = item.isVeg;
      if (dietaryFilter === 'spicy') matchDiet = item.isSpicy;
      if (dietaryFilter === 'popular') matchDiet = item.isPopular;

      return matchCat && matchSearch && matchDiet;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'time') {
        const timeA = parseInt(a.prepTime) || 10;
        const timeB = parseInt(b.prepTime) || 10;
        return timeA - timeB;
      }
      return b.rating - a.rating; // default recommended
    });
  }, [selectedCategory, searchQuery, dietaryFilter, sortBy]);

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 16px 80px',
        overflowY: 'auto'
      }}
      className="animate-fade-in"
    >
      {/* Top Welcome Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '0.78rem' }}>
            <MapPin size={14} color="#FF5A1F" />
            <span>Main Campus Food Plaza • Canteen #1</span>
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>
            Hi, {user.name ? user.name.split(' ')[0] : 'Student'}! 👋
          </h2>
        </div>

        {/* Student Wallet Pill */}
        <div
          onClick={() => navigateTo('profile')}
          style={{
            background: 'linear-gradient(135deg, #0F172A, #1E293B)',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(15,23,42,0.2)'
          }}
        >
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.62rem', color: '#94A3B8', fontWeight: '600' }}>SmartCard</div>
            <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#38BDF8' }}>
              ${user.walletBalance.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Active Order Banner if currently processing */}
      {activeOrder && (activeOrder.status === 'Placed' || activeOrder.status === 'Preparing' || activeOrder.status === 'Ready for pickup') && (
        <div
          onClick={() => navigateTo('order-tracking', { orderId: activeOrder.id })}
          style={{
            background: 'linear-gradient(135deg, #064E3B, #047857)',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '16px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            boxShadow: '0 6px 16px rgba(5,150,105,0.25)',
            border: '1px solid #10B981'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Clock size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#A7F3D0', fontWeight: '600' }}>
                Active Order {activeOrder.id} • {activeOrder.status}
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>
                Est. Pickup at {activeOrder.estimatedPickupTime}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: '700' }}>
            <span>Track</span>
            <ChevronRight size={16} />
          </div>
        </div>
      )}

      {/* Campus Special Promo Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #FF5A1F 0%, #FF8A00 100%)',
          borderRadius: '20px',
          padding: '16px 20px',
          color: 'white',
          marginBottom: '20px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 25px rgba(255,90,31,0.3)'
        }}
      >
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '230px' }}>
          <span
            style={{
              background: 'rgba(255,255,255,0.25)',
              backdropFilter: 'blur(4px)',
              fontSize: '0.68rem',
              fontWeight: '800',
              padding: '3px 8px',
              borderRadius: '999px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Daily Flash Offer ⚡
          </span>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '8px 0 4px', lineHeight: 1.2 }}>
            10% Off with code <span style={{ textDecoration: 'underline' }}>STUDENT10</span>
          </h3>
          <p style={{ fontSize: '0.78rem', opacity: 0.9 }}>
            Valid on all Lunch Bowls and Express Combos today!
          </p>
        </div>

        {/* Decorative Circle */}
        <div
          style={{
            position: 'absolute',
            right: '-15px',
            bottom: '-25px',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Search Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          background: '#FFFFFF',
          border: '1.5px solid #E2E8F0',
          borderRadius: '16px',
          padding: '10px 14px',
          gap: '10px',
          marginBottom: '16px',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <Search size={20} color="#94A3B8" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search burger, rice bowl, iced coffee..."
          id="search-menu-input"
          style={{
            flex: 1,
            border: 'none',
            background: 'transparent',
            color: '#0F172A',
            fontSize: '0.9rem'
          }}
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} style={{ color: '#94A3B8' }}>
            <X size={16} />
          </button>
        )}
      </div>

      {/* Categories Horizontal Scroll */}
      <div style={{ marginBottom: '16px' }}>
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '4px',
            scrollbarWidth: 'none'
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                id={`cat-filter-${cat.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '999px',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  whiteSpace: 'nowrap',
                  background: isActive ? '#0F172A' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#475569',
                  border: isActive ? '1px solid #0F172A' : '1px solid #E2E8F0',
                  boxShadow: isActive ? '0 4px 12px rgba(15,23,42,0.2)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {getCategoryIcon(cat.icon)}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dietary & Sorting Sub-Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
          gap: '8px',
          flexWrap: 'wrap'
        }}
      >
        {/* Dietary Pills */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setDietaryFilter(dietaryFilter === 'veg' ? 'all' : 'veg')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 10px',
              borderRadius: '8px',
              fontSize: '0.72rem',
              fontWeight: '700',
              background: dietaryFilter === 'veg' ? '#ECFDF5' : '#F1F5F9',
              color: dietaryFilter === 'veg' ? '#059669' : '#64748B',
              border: dietaryFilter === 'veg' ? '1px solid #A7F3D0' : '1px solid transparent'
            }}
          >
            <Leaf size={12} /> Veg Only
          </button>

          <button
            onClick={() => setDietaryFilter(dietaryFilter === 'spicy' ? 'all' : 'spicy')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 10px',
              borderRadius: '8px',
              fontSize: '0.72rem',
              fontWeight: '700',
              background: dietaryFilter === 'spicy' ? '#FEE2E2' : '#F1F5F9',
              color: dietaryFilter === 'spicy' ? '#DC2626' : '#64748B',
              border: dietaryFilter === 'spicy' ? '1px solid #FECACA' : '1px solid transparent'
            }}
          >
            <Flame size={12} /> Spicy
          </button>
        </div>

        {/* Sort selector */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          id="sort-menu-select"
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '4px 8px',
            fontSize: '0.75rem',
            fontWeight: '600',
            color: '#475569'
          }}
        >
          <option value="recommended">Sort: Top Rated ★</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="time">Fastest Prep Time ⚡</option>
        </select>
      </div>

      {/* Menu Item Grid */}
      {filteredItems.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '14px'
          }}
        >
          {filteredItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '40px 20px',
            background: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #E2E8F0'
          }}
        >
          <UtensilsCrossed size={40} color="#94A3B8" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#0F172A' }}>No dishes found</h3>
          <p style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '4px' }}>
            Try searching for something else or clear your dietary filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setDietaryFilter('all');
            }}
            className="btn-outline"
            style={{ margin: '14px auto 0', padding: '6px 14px', fontSize: '0.8rem' }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
