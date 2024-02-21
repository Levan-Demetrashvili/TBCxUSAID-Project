'use strict';

//^ Variables
const header = document.querySelector('header');
const headerMask = document.querySelector('.header-mask');
//
const sliderEl = document.querySelector('.slider');
const slidesMask = document.querySelector('.slides-mask');
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const dotsContainer = document.querySelector('.dots');
const dots = document.querySelectorAll('.dot');

//^ Before load
// window.addEventListener('beforeunload', function () {
//   window.scrollTo(0, 0);
// });

//^  Sticky navigation
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

//^ Slider

let curSlide = 0;
const maxSlide = slides.length;

//* Functions
function appearSlide(slide) {
  slides.forEach((s, i) => {
    if (i === slide) {
      s.style.position = 'relative';
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

function nextSlide() {
  curSlide === maxSlide - 1 ? (curSlide = 0) : curSlide++;
  appearSlide(curSlide);
}
function prevSlide() {
  curSlide === 0 ? (curSlide = maxSlide - 1) : curSlide--;
  appearSlide(curSlide);
}

function Delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let clickable = true;
nextBtn.addEventListener('click', async function () {
  if (clickable) {
    nextSlide();
    clickable = false;
    await Delay(1000);
    clickable = true;
  }
});

prevBtn.addEventListener('click', async function () {
  if (clickable) {
    prevSlide();
    clickable = false;
    await Delay(1000);
    clickable = true;
  }
});

dotsContainer.addEventListener('click', async function (e) {
  if (!e.target.classList.contains('dot')) return;

  const slide = +e.target.dataset.slide;

  if (clickable) {
    appearSlide(slide);
    clickable = false;
    await Delay(1000);
    clickable = true;
  }
});

//*  Auto slider

function autoSliding(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  let sliderInterval;

  slidesMask.addEventListener('mouseleave', function (e) {
    if (e.relatedTarget.closest('.slider-btn') || e.relatedTarget.closest('.dot')) return;
    sliderInterval = setInterval(nextSlide, 5000);
  });
  slidesMask.addEventListener('mouseenter', function (e) {
    clearInterval(sliderInterval);
  });
}
const slideObserver = new IntersectionObserver(autoSliding, {
  root: null,
  threshold: 0,
});

slideObserver.observe(slidesMask);

// TODO: FAQ

const faqsCont = document.querySelector('.faqs');

faqsCont.addEventListener('click', function (e) {
  const faqEl = e.target.closest('.faq');
  if (!faqEl) return;

  faqEl.classList.toggle('faq--active');
  const faqMainHeight = parseFloat(window.getComputedStyle(faqEl.querySelector('.faq-main')).height);
  const faqAccordionHeight = parseFloat(window.getComputedStyle(faqEl.querySelector('.accordion-items')).height);
  faqEl.style.height = `${faqMainHeight + faqAccordionHeight}px`;

  if (!faqEl.classList.contains('faq--active')) faqEl.style.height = '80px';
});
