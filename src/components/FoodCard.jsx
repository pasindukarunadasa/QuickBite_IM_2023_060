import React from 'react';
import { Plus, Star, Flame, Clock, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FoodCard = ({ item }) => {
  const { navigateTo, addToCart, user, toggleFavorite } = useApp();
  const isFav = user.favorites.includes(item.id);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(item, 1, [], '');
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(item.id);
  };

  return (
    <div
      className="food-card"
      onClick={() => navigateTo('item-detail', { item })}
      id={`food-card-${item.id}`}
      style={{
        background: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      }}
    >
      {/* Image Container */}
      <div style={{ position: 'relative', width: '100%', height: '145px', overflow: 'hidden', background: '#F1F5F9' }}>
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
          }}
          loading="lazy"
        />

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          aria-label="Toggle Favorite"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isFav ? '#EF4444' : '#64748B',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          }}
        >
          <Heart size={16} fill={isFav ? '#EF4444' : 'none'} />
        </button>

        {/* Popular / Spicy / Veg Badges */}
        <div style={{ position: 'absolute', bottom: '8px', left: '8px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {item.isPopular && (
            <span
              style={{
                background: 'linear-gradient(135deg, #FF5A1F, #FF8A00)',
                color: 'white',
                fontSize: '0.65rem',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: '999px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              Popular 🔥
            </span>
          )}
          {item.isSpicy && (
            <span
              style={{
                background: '#FEE2E2',
                color: '#DC2626',
                fontSize: '0.65rem',
                fontWeight: '700',
                padding: '2px 6px',
                borderRadius: '999px',
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
              }}
            >
              <Flame size={10} /> Spicy
            </span>
          )}
          {item.isVeg && (
            <span
              style={{
                background: '#ECFDF5',
                color: '#059669',
                fontSize: '0.65rem',
                fontWeight: '700',
                padding: '2px 6px',
                borderRadius: '999px',
              }}
            >
              🌱 Veg
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: '700', color: '#0F172A' }}>
            <Star size={13} fill="#F59E0B" color="#F59E0B" />
            <span>{item.rating}</span>
            <span style={{ color: '#94A3B8', fontWeight: '500' }}>({item.reviewsCount})</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.7rem', color: '#64748B', fontWeight: '500' }}>
            <Clock size={12} />
            <span>{item.prepTime}</span>
          </div>
        </div>

        <h3
          style={{
            fontSize: '0.95rem',
            fontWeight: '700',
            color: '#0F172A',
            marginBottom: '4px',
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {item.name}
        </h3>

        <p
          style={{
            fontSize: '0.75rem',
            color: '#64748B',
            marginBottom: '12px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.35,
          }}
        >
          {item.description}
        </p>

        {/* Bottom Price & Add to Cart Button */}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.7rem', color: '#94A3B8', display: 'block' }}>Campus Price</span>
            <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#FF5A1F' }}>
              ${item.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            id={`quick-add-${item.id}`}
            aria-label={`Add ${item.name} to cart`}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #FF5A1F, #FF7A00)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 3px 10px rgba(255, 90, 31, 0.35)',
              transition: 'transform 0.15s ease, background 0.15s ease',
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.92)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Plus size={18} strokeWidth={2.8} />
          </button>
        </div>
      </div>
    </div>
  );
};
