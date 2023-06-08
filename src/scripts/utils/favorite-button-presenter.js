import {
  createFavoriteButton,
  createUnfavoriteButton,
} from '../views/templates/template-creator';

const FavoriteButtonPresenter = {
  async init({ container, resto, favoriteRestaurants }) {
    this.container = container;
    this.resto = resto;
    this.favoriteRestaurants = favoriteRestaurants;
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
    return !!(await this.favoriteRestaurants.get(id));
  },

  async favorite() {
    this.container.innerHTML = createFavoriteButton('fav-button');
    const favButton = document.querySelector('#fav-button');
    favButton.addEventListener('click', async () => {
      await this.favoriteRestaurants.put(this.resto);
      await this.render();
    });
  },
  async unfavorite() {
    this.container.innerHTML = createUnfavoriteButton('unfav-button');
    const unFavButton = document.querySelector('#unfav-button');
    unFavButton.addEventListener('click', async () => {
      await this.favoriteRestaurants.delete(this.resto.id);
      await this.render();
    });
  },
};
export default FavoriteButtonPresenter;
