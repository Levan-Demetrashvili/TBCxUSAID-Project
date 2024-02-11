const header = document.querySelector('header');
const headerMask = document.querySelector('.header-mask');

//*  Sticky navigation
const headerHeight = header.getBoundingClientRect().height;
const headerCallback = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (window.scrollY > 0) header.classList.add('active-header');
  else header.classList.remove('active-header');
};

const headerobserver = new IntersectionObserver(headerCallback, {
  root: null,
  threshold: 1,
});

headerobserver.observe(headerMask);
