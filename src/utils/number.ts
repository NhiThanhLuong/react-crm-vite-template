import numeral from 'numeral';

export const formatNumber = (number: number) => {
  return numeral(number).format('0,0');
};
