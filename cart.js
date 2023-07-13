import Swiper from 'swiper';
import IMask from 'imask';
import 'swiper/css';
import promos from './promos';
import '/public/styles/cart.css'
import { Navigation } from 'swiper/modules';

const deliveryPrice = 600;
let isDelivery = false;
let isPromo = false;


function build() {
  const lsData = localStorage.getItem('artMarket');
  const cart = document.getElementById('cart')
  if (lsData === null || JSON.parse(lsData).length === 0) {
    cart.innerHTML = `
  <h2 class="title">корзина </h2>
   <div class="container">
      <img class="cart-img" src="./img/empty-cart.svg" alt="пустая корзина">
      <h2 class="empty-cart-title">ой! в корзине пока пусто</h2>
      <a href="/#market" class="btn empty-btn">перейти в маркет</a>
   </div> 
`
    return;
  } else {
    const num = isDelivery ? getTotal() + deliveryPrice : getTotal();

    cart.innerHTML = `
    <div class="container full-cart">
    ${fullCartItems()}
    <div class="cart-info">
      <form action="/" class="cart-form">
      <div class="cart-promo">
        <input class="cart-info-promo" type="text" placeholder="промокод">
        <button class="cart-info-promo-btn">проверить</button>
      </div>
        <fieldset class="cart-fieldset">
          <legend class="cart-fieldset-title">способ получения</legend>
          <label class="cart-label" for="pickup">
            <input ${isDelivery ? '' : 'checked'} id="pickup" type="radio" class="cart-radio" name="delivery" value="pickup">
            <span>самовывоз</span> <span class="radio-price">0 ₽</span>
          </label>
          <label class="cart-label" for="pickup">
            <input ${isDelivery ? 'checked' : ''} id="pickup" type="radio" class="cart-radio" name="delivery" value="delivery">
            <span>доставка</span> <span class="radio-price">600 ₽</span>
          </label>
        </fieldset>
        <div class="form-inputs">
          <input id="cartNameInput" class="cart-input" type="text" name="name" placeholder="ИМЯ ПОЛУЧАТЕЛЯ">
          <input id="cartPhoneInput" class="cart-input cart-add-input" type="tel" name="tel" placeholder="КОНТАКТНЫЙ НОМЕР ТЕЛЕФОНА">
          ${isDelivery ? '<input id="cartAddressInput" class="cart-input" type="text" name="address" placeholder="АДРЕС ДОСТАВКИ">' : ''}
        </div>
        <div class="cart-total-block">
          <p class="cart-total-desc">ИТОГО</p>
          <p class="cart-total-desc"><span id="total">${num.toLocaleString('ru-RU')}</span>₽</p>
        </div>

        <button class="cart-btn" disabled>оформить заказ</button>
      </form>        
  </div>
  `
  }
  const cartSwiper = new Swiper('.cart-swiper', {
    modules: [Navigation],

    direction: 'vertical',
    slidesPerView: 2,
    spaceBetweesn: 20,
    navigation: {
      nextEl: '.next-cart',
      prevEl: '.prev-cart',
    },
  });
}

build();

const lsData = localStorage.getItem('artMarket')
if (lsData !== null && JSON.parse(lsData).length > 0) {
  document.querySelector('.cart-link-count').classList.remove('visible');

  moreOrLess();
  deleteItem();
  getTotal();
  changeDelivery();
  validation()
  checkInputs();
  checkPromo();
  document.querySelector('.cart-form').addEventListener('submit', (ev) => submitForm(ev))
}

function changeDelivery() {
  let radioBtns = document.querySelectorAll('input[type="radio"]');
  const wrap = document.querySelector('.form-inputs');
  radioBtns.forEach(btn => {
    btn.addEventListener('change', () => {
      if (btn.value == 'delivery') {
        isDelivery = true;
        wrap.innerHTML = `
          <input id="cartNameInput" class="cart-input" type="text" name="name" placeholder="ИМЯ ПОЛУЧАТЕЛЯ">
          <input id="cartPhoneInput" class="cart-input cart-add-input" type="tel" name="tel" placeholder="КОНТАКТНЫЙ НОМЕР ТЕЛЕФОНА">
          <input id="cartAddressInput" class="cart-input" type="text" name="address" placeholder="АДРЕС ДОСТАВКИ">
          `
        changeTotal();
        validation()
        checkInputs();
      } else {

        isDelivery = false;
        wrap.innerHTML = `
          <input id="cartNameInput" class="cart-input" type="text" name="name" placeholder="ИМЯ ПОЛУЧАТЕЛЯ">
          <input id="cartPhoneInput" class="cart-input cart-add-input" type="tel" name="tel" placeholder="КОНТАКТНЫЙ НОМЕР ТЕЛЕФОНА">
          `
        changeTotal();
        validation()
        checkInputs();
      }
    })
  })

}


function getTotal() {
  const lsData = localStorage.getItem('artMarket');
  const arr = JSON.parse(lsData);
  let total = arr.reduce((acc, el) => acc += el.count * el.price, 0);
  return total;
}

function changeTotal() {
  const total = document.getElementById('total');

  const totalDel = isDelivery ? getTotal() + deliveryPrice : getTotal();
  const totalNum = isPromo ? totalDel - countPromo(totalDel) : totalDel

  total.textContent = totalNum.toLocaleString("ru-RU");
}

function fullCartItems() {
  const lsData = localStorage.getItem('artMarket');

  const arr = JSON.parse(lsData);

  let items = '';

  arr.forEach(item => {
    items += `
    <div class="cart-items-row swiper-slide">
      <img class="cart-item-img" src="${item.img}" alt="${item.name}">
      <p class="cart-item-name">${item.name}<span class="cart-item-size">${item.info}</span></p>
      <p class="cart-item-price">${item.price.toLocaleString("ru-RU")}</p>
      <div class="cart-item-count">
        <button class="cart-item-less cart-item-btn" data-price=${item.price} data-id=${item.id}>-</button>
        <span class="cart-item-number">${item.count}</span>
        <button class="cart-item-more cart-item-btn" data-price=${item.price} data-id=${item.id}>+</button>
      </div>
      <p class="cart-item-price cart-item-total">${(item.price * item.count).toLocaleString("ru-RU")}</p>
      <button class="cart-item-delete" data-id=${item.id}><img src=" /img/delete.svg" alt="удалить"></button>
    </div>
   `
  })

  return `
    <div class="cart-items">
      <div class="cart-items-row cart-items-title ">
        <span class="cart-items-row-price">цена</span><span class="cart-items-row-count">количество</span><span
          class="cart-items-row-total">итого</span>
      </div>

      <div class="swiper cart-swiper">
        <div class="swiper-wrapper">
          ${items} 
        </div>

      </div>

      <p class="cart-delivery-info">
       ${isDelivery ? 'Информация о доставке Информация о доставке Информация о доставке Информация о доставке Информация о доставке Информация о доставке' : 'Забрать покупку можно по адресу: Марджани, 24, 3 этаж, студия 318 С&nbsp;понедельника по воскресенье с 16:00 до 20:00'} 
      </p>
      <button class="prev-cart cart-nav"><img src="./img/reviews/prev.svg" alt="предыдущий"></button>
      <button class="next-cart cart-nav"><img src="./img/reviews/prev.svg" alt="следующий"></button>
    </div>

  `

}

function moreOrLess() {

  const more = document.querySelectorAll('.cart-item-more');
  const less = document.querySelectorAll('.cart-item-less');
  const countInfo = document.querySelectorAll('.cart-item-number');
  const countTotal = document.querySelectorAll('.cart-item-total');

  countInfo.forEach((count, ind) => {
    if (count.textContent == '1') {
      less[ind].disabled = true;
    } else {
      less[ind].disabled = false;

    }
  })

  more.forEach((btn, ind) => {
    btn.addEventListener('click', () => {

      const num = Number(countInfo[ind].textContent);
      countInfo[ind].textContent = String(num + 1);
      less[ind].disabled = false;
      countTotal[ind].textContent = ((num + 1) * btn.dataset.price).toLocaleString("ru-RU")

      const lsData = localStorage.getItem('artMarket');
      const arr = JSON.parse(lsData);
      const newAr = arr.map(el => {
        if (el.id == btn.dataset.id) {
          return {
            ...el,
            count: num + 1
          }
        } else return el
      })
      localStorage.setItem('artMarket', JSON.stringify(newAr))
      changeTotal();
    })

  })

  less.forEach((btn, ind) => {
    btn.addEventListener('click', () => {
      const num = Number(countInfo[ind].textContent);
      if (num - 1 === 1) btn.disabled = true
      else btn.disabled = false
      countInfo[ind].textContent = String(num - 1);
      countTotal[ind].textContent = ((num - 1) * btn.dataset.price).toLocaleString("ru-RU");


      const lsData = localStorage.getItem('artMarket');
      const arr = JSON.parse(lsData);
      const newAr = arr.map(el => {
        if (el.id == btn.dataset.id) {
          return {
            ...el,
            count: num - 1
          }
        } else return el
      })
      localStorage.setItem('artMarket', JSON.stringify(newAr));
      changeTotal();
    })
  })

}

function deleteItem() {
  const deleteBtn = document.querySelectorAll('.cart-item-delete');

  deleteBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      const lsData = localStorage.getItem('artMarket');
      const arr = JSON.parse(lsData);
      const fil = arr.filter(el => el.id !== btn.dataset.id);
      localStorage.setItem('artMarket', JSON.stringify(fil));

      build();
      moreOrLess();
      deleteItem();
      changeDelivery();
      validation()
      checkInputs();
      document.querySelector('.cart-form').addEventListener('submit', (ev) => submitForm(ev))
      checkPromo();
    })
  })
}

function validation() {
  const btn = document.querySelector('.cart-btn');
  const name = document.getElementById('cartNameInput');
  const address = document.getElementById('cartAddressInput');
  const phone = document.getElementById('cartPhoneInput');
  const isAddress = address === null ? true : address.value.length > 5;

  btn.disabled = !(name.value.length > 1 && phone.value.length === 15 && isAddress);
}

function checkInputs() {
  const phoneMask = new IMask(document.getElementById('cartPhoneInput'), {
    mask: "0 000 000 00 00",
  });

  const name = document.getElementById('cartNameInput');
  const address = document.getElementById('cartAddressInput');
  const phone = document.getElementById('cartPhoneInput');
  name.addEventListener('input', validation);
  phone.addEventListener('input', validation);
  if (address !== null) {
    address.addEventListener('input', validation)
  }

}

function submitForm(ev) {
  ev.preventDefault();
  const form = document.querySelector('.cart-form')
  const formData = new FormData(form);

  const promo = document.querySelector('.cart-info-promo')
  if (promo.classList.contains('valid-promo')) {
    formData.append('promo', promo.value);
  }

  const lsData = localStorage.getItem('artMarket');
  const arr = JSON.parse(lsData);
  arr.forEach(el => {
    formData.append(`ItemId - ${el.id}`, `количество - ${el.count}`);
  })

  formData.append('Итого', isDelivery ? getTotal() + deliveryPrice : getTotal());


  const request = new XMLHttpRequest();
  request.open("POST", "/mail.php", true);
  request.send(formData);
  form.reset();

  cart.innerHTML = `
    <h2 class="title">корзина </h2>
    <div class="container">
      <img class="cart-img" src="./img/done-cart.svg" alt="заказ оформлен">
        <h2 class="empty-cart-title">Заказ оформлен!</h2>
        <p class="cart-desc">Пожалуйста, дождитесь звонка для подтверждения информации</p>
        <a href="/#market" class="btn empty-btn">перейти в маркет</a>
    </div>
  `
  localStorage.clear();
  document.querySelector('.cart-link-count').classList.remove('visible');
}

function checkPromo() {
  const promoInput = document.querySelector('.cart-info-promo');
  const promoBtn = document.querySelector('.cart-info-promo-btn');

  promoBtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    const val = promoInput.value;
    const find = promos.find(el => el == val.toUpperCase())
    if (val !== '' && find !== undefined) {
      isPromo = true;
      promoInput.classList.remove('invalid-promo');
      promoInput.classList.add('valid-promo');
      promoBtn.classList.remove('invalid-btn');
      promoBtn.classList.add('valid-btn');
      promoBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="24" viewBox="0 0 35 24" fill="none">
        <path d="M12 23L34 1" stroke="#C2AC8F" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 23L1 12" stroke="#C2AC8F" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `
      changeTotal()
    } else {
      isPromo = false;
      promoInput.classList.remove('valid-promo');
      promoInput.classList.add('invalid-promo');
      promoBtn.classList.remove('valid-btn');
      promoBtn.classList.add('invalid-btn');
      promoBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="25" viewBox="0 0 26 25" fill="none">
        <path d="M2 24L24 2" stroke="#C2AC8F" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M24 24L2 2" stroke="#C2AC8F" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `
    }

    promoInput.addEventListener("input", () => {
      isPromo = false;
      promoInput.classList.remove('valid-promo');
      promoInput.classList.remove('invalid-promo');
      promoBtn.classList.remove('valid-btn');
      promoBtn.classList.remove('invalid-btn');
      promoBtn.innerHTML = `проверить`
    })

  })


}

function countPromo(total) {
  const promoInput = document.querySelector('.cart-info-promo');
  if (promoInput.value.toUpperCase() == 'СКИДКА') {
    return total * 0.05
  }
  else if (promoInput.value.toUpperCase() == 'СУПЕР!') {
    return total * 0.1
  }
  return 0;


}


