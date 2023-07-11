const burgerBtn = document.querySelector('.burger-btn');
const nav = document.querySelector('.nav');
burgerBtn.addEventListener('click', () => {
  nav.classList.toggle('active');
  burgerBtn.classList.toggle('active');
})

const modal = document.querySelector('.modal');


document.addEventListener('click', (ev) => {
  if (ev.target.classList.contains('nav')) {
    nav.classList.remove('active');
    burgerBtn.classList.remove('active');
  }
})


const lsData = localStorage.getItem('artMarket');
let count = 0;
let slides = '';
const cartCount = document.querySelector('.cart-link-count');
const cart = document.querySelector('.cart-link');

if (lsData !== null) {
  const length = JSON.parse(lsData).length;
  count = length;
  if (length > 0) {
    cartCount.classList.add('visible');
    cartCount.textContent = count;
  } else {
    cartCount.classList.remove('visible');
  }
}
