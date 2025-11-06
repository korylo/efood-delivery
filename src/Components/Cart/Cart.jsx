import { useCart } from '../../context/CartContext';
import './Cart.css';

function Cart({ onBack, onCheckout }) {
  const { cart, dispatch } = useCart();

  const total = cart.reduce((sum, item) => sum + item.preco, 0);

  const removeItem = (cartId) => {
    dispatch({ type: 'REMOVE_ITEM', id: cartId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-header">
          <button className="btn btn-secondary" onClick={onBack}>← Voltar</button>
          <h2>🛒 Meu Carrinho</h2>
        </div>
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <h3>Seu carrinho está vazio</h3>
          <p>Adicione alguns itens deliciosos do cardápio!</p>
          <button className="btn" onClick={onBack}>Ver Restaurantes</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <button className="btn btn-secondary" onClick={onBack}>← Voltar</button>
        <h2>🛒 Meu Carrinho ({cart.length})</h2>
        <button className="btn btn-secondary" onClick={clearCart}>🗑️ Limpar</button>
      </div>

      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.cartId} className="cart-item">
            <div className="item-image-container">
              <img 
                src={item.imagem || item.foto || '/placeholder-food.jpg'} 
                alt={item.nome}
                className="cart-item-image"
                onError={(e) => {
                  e.target.src = '/placeholder-food.jpg';
                  e.target.alt = 'Imagem não disponível';
                }}
              />
            </div>
            <div className="item-info">
              <h4 className="item-name">{item.nome}</h4>
              <p className="item-restaurant">{item.restaurant}</p>
              <p className="item-description">{item.descricao}</p>
              <span className="item-price">R$ {item.preco.toFixed(2)}</span>
            </div>
            <button 
              className="btn remove-btn"
              onClick={() => removeItem(item.cartId)}
            >
              ❌ Remover
            </button>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <div className="total-section">
          <div className="total-line">
            <span>Subtotal ({cart.length} itens):</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
          <div className="total-line">
            <span>Taxa de entrega:</span>
            <span>R$ 5.00</span>
          </div>
          <div className="total-line final-total">
            <span>Total:</span>
            <span>R$ {(total + 5).toFixed(2)}</span>
          </div>
        </div>
        <button className="btn checkout-btn" onClick={onCheckout}>
          ✅ Finalizar Pedido - R$ {(total + 5).toFixed(2)}
        </button>
      </div>
    </div>
  );
}

export default Cart;