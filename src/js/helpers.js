export const convertWeight = function (lbs) {
  return lbs / 0.45359;
};
export const setDate = function (date) {
  return new Date(date).toJSON().slice(0, 10);
};

export const convertInchesToCm = function (inches) {
  return Math.round(inches / 2.54);
};

export const countDownTimer = function (date) {
  const countDownDate = date.getTime();
  const interval = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const timeContainer = document.querySelector(".center-info-time");
    timeContainer.innerHTML = `Time left: ${days}d ${hours}h`;
  }, 1000);
  interval();
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
