export const convertToCLPCurrency = (amount, locale = 'es-ES') => {
    const options = {
      style: 'currency',
      currency: 'CLP',
    };
    
    return amount.toLocaleString(locale, options);
  };
  