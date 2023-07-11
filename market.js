import items from './market.json'


export default function market() {
  const arr = items.items;
  const lsData = localStorage.getItem('artMarket');
  let count = 0;
  let slides = '';
  const cartCount = document.querySelector('.cart-link-count');
  const cart = document.querySelector('.cart-link');

  for (let i = 0; i < arr.length;) {
    slides += `<div class="swiper-slide market-slide">`
    for (let j = 0; j < 4 && i < arr.length; j++) {
      let inLs = false;
      if (lsData !== null) {
        const find = JSON.parse(lsData).find(el => el.id == arr[i]['id']);
        inLs = find !== undefined;
      }
      slides += `
      <div class="market-card">
        <img class="market-card-img" src=${arr[i].img} alt=${arr[i].name} data-available=${arr[i].available} data-img='${arr[i].img}' data-id='${arr[i].id}' data-desc='${arr[i].description}' data-name='${arr[i].name}' data-price='${arr[i].price}'>
        <p class="market-card-desc">
          <span class="market-card-name">${arr[i].name}</span>
          <span class="market-card-price">${arr[i].price}</span>
        </p>
        <button data-id=${arr[i].id} data-name=${arr[i].name} data-price=${arr[i].price} data-img=${arr[i].img} class="btn market-btn ${inLs ? "market-incart" : ''}" ${arr[i].available ? '' : 'disabled'}><span class="market-btn-text">${inLs ? 'В корзине' : 'В корзину'}</span><svg class="market-btn-svg"
            xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path d="M5 9L13 1" stroke="#EFEBE4" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M5 9L1 5" stroke="#EFEBE4" stroke-linecap="round" stroke-linejoin="round" />
          </svg></button>
      </div>
    `
      i++
    }
    slides += `</div>`

  }

  document.querySelector('.market-swiper .swiper-wrapper').insertAdjacentHTML('afterbegin', slides)

  function toLS() {
    this.classList.add('market-incart');
    this.querySelector('.market-btn-text').textContent = 'В корзине';

    if (count === 0) {
      cart.classList.add('cart-link-animate');
      cartCount.classList.add('visible');
    }
    count++;
    cartCount.textContent = count;
    const lsData = localStorage.getItem('artMarket');

    if (lsData === null) {
      let data = [{
        id: this.dataset.id,
        count: 1,
        name: this.dataset.name,
        price: this.dataset.price,
        img: this.dataset.img
      }];
      localStorage.setItem('artMarket', JSON.stringify(data));
    } else {
      const lsAr = JSON.parse(lsData);
      lsAr.push({
        id: this.dataset.id,
        count: 1,
        name: this.dataset.name,
        price: this.dataset.price,
        img: this.dataset.img
      })
      localStorage.setItem('artMarket', JSON.stringify(lsAr));
    }

  }

  const marketBtns = document.querySelectorAll('.market-btn')
  marketBtns.forEach(btn => {
    if (!btn.classList.contains('market-incart')) {
      console.log('hhh')
      btn.addEventListener('click', toLS);
    }
  })

  const marketCardsImg = document.querySelectorAll('.market-card-img');

  marketCardsImg.forEach(card => {
    card.addEventListener('click', (ev) => {
      const modal = document.querySelector('.modal-market');

      modal.querySelector('.modal-market-name').textContent = card.dataset.name;
      modal.querySelector('.modal-market-desc').textContent = card.dataset.desc;
      modal.querySelector('.modal-market-price').textContent = card.dataset.price;
      modal.querySelector('.modal-market-img').setAttribute('src', card.dataset.img);

      const modalBtn = modal.querySelector('.modal-market-btn');

      modalBtn.dataset.id = card.dataset.id;
      modalBtn.dataset.name = card.dataset.name;
      modalBtn.dataset.price = card.dataset.price;
      modalBtn.dataset.img = card.dataset.img;

      modalBtn.disabled = card.dataset.available == 'false';
      modal.classList.add('visible');
      if (lsData !== null) {
        const find = JSON.parse(lsData).find(el => el.id == card.dataset.id);
        console.log(find)
        if (find !== undefined) {
          modalBtn.disabled = false;
          modalBtn.classList.add('market-incart');
          modal.querySelector('.modal-market-btn-text').textContent = 'В корзине';
        }
      }
      if (!modalBtn.classList.contains('market-incart')) {
        modalBtn.addEventListener('click', toLS);
      }

    })
  })


}