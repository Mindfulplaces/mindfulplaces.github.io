// ELEMENTE
const cards = document.querySelectorAll(".card");
const toggle = document.getElementById("menuToggle");
const menu = document.getElementById("navMenu");

const video = document.getElementById("heroVideo");
const source = document.getElementById("heroSource");

const scrollIndicator = document.querySelector(".scroll-indicator");

const soundBtn = document.getElementById("soundToggle");
const iconMuted = document.getElementById("iconMuted");
const iconSound = document.getElementById("iconSound");


// NAVIGATION (Menü öffnen/schließen)
if (toggle && menu) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}


// CARDS ANIMATION (Fade + Slide)
function reveal() {
  const trigger = window.innerHeight * 0.8;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();

    if (rect.top < trigger) {
      card.style.transform = "translateY(0)";
      card.style.opacity = "1";
      card.style.transition = "all 1s ease";
    }
  });
}

window.addEventListener("scroll", reveal);
reveal();


// VIDEO LOGIK (FIX für iPhone Scroll-Reset)
let currentSource = "";

function setVideoSource() {
  if (!video || !source) return;

  const isPortrait = window.innerHeight > window.innerWidth;
  const newSource = isPortrait ? "video/hero.mp4" : "video/hero2.mp4";

  // NUR wechseln wenn sich wirklich etwas ändert
  if (newSource !== currentSource) {
    currentSource = newSource;

    source.src = newSource;
    video.load();

    // wichtig für Safari / iOS
    video.play().catch(() => {});
  }
}

// Beim Laden
setVideoSource();

// ❗ WICHTIG: KEIN resize mehr (verursacht Bug auf iPhone)
// Stattdessen nur bei echter Drehung
window.addEventListener("orientationchange", setVideoSource);


// SCROLL INDICATOR AUSBLENDEN
if (scrollIndicator) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      scrollIndicator.classList.add("hide");
    } else {
      scrollIndicator.classList.remove("hide");
    }
  });
}


// SOUND BUTTON (mit SVG Icons)
if (soundBtn && video) {
  soundBtn.addEventListener("click", () => {

    if (video.muted) {
      video.muted = false;

      // wichtig für iOS
      video.play().catch(() => {});

      if (iconMuted && iconSound) {
        iconMuted.style.display = "none";
        iconSound.style.display = "block";
      }

    } else {
      video.muted = true;

      if (iconMuted && iconSound) {
        iconMuted.style.display = "block";
        iconSound.style.display = "none";
      }
    }

  });
}