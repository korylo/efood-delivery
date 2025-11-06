import { useState, useEffect } from 'react';
import { api } from '../services/api';

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        setLoading(true);
        const data = await api.getRestaurants();
        setRestaurants(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  return { restaurants, loading, error };
}