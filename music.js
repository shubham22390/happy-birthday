const musicButton = document.querySelector(".music-toggle");
const musicStatus = document.querySelector(".music-status");

if (musicButton && musicStatus) {
  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
  const songStateKey = "birthday-song-state";
  const melody = [
    523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 698.46,
    523.25, 587.33, 659.25, 783.99, 698.46, 659.25, 587.33, 523.25,
    440, 523.25, 659.25, 587.33, 523.25, 493.88, 523.25, 659.25
  ];
  let audioContext;
  let noteTimer;
  let savedSongState;
  try {
    savedSongState = JSON.parse(sessionStorage.getItem(songStateKey) || "null");
  } catch (error) {
    musicStatus.textContent = "The birthday song could not restore its place.";
    console.error("Could not restore the birthday song position:", error);
  }
  let noteIndex = Number.isInteger(savedSongState?.noteIndex)
    ? ((savedSongState.noteIndex % melody.length) + melody.length) % melody.length
    : 0;
  let isPlaying = false;
  const shouldResume = savedSongState?.isPlaying !== false;
  const interactionEvents = ["pointerdown", "keydown"];

  function saveSongState(playing = isPlaying) {
    try {
      sessionStorage.setItem(songStateKey, JSON.stringify({ noteIndex, isPlaying: playing }));
    } catch (error) {
      musicStatus.textContent = "The birthday song may restart when you change pages.";
      console.error("Could not save the birthday song position:", error);
    }
  }

  function updateButton() {
    musicButton.setAttribute("aria-pressed", String(isPlaying));
    musicButton.setAttribute("aria-label", isPlaying ? "Pause birthday song" : "Play birthday song");
    musicButton.querySelector(".music-label").textContent = isPlaying ? "Pause song" : "Play song";
  }

  function playNextNote() {
    if (!isPlaying || !audioContext || audioContext.state !== "running") return;

    const startTime = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const volume = audioContext.createGain();
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(melody[noteIndex], startTime);
    volume.gain.setValueAtTime(0.0001, startTime);
    volume.gain.exponentialRampToValueAtTime(0.13, startTime + 0.035);
    volume.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.34);
    oscillator.connect(volume);
    volume.connect(audioContext.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + 0.36);

    noteIndex = (noteIndex + 1) % melody.length;
    saveSongState();
    noteTimer = window.setTimeout(playNextNote, 410);
  }

  function removeInteractionListeners() {
    interactionEvents.forEach((eventName) => {
      document.removeEventListener(eventName, startAfterInteraction);
    });
  }

  async function startMusic() {
    try {
      audioContext ??= new AudioContextConstructor();
      await audioContext.resume();
      if (isPlaying || audioContext.state !== "running") return;

      isPlaying = true;
      musicStatus.textContent = "";
      saveSongState();
      updateButton();
      removeInteractionListeners();
      playNextNote();
    } catch (error) {
      musicStatus.textContent = "Your browser blocked automatic playback. Tap or press a key to start the birthday song.";
      console.error("Could not start the birthday song:", error);
    }
  }

  function startAfterInteraction() {
    if (!isPlaying) startMusic();
  }

  async function toggleMusic() {
    if (!isPlaying) {
      await startMusic();
      return;
    }

    isPlaying = false;
    window.clearTimeout(noteTimer);
    saveSongState(false);
    updateButton();
    try {
      await audioContext.suspend();
      musicStatus.textContent = "";
    } catch (error) {
      musicStatus.textContent = "The birthday song could not pause. Check your browser's audio settings.";
      console.error("Could not pause the birthday song:", error);
    }
  }

  if (!AudioContextConstructor) {
    musicButton.disabled = true;
    musicStatus.textContent = "Your browser does not support the birthday song.";
  } else {
    musicButton.addEventListener("click", toggleMusic);
    interactionEvents.forEach((eventName) => {
      document.addEventListener(eventName, startAfterInteraction);
    });
    updateButton();
    if (shouldResume) {
      musicStatus.textContent = "If the song does not start automatically, tap or press a key.";
      startMusic();
    } else {
      removeInteractionListeners();
    }
  }
}
