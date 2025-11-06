import { useRestaurants } from '../../hooks/useRestaurants';
import { useCart } from '../../context/CartContext';
import './Home.css';

function Home({ onSelectRestaurant }) {
  const { restaurants, loading, error } = useRestaurants();
  const { cart } = useCart();

  const totalCartItems = cart.length;

  if (loading) {
    return (
      <div className="loading">
        <i className="fas fa-spinner fa-spin"></i> Carregando restaurantes...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-page">
        <p>Erro ao carregar restaurantes: {error}</p>
      </div>
    );
  }

  return (
    <div className="home">
      <header className="header">
        <div className="header-top">
          <h1 className="logo">eFood</h1>
          {totalCartItems > 0 && (
            <div className="header-cart-count">
              🛒 {totalCartItems} {totalCartItems === 1 ? 'item' : 'itens'}
            </div>
          )}
        </div>
        <p className="tagline">Viva experiências gastronômicas no conforto da sua casa</p>
      </header>

      <div className="restaurants-grid">
        {restaurants.map(restaurant => (
          <div key={restaurant.id} className="restaurant-card">
            <img src={restaurant.capa} alt={restaurant.titulo} className="restaurant-image" />
            <div className="restaurant-info">
              <h3 className="restaurant-name">{restaurant.titulo}</h3>
              <p className="restaurant-description">{restaurant.descricao}</p>
              <p className="restaurant-details">
                <span>⭐ {restaurant.avaliacao}</span> • 
                <span> {restaurant.tipo}</span> • 
                <span> {restaurant.tempo} min</span>
              </p>
              <button 
                className="btn"
                onClick={() => onSelectRestaurant(restaurant)}
              >
                🍽️ Comprar o produto
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;