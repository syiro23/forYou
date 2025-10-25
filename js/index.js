const title = document.querySelector('.title')
const text = `coba buka deh`.split('')

// Create container for better responsive layout
title.style.display = 'flex'
title.style.flexWrap = 'wrap'
title.style.justifyContent = 'center'
title.style.gap = '0.5rem'

for (let index = 0; index < text.length; index++) {
  if (text[index] !== ' ') {
    title.innerHTML += `<span>${text[index]}</span>`
  } else {
    title.innerHTML += `<span style='width: 1rem'></span>`
  }
}

const textElements = document.querySelectorAll('.title span');
textElements.forEach((element) => {
  const randomDelay = Math.random() * 3;
  element.style.animationDelay = `${randomDelay}s`;
});

// Create music hint above the button with the same visual style as the title
const musicHintContainer = document.getElementById('music-hint');
if (musicHintContainer) {
  const hintText = `pencet dulu musiknya`.split('');
  for (let i = 0; i < hintText.length; i++) {
    if (hintText[i] !== ' ') {
      musicHintContainer.innerHTML += `<span>${hintText[i]}</span>`;
    } else {
      musicHintContainer.innerHTML += `<span style='width: .5rem'></span>`;
    }
  }

  const hintSpans = document.querySelectorAll('#music-hint span');
  hintSpans.forEach((el, idx) => {
    // Staggered but quicker than main title
    const delay = 0.05 * idx + Math.random() * 0.2;
    el.style.setProperty('--delay', `${delay}s`);
    el.style.animationDelay = `${delay}s`;
  });
}

// Audio control (autoplay muted, then unmute on first gesture, plus toggle play/pause)
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('bg-audio');
  const btn = document.getElementById('audio-toggle');
  if (!audio || !btn) return;

  // Try audible autoplay (remove muted). Many browsers will block audible autoplay;
  // we still attempt to play and fall back to letting the user start via the button.
  audio.autoplay = true;
  audio.playsInline = true;
  audio.preload = 'auto';
  audio.muted = false; // attempt audible playback
  audio.volume = 0.5;

  const setPlaying = (playing) => {
    btn.textContent = playing ? 'Pause Music' : 'Play Music';
    btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
  };

  // Attempt to play unmuted. If browser blocks, catch the error and keep button as fallback.
  audio.play().then(() => {
    setPlaying(true);
  }).catch((err) => {
    console.warn('Autoplay with sound was blocked by the browser:', err);
    // Keep playing state false so user can press button to start sound.
    setPlaying(!audio.paused && audio.currentTime > 0);
  });

  // Button still available as manual fallback to start playback.
  btn.addEventListener('click', async () => {
    try {
      if (audio.paused) {
        await audio.play();
        audio.muted = false;
        audio.volume = 0.5;
        setPlaying(true);
      } else {
        audio.pause();
        setPlaying(false);
      }
    } catch (err) {
      console.warn('Audio playback failed on button click:', err);
    }
  });
});