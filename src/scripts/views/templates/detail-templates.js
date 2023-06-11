// import moment from 'moment/moment';
// prettier-ignore
const createListMenu = (menus) => (
  menus.map((menu) => /* html */ `<li>${menu.name}</li>`).join('')
);
// prettier-ignore
const createReview = async (reviews) => {
  const { default: moment } = await import('moment/moment');

  return reviews.sort((reviewA, reviewB) => {
    moment.locale('id');
    return +moment(reviewB.date, 'DD MMMM YYYY') - +moment(reviewA.date, 'DD MMMM YYYY');
  }).map((review) => /* html */ `
      <section class="customer-review d-flex flex-wrap">
        <p class="customer-name col-6">${review.name}</p>
        <p class="review-date col-4">${review.date}</p>
        <p class="customer-comment col-10"> ${review.review} </p>
      </section>
  `).join('');
};

const createReviewForm = (restoId) => /* html */ `
  <section class="customer-review d-flex flex-wrap">
  <form id="${restoId}" class="col-10 justify-content-space-between">
    <input type="hidden" name="id" value="${restoId}"/>
    <input class="form-control col-4 form-input" type="text" placeholder="Nama Anda" name="name">
    
    <input class="form-control form-input customer-comment col-8" type="text" placeholder="Review Anda" name="review">
    <button type="submit" form="${restoId}" class="form-control col-1">Kirim <span class="far fa-paper-plane"></span></button>
    </form>
    
  </section>`;

const createRestoPicture = async ({
  original, medium, small, lqip,
}) => {
  await import('lazysizes');

  const innerHTML = /* html */ `
    <picture>
      <source id="resto-image-alt-768" media="(min-width: 768px)" data-srcset="${medium}">
      <source id="resto-image-alt-480" media="(min-width: 480px)" data-srcset="${small}">
      <img id="resto-image" alt="hero image" class="lazyload" data-src='${original}' src="${lqip}">
    </picture>
  `;
  return innerHTML;
};
// prettier-ignore
export {
  createListMenu,
  createReview,
  createReviewForm,
  createRestoPicture,
};
