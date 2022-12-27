export const convertWeight = function (lbs) {
  return lbs / 0.45359;
};
export const setDate = function (date) {
  return new Date(date).toDateString();
};

export const convertInchesToCm = function (inches) {
  return Math.round(inches / 2.54);
};
