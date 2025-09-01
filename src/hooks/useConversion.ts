import { useState, useEffect } from 'react';
import axios from 'axios';

const CONVERSION_API = 'https://economia.awesomeapi.com.br/json/last';

export const useConversion = (from = 'BTC', to = 'BRL') => {
  const [rate, setRate] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRate = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${CONVERSION_API}/${from}-${to}`);
        const data = response.data[`${from}${to}`];
        setRate(parseFloat(data.bid));
      } catch (error) {
        console.error('Erro ao obter taxa:', error);
        setRate(0);
      } finally {
        setLoading(false);
      }
    };

    fetchRate();
  }, [from, to]);

  return { rate, loading };
};
