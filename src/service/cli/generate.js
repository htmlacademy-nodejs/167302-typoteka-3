'use strict';

const fs = require(`fs`);
const {getRandomInt} = require(`./utils/getRandomInt`);
const {getRandomDate} = require(`./utils/getRandomDate`);
const {shuffle} = require(`./utils/shuffle`);
const {titles, categories, text, fileName, maxCount, defaultCount, warning, ExitCode} = require(`./utils/constants`);

const getMaxRandom = (min, max) => getRandomInt(min, max);
const getAttribute = (attributes, min, max) => {
  return shuffle(attributes).slice(min, max).join(` `);
};

const generateDescription = (count) => (
  Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    createdDate: getRandomDate(),
    announce: getAttribute(text, 0, 5),
    fullText: getAttribute(text, 0, getMaxRandom(1, text.length)),
    сategory: getAttribute(categories, 0, getMaxRandom(1, categories.length)),
  }))
);

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;

    if (count > maxCount) {
      console.log(warning);
      process.exit(ExitCode.error);
    }

    const countOffer = Number.parseInt(count, 10) || defaultCount;
    const content = JSON.stringify(generateDescription(countOffer), null, 2);

    fs.writeFile(fileName, content, (err) => {
      if (err) {
        return process.exit(ExitCode.error);
      }

      return process.exit(ExitCode.success);
    });
  }
};
