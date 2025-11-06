const BASE_URL = 'https://api-ebac.vercel.app/api/efood/restaurantes';

export const api = {
  async getRestaurants() {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) throw new Error('Erro ao carregar restaurantes');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  
  async getRestaurant(id) {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      if (!response.ok) throw new Error('Erro ao carregar restaurante');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};