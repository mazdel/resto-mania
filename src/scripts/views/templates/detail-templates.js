import moment from 'moment/moment';

// prettier-ignore
const createListMenu = (menus) => (
  menus.map((menu) => /* html */ `<li>${menu.name}</li>`).join('')
);
// prettier-ignore
const createReview = (reviews) => (
  reviews.sort((reviewA, reviewB) => {
    moment.locale('id');
    return +moment(reviewB.date, 'DD MMMM YYYY') - +moment(reviewA.date, 'DD MMMM YYYY');
  }).map((review) => /* html */ `
      <section class="customer-review d-flex flex-wrap">
        <p class="customer-name col-6">${review.name}</p>
        <p class="review-date col-4">${review.date}</p>
        <p class="customer-comment col-10"> ${review.review} </p>
      </section>
  `).join(''));

const createReviewForm = (restoId) => /* html */ `
  <section class="customer-review d-flex flex-wrap">
  <form id="${restoId}" class="col-10 justify-content-space-between">
    <input type="hidden" name="id" value="${restoId}"/>
    <input class="form-control col-4 form-input" type="text" placeholder="Nama Anda" name="name">
    
    <input class="form-control form-input customer-comment col-8" type="text" placeholder="Review Anda" name="review">
    <button type="submit" form="${restoId}" class="form-control col-1">Kirim <span class="far fa-paper-plane"></span></button>
    </form>
    
  </section>`;

export { createListMenu, createReview, createReviewForm };
