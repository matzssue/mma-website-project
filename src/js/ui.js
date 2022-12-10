const header = document.querySelector("header");
const btn = document.querySelector(".btn-show-all");
const sectionOne = document.querySelector("#upcoming-event");
const sectionTwo = document.querySelector("#other-fights");
window.addEventListener("scroll", function () {
  const height = document.querySelector("header").clientHeight;

  if (window.scrollY > height) {
    header.classList.add("nav-scroll");
  } else header.classList.remove("nav-scroll");
});
