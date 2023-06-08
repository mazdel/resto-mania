import { itActAsFavoriteRestoModel } from './contracts/favorite-resto-idb';
import FavoriteRestaurantIDB from '../src/scripts/data/favorite-restaurants-idb';

describe('Favorite Restaurant IDB Contract Test', () => {
  afterEach(async () => {
    (await FavoriteRestaurantIDB.getAll()).forEach(async (resto) => {
      await FavoriteRestaurantIDB.delete(resto.id);
    });
  });

  itActAsFavoriteRestoModel(FavoriteRestaurantIDB);
});
