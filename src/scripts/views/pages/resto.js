import DataSource from '../../data/data-source';
import { createDetailResto } from '../templates/template-creator';
import { createRestoPicture } from '../templates/detail-templates';
import FavoriteButtonPresenter from '../../utils/favorite-button-presenter';
import FavoriteRestaurantIDB from '../../data/favorite-restaurants-idb';
import newReview from '../../utils/form-review';
import UrlParser from '../../routes/url-parser';
import CONFIG from '../../globals/config';

const Resto = {
  async render() {
    return /* html */ `
    <section id='hero'>
      <div class='hero'>
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

    const heroContainer = document.querySelector('#hero');

    const categoriesContainer = document.querySelector('#resto-categories');
    const favButtonContainer = document.querySelector('#fav-button-container');

    nameContainer.innerHTML = dataSource.name;
    heroContainer.innerHTML = await createRestoPicture({
      original: `${CONFIG.BASE_IMG_PATH.LARGE + dataSource.pictureId}`,
      medium: `${CONFIG.BASE_IMG_PATH.MEDIUM}${dataSource.pictureId}`,
      small: CONFIG.BASE_IMG_PATH.SMALL + dataSource.pictureId,
      lqip: CONFIG.BASE_IMG_PATH.SMALL + dataSource.pictureId,
    });

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
