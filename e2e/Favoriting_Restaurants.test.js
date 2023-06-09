const assert = require('assert');

Feature('Favoriting Restaurants');

const doFavoriteARestaurant = async (I) => {
  I.see('Tidak ada Restaurant untuk ditampilkan', '.item-content');

  I.amOnPage('/');
  I.seeElement('#resto-list .item-content-body a');
  I.click(locate('#resto-list .item-content-body a').at(1));
  I.seeElement('#fav-button');
  I.click('#fav-button');
  const targetRestoName = await I.grabTextFrom('#resto-name');

  I.amOnPage('/#/favorite');
  I.see('Daftar Resto Favoritmu', '.fav-page');
  I.dontSee('Tidak ada Restaurant untuk ditampilkan', '.item-content');
  I.seeElement('#resto-list .item-content');
  I.see(targetRestoName, '#resto-list .item-content');
  const favoritedRestoName = (
    await I.grabTextFrom('#resto-list .item-content-body h3 a')
  ).trim();
  assert.strictEqual(targetRestoName, favoritedRestoName);
};

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('Show empty favorited Restaurants', async ({ I }) => {
  I.seeElement('#resto-list');
  I.see('Tidak ada Restaurant untuk ditampilkan', '#resto-not-found');
});

Scenario('Do favorite a restaurant', async ({ I }) => {
  await doFavoriteARestaurant(I);
});

Scenario('Undo favorite a restaurant', async ({ I }) => {
  await doFavoriteARestaurant(I);
  I.amOnPage('/#/favorite');
  I.dontSee('Tidak ada Restaurant untuk ditampilkan', '.item-content');
  I.click(locate('#resto-list .item-content-body a').last());
  I.seeElement('#unfav-button');
  I.click('#unfav-button');
  const targetRestoName = await I.grabTextFrom('#resto-name');
  I.amOnPage('/#/favorite');
  I.see('Daftar Resto Favoritmu', '.fav-page');
  I.dontSee(targetRestoName, '.item-content-body h3 a');
});
