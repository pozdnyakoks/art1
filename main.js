import Swiper from 'swiper';
import 'swiper/css';

import { Pagination, Mousewheel, EffectFade, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel';
import 'swiper/css/effect-fade';

import market from '/market.js';
import IMask from 'imask';
market();


const apply = document.querySelectorAll('.apply');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal');
const selectSingle = document.querySelector('.modal-select');
const selectSingle_title = selectSingle.querySelector('.modal-select__title');
const selectSingle_labels = selectSingle.querySelectorAll('.modal-select__label');

// Toggle menu
selectSingle_title.addEventListener('click', () => {
  if ('active' === selectSingle.getAttribute('data-state')) {
    selectSingle.setAttribute('data-state', '');
  } else {
    selectSingle.setAttribute('data-state', 'active');
  }
});

// Close when click to option
for (let i = 0; i < selectSingle_labels.length; i++) {
  selectSingle_labels[i].addEventListener('click', (evt) => {
    selectSingle_title.textContent = evt.target.textContent;
    selectSingle.setAttribute('data-state', '');
  });
}

closeModal.addEventListener('click', () => {
  modal.classList.remove('visible');
})

apply.forEach(btn => {
  btn.addEventListener('click', () => {
    modal.classList.add('visible');
    const value = btn.dataset.value;
    const choosen = document.querySelector(`input[value=${value}]`)
    choosen.checked = true;
    selectSingle_title.textContent = document.querySelector(`label[for=${choosen.getAttribute('id')}]`).textContent;
  })
})

document.addEventListener('click', (ev) => {
  if (ev.target.classList.contains('modal')) {
    modal.classList.remove('visible');
  }
  if (ev.target.classList.contains('modal-market')) {
    document.querySelector('.modal-market').classList.remove('visible');
  }

  if (ev.target.classList.contains('modal-market-close') || ev.target.parentElement.classList.contains('modal-market-close')) {
    document.querySelector('.modal-market').classList.remove('visible');
  }
})

const mainSwiper = new Swiper('.main-swiper', {
  modules: [Pagination, Mousewheel, EffectFade],
  mousewheel: true,
  speed: 0,

  pagination: {
    el: '.main-swiper-pagination',
    clickable: true,
  },
});

const slides = document.querySelectorAll('.slide-content')
slides.forEach(slide => {
  slide.classList.add('unvisible');
})
document.querySelector('.swiper-slide-active .slide-content').classList.remove('unvisible')
const backLogo = document.querySelector('.backLogo')

mainSwiper.on('beforeTransitionStart', function () {
  slides.forEach(slide => {
    slide.classList.add('unvisible');
  })
  document.querySelector('.swiper-slide-active .slide-content').classList.remove('unvisible')
});

mainSwiper.on('slideChange', function () {
  if (mainSwiper.activeIndex % 2 !== 0) backLogo.classList.add('left')
  else backLogo.classList.remove('left')
});

const nav = document.querySelector('.nav');
const burgerBtn = document.querySelector('.burger-btn');

const navLinks = document.querySelectorAll('.nav-list-item-link')
navLinks.forEach((link, ind) => {
  link.addEventListener('click', () => {
    mainSwiper.slideTo(ind);
    nav.classList.remove('active');
    burgerBtn.classList.remove('active');
  })
})

function linkFromCart() {
  const path = document.location.hash;
  if (path !== '') {
    const sections = document.querySelectorAll('.section');
    const curr = document.querySelector(path);
    const ind = Array.from(sections).indexOf(curr)
    mainSwiper.slideTo(ind);
  }
  document.location.hash = '';
}

linkFromCart();


const bearsSwiper = new Swiper('.bears-swiper', {
  modules: [Autoplay],

  speed: 3000,
  direction: 'vertical',
  slidesPerView: 4.7,
  spaceBetween: 0,

  // autoplay: {
  //   delay: 0,
  //   disableOnInteraction: false,
  // },
  // loop: true,

})

const educationSwiper = new Swiper('.education-swiper', {
  modules: [Autoplay],
  speed: 3000,

  autoplay: {
    delay: 1,
  },
  // loop: true,


  direction: 'vertical',
  slidesPerView: 3.2,
  // spaceBetween: 40,

})

const marketSwiper = new Swiper('.market-swiper', {
  modules: [Navigation],

  direction: 'vertical',
  slidesPerView: 2,
  spaceBetweesn: 50,
  navigation: {
    nextEl: '.next-market',
    prevEl: '.prev-market',
  },
})

const reviewsSwiper = new Swiper('.reviews-swiper', {
  modules: [Navigation, Autoplay],
  direction: 'vertical',

  slidesPerView: 1,
  spaceBetween: 50,
  // autoplay: {
  // delay: 2500,
  // disableOnInteraction: false,
  // },
  // loop: true,


  navigation: {
    nextEl: '.reviews-slider-next',
    prevEl: '.reviews-slider-prev',
  },

})

ymaps.ready(init);
function init() {
  const myMap = new ymaps.Map("map", {
    center: [55.779474, 49.128126],
    zoom: 15,
  });


  const myPlacemark = new ymaps.Placemark(
    [55.779094, 49.119125], {},
    {
      iconLayout: "default#image",
      iconImageHref: '/img/mapBear.png',
      iconImageSize: [85, 100],
      iconImageOffset: [-17, -50],
    }
  )

  myMap.geoObjects
    .add(myPlacemark)

}

const name = document.getElementById('modalName');
const tel = document.getElementById('modalTel');
const email = document.getElementById('modalEmail');
const modalBtn = document.querySelector('.modal-btn');
const form = document.querySelector('.form')

const phoneMask = new IMask(tel, {
  mask: "0 000 000 00 00",
});

function validation() {
  const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  modalBtn.disabled = !(name.value.length > 1 && tel.value.length === 15 && emailReg.test(email.value))
}

name.addEventListener('input', validation)
tel.addEventListener('input', validation)
email.addEventListener('input', validation)

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const formData = new FormData(form);

  const request = new XMLHttpRequest();
  request.open("POST", "/mail.php", true);
  request.send(formData);

  form.reset();

  modal.classList.remove('visible');

})


