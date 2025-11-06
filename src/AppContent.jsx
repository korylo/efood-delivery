import { useState } from 'react';
import Main from './Main';
import Home from './components/Home/Home';
import Restaurant from './components/Restaurant/Restaurant';
import Cart from './components/Cart/Cart';
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
      <Main>
        {renderPage()}
      </Main>
    </div>
  );
}

export default AppContent;