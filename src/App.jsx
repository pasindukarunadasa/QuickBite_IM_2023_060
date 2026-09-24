import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DeviceFrame } from './components/DeviceFrame';
import { SplashScreen } from './screens/SplashScreen';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { ItemDetailScreen } from './screens/ItemDetailScreen';
import { CartScreen } from './screens/CartScreen';
import { CheckoutScreen } from './screens/CheckoutScreen';
import { OrderConfirmationScreen } from './screens/OrderConfirmationScreen';
import { OrderTrackingScreen } from './screens/OrderTrackingScreen';
import { ProfileScreen } from './screens/ProfileScreen';

const MainScreenRouter = () => {
  const { currentScreen } = useApp();

  switch (currentScreen) {
    case 'splash':
      return <SplashScreen />;
    case 'login':
      return <LoginScreen />;
    case 'home':
      return <HomeScreen />;
    case 'item-detail':
      return <ItemDetailScreen />;
    case 'cart':
      return <CartScreen />;
    case 'checkout':
      return <CheckoutScreen />;
    case 'order-confirmation':
      return <OrderConfirmationScreen />;
    case 'order-tracking':
      return <OrderTrackingScreen />;
    case 'profile':
      return <ProfileScreen />;
    default:
      return <HomeScreen />;
  }
};

export function App() {
  return (
    <AppProvider>
      <DeviceFrame>
        <MainScreenRouter />
      </DeviceFrame>
    </AppProvider>
  );
}

export default App;
