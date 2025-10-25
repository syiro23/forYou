
// Flower page boot: show play button/hint first, start animation when audio plays or user clicks
document.addEventListener('DOMContentLoaded', () => {
  // Typing title animation (kept similar to previous behavior)
  const titles = ('ALSHA IMUPP').split('');
  const titleElement = document.getElementById('title');
  let index = 0;

  function appendTitle() {
    if (index < titles.length) {
      titleElement.innerHTML += titles[index];
      index++;
      setTimeout(appendTitle, 300);
    }
  }

  // We'll not start the append until we decide to run the animation (startAnimation)

  // Audio and UI elements
  const audio = document.getElementById('bg-audio');
  const btn = document.getElementById('audio-toggle');
  const hintContainer = document.getElementById('music-hint');

  // Populate hint with animated spans if present
  if (hintContainer) {
    const hintText = `pencet dulu musiknya`.split('');
    hintContainer.innerHTML = '';
    for (let i = 0; i < hintText.length; i++) {
      if (hintText[i] !== ' ') {
        hintContainer.innerHTML += `<span>${hintText[i]}</span>`;
      } else {
        hintContainer.innerHTML += `<span style='width: .5rem'></span>`;
      }
    }
    const hintSpans = hintContainer.querySelectorAll('span');
    hintSpans.forEach((el, idx) => {
      const delay = 0.05 * idx + Math.random() * 0.1;
      el.style.setProperty('--delay', `${delay}s`);
      el.style.animationDelay = `${delay}s`;
    });
  }

  let fallbackTimer = null;
  const startAnimation = () => {
    if (fallbackTimer) {
      clearTimeout(fallbackTimer);
      fallbackTimer = null;
    }
    // remove the not-loaded class to start CSS animations
    document.body.classList.remove('not-loaded');
    // start title typing
    appendTitle();
  };

  // Fallback: if no interaction or audio play after 3000ms, start animation anyway
  fallbackTimer = setTimeout(() => {
    console.info('Fallback: starting animation after timeout');
    startAnimation();
  }, 3000);

  if (audio) {
    // attempt audible autoplay
    audio.autoplay = true;
    audio.playsInline = true;
    audio.preload = 'auto';
    audio.muted = false;
    audio.volume = 0.5;

    audio.play().then(() => {
      // audible autoplay succeeded
      startAnimation();
    }).catch((err) => {
      console.warn('Autoplay with sound was blocked or failed:', err);
      // wait for user click on button as fallback
    });

    // If the audio starts playing later (e.g., user clicked), start animation
    audio.addEventListener('playing', () => {
      startAnimation();
    });
  }

  if (btn) {
    btn.addEventListener('click', async () => {
      try {
        if (audio) {
          await audio.play();
          audio.muted = false;
          audio.volume = 0.5;
        }
      } catch (err) {
        console.warn('Audio playback failed on user click:', err);
      }
      startAnimation();
    });
  }
});