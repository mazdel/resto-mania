import FavoriteRestaurantsIDB from '../../data/favorite-restaurants-idb';
import {
  createRestoItem,
  createNotFoundResto,
} from '../templates/template-creator';

const Favorite = {
  async render() {
    return /* html */ `
    <section class='content' id="content">
      <div class="head-content fav-page">
        <h2>Daftar Resto Favoritmu</h2>
      </div>
      <div class="body-content" id="resto-list">
      </div>
    </section>
    `;
  },

  async afterRender() {
    window.scrollTo(0, 0);
    const dataSource = await FavoriteRestaurantsIDB.getAll();
    const restoContainer = document.querySelector('#resto-list');
    if (dataSource.length === 0) {
      restoContainer.innerHTML = createNotFoundResto();
    }
    dataSource.forEach((resto) => {
      restoContainer.innerHTML += createRestoItem(resto);
    });
  },
};
export default Favorite;
