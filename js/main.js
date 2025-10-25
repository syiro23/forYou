
onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");

    const titles = ('ALSHA IMUPP').split('')
    const titleElement = document.getElementById('title');
    let index = 0;

    function appendTitle() {
      if (index < titles.length) {
        titleElement.innerHTML += titles[index];
        index++;
        setTimeout(appendTitle, 300); // 1000ms delay
      }
    }

    appendTitle();

    clearTimeout(c);
  }, 1000);
};

// Audio control for flower page (autoplay muted, then unmute on interaction)
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('bg-audio');
  const btn = document.getElementById('audio-toggle');
  if (!audio || !btn) return;

  // Attempt audible autoplay (no muted). Many browsers will block this; keep button as fallback.
  audio.autoplay = true;
  audio.playsInline = true;
  audio.preload = 'auto';
  audio.muted = false; // attempt audible playback
  audio.volume = 0.5;

  const setPlaying = (playing) => {
    btn.textContent = playing ? 'Pause Music' : 'Play Music';
    btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
  };

  audio.play().then(() => {
    setPlaying(true);
  }).catch((err) => {
    console.warn('Autoplay with sound was blocked by the browser:', err);
    setPlaying(!audio.paused && audio.currentTime > 0);
  });

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