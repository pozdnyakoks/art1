import Swiper from 'swiper';
import 'swiper/css';

import { Pagination, Mousewheel, EffectFade, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel';
import 'swiper/css/effect-fade';

import market from '/market.js';

market();


const apply = document.querySelector('#apply');
const modal = document.querySelector('.modal');

const closeModal = document.querySelector('.close-modal');


closeModal.addEventListener('click', () => {
  modal.classList.remove('visible');
})


apply.addEventListener('click', () => {
  modal.classList.add('visible');
})

document.addEventListener('click', (ev) => {
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
  // spaceBetween: 40,

})

const marketSwiper = new Swiper('.market-swiper', {
  direction: 'vertical',
  slidesPerView: 2,
  spaceBetweesn: 40,
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

// Reset title
// const reset = document.querySelector('.reset');
// reset.addEventListener('click', () => {
//   selectSingle_title.textContent = selectSingle_title.getAttribute('data-default');
// });
