import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import './Restaurant.css';

function Restaurant({ restaurant, onBack, onOpenCart }) {
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cart, dispatch } = useCart();

  useEffect(() => {
    if (restaurant && restaurant.id) {
      fetch(`https://api-ebac.vercel.app/api/efood/restaurantes/${restaurant.id}`)
        .then(response => response.json())
        .then(data => {
          setRestaurantDetails(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Erro ao carregar restaurante:', error);
          setLoading(false);
        });
    }
  }, [restaurant]);

  // Contar itens no carrinho deste restaurante
  const cartItemCount = cart.filter(item => item.restaurant === restaurant.titulo).length;

  const addToCart = (item) => {
    dispatch({
      type: 'ADD_ITEM',
      item: {
        ...item,
        restaurant: restaurant.titulo,
        cartId: Date.now() + Math.random(),
        // Adiciona imagem padrão se não tiver
        imagem: item.foto || '/placeholder-food.jpg'
      }
    });
  };

  if (loading) {
    return (
      <div className="loading">
        <i className="fas fa-spinner fa-spin"></i> Carregando...
      </div>
    );
  }

  if (!restaurantDetails) {
    return (
      <div className="error-page">
        <p>Erro ao carregar restaurante</p>
        <button className="btn" onClick={onBack}>Voltar</button>
      </div>
    );
  }

  return (
    <div className="restaurant-page">
      <div className="restaurant-header">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Voltar
        </button>
        <button className="btn cart-button-with-count" onClick={onOpenCart}>
          🛒 Ver Carrinho 
          {cartItemCount > 0 && <span className="cart-count-badge">{cartItemCount}</span>}
        </button>
      </div>

      <div className="restaurant-modal">
        <img 
          src={restaurantDetails.capa} 
          alt={restaurantDetails.titulo} 
          className="modal-image" 
        />
        
        <div className="modal-content">
          <h2 className="modal-title">{restaurantDetails.titulo}</h2>
          <p className="modal-description">{restaurantDetails.descricao}</p>
          
          <div className="restaurant-info">
            <span className="info-badge">⭐ {restaurantDetails.avaliacao}</span>
            <span className="info-badge">{restaurantDetails.tipo}</span>
            <span className="info-badge">⏱️ {restaurantDetails.tempo} min</span>
          </div>

          <div className="menu-section">
            <h3>Cardápio</h3>
            <div className="menu-grid">
              {restaurantDetails.cardapio && restaurantDetails.cardapio.map(item => (
                <div key={item.id} className="menu-item">
                  <div className="item-image-container">
                    <img 
                      src={item.foto || '/placeholder-food.jpg'} 
                      alt={item.nome}
                      className="item-image"
                      onError={(e) => {
                        e.target.src = '/placeholder-food.jpg';
                        e.target.alt = 'Imagem não disponível';
                      }}
                    />
                  </div>
                  <div className="item-content">
                    <div className="item-header">
                      <h4 className="item-name">{item.nome}</h4>
                      <span className="item-price">R$ {item.preco.toFixed(2)}</span>
                    </div>
                    <p className="item-description">{item.descricao}</p>
                    <button 
                      className="btn add-to-cart-btn"
                      onClick={() => addToCart(item)}
                    >
                      🛒 Adicionar ao carrinho
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Restaurant;