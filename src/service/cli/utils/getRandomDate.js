"use strict";

const {getRandomInt} = require(`./getRandomInt`);

const today = new Date();
const dayInThePast = new Date(
    today.getFullYear(),
    today.getMonth() - 2,
    today.getDate()
);

const pad = (number) => `${number}`.padStart(2, `0`);

const formatter = (date) =>
  [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map((num) => pad(num))
    .join(`-`) +
  ` ` +
  [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map((num) => pad(num))
    .join(`:`);

const getRandomDate = () => {
  const dt = new Date(getRandomInt(dayInThePast, today));
  return formatter(dt);
};

module.exports = {
  getRandomDate
};
