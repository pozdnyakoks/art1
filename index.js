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