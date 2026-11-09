const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let isNavigating = false;

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href]");
  if (
    !link ||
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    link.target ||
    link.hasAttribute("download")
  ) return;

  const destination = new URL(link.href, window.location.href);
  if (
    destination.origin !== window.location.origin ||
    !destination.pathname.endsWith(".html") ||
    destination.pathname === window.location.pathname
  ) return;

  if (reducedMotion) return;

  event.preventDefault();
  if (isNavigating) return;
  isNavigating = true;
  document.body.classList.add("page-leaving");
  window.setTimeout(() => {
    window.location.href = destination.href;
  }, 350);
});
