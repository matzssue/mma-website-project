const navBarChanger = function () {
  const header = document.querySelector("header");
  const height = document.querySelector("header").clientHeight;

  window.scrollY > height
    ? header.classList.add("nav-scroll")
    : header.classList.remove("nav-scroll");
};

window.addEventListener("scroll", navBarChanger);
