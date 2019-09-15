export const getNumberWithDot = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const delta = 15.7;

export const getSizeForLongText = (text) => delta - (((text.length + 1) * (delta / 2)) / 11);
export const convertSalary = (max, min, unit) => {
  if (max !== -1 && min !== -1) {
    return `${getNumberWithDot(max)} - ${getNumberWithDot(min)}/${unit}`;
  }
  return 'Thỏa Thuận';
};
