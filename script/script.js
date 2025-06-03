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

//slider - servicios

  const slider = document.getElementById("servicesTrack");
  const totalItems = slider.children.length;
  const visibleItems = 3;
  let index = 0;

  function slideForward() {
    index++;
    if (index > totalItems - visibleItems) {
      index = 0;
    }
    const card = slider.children[0];
    const gap = 30;
    const offset = card.offsetWidth * index + gap * index;
    slider.style.transform = `translateX(-${offset}px)`;
  }

  setInterval(slideForward, 4000); // Cambia cada 4 segundos