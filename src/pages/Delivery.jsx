function Delivery({ onBack, onContinue }) {
  return (
    <div className="page-container">
      <div className="page-header">
        <button className="btn btn-secondary" onClick={onBack}>← Voltar</button>
        <h2>Informações de Entrega</h2>
      </div>

      <div className="form-container">
        <div className="form-group">
          <label>Endereço</label>
          <input type="text" placeholder="Rua, número, bairro" />
        </div>
        
        <div className="form-group">
          <label>Complemento</label>
          <input type="text" placeholder="Apartamento, bloco, etc." />
        </div>
        
        <div className="form-group">
          <label>Cidade</label>
          <input type="text" placeholder="Sua cidade" />
        </div>
        
        <div className="form-group">
          <label>CEP</label>
          <input type="text" placeholder="00000-000" />
        </div>

        <button className="btn" onClick={onContinue}>
          Continuar para Pagamento
        </button>
      </div>
    </div>
  );
}

export default Delivery;