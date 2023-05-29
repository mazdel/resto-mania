import {
  createFavoriteButton,
  createUnfavoriteButton,
} from '../views/templates/template-creator';

import FavoriteRestaurantIDB from '../data/favorite-restaurants-idb';

const favoriteButtonInitiator = {
  async init({ container, resto }) {
    this.container = container;
    this.resto = resto;
    console.log(resto);
    await this.render();
  },

  async render() {
    const { id } = this.resto;
    if (await this.isRestoExist(id)) {
      await this.unfavorite();
      return;
    }
    await this.favorite();
  },

  async isRestoExist(id) {
    return !!(await FavoriteRestaurantIDB.get(id));
  },

  async favorite() {
    this.container.innerHTML = createFavoriteButton('fav-button');
    const favButton = document.querySelector('#fav-button');
    favButton.addEventListener('click', async () => {
      await FavoriteRestaurantIDB.put(this.resto);
      await this.render();
    });
  },
  async unfavorite() {
    this.container.innerHTML = createUnfavoriteButton('unfav-button');
    const unFavButton = document.querySelector('#unfav-button');
    unFavButton.addEventListener('click', async () => {
      await FavoriteRestaurantIDB.delete(this.resto.id);
      await this.render();
    });
  },
};
export default favoriteButtonInitiator;
