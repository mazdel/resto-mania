import ellipsisParagraph from '../../utils/ellipsis-paragraph';
import CONFIG from '../../globals/config';

const createRestoItem = (resto) => /* html */ `
  <article id='${resto.id}' class="item-content col-3 col-md-10">
    <figure class='item-content-head'>
      
        <div class="item-legend-left">${resto.city}</div>
        <div class="item-legend-right">${resto.rating}</div>
      
      <div class='item-image'>
        <img src='${CONFIG.BASE_IMG_PATH.SMALL}${resto.pictureId}'/>
      </div>
    </figure>
    <summary class='item-content-body'>
    <h3><a href='/#/resto/${resto.id}'> ${resto.name}</a></h3>
      <p>${ellipsisParagraph(resto.description, 40)}</p>
    </summary>
  </article>
`;

// prettier-ignore
const createListMenu = (menus) => (
  menus.map((menu) => /* html */ `<li>${menu.name}</li>`).join('')
);
// prettier-ignore
const createReview = (reviews) => (
  reviews.map((review) => /* html */ `
      <section class="customer-review d-flex flex-wrap">
        <p class="customer-name col-6">${review.name}</p>
        <p class="review-date col-4">${review.date}</p>
        <p class="customer-comment col-10"> ${review.review} </p>
      </section>
  `).join(''));

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
    ${createReview(resto.customerReviews)}
  </article>
`;

export { createRestoItem, createDetailResto };
