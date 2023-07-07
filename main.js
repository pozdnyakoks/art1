import Swiper from 'swiper';
import 'swiper/css';

import { Pagination, Mousewheel, EffectFade, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel';
import 'swiper/css/effect-fade';
// import 'swiper/css/navigation';

const burgerBtn = document.querySelector('.burger-btn');
const nav = document.querySelector('.nav');
burgerBtn.addEventListener('click', () => {
  nav.classList.toggle('active');
  burgerBtn.classList.toggle('active');
})


const apply = document.querySelector('#apply');
const modal = document.querySelector('.modal');

const closeModal = document.querySelector('.close-modal');

apply.addEventListener('click', () => {
  console.log('click')
  modal.classList.add('visible');
})

closeModal.addEventListener('click', () => {
  modal.classList.remove('visible');
})


document.addEventListener('click', (ev) => {
  if (ev.target.classList.contains('nav')) {
    nav.classList.remove('active');
    burgerBtn.classList.remove('active');
  }

  if (ev.target.classList.contains('modal')) {
    modal.classList.remove('visible');
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


const navLinks = document.querySelectorAll('.nav-list-item-link')
navLinks.forEach((link, ind) => {
  link.addEventListener('click', () => {
    mainSwiper.slideTo(ind);
    nav.classList.remove('active');
    burgerBtn.classList.remove('active');
  })
})


const bearsSwiper = new Swiper('.bears-swiper', {
  direction: 'vertical',
  slidesPerView: 5,
  spaceBetween: 0,
})

const educationSwiper = new Swiper('.education-swiper', {
  // modules: [Autoplay],

  // autoplay: {
  //   delay: 2500,
  // },
  // loop: true,


  direction: 'vertical',
  slidesPerView: 3.2,
  spaceBetween: 40,

})

const reviewsSwiper = new Swiper('.reviews-swiper', {
  modules: [Navigation, Autoplay],

  slidesPerView: 3,
  autoplay: {
    delay: 2500,
    // disableOnInteraction: false,
  },
  loop: true,


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




