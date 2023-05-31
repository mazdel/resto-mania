import {
  createReviewForm,
  createReview,
} from '../views/templates/detail-templates';
import DataSource from '../data/data-source';
import parseForm from './form-parser';

const newReview = {
  async init({ idResto, idContainer, idResultContainer }) {
    this.idResto = idResto;
    this.container = document.querySelector(idContainer);
    this.resultContainer = document.querySelector(idResultContainer);

    await this.render();
  },
  async render() {
    const template = createReviewForm(this.idResto);
    this.container.innerHTML = template;
    const form = document.querySelector(`form#${this.idResto}`);
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const data = parseForm(form);
      const result = await DataSource.postReview(data);
      this.resultContainer.innerHTML = createReview(result.customerReviews);
      if (result.error === false) {
        form.reset();
      }
    });
  },
};

export default newReview;
