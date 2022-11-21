// 1000.00 -> 1 000.00
export const formatPrice = (num?: number, trailingZeros = 2) => {
  const spacesRegex = /\B(?=(\d{3})+(?!\d))/g;
  if (num === null || num === undefined) {
    return '0.00';
  }

  if (typeof num === 'number') {
    if (num < 0 && num > 0.01) trailingZeros = 2;
    return num.toFixed(trailingZeros).replace(spacesRegex, ' ');
  }

  if (typeof num === 'string') {
    let parsedNum = parseFloat(num);
    if (parsedNum < 0 && parsedNum > 0.01) trailingZeros = 2;
    return parsedNum.toFixed(trailingZeros).replace(spacesRegex, ' ');
  }

  return '';
};
