const slides = [
  {
    src: "844189586_1136011786044518_1339667936298903296_n.jpg",
    alt: "Playful sideways selfie in an orange patterned outfit"
  },
  {
    src: "846206971_1610883437193957_4491076504340182431_n.jpg",
    alt: "Portrait in a blue patterned outfit with heart stickers"
  },
  {
    src: "847452556_2637587086691244_3143761521648707467_n.jpg",
    alt: "Portrait in red in front of a red curtain"
  }
];

const image = document.getElementById("showcaseImage");
const count = document.getElementById("memoryCount");
const nextPhoto = document.getElementById("nextPhoto");
let currentSlide = 0;

function showSlide(index) {
  currentSlide = index;
  image.src = slides[currentSlide].src;
  image.alt = slides[currentSlide].alt;
  count.textContent = (currentSlide + 1) + " / " + slides.length;
}

if (image && count && nextPhoto) {
  nextPhoto.addEventListener("click", (event) => {
    if (currentSlide < slides.length - 1) {
      event.preventDefault();
      showSlide(currentSlide + 1);
    }
  });
}