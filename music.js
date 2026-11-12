const musicButton = document.querySelector(".music-toggle");
const musicStatus = document.querySelector(".music-status");
const stateKey = "birthday-blue-time";

const audio = document.createElement("audio");
audio.src = "yung kai - blue (official music video).mp3";
audio.preload = "auto";
audio.autoplay = true;
audio.loop = true;
audio.hidden = true;
audio.setAttribute("aria-hidden", "true");
audio.tabIndex = -1;
document.body.append(audio);

let savedTime = 0;
try {
  savedTime = Number(sessionStorage.getItem(stateKey) || 0);
} catch (error) {
  console.warn("The birthday song could not restore its playback position.", error);
}

function savePosition() {
  if (!Number.isFinite(audio.currentTime)) return;
  try {
    sessionStorage.setItem(stateKey, String(audio.currentTime));
  } catch (error) {
    console.warn("The birthday song position could not be saved.", error);
  }
}

function updateButton() {
  if (!musicButton) return;
  const isPlaying = !audio.paused;
  musicButton.setAttribute("aria-pressed", String(isPlaying));
  musicButton.setAttribute("aria-label", isPlaying ? "Pause Blue by yung kai" : "Play Blue by yung kai");
  const label = musicButton.querySelector(".music-label");
  if (label) label.textContent = isPlaying ? "Pause Blue" : "Play Blue";
}

function removeGestureListeners() {
  document.removeEventListener("pointerdown", startAfterGesture, true);
  document.removeEventListener("keydown", startAfterGesture, true);
}

async function startAfterGesture(event) {
  if (event?.target?.closest?.(".music-toggle") || !audio.paused) return;
  try {
    await audio.play();
    removeGestureListeners();
    if (musicStatus) musicStatus.textContent = "";
  } catch (error) {
    if (musicStatus) musicStatus.textContent = "Tap Play Blue to start the song.";
  }
}

audio.addEventListener("loadedmetadata", () => {
  if (savedTime > 0 && savedTime < audio.duration) audio.currentTime = savedTime;
});
audio.addEventListener("timeupdate", savePosition);
audio.addEventListener("play", updateButton);
audio.addEventListener("pause", updateButton);
audio.addEventListener("error", () => {
  if (musicStatus) musicStatus.textContent = "The Blue audio file could not be loaded.";
  updateButton();
});

if (musicButton) {
  musicButton.addEventListener("click", async () => {
    if (!audio.paused) {
      audio.pause();
      savePosition();
      if (musicStatus) musicStatus.textContent = "Blue paused.";
      return;
    }
    try {
      await audio.play();
      removeGestureListeners();
      if (musicStatus) musicStatus.textContent = "";
    } catch (error) {
      if (musicStatus) musicStatus.textContent = "The Blue audio file could not be loaded.";
    }
  });
}

document.addEventListener("pointerdown", startAfterGesture, true);
document.addEventListener("keydown", startAfterGesture, true);
window.addEventListener("pagehide", savePosition);

updateButton();
audio.play().catch((error) => {
  if (error.name === "NotAllowedError") {
    if (musicStatus) musicStatus.textContent = "Tap anywhere or press Play Blue to start the song.";
  } else if (musicStatus) {
    musicStatus.textContent = "The Blue audio file could not be loaded.";
  }
});
