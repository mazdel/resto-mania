import ellipsisParagraph from '../../utils/ellipsis-paragraph';
import CONFIG from '../../globals/config';
import { createListMenu, createReview } from './detail-templates';

const createRestoItem = (resto) => /* html */ `
  <article id='${resto.id}' class="item-content col-3 col-md-10">
    <figure class='item-content-head'>
      
        <div class="item-legend-left">${resto.city || ''}</div>
        <div class="item-legend-right">${resto.rating || ''}</div>
      
      <div class='item-image'>
        <img src='${CONFIG.BASE_IMG_PATH.SMALL}${resto.pictureId}'/>
      </div>
    </figure>
    <summary class='item-content-body'>
    <h3>
      <a href="/#/resto/${resto.id}"> 
        ${resto.name || ''}
      </a>
    </h3>
      <p>${ellipsisParagraph(resto.description || '', 40)}</p>
    </summary>
  </article>
`;

const createNotFoundResto = () => /* html */ `
  <article id='resto-not-found' class="item-content col-10">
    <figure class='item-content-head'>
      <div class='item-image'>
        <img src='/images/heros/hero-image_4.jpg'/>
      </div>
    </figure>
    <summary class='item-content-body'>
    <h3>
      <a href='/'> 
        Restaurant tidak ditemukan
      </a>
    </h3>
      <p></p>
    </summary>
  </article>
`;

const createDetailResto = (resto) => /* html */ `
  
  <article id="resto-description" class="detail-content col-10 ">
    <p>${resto.description}</p>
  </article>
  <article id="resto-menus" class="d-flex flex-wrap justify-content-space-between justify-md-content-center col-10">
    <section id="resto-foods" class="detail-content col-4 col-md-10 ">
      <h3>Daftar Makanan</h3>
      <p>
        <ul>
        ${createListMenu(resto.menus.foods)}
        </ul>
      </p>
    </section>
    <section id="resto-drinks" class="detail-content col-4 col-md-10 ">
      <h3>Daftar Minuman</h3>
      <p>
        <ul>
          ${createListMenu(resto.menus.drinks)}
        </ul>
      </p>
    </section>
  </article>
  <article id="resto-reviews" class="detail-content col-10 d-flex flex-col-top justify-content-center">
    <h3>Review para mania</h3>
    <div id="newReview">
    </div>
    <div id="reviews" class="detail-content">
    ${createReview(resto.customerReviews)}
    </div>
    
  </article>
`;

const createFavoriteButton = (id = 'fav-button') => /* html */ `
  <button aria-label="tambahkan ke favorit" class="FAB" id="${id}">
    <span class="far fa-heart"></span>
  </button>
`;
const createUnfavoriteButton = (id = 'unfav-button') => /* html */ `
  <button aria-label="hapus dari favorit" class="FAB" id="${id}">
    <span class="fas fa-heart"></span>
  </button>
`;
export {
  createRestoItem,
  createDetailResto,
  createFavoriteButton,
  createUnfavoriteButton,
  createNotFoundResto,
};
