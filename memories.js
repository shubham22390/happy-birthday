const slides = Array.from(document.querySelectorAll(".memory-slide"));
const count = document.getElementById("memoryCount");
const nextPhoto = document.getElementById("nextPhoto");
const clickMe = document.getElementById("clickMe");
const clickMessage = document.getElementById("clickMessage");
let currentSlide = 0;

function showSlide(index) {
  currentSlide = index;
  slides.forEach((slide, slideIndex) => {
    slide.hidden = slideIndex !== currentSlide;
  });
  count.textContent = (currentSlide + 1) + " / " + slides.length;
  if (clickMe) clickMe.setAttribute("aria-expanded", "false");
  if (clickMessage) clickMessage.hidden = true;
}

if (slides.length && count && nextPhoto) {
  nextPhoto.addEventListener("click", (event) => {
    if (currentSlide < slides.length - 1) {
      event.preventDefault();
      showSlide(currentSlide + 1);
    }
  });
}

if (clickMe && clickMessage) {
  clickMe.addEventListener("click", () => {
    const isExpanded = clickMe.getAttribute("aria-expanded") === "true";
    clickMe.setAttribute("aria-expanded", String(!isExpanded));
    clickMessage.hidden = isExpanded;
  });
}