import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Star,
  Clock,
  Flame,
  Plus,
  Minus,
  ShoppingBag,
  Check,
  ShieldAlert,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ItemDetailScreen = () => {
  const { selectedItem, goBack, navigateTo, addToCart, user, toggleFavorite } = useApp();

  // If accessed directly without an item, return to home
  if (!selectedItem) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <p>No item selected.</p>
        <button onClick={goBack} className="btn-primary" style={{ marginTop: '12px' }}>
          Back to Menu
        </button>
      </div>
    );
  }

  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState([]);
  const [specialNotes, setSpecialNotes] = useState('');
  const isFav = user.favorites.includes(selectedItem.id);

  const toggleCustomization = (cust) => {
    setSelectedCustomizations((prev) => {
      const exists = prev.some((c) => c.name === cust.name);
      if (exists) {
        return prev.filter((c) => c.name !== cust.name);
      } else {
        return [...prev, cust];
      }
    });
  };

  const custTotal = selectedCustomizations.reduce((sum, c) => sum + c.price, 0);
  const unitPrice = selectedItem.price + custTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(selectedItem, quantity, selectedCustomizations, specialNotes);
    navigateTo('cart');
  };

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: '#FFFFFF',
        position: 'relative',
        overflowY: 'auto',
        paddingBottom: '90px'
      }}
      className="animate-fade-in"
    >
      {/* Top Banner Image with Floating Controls */}
      <div style={{ position: 'relative', width: '100%', height: '270px', background: '#0F172A' }}>
        <img
          src={selectedItem.image}
          alt={selectedItem.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%)'
          }}
        />

        {/* Back Button */}
        <button
          onClick={goBack}
          id="item-detail-back-btn"
          aria-label="Back"
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0F172A',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}
        >
          <ArrowLeft size={20} />
        </button>

        {/* Favorite Button */}
        <button
          onClick={() => toggleFavorite(selectedItem.id)}
          aria-label="Favorite"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isFav ? '#EF4444' : '#64748B',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}
        >
          <Heart size={20} fill={isFav ? '#EF4444' : 'none'} />
        </button>

        {/* Dietary & Calories Badges on Image */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap'
          }}
        >
          <span
            style={{
              background: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(6px)',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: '700',
              padding: '4px 10px',
              borderRadius: '999px'
            }}
          >
            🔥 {selectedItem.calories}
          </span>
          <span
            style={{
              background: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(6px)',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: '700',
              padding: '4px 10px',
              borderRadius: '999px'
            }}
          >
            ⚡ {selectedItem.prepTime}
          </span>
        </div>
      </div>

      {/* Main Details Body */}
      <div style={{ padding: '20px' }}>
        {/* Title and Rating Row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0F172A', lineHeight: 1.25 }}>
              {selectedItem.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F59E0B', fontWeight: '700', fontSize: '0.85rem' }}>
                <Star size={16} fill="#F59E0B" />
                <span>{selectedItem.rating}</span>
              </div>
              <span style={{ color: '#94A3B8', fontSize: '0.8rem' }}>•</span>
              <span style={{ color: '#64748B', fontSize: '0.8rem', fontWeight: '500' }}>
                {selectedItem.reviewsCount} student reviews
              </span>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#FF5A1F' }}>
              ${selectedItem.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.55, margin: '14px 0 20px' }}>
          {selectedItem.description}
        </p>

        {/* Ingredients Tags */}
        <div style={{ marginBottom: '22px' }}>
          <h3 style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>
            Fresh Ingredients
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {selectedItem.ingredients.map((ing, i) => (
              <span
                key={i}
                style={{
                  background: '#F1F5F9',
                  color: '#334155',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  padding: '4px 10px',
                  borderRadius: '8px'
                }}
              >
                {ing}
              </span>
            ))}
          </div>
        </div>

        {/* Customizations Add-ons */}
        {selectedItem.customizations && selectedItem.customizations.length > 0 && (
          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0F172A' }}>
                Customize Your Dish
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Optional</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selectedItem.customizations.map((cust, i) => {
                const isSelected = selectedCustomizations.some((c) => c.name === cust.name);
                return (
                  <div
                    key={i}
                    onClick={() => toggleCustomization(cust)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: isSelected ? '1.5px solid #FF5A1F' : '1px solid #E2E8F0',
                      background: isSelected ? '#FFF7ED' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '6px',
                          border: isSelected ? 'none' : '1.5px solid #CBD5E1',
                          background: isSelected ? '#FF5A1F' : 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white'
                        }}
                      >
                        {isSelected && <Check size={14} strokeWidth={3} />}
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#0F172A' }}>
                        {cust.name}
                      </span>
                    </div>

                    <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#FF5A1F' }}>
                      +${cust.price.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Special Instructions */}
        <div style={{ marginBottom: '22px' }}>
          <h3 style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>
            Special Cooking Instructions / Allergies
          </h3>
          <textarea
            value={specialNotes}
            onChange={(e) => setSpecialNotes(e.target.value)}
            placeholder="e.g. Extra napkins, sauce on the side, no onions..."
            rows={2}
            id="item-special-notes-input"
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '12px',
              border: '1.5px solid #E2E8F0',
              background: '#F8FAFC',
              fontSize: '0.85rem',
              color: '#0F172A',
              resize: 'none'
            }}
          />
        </div>
      </div>

      {/* Fixed Bottom Action Dock */}
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
          gap: '14px',
          zIndex: 30
        }}
      >
        {/* Quantity Stepper */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#F1F5F9',
            borderRadius: '14px',
            padding: '4px',
            border: '1px solid #E2E8F0'
          }}
        >
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            id="detail-qty-minus"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: quantity <= 1 ? '#CBD5E1' : '#0F172A',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <Minus size={16} />
          </button>

          <span
            id="detail-qty-value"
            style={{
              width: '36px',
              textAlign: 'center',
              fontWeight: '800',
              fontSize: '0.95rem',
              color: '#0F172A'
            }}
          >
            {quantity}
          </span>

          <button
            onClick={() => setQuantity(quantity + 1)}
            id="detail-qty-plus"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0F172A',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          className="btn-primary"
          style={{ flex: 1, padding: '14px 18px', fontSize: '0.95rem' }}
          onClick={handleAddToCart}
          id="detail-add-to-cart-btn"
        >
          <ShoppingBag size={18} />
          <span>Add to Cart • ${totalPrice.toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
};
