import DataSource from '../../data/data-source';
import { createDetailResto } from '../templates/template-creator';
import UrlParser from '../../routes/url-parser';
import CONFIG from '../../globals/config';

const Resto = {
  async render() {
    return /* html */ `
    <section id='hero'>
      <div class='hero'>
        <img id="resto-image" alt="hero image" src='/images/heros/hero-image_4.jpg'>
      </div>
    </section>
    <section class='content' id="content">
      <div class="head-content">
        <h2 id="resto-name">{{Memuat...}}</h2>
        <p id="resto-address">{{Memuat...}}</p>
        <p id="resto-categories" style="font-style:italic">{{Memuat...}}</p>
      </div>
      <div class="body-content" id="resto-detail">
        
      </div>
    </section>
    `;
  },
  async afterRender() {
    window.scrollTo(0, 0);
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const dataSource = await DataSource.detailRestaurant(url.id);
    const detailContainer = document.querySelector('#resto-detail');
    const nameContainer = document.querySelector('#resto-name');
    const addressContainer = document.querySelector('#resto-address');
    const imageContainer = document.querySelector('#resto-image');
    const categoriesContainer = document.querySelector('#resto-categories');

    nameContainer.innerHTML = dataSource.name;
    imageContainer.src = CONFIG.BASE_IMG_PATH.MEDIUM + dataSource.pictureId;
    addressContainer.innerHTML = `${dataSource.address}, ${dataSource.city}`;
    categoriesContainer.innerHTML = dataSource.categories
      .map((category) => category.name)
      .join(', ');
    detailContainer.innerHTML = createDetailResto(dataSource);

    console.log(dataSource);
  },
};
export default Resto;
