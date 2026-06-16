/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn =
  document.querySelector(".menu-btn");

const nav =
  document.querySelector(".nav");

if (menuBtn && nav) {

  menuBtn.addEventListener("click", () => {

  nav.classList.toggle("nav-open");

  const expanded =
    menuBtn.getAttribute("aria-expanded") === "true";

  menuBtn.setAttribute(
    "aria-expanded",
    !expanded
  );

  const icon =
    menuBtn.querySelector("i");

  if (nav.classList.contains("nav-open")) {

    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");

  } else {

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
});
}

/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

const header =
  document.querySelector(".header");

function updateHeader() {

  if (window.scrollY > 40) {

    header.classList.add("header-scrolled");

  } else {

    header.classList.remove("header-scrolled");
  }
}

window.addEventListener("scroll", updateHeader);

updateHeader();

/* =========================================================
   WHATSAPP BUTTON
========================================================= */

const whatsappBtn =
  document.querySelector(".whatsapp-btn");

window.addEventListener("scroll", () => {

  if (window.scrollY > 500) {

    whatsappBtn.classList.add("show");

  } else {

    whatsappBtn.classList.remove("show");
  }
});

/* =========================================================
   REVEAL EFFECT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const revealElements =
    document.querySelectorAll('.reveal');

  const revealOptions = {

    threshold: 0.05,

    rootMargin:
      "0px 0px -40px 0px"
  };

  const revealObserver =
    new IntersectionObserver(

      (entries, observer) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add('active');

            observer.unobserve(entry.target);
          }
        });
      },

      revealOptions
    );

  revealElements.forEach(element => {

    revealObserver.observe(element);
  });
});

/* =========================================================
   ESC CLOSE MENU
========================================================= */

document.addEventListener("keydown", (e) => {

  if (
    e.key === "Escape" &&
    nav.classList.contains("nav-open")
  ) {

    nav.classList.remove("nav-open");

    menuBtn.setAttribute(
      "aria-expanded",
      "false"
    );
  }
});



/* =========================================================
   EDITORIAL VIDEO
========================================================= */

const editorialMedia =
  document.querySelector(".editorial-media");

const editorialVideo =
  document.querySelector(".editorial-video");

const editorialPlay =
  document.querySelector(".editorial-play");

if (
  editorialMedia &&
  editorialVideo &&
  editorialPlay
) {

  editorialPlay.addEventListener(
    "click",
    () => {

      editorialMedia.classList.add("playing");

      editorialVideo.play();
    }
  );

  editorialVideo.addEventListener(
    "ended",
    () => {

      editorialMedia.classList.remove("playing");

      editorialVideo.currentTime = 0;
    }
  );
}


/* ==========================
   COLLECTION DROPDOWN
========================== */

const dropdown = document.querySelector('.nav-dropdown');
const trigger = document.querySelector('.dropdown-trigger');

if (dropdown && trigger) {

  trigger.addEventListener('click', (e) => {

    e.preventDefault();

    dropdown.classList.toggle('is-open');

    trigger.setAttribute(
      'aria-expanded',
      dropdown.classList.contains('is-open')
    );

  });

  document.addEventListener('click', (e) => {

    if (!dropdown.contains(e.target)) {

      dropdown.classList.remove('is-open');

      trigger.setAttribute(
        'aria-expanded',
        'false'
      );

    }

  });

}