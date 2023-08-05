export const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(num);
};
