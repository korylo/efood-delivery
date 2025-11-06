function Payment({ onBack, onConfirm }) {
  return (
    <div className="page-container">
      <div className="page-header">
        <button className="btn btn-secondary" onClick={onBack}>← Voltar</button>
        <h2>Pagamento</h2>
      </div>

      <div className="form-container">
        <div className="payment-methods">
          <h3>Método de Pagamento</h3>
          <label className="payment-option">
            <input type="radio" name="payment" defaultChecked />
            Cartão de Crédito
          </label>
          <label className="payment-option">
            <input type="radio" name="payment" />
            Cartão de Débito
          </label>
          <label className="payment-option">
            <input type="radio" name="payment" />
            Dinheiro
          </label>
          <label className="payment-option">
            <input type="radio" name="payment" />
            Pix
          </label>
        </div>

        <button className="btn" onClick={onConfirm}>
          Confirmar Pedido
        </button>
      </div>
    </div>
  );
}

export default Payment;