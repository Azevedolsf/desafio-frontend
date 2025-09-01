export const btcToFiat = (btc: number, rate: number): number => {
  return btc * rate;
};

export const formatCurrency = (value: number, currency: string): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

export const formatBTC = (value: number): string => {
  return `${value.toFixed(8)} BTC`;
};
