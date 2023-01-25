const navBarChanger = function () {
  const header = document.querySelector("header");
  const height = document.querySelector("header").clientHeight;

  window.scrollY > height
    ? header.classList.add("nav-scroll")
    : header.classList.remove("nav-scroll");
};

const activeBar = function () {
  const allButtons = document.querySelectorAll(".nav-button");
  allButtons.forEach((btn) => {
    const currentHash = btn.innerText;
    const hash = document.URL;

    hash === `http://127.0.0.1:5500/${currentHash}.html`
      ? btn.firstChild.classList.add("active")
      : btn.classList.remove(".active");
  });
};

window.addEventListener("scroll", navBarChanger);
window.addEventListener("hashchange", activeBar());
