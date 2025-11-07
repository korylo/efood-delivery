import { useState, useEffect } from 'react';
import './Home.css';

function Home({ onSelectRestaurant }) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Buscar restaurantes diretamente - SEM HOOKS
  useEffect(() => {
    fetch('https://api-ebac.vercel.app/api/efood/restaurantes')
      .then(response => response.json())
      .then(data => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <i className="fas fa-spinner fa-spin"></i> Carregando restaurantes...
      </div>
    );
  }

  return (
    <div className="home">
      <header className="header">
        <div className="header-top">
          <h1 className="logo">eFood</h1>
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