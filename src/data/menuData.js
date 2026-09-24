export const CATEGORIES = [
  { id: 'all', name: 'All Items', icon: 'UtensilsCrossed', count: 12 },
  { id: 'meals', name: 'Meals', icon: 'Soup', count: 4 },
  { id: 'beverages', name: 'Beverages', icon: 'CupSoda', count: 3 },
  { id: 'snacks', name: 'Snacks', icon: 'Pizza', count: 3 },
  { id: 'combos', name: 'Student Combos', icon: 'Sparkles', count: 2 },
];

export const MENU_ITEMS = [
  {
    id: 'm1',
    name: 'Spicy Crispy Chicken Rice Bowl',
    category: 'meals',
    price: 6.50,
    rating: 4.9,
    reviewsCount: 142,
    prepTime: '10-12 mins',
    calories: '650 kcal',
    isVeg: false,
    isSpicy: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    description: 'Golden crunchy fried chicken chunks served over fragrant jasmine rice with our signature sweet spicy chili sauce, pickled cucumber, and a sunny side egg.',
    ingredients: ['Crispy Chicken Thigh', 'Jasmine Rice', 'Chili Glaze', 'Egg', 'Sesame Seeds', 'Pickles'],
    customizations: [
      { name: 'Extra Fried Egg', price: 1.00 },
      { name: 'Extra Spicy Sauce', price: 0.50 },
      { name: 'Double Chicken (+50g)', price: 2.20 }
    ]
  },
  {
    id: 'm2',
    name: 'Cheesy Angus Smash Burger',
    category: 'meals',
    price: 7.20,
    rating: 4.8,
    reviewsCount: 210,
    prepTime: '8-10 mins',
    calories: '720 kcal',
    isVeg: false,
    isSpicy: false,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    description: 'Juicy 100% beef patty smashed on a flat grill, double melted cheddar, caramelized onions, house burger sauce in a toasted brioche bun.',
    ingredients: ['Angus Beef', 'Brioche Bun', 'Cheddar Cheese', 'Caramelized Onions', 'Secret Sauce'],
    customizations: [
      { name: 'Extra Cheddar Slice', price: 0.80 },
      { name: 'Add Crispy Bacon', price: 1.50 },
      { name: 'Gluten-Free Bun', price: 1.00 }
    ]
  },
  {
    id: 'm3',
    name: 'Paneer Tikka Fusion Wrap',
    category: 'meals',
    price: 5.80,
    rating: 4.7,
    reviewsCount: 98,
    prepTime: '7-9 mins',
    calories: '490 kcal',
    isVeg: true,
    isSpicy: true,
    isPopular: false,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    description: 'Marinated char-grilled paneer cubes, crisp bell peppers, mint yogurt chutney, and purple cabbage wrapped in a toasted whole wheat paratha.',
    ingredients: ['Cottage Cheese (Paneer)', 'Whole Wheat Wrap', 'Mint Chutney', 'Bell Peppers', 'Onions'],
    customizations: [
      { name: 'Extra Paneer', price: 1.80 },
      { name: 'Add Cheddar Cheese', price: 0.80 },
      { name: 'Spicy Gunpowder Dip', price: 0.50 }
    ]
  },
  {
    id: 'm4',
    name: 'Teriyaki Tofu Veggie Noodles',
    category: 'meals',
    price: 6.00,
    rating: 4.6,
    reviewsCount: 76,
    prepTime: '8-11 mins',
    calories: '510 kcal',
    isVeg: true,
    isSpicy: false,
    isPopular: false,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80',
    description: 'Wok-tossed ramen egg noodles with organic tofu cubes, bok choy, carrots, and mushrooms in our savory sweet teriyaki sauce.',
    ingredients: ['Egg Noodles', 'Tofu', 'Bok Choy', 'Mushrooms', 'Teriyaki Glaze', 'Sesame'],
    customizations: [
      { name: 'Extra Tofu', price: 1.20 },
      { name: 'Fried Egg Topping', price: 1.00 },
      { name: 'Extra Garlic Chili Oil', price: 0.50 }
    ]
  },
  {
    id: 'b1',
    name: 'Iced Matcha Vanilla Cloud Latte',
    category: 'beverages',
    price: 3.80,
    rating: 4.9,
    reviewsCount: 320,
    prepTime: '3-5 mins',
    calories: '180 kcal',
    isVeg: true,
    isSpicy: false,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
    description: 'Premium ceremonial Japanese Uji matcha shaken with oat milk, layered over ice and topped with a creamy vanilla sweet cold foam.',
    ingredients: ['Uji Matcha', 'Oat Milk', 'Vanilla Syrup', 'Sweet Cream Foam'],
    customizations: [
      { name: 'Oat Milk Sub (Free)', price: 0.00 },
      { name: 'Extra Matcha Shot', price: 1.00 },
      { name: 'Boba Pearls', price: 0.70 }
    ]
  },
  {
    id: 'b2',
    name: 'Fresh Mango Passion Smoothie',
    category: 'beverages',
    price: 4.20,
    rating: 4.8,
    reviewsCount: 165,
    prepTime: '4-6 mins',
    calories: '220 kcal',
    isVeg: true,
    isSpicy: false,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80',
    description: 'Fresh blended ripe mangoes, passion fruit pulp, Greek yogurt, and a drizzle of organic wildflower honey over crushed ice.',
    ingredients: ['Ripe Mango', 'Passionfruit', 'Greek Yogurt', 'Honey', 'Crushed Ice'],
    customizations: [
      { name: 'Chia Seeds Boost', price: 0.60 },
      { name: 'Protein Powder Scoop', price: 1.50 },
      { name: 'Almond Milk Base', price: 0.50 }
    ]
  },
  {
    id: 'b3',
    name: 'Campus Cold Brew Nitro Coffee',
    category: 'beverages',
    price: 3.50,
    rating: 4.7,
    reviewsCount: 190,
    prepTime: '2-3 mins',
    calories: '15 kcal',
    isVeg: true,
    isSpicy: false,
    isPopular: false,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    description: '18-hour slow steeped single-origin Arabica coffee beans served chilled with rich caramel notes and a velvety crema finish.',
    ingredients: ['Single-Origin Arabica', 'Filtered Spring Water', 'Ice'],
    customizations: [
      { name: 'Caramel Syrup Pump', price: 0.50 },
      { name: 'Hazelnut Syrup', price: 0.50 },
      { name: 'Splash of Sweet Cream', price: 0.50 }
    ]
  },
  {
    id: 's1',
    name: 'Loaded Cheesy Beef Nachos',
    category: 'snacks',
    price: 4.90,
    rating: 4.9,
    reviewsCount: 280,
    prepTime: '5-7 mins',
    calories: '580 kcal',
    isVeg: false,
    isSpicy: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80',
    description: 'Crisp stone-ground corn tortilla chips baked with warm queso cheese sauce, seasoned minced beef, jalapenos, sour cream, and fresh pico de gallo.',
    ingredients: ['Tortilla Chips', 'Queso Dip', 'Minced Beef', 'Jalapenos', 'Pico de Gallo', 'Sour Cream'],
    customizations: [
      { name: 'Extra Guacamole', price: 1.20 },
      { name: 'Extra Sour Cream', price: 0.60 },
      { name: 'Spicy Habanero Drizzle', price: 0.40 }
    ]
  },
  {
    id: 's2',
    name: 'Golden Crispy Fries & Truffle Mayo',
    category: 'snacks',
    price: 3.20,
    rating: 4.7,
    reviewsCount: 145,
    prepTime: '4-5 mins',
    calories: '380 kcal',
    isVeg: true,
    isSpicy: false,
    isPopular: false,
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80',
    description: 'Double-fried hand cut potato fries dusted with sea salt, rosemary herbs, served with rich garlic truffle mayonnaise.',
    ingredients: ['Russet Potatoes', 'Rosemary Salt', 'Truffle Mayo', 'Parsley'],
    customizations: [
      { name: 'Cheese Dip Cup', price: 0.80 },
      { name: 'Spicy Peri-Peri Seasoning', price: 0.30 },
      { name: 'Large Size Upgrade', price: 1.00 }
    ]
  },
  {
    id: 's3',
    name: 'Crispy Honey Mustard Chicken Bites',
    category: 'snacks',
    price: 4.50,
    rating: 4.8,
    reviewsCount: 110,
    prepTime: '6-8 mins',
    calories: '440 kcal',
    isVeg: false,
    isSpicy: false,
    isPopular: false,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
    description: 'Bite-sized buttermilk soaked chicken breasts fried to golden perfection, served with sweet tang homemade honey mustard dipping sauce.',
    ingredients: ['Buttermilk Chicken', 'Crispy Coating', 'Honey Mustard Sauce', 'Chives'],
    customizations: [
      { name: 'Extra Honey Mustard Dip', price: 0.50 },
      { name: 'BBQ Ranch Dip', price: 0.50 },
      { name: 'Spicy Buffalo Toss', price: 0.60 }
    ]
  },
  {
    id: 'c1',
    name: 'QuickBite Saver Combo (Burger + Fries + Drink)',
    category: 'combos',
    price: 9.99,
    rating: 5.0,
    reviewsCount: 450,
    prepTime: '8-10 mins',
    calories: '980 kcal',
    isVeg: false,
    isSpicy: false,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=600&q=80',
    description: 'The ultimate student lunch deal! 1x Angus Smash Burger + 1x Golden Fries + 1x Cold Brew Coffee or Soda. Save $3.90!',
    ingredients: ['Angus Burger', 'Golden Fries', 'Choice of Drink'],
    customizations: [
      { name: 'Upgrade to Truffle Fries', price: 0.80 },
      { name: 'Upgrade to Matcha Latte', price: 0.80 },
      { name: 'Double Burger Patty', price: 2.00 }
    ]
  },
  {
    id: 'c2',
    name: 'Exam Fuel Bento (Rice Bowl + Smoothie)',
    category: 'combos',
    price: 8.90,
    rating: 4.9,
    reviewsCount: 220,
    prepTime: '10-12 mins',
    calories: '860 kcal',
    isVeg: false,
    isSpicy: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80',
    description: 'High energy combo packed with protein! 1x Spicy Chicken Rice Bowl + 1x Fresh Mango Passion Smoothie.',
    ingredients: ['Spicy Chicken Bowl', 'Mango Passion Smoothie'],
    customizations: [
      { name: 'Extra Egg', price: 1.00 },
      { name: 'Chia Seeds in Smoothie', price: 0.60 }
    ]
  }
];

export const CANTEEN_COUNTERS = [
  { id: 'counter-a', name: 'Counter A - Hot Meals & Bowls', waitTime: '8-12 min', status: 'Fast' },
  { id: 'counter-b', name: 'Counter B - Beverages & Bakery', waitTime: '3-5 min', status: 'Quick' },
  { id: 'counter-c', name: 'Counter C - Express Snacks & Grab', waitTime: '5-7 min', status: 'Normal' },
];

export const PROMO_CODES = {
  'STUDENT10': { discountPercent: 10, label: '10% Campus Student Discount' },
  'EXAMBITE': { discountFlat: 2.00, label: '$2.00 Exam Season Fuel' },
  'FIRSTFREE': { discountFlat: 3.50, label: '$3.50 Welcome Canteen Voucher' },
};
