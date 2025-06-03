const hamburger = document.getElementById("hamburger");
const navWrapper = document.getElementById("navWrapper");
const icon = document.getElementById("hamburgerIcon");

hamburger.addEventListener("click", () => {
  navWrapper.classList.toggle("show");
  if (navWrapper.classList.contains("show")) {
    icon.classList.replace("bi-list", "bi-x-lg");
  } else {
    icon.classList.replace("bi-x-lg", "bi-list");
  }
});

document.querySelectorAll("#nav a").forEach((link) => {
  link.addEventListener("click", () => {
    navWrapper.classList.remove("show");
    icon.classList.replace("bi-x-lg", "bi-list");
  });
});

// scroll

const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// galeria css grid

  window.addEventListener('load', () => {
    const grid = document.querySelector('.masonry-grid');
    new Masonry(grid, {
      itemSelector: '.gallery-item',
      columnWidth: '.grid-sizer',
      gutter: 0,
      percentPosition: true
    });
  });