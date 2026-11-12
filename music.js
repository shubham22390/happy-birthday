const musicButton = document.querySelector(".music-toggle");
const musicStatus = document.querySelector(".music-status");
const songId = "IpFX2vq8HKw";
const songUrl = "https://www.youtube.com/watch?v=IpFX2vq8HKw";

if (musicButton) {
  let isPlaying = false;
  let playerPanel = null;

  function updateButton() {
    musicButton.setAttribute("aria-pressed", String(isPlaying));
    musicButton.setAttribute("aria-label", isPlaying ? "Pause Blue by yung kai" : "Play Blue by yung kai");
    const label = musicButton.querySelector(".music-label");
    if (label) label.textContent = isPlaying ? "Pause Blue" : "Play Blue";
  }

  function startSong() {
    playerPanel = document.createElement("aside");
    playerPanel.className = "song-player";
    playerPanel.setAttribute("aria-label", "Blue by yung kai video player");

    const frame = document.createElement("iframe");
    frame.title = "Blue by yung kai — official music video";
    frame.src = "https://www.youtube-nocookie.com/embed/" + songId + "?autoplay=1&playsinline=1&rel=0";
    frame.allow = "autoplay; encrypted-media; picture-in-picture; web-share";
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    frame.allowFullscreen = true;

    const link = document.createElement("a");
    link.href = songUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Open Blue by yung kai on YouTube";

    playerPanel.append(frame, link);
    document.body.append(playerPanel);
    isPlaying = true;
    if (musicStatus) musicStatus.textContent = "Playing Blue by yung kai. Use the player controls to pause or resume.";
    updateButton();
  }

  function stopSong() {
    playerPanel?.remove();
    playerPanel = null;
    isPlaying = false;
    if (musicStatus) musicStatus.textContent = "Blue paused.";
    updateButton();
  }

  musicButton.addEventListener("click", () => {
    if (isPlaying) stopSong();
    else startSong();
  });

  updateButton();
}