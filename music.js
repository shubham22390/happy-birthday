const musicButton = document.querySelector(".music-toggle");
const musicStatus = document.querySelector(".music-status");
const songUrl = "https://www.youtube-nocookie.com/embed/IpFX2vq8HKw?autoplay=1&controls=1&playsinline=1&rel=0";
const playerWindowName = "birthdayBluePlayer";
const playerWindowFeatures = "popup=yes,width=420,height=270,resizable=yes,scrollbars=no";

function openBluePlayer() {
  const player = window.open(songUrl, playerWindowName, playerWindowFeatures);

  if (!player) {
    if (musicStatus) musicStatus.textContent = "Your browser blocked the song player. Allow pop-ups for this page to hear Blue.";
    return;
  }

  try {
    player.opener = null;
    player.blur();
    window.focus();
  } catch (error) {
    console.warn("The Blue player opened, but focus could not return to the birthday page.", error);
  }

  if (musicStatus) musicStatus.textContent = "Blue by yung kai is playing in its own player window. Keep that window open while you browse.";
}

if (musicButton) {
  musicButton.removeAttribute("aria-pressed");
  musicButton.setAttribute("aria-label", "Play Blue by yung kai in a separate player window");
  const label = musicButton.querySelector(".music-label");
  if (label) label.textContent = "Play Blue";
  musicButton.addEventListener("click", openBluePlayer);
}

const welcomeLink = document.querySelector(".welcome-open");
if (welcomeLink) welcomeLink.addEventListener("click", openBluePlayer, { capture: true });