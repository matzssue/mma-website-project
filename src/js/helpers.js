export const convertWeight = function (lbs) {
  return lbs / 0.45359;
};
export const setDate = function (date) {
  return new Date(date).toJSON().slice(0, 10);
};

export const convertInchesToCm = function (inches) {
  return Math.round(inches / 2.54);
};

export const getAge = function (dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};
