<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mindful Places</title>

  <style>
    body, html {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      overflow-x: hidden;
    }

    .hero-video {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: -1;
    }

    .sound-btn {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10;
      background: rgba(0,0,0,0.5);
      border: none;
      padding: 10px;
      cursor: pointer;
    }

    .content {
      margin-top: 100vh;
      background: white;
      padding: 40px;
      position: relative;
      z-index: 2;
    }

    .card {
      margin-bottom: 40px;
    }

    .card img {
      width: 100%;
    }
  </style>
</head>

<body>

<!-- SOUND BUTTON -->
<button id="soundToggle" class="sound-btn">
  🔇
</button>

<!-- VIDEO -->
<video id="heroVideo" autoplay muted loop playsinline class="hero-video"></video>

<!-- CONTENT -->
<div class="content">

  <div class="card">
    <img src="images/img1.jpg">
    <h2>Spatial Design Studio</h2>
  </div>

  <div class="card">
    <img src="images/img2.jpg">
    <h2>Consulting</h2>
  </div>

  <div class="card">
    <img src="images/img3.jpg">
    <h2>Shop</h2>
  </div>

</div>

<script>
const video = document.getElementById("heroVideo");
const button = document.getElementById("soundToggle");

// 🔥 STABILE VIDEO-LOGIK
function setVideo() {
  const isPortrait = window.innerHeight > window.innerWidth;
  const src = isPortrait ? "video/hero.mp4" : "video/hero2.mp4";

  if (video.src.indexOf(src) === -1) {
    video.src = src;
    video.load();
    video.play().catch(() => {});
  }
}

// Initial laden
setVideo();

// Nur bei Drehung wechseln (kein iPhone Bug)
window.addEventListener("orientationchange", setVideo);


// 🔊 SOUND BUTTON
button.addEventListener("click", () => {
  video.muted = !video.muted;

  if (video.muted) {
    button.textContent = "🔇";
  } else {
    button.textContent = "🔊";
    video.play().catch(() => {});
  }
});
</script>

</body>
</html>setVideoSource();

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
