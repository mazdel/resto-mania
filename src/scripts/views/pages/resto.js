import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import DataSource from '../../data/data-source';
import { createDetailResto } from '../templates/template-creator';
import FavoriteButtonPresenter from '../../utils/favorite-button-presenter';
import FavoriteRestaurantIDB from '../../data/favorite-restaurants-idb';
import newReview from '../../utils/form-review';
import UrlParser from '../../routes/url-parser';
import CONFIG from '../../globals/config';

const Resto = {
  async render() {
    // TODO: fill lazyload from afterrender
    return /* html */ `
    <section id='hero'>
      <div class='hero'>
        <picture>
          <source id="resto-image-alt-768" media="(min-width: 768px)" data-srcset="/images/alt_heroes/vietnamese-food.jpg">
          <source id="resto-image-alt-480" media="(min-width: 480px)" data-srcset="/images/alt_heroes/vietnamese-food-medium.jpg">
          <img id="resto-image" alt="hero image" class="lazyload" data-src='/images/alt_heroes/vietnamese-food-small.jpg' src="/images/alt_heroes/vietnamese-food-lqip.jpg">
        </picture>
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
      <div id="fav-button-container"></div>
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
    const imageContainerAlt480 = document.querySelector('#resto-image-alt-480');
    const imageContainerAlt768 = document.querySelector('#resto-image-alt-768');

    const categoriesContainer = document.querySelector('#resto-categories');
    const favButtonContainer = document.querySelector('#fav-button-container');

    nameContainer.innerHTML = dataSource.name;
    imageContainer.src = CONFIG.BASE_IMG_PATH.SMALL + dataSource.pictureId;

    imageContainerAlt480.srcset = `
      ${CONFIG.BASE_IMG_PATH.MEDIUM}${dataSource.pictureId}
    `;

    imageContainerAlt768.srcset = `
      ${CONFIG.BASE_IMG_PATH.LARGE + dataSource.pictureId}
    `;
    addressContainer.innerHTML = `${dataSource.address}, ${dataSource.city}`;
    categoriesContainer.innerHTML = dataSource.categories
      .map((category) => category.name)
      .join(', ');
    detailContainer.innerHTML = await createDetailResto(dataSource);

    await FavoriteButtonPresenter.init({
      container: favButtonContainer,
      favoriteRestaurants: FavoriteRestaurantIDB,
      resto: {
        id: dataSource.id,
        name: dataSource.name,
        description: dataSource.description,
        city: dataSource.city,
        address: dataSource.address,
        pictureId: dataSource.pictureId,
        categories: dataSource.categories,
        menus: dataSource.menus,
        rating: dataSource.rating,
        customerReviews: dataSource.customerReviews,
      },
    });
    await newReview.init({
      idResto: dataSource.id,
      idContainer: '#newReview',
      idResultContainer: '#reviews',
    });
  },
};
export default Resto;
