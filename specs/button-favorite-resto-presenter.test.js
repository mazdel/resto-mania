import FavoriteRestaurantIDB from '../src/scripts/data/favorite-restaurants-idb';
import * as TestFactories from './helpers/testFactories';

describe('Favoriting a restaurant', () => {
  const addFavoriteButtonContainer = async () => {
    const element = /* html */ '<div id="fav-button-container"></div>';
    document.body.innerHTML = element;
  };

  beforeEach(async () => {
    await addFavoriteButtonContainer();
  });

  it('Should show favorite button when a restaurant is not been favorited', async () => {
    await TestFactories.initFavRestoButton({ id: 1 });
    expect(
      document.querySelector('[aria-label="tambahkan ke favorit"]'),
    ).toBeTruthy();
  });

  it('Should not show un-favorite button when a restaurant is not been favorited', async () => {
    await TestFactories.initFavRestoButton({ id: 1 });
    expect(
      document.querySelector('[aria-label="hapus dari favorit"]'),
    ).toBeFalsy();
  });

  it('Should able favoriting the restaurant', async () => {
    await TestFactories.initFavRestoButton({ id: 1 });
    document
      .querySelector('[aria-label="tambahkan ke favorit"]')
      .dispatchEvent(new Event('click'));
    const resto = await FavoriteRestaurantIDB.get(1);
    expect(resto).toEqual({ id: 1 });

    await FavoriteRestaurantIDB.delete(1);
  });

  it('should not add a resto again when its already favorited', async () => {
    await TestFactories.initFavRestoButton({ id: 1 });
    await FavoriteRestaurantIDB.put({ id: 1 });
    document
      .querySelector('[aria-label="tambahkan ke favorit"]')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIDB.getAll()).toEqual([{ id: 1 }]);

    await FavoriteRestaurantIDB.delete(1);
  });

  it('should not add when resto has no data', async () => {
    await TestFactories.initFavRestoButton({});

    document
      .querySelector('[aria-label="tambahkan ke favorit"]')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIDB.getAll()).toEqual([]);
  });
});
