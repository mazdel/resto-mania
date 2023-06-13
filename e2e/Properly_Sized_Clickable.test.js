/// <reference path="../steps.d.ts" />
const assert = require('assert');
const {
  doAnchorTest,
  doButtonTest,
  doInputTest,
} = require('./contracts/ClickableContracts');

Feature('All clickables have to be properly sized');

Scenario('Clickable Anchor on Homepage', async ({ I }) => {
  I.amOnPage('/');
  await doAnchorTest(I);
});

Scenario('Clickable Button on Homepage', async ({ I }) => {
  I.amOnPage('/');
  await doButtonTest(I);
});

Scenario('Clickable Anchor on Favorite', async ({ I }) => {
  I.amOnPage('/');
  await doAnchorTest(I);
});

Scenario('Clickable Button on Favorite', async ({ I }) => {
  I.amOnPage('/');
  await doButtonTest(I);
});

Scenario('Clickable Anchor on Detail Resto', async ({ I }) => {
  I.amOnPage('/');
  I.seeElement('#resto-list .item-content');

  const targetLocation = locate('#resto-list .item-content').at(2);
  const idResto = await I.grabAttributeFrom(targetLocation, 'id');
  I.waitForElement(`article#${idResto} .item-content-body a`, 20);

  const restoTargetTitle = (
    await I.grabTextFrom(`article#${idResto} .item-content-body a`)
  ).trim();
  I.click(`article#${idResto} .item-content-body a`);

  I.waitForElement('.body-content .detail-content', 20);
  I.seeElement('#resto-name');
  const restoDetailTitle = (await I.grabTextFrom('#resto-name')).trim();
  assert.strictEqual(restoDetailTitle, restoTargetTitle);
  await doAnchorTest(I);
});

Scenario('Clickable Button on Detail Resto', async ({ I }) => {
  I.amOnPage('/');
  I.seeElement('#resto-list .item-content');

  const targetLocation = locate('#resto-list .item-content').at(2);
  const idResto = await I.grabAttributeFrom(targetLocation, 'id');
  I.waitForElement(`article#${idResto} .item-content-body a`, 20);

  const restoTargetTitle = (
    await I.grabTextFrom(`article#${idResto} .item-content-body a`)
  ).trim();
  I.click(`article#${idResto} .item-content-body a`);

  I.waitForElement('.body-content .detail-content', 20);
  I.seeElement('#resto-name');
  const restoDetailTitle = (await I.grabTextFrom('#resto-name')).trim();
  assert.strictEqual(restoDetailTitle, restoTargetTitle);

  await doButtonTest(I);
});

Scenario('Clickable Input on Detail Resto', async ({ I }) => {
  I.amOnPage('/');
  I.seeElement('#resto-list .item-content');

  const targetLocation = locate('#resto-list .item-content').at(2);
  const idResto = await I.grabAttributeFrom(targetLocation, 'id');
  I.waitForElement(`article#${idResto} .item-content-body a`, 20);

  const restoTargetTitle = (
    await I.grabTextFrom(`article#${idResto} .item-content-body a`)
  ).trim();
  I.click(`article#${idResto} .item-content-body a`);

  I.waitForElement('.body-content .detail-content', 20);
  I.seeElement('#resto-name');
  const restoDetailTitle = (await I.grabTextFrom('#resto-name')).trim();
  assert.strictEqual(restoDetailTitle, restoTargetTitle);

  await doInputTest(I);
});
