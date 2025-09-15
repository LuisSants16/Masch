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

const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

const items = document.querySelectorAll(".grid-item");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalType = document.getElementById("modal-type");
const modalDescription = document.getElementById("modal-description");
const modalClose = document.querySelector(".modal-close");

items.forEach((item) => {
  item.addEventListener("click", () => {
    modal.style.display = "flex";
    document.body.classList.add("modal-open");
    modalImg.src = item.querySelector("img").src;
    modalTitle.textContent = item.dataset.title;
    modalType.textContent = item.dataset.type;
    modalDescription.textContent = item.dataset.description;
  });
});
modalClose.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.classList.remove("modal-open");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "flex") {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  }
});

document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");
    const allButtons = document.querySelectorAll(".filter-btn");
    const items = document.querySelectorAll(".grid-item");

    allButtons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");

    items.forEach((item) => {
      const type = item.getAttribute("data-type");
      const match = filter === "all" || type === filter;

      if (!match) {
        item.classList.add("fade-out");
        setTimeout(() => item.classList.add("hidden"), 300);
      } else {
        item.classList.remove("hidden");
        setTimeout(() => item.classList.remove("fade-out"), 10);
      }
    });
  });
});

let sliderInterval;

if (window.innerWidth <= 768) {
  const slider = document.querySelector(".grid-gallery");
  let scrollAmount = 0;
  let isUserScrolling = false;

  function startSlider() {
    if (sliderInterval) return;
    sliderInterval = setInterval(() => {
      scrollAmount += slider.clientWidth;
      if (scrollAmount >= slider.scrollWidth) {
        scrollAmount = 0;
      }
      slider.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }, 3000);
  }

  function stopSlider() {
    clearInterval(sliderInterval);
    sliderInterval = null;
  }

  startSlider();

  slider.addEventListener("touchstart", () => {
    isUserScrolling = true;
    stopSlider();
  });

  slider.addEventListener("mousedown", () => {
    isUserScrolling = true;
    stopSlider();
  });

  slider.addEventListener("touchend", () => {
    if (isUserScrolling) {
      setTimeout(() => {
        startSlider();
        isUserScrolling = false;
      }, 5000);
    }
  });

  slider.addEventListener("mouseup", () => {
    if (isUserScrolling) {
      setTimeout(() => {
        startSlider();
        isUserScrolling = false;
      }, 5000);
    }
  });

  document.querySelectorAll(".grid-item").forEach((item) => {
    item.addEventListener("click", () => {
      stopSlider();
    });
  });

  const modal = document.getElementById("modal");
  const closeModalBtn = document.querySelector(".modal-close");

  closeModalBtn.addEventListener("click", () => {
    startSlider();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      startSlider();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".testimonials-slider");
  const totalSlides = slider.children.length;
  const dotsContainer = document.querySelector(".dots-container");
  const prevBtn = document.querySelector(".prev-slide");
  const nextBtn = document.querySelector(".next-slide");
  let currentSlide = 0;
  let interval;

  // Crear puntos
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.dataset.index = i;
    dotsContainer.appendChild(dot);
  }

  const dots = document.querySelectorAll(".dot");

  function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[currentSlide].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }

  function prevSlideFunc() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetInterval();
  });

  prevBtn.addEventListener("click", () => {
    prevSlideFunc();
    resetInterval();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      currentSlide = parseInt(e.target.dataset.index);
      updateSlider();
      resetInterval();
    });
  });

  function startInterval() {
    interval = setInterval(nextSlide, 4000);
  }

  function resetInterval() {
    clearInterval(interval);
    startInterval();
  }

  const sliderWrapper = document.querySelector(".slider-wrapper");
  sliderWrapper.addEventListener("mouseenter", () => clearInterval(interval));
  sliderWrapper.addEventListener("mouseleave", () => startInterval());

  updateSlider();
  startInterval();
});

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".testimonial-item");
  const dotsContainer = document.getElementById("testimonialDots");

  let index = 0;

  items.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".testimonial-dots .dot");

  function showSlide(i) {
    items.forEach((item, idx) => {
      item.classList.toggle("active", idx === i);
      dots[idx].classList.toggle("active", idx === i);
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      index = i;
      showSlide(index);
    });
  });

  showSlide(index);

  setInterval(() => {
    index = (index + 1) % items.length;
    showSlide(index);
  }, 5000);
});

document.addEventListener("DOMContentLoaded", function () {
  const sliderImg = document.getElementById("galeria-slider");
  const galeriaFotos = [
    "./img/img01.jpg",
    "./img/img02.jpg",
    "./img/img03.jpg",
    "./img/img04.jpg",
  ];
  let current = 0;

  setInterval(() => {
    current = (current + 1) % galeriaFotos.length;
    sliderImg.src = galeriaFotos[current];
  }, 4000);
});

function enviarFormulario(formulario) {
  setTimeout(() => {
    const mensaje = document.getElementById("mensajeConfirmacion");
    mensaje.style.display = "block";
    formulario.reset();

    setTimeout(() => {
      mensaje.style.display = "none";
    }, 5000);
  }, 500);
  return true;
}

document.querySelectorAll('.nav-link[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

const navLinks = [...document.querySelectorAll('.nav-link[href^="#"]')];
const targets = navLinks
  .map(l => document.querySelector(l.getAttribute('href')))
  .filter(Boolean);

const activateLink = (id) => {
  navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
};

const io = new IntersectionObserver((entries) => {
  const visible = entries
    .filter(en => en.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (visible) activateLink(visible.target.id);
}, {
  root: null,
  rootMargin: '-120px 0px -50% 0px',
  threshold: [0.25, 0.5, 0.75]
});

targets.forEach(el => io.observe(el));
