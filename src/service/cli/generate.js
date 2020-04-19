'use strict';

const fs = require(`fs`);
const {getRandomInt} = require(`./utils/getRandomInt`);
const {getRandomDate} = require(`./utils/getRandomDate`);
const {shuffle} = require(`./utils/shuffle`);
const {titles, categories, text, fileName, maxCount, defaultCount, warning, ExitCode} = require(`./utils/constants`);

const generateDescription = (count) => (
  Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    createdDate: getRandomDate(),
    announce: shuffle(text).slice(1, 5).join(` `),
    fullText: shuffle(text).slice(1, getRandomInt(1, text.length)).join(` `),
    сategory: [categories[getRandomInt(0, categories.length - 1)]],
  }))
);

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || defaultCount;
    const content = JSON.stringify(generateDescription(countOffer), null, 2);

    if (count > maxCount) {
      console.log(warning);
      process.exit(ExitCode.error);
    }

    fs.writeFile(fileName, content, (err) => {
      if (err) {
        return process.exit(ExitCode.error);
      }

      return process.exit(ExitCode.success);
    });
  }
};
