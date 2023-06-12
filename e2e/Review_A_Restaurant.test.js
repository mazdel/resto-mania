/// <reference path="../steps.d.ts" />
const moment = require('moment/moment');
const assert = require('assert');
const random = require('./helpers/randomizer');

const username = `e2e-name-${moment().format('MMMDDHm')}`;
const review = `e2e-review-${moment().format('MMMDDHm')}`;
let idResto;
Feature('Review A Restaurant');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('Leave a Review', async ({ I }) => {
  I.seeElement('#resto-list .item-content');
  const countVisibleElement = await I.grabNumberOfVisibleElements(
    '#resto-list .item-content',
  );
  const randomElement = random.between(1, countVisibleElement);
  const targetLocation = locate('#resto-list .item-content').at(randomElement);
  idResto = await I.grabAttributeFrom(targetLocation, 'id');
  I.waitForElement(`article#${idResto} .item-content-body a`, 10);

  const restoTargetTitle = (
    await I.grabTextFrom(`article#${idResto} .item-content-body a`)
  ).trim();
  I.click(`article#${idResto} .item-content-body a`);

  I.waitForElement('.body-content .detail-content', 10);
  I.seeElement('#resto-name');
  const restoDetailTitle = (await I.grabTextFrom('#resto-name')).trim();
  assert.strictEqual(restoDetailTitle, restoTargetTitle);
  I.see('Review para mania', '#resto-reviews h3');
  // prettier-ignore
  const inputNameLocation = (
    '#newReview .customer-review form input[placeholder="Nama Anda"]'
  );
  // prettier-ignore
  const inputReviewLocation = (
    '#newReview .customer-review form input[placeholder="Review Anda"]'
  );
  I.seeElement(inputNameLocation);
  I.fillField(inputNameLocation, username);
  I.seeElement(inputReviewLocation);
  I.fillField(inputReviewLocation, review);
  I.click('#newReview .customer-review form button');
  I.seeElement(locate('.customer-review .customer-name').withText(username));
  I.seeElement(locate('.customer-review .customer-comment').withText(review));

  console.log(idResto, randomElement, restoTargetTitle);
});

Scenario('View my last review', async ({ I }) => {
  I.seeElement('#resto-list .item-content');
  I.waitForElement(`article#${idResto} .item-content-body a`, 10);
  I.click(`article#${idResto} .item-content-body a`);
  I.see('Review para mania', '#resto-reviews h3');
  I.seeElement(locate('.customer-review .customer-name').withText(username));
  I.seeElement(locate('.customer-review .customer-comment').withText(review));
});
