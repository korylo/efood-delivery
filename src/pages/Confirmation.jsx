function Confirmation({ onBackToHome }) {
  return (
    <div className="page-container">
      <div className="confirmation-content">
        <div className="confirmation-icon">🎉</div>
        <h2>Pedido Confirmado!</h2>
        <p>Seu pedido foi realizado com sucesso e está sendo preparado.</p>
        <div className="confirmation-details">
          <p><strong>📦 Tempo estimado de entrega:</strong> 30-40 minutos</p>
          <p><strong>📍 Status:</strong> Em preparação</p>
          <p><strong>📞 Contato:</strong> Você receberá atualizações por WhatsApp</p>
        </div>
        <button className="btn" onClick={onBackToHome}>
          🏠 Fazer Novo Pedido
        </button>
      </div>
    </div>
  );
}

export default Confirmation;