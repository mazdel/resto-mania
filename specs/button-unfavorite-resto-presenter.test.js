import FavoriteRestaurantIDB from '../src/scripts/data/favorite-restaurants-idb';
import * as TestFactories from './helpers/testFactories';

describe('Unfavoriting a restaurant', () => {
  const addFavoriteButtonContainer = async () => {
    const element = /* html */ '<div id="fav-button-container"></div>';
    document.body.innerHTML = element;
  };

  beforeEach(async () => {
    await addFavoriteButtonContainer();
    await FavoriteRestaurantIDB.put({ id: 1 });
  });
  afterEach(async () => {
    await FavoriteRestaurantIDB.delete(1);
  });

  it('Should show un-favorite button when a restaurant has been favorited', async () => {
    await TestFactories.initFavRestoButton({ id: 1 });
    expect(
      document.querySelector('[aria-label="hapus dari favorit"]'),
    ).toBeTruthy();
  });

  it('Should not show favorite button when a restaurant is not been favorited', async () => {
    await TestFactories.initFavRestoButton({ id: 1 });
    expect(
      document.querySelector('[aria-label="tambahkan ke favorit"]'),
    ).toBeFalsy();
  });

  it('Should able un-favoriting the restaurant', async () => {
    await TestFactories.initFavRestoButton({ id: 1 });
    document
      .querySelector('[aria-label="hapus dari favorit"]')
      .dispatchEvent(new Event('click'));
    const resto = await FavoriteRestaurantIDB.get(1);
    expect(resto).toBeUndefined();
  });

  it('should not throw error if unfavorited resto is not in the list', async () => {
    await TestFactories.initFavRestoButton({ id: 1 });
    await FavoriteRestaurantIDB.delete(1);
    document
      .querySelector('[aria-label="hapus dari favorit"]')
      .dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIDB.getAll()).toEqual([]);
  });
});
