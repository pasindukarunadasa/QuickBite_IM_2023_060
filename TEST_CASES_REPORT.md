# QuickBite – Campus Food Ordering Mobile Application
## Comprehensive Software Testing & Verification Report

---

### **Student & Course Details**
- **Course Module:** Cross-Platform Mobile App Development & Testing
- **Assignment:** In-Class Activity Sheet – Case Study: "QuickBite"
- **Student ID:** `IM/2023/060`
- **Application Version:** `v1.0.0 (MVP Prototype)`
- **Technology Stack:** React & Node.js ecosystem, Context API, Lucide Icons, Responsive Web & Mobile Simulation
- **Date of Execution:** September 24, 2026
- **Test Status:** **100% Passed (6 / 6 Test Cases Passed)**

---

## 1. Executive Summary & Objective

The objective of this testing activity is to validate the functional and non-functional requirements of the **QuickBite** campus food ordering application. QuickBite is designed to allow university students to browse the canteen menu, order meals ahead of lecture breaks, customize dishes, make payments via Campus SmartCard or Cash, and track the preparation lifecycle in real time to eliminate physical queue times.

Testing encompasses:
1. **Navigation Flow & Route State Preservation**
2. **Dynamic Cart Math & Promo Discount Engine**
3. **Item Customization & Quantity Bounds**
4. **Checkout Form Validation & SmartCard Wallet Logic**
5. **Live Order Status Progression Lifecycle (State Machine)**
6. **Cross-Platform Responsive Viewport Adaptability**

---

## 2. Test Execution Matrix Summary

| Test ID | Test Category | Test Case Description | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-01** | Navigation & State | Screen flow: Splash ➔ Login ➔ Home ➔ Detail ➔ Cart ➔ Checkout ➔ Tracking | Seamless transitions, cart and user state preserved across routes | State preserved across all screen transitions | **PASS** |
| **TC-02** | Cart Logic & Math | Subtotal calculation, item quantity modifiers, and `STUDENT10` promo code | Accurate subtotal $\sum(\text{price} \times \text{qty})$, 10% discount, $0.50 packaging fee | Math verified with exact precision | **PASS** |
| **TC-03** | Form & Input Validation | Add-on checkboxes, special cooking notes, and quantity selector limits | Add-ons adjust item price dynamically; quantity bounded $[1..99]$ | Reacts instantly to selections with bound limits | **PASS** |
| **TC-04** | Business Logic | Campus SmartCard wallet deduction & counter pickup selection | Order generated with ID (`#QB-XXXX`); wallet deducted on checkout | Correct order generated & balance updated | **PASS** |
| **TC-05** | State Machine | Order status lifecycle: `Placed` ➔ `Preparing` ➔ `Ready` ➔ `Completed` | Step tracker advances with pickup counter and time badge updates | Smooth 4-stage progression verified | **PASS** |
| **TC-06** | UI & Responsiveness | Cross-platform responsiveness (Phone 390px, Tablet 768px, Desktop) | Fluid layout with no element overlaps or horizontal scroll errors | Layouts adapt cleanly across all viewports | **PASS** |

---

## 3. Detailed Test Case Specifications & Logs

---

### **Test Case 1: Navigation Flow & State Preservation**
- **Test ID:** `TC-01`
- **Module:** Screen Navigation & Global State Router
- **Preconditions:** App is launched on the device/browser.
- **Test Steps:**
  1. Launch the app and view the **Splash Screen**.
  2. Click **"Get Started"** to navigate to the **Login Screen**.
  3. Authenticate with student credentials (`IM/2023/060`) and navigate to the **Home Screen**.
  4. Add an item to the cart, then navigate between **Home**, **Cart**, **Order Tracker**, and **Profile** using the bottom navigation bar.
  5. Verify that cart item count badges and selected items remain intact.
- **Expected Result:**
  - Transitions complete smoothly in $< 1.0\text{s}$.
  - State does not reset when navigating across screens.
- **Actual Result:**
  - Navigation operates instantly; Cart state persists in React Context and `localStorage`.
- **Verdict:** **PASS**

---

### **Test Case 2: Cart Subtotal & Promotional Discount Engine**
- **Test ID:** `TC-02`
- **Module:** Cart Management & Pricing Logic
- **Preconditions:** User is on the Home Screen with menu items available.
- **Test Steps:**
  1. Add 1x **"Spicy Crispy Chicken Rice Bowl"** ($\$6.50$) with an **Extra Fried Egg** add-on ($+\$1.00$) = $\$7.50$.
  2. Add 1x **"Iced Matcha Vanilla Cloud Latte"** ($\$3.80$).
  3. Navigate to **Cart Screen**; verify item subtotal is $\$7.50 + \$3.80 = \$11.30$.
  4. Increase Matcha Latte quantity from 1 to 2; verify new subtotal is $\$7.50 + \$7.60 = \$15.10$.
  5. Enter promo code `STUDENT10` and click **"Apply"**.
  6. Verify $10\%$ discount ($-\$1.51$) is deducted, packaging fee ($+\$0.50$) is applied, yielding Grand Total $= \$14.09$.
- **Expected Result:**
  - Dynamic math calculation: $\text{Grand Total} = \text{Subtotal} - \text{Discount} + \text{Packaging Fee}$.
- **Actual Result:**
  - Calculation accurately outputs $\$14.09$. Badge updates dynamically in real time.
- **Verdict:** **PASS**

---

### **Test Case 3: Item Customization & Quantity Bounds Validation**
- **Test ID:** `TC-03`
- **Module:** Item Detail Screen & Form Controls
- **Preconditions:** User taps any food item from the Home menu grid.
- **Test Steps:**
  1. Select **"Cheesy Angus Smash Burger"** ($\$7.20$).
  2. Toggle **"Extra Cheddar Slice"** ($+\$0.80$) checkbox on and off; observe unit price updating between $\$7.20$ and $\$8.00$.
  3. Type special instructions: *"Sauce on the side, please"*.
  4. Decrement quantity below 1 using the `[-]` button; verify quantity does not drop below 1 (disabled state).
  5. Increment quantity to 3; verify live action button updates to *"Add to Cart • $24.00"*.
  6. Click **"Add to Cart"** and verify confirmation toast.
- **Expected Result:**
  - Customizations calculate reactively; input notes are attached to cart item metadata; quantity minimum is clamped at 1.
- **Actual Result:**
  - Checkboxes react instantly; minimum bound strictly enforced at 1; note persisted to order payload.
- **Verdict:** **PASS**

---

### **Test Case 4: SmartCard Wallet Deduction & Checkout Validation**
- **Test ID:** `TC-04`
- **Module:** Checkout & Campus SmartCard Payment
- **Preconditions:** Cart contains at least 1 item; User wallet has $\$45.50$ balance.
- **Test Steps:**
  1. From Cart, click **"Proceed to Checkout"**.
  2. Verify student registration details are displayed (`Name: Alexander Chen`, `ID: IM/2023/060`).
  3. Select **"Counter A - Hot Meals & Bowls"** as the pickup location.
  4. Select **"Campus SmartCard"** as payment method.
  5. Click **"Place Order"**.
  6. Verify redirection to **Order Confirmation Screen** with a generated Order Token (`#QB-XXXX`), estimated pickup time (15 mins ahead), and collection QR code.
  7. Check **Profile Screen** to confirm SmartCard balance decreased by the exact order total.
- **Expected Result:**
  - Order token is generated, confetti animation triggers, and wallet balance is decremented accurately.
- **Actual Result:**
  - Wallet balance deducted accurately; order persisted in history.
- **Verdict:** **PASS**

---

### **Test Case 5: Order Status Progression Lifecycle (State Machine)**
- **Test ID:** `TC-05`
- **Module:** Live Order Tracker & Kitchen Queue Simulator
- **Preconditions:** Order has been placed and is currently in `Placed` status.
- **Test Steps:**
  1. Open the **Order Tracking Screen** for the active order.
  2. Verify initial active step is **"Order Received & Placed"** with a blue status badge.
  3. Click the simulation button **"Next Stage ➔"**; verify step transitions to **"In Kitchen / Cooking"** with cooking animation and amber badge.
  4. Click **"Next Stage ➔"** again; verify transition to **"Ready for Collection"** with green pulsing border and counter notification.
  5. Click **"Next Stage ➔"** to mark as **"Picked Up & Enjoyed (Completed)"**.
- **Expected Result:**
  - Step transitions sequentially through the 4 states without skipping; visual progress bar fills proportionally.
- **Actual Result:**
  - All status states transition smoothly with corresponding badges and guidance text.
- **Verdict:** **PASS**

---

### **Test Case 6: Cross-Platform Viewport Responsiveness**
- **Test ID:** `TC-06`
- **Module:** Responsive Layout & Device Shell
- **Preconditions:** Application running in browser.
- **Test Steps:**
  1. Switch device toggle to **"Phone"** (Mobile 390px viewport with notch island). Verify all buttons, bottom navigation tabs, and food cards fit without horizontal scroll.
  2. Switch device toggle to **"Tablet"** (768px viewport). Verify menu cards expand into a multi-column responsive grid.
  3. Switch device toggle to **"Full Web"** (Desktop viewport). Verify layout centers cleanly with sticky navigation and enhanced card density.
- **Expected Result:**
  - Fluid responsive scaling across mobile, tablet, and desktop screens with zero element overlap or clipping.
- **Actual Result:**
  - Layout adapts smoothly across all screen widths.
- **Verdict:** **PASS**

---

## 4. Key Code Architecture & Implementation Highlights

### 1. Persistent Global State Management (`src/context/AppContext.jsx`)
```javascript
// Centralized React Context with LocalStorage persistence
export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('quickbite_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('quickbite_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Dynamic calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.itemTotal, 0);
  const packagingFee = cart.length > 0 ? 0.50 : 0;
  const cartGrandTotal = Math.max(0, cartSubtotal - cartDiscount + packagingFee);
  ...
};
```

### 2. Live Order State Machine Progression
```javascript
// Status transition flow simulation
const advanceOrderStatus = (orderId, targetStatus = null) => {
  const statusFlow = ['Placed', 'Preparing', 'Ready for pickup', 'Completed'];
  setOrders(prev => prev.map(ord => {
    if (ord.id === orderId) {
      const currentIdx = statusFlow.indexOf(ord.status);
      const nextStatus = targetStatus || statusFlow[Math.min(currentIdx + 1, statusFlow.length - 1)];
      return { ...ord, status: nextStatus };
    }
    return ord;
  }));
};
```

---

## 5. Conclusion

All **6 designated test cases** have been executed and verified. The **QuickBite** MVP satisfies all functional requirements (Splash, Login, Home menu, Item Detail, Cart, Checkout, Confirmation, Tracking, Profile) and non-functional requirements (cross-platform responsiveness, 1-2s transition speeds, persistent state).
