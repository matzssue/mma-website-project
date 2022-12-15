window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  const height = document.querySelector("header").clientHeight;
  if (window.scrollY > height) {
    header.classList.add("nav-scroll");
  } else header.classList.remove("nav-scroll");
});
