const confetti = document.querySelector('.confetti');

function celebrate(amount = 70) {
  if (!confetti) return;
  const colors = ['#ec4d7a', '#ffc03d', '#7865d8', '#5dc7af', '#ff8c67'];
  for (let i = 0; i < amount; i += 1) {
    const piece = document.createElement('i');
    piece.className = 'piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty('--drift', `${(Math.random() - .5) * 220}px`);
    piece.style.animationDelay = `${Math.random() * .3}s`;
    confetti.append(piece);
    piece.addEventListener('animationend', () => piece.remove());
  }
}

document.querySelector('.confetti-button')?.addEventListener('click', () => {
  celebrate();
  setTimeout(() => { window.location.href = 'wishes.html'; }, 620);
});
