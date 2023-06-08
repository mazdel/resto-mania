import FavoriteButtonPresenter from '../../src/scripts/utils/favorite-button-presenter';
import FavoriteRestaurantIDB from '../../src/scripts/data/favorite-restaurants-idb';

const initFavRestoButton = async (restoData) => {
  await FavoriteButtonPresenter.init({
    container: document.querySelector('#fav-button-container'),
    resto: restoData,
    favoriteRestaurants: FavoriteRestaurantIDB,
  });
};

/* eslint import/prefer-default-export:"off" */
export { initFavRestoButton };
