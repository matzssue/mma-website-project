export const convertWeight = function (lbs) {
  return lbs / 0.45359;
};
export const setDate = function (date) {
  return new Date(date).toJSON().slice(0, 10);
};

export const convertInchesToCm = function (inches) {
  return Math.round(inches / 2.54);
};
