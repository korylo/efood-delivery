import { useState } from 'react';
import Home from './Components/Home/Home';
import Restaurant from './Components/Restaurant/Restaurant';
import Cart from './Components/Cart/Cart';
import Delivery from './pages/Delivery';
import Payment from './pages/Payment';
import Confirmation from './pages/Confirmation';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <Home onSelectRestaurant={(rest) => {
          setSelectedRestaurant(rest);
          setCurrentPage('restaurant');
        }} />;
      case 'restaurant':
        return <Restaurant 
          restaurant={selectedRestaurant} 
          onBack={() => setCurrentPage('home')}
          onOpenCart={() => setCurrentPage('cart')}
        />;
      case 'cart':
        return <Cart 
          onBack={() => setCurrentPage('restaurant')}
          onCheckout={() => setCurrentPage('delivery')}
        />;
      case 'delivery':
        return <Delivery 
          onBack={() => setCurrentPage('cart')}
          onContinue={() => setCurrentPage('payment')}
        />;
      case 'payment':
        return <Payment 
          onBack={() => setCurrentPage('delivery')}
          onConfirm={() => setCurrentPage('confirmation')}
        />;
      case 'confirmation':
        return <Confirmation 
          onBackToHome={() => {
            setSelectedRestaurant(null);
            setCurrentPage('home');
          }}
        />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      <div className="main-container">
        {renderPage()}
      </div>
    </div>
  );
}

export default AppContent;