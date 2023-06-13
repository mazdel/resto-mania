const assert = require('assert');

const doAnchorTest = async (I) => {
  let countVisibleElement = await I.grabNumberOfVisibleElements('a');
  /* eslint-disable no-await-in-loop */
  let elementNum = 1;
  while (elementNum <= countVisibleElement) {
    const clickableLocation = locate('a').at(elementNum);
    const clickables = await I.grabElementBoundingRect(clickableLocation);
    if (clickables) {
      const clickableWord = await I.grabTextFrom(clickableLocation);
      console.log(clickableWord, clickables);
      assert(clickables.height >= 44);
      assert(clickables.width >= 44);
    } else {
      countVisibleElement += 1;
    }
    elementNum += 1;
  }
  /* eslint-enable */
};
const doButtonTest = async (I) => {
  let countVisibleElement = await I.grabNumberOfVisibleElements('button');

  /* eslint-disable no-await-in-loop */
  let elementNum = 1;
  while (elementNum <= countVisibleElement) {
    const clickableLocation = locate('button').at(elementNum);
    const clickables = await I.grabElementBoundingRect(clickableLocation);
    if (clickables) {
      const clickableWord = await I.grabTextFrom(clickableLocation);
      console.log(clickableWord, clickables);
      assert(clickables.height >= 44);
      assert(clickables.width >= 44);
    } else {
      countVisibleElement += 1;
    }
    elementNum += 1;
  }
  /* eslint-enable */
};

const doInputTest = async (I) => {
  let countVisibleElement = await I.grabNumberOfVisibleElements('input');

  /* eslint-disable no-await-in-loop */
  let elementNum = 1;
  while (elementNum <= countVisibleElement) {
    const clickableLocation = locate('input').at(elementNum);
    const clickables = await I.grabElementBoundingRect(clickableLocation);
    if (clickables) {
      const clickableWord = await I.grabAttributeFrom(
        clickableLocation,
        'placeholder',
      );
      console.log(clickableWord, clickables);
      assert(clickables.height >= 44);
      assert(clickables.width >= 44);
    } else {
      countVisibleElement += 1;
    }
    elementNum += 1;
  }
  /* eslint-enable */
};
module.exports = { doButtonTest, doAnchorTest, doInputTest };
