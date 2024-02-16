//* Variables
const header = document.querySelector('header');
const headerMask = document.querySelector('.header-mask');
//
const sliderEl = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const dotsContainer = document.querySelector('.dots');
const dots = document.querySelectorAll('.dot');

//*  Sticky navigation
const headerCallback = function (entries) {
  const [entry] = entries;
  if (window.scrollY > 0) header.classList.add('active-header');
  else header.classList.remove('active-header');
};

const headerobserver = new IntersectionObserver(headerCallback, {
  root: null,
  threshold: 1,
});

headerobserver.observe(headerMask);

//* Slider

let curSlide = 0;
const maxSlide = slides.length;

function appearSlide(slide) {
  slides.forEach((s, i) => {
    if (i === slide) {
      s.style.position = 'static';
      dots[slide].style.backgroundColor = '#fff';
    } else {
      s.style.position = 'absolute';
      dots[i].style.backgroundColor = '#e8e6e6';
    }
    s.classList.remove('slide--active');
  });

  setTimeout(() => {
    slides[slide].classList.add('slide--active');
  }, 200);
}

nextBtn.addEventListener('click', function () {
  curSlide === maxSlide - 1 ? (curSlide = 0) : curSlide++;

  appearSlide(curSlide);
});

prevBtn.addEventListener('click', function () {
  curSlide === 0 ? (curSlide = maxSlide - 1) : curSlide--;

  appearSlide(curSlide);
});

dotsContainer.addEventListener('click', function (e) {
  if (!e.target.classList.contains('dot')) return;
  const slide = +e.target.dataset.slide;

  appearSlide(slide);
});
