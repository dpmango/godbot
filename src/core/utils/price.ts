// 1000.00 -> 1 000.00
export const formatPrice = (num?: number) => {
  const spacesRegex = /\B(?=(\d{3})+(?!\d))/g;
  if (num === null || num === undefined) {
    return '0.00';
  }

  let trailingZeros = 2;

  if (num >= 1000) {
    trailingZeros = 0;
  } else if (num >= 100) {
    trailingZeros = 1;
  } else if (num >= 1) {
    trailingZeros = 2;
  } else if (num >= 0.01) {
    trailingZeros = 4;
  } else if (num >= 0.0001) {
    trailingZeros = 6;
  }

  const parts = num.toFixed(trailingZeros).split('.');

  if (parts.length > 1) {
    return `${parts[0].replace(spacesRegex, ' ')}.${parts[1]}`;
  }

  return parts[0].replace(spacesRegex, ' ');
};
