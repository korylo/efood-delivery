import { CartProvider } from './context/CartContext';
import AppContent from './AppContent';
import './styles.css';

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;