import {randomCount} from './util.js';

const DESCRIPTIONS_MAX = 3;
const DESCRIPTIONS_MIN = 1;
const OFFERS_MAX = 3;
const PRICE_MAX = 300;
const PRICE_MIN = 10;
const HOUR_MAX = 24;
const MINUTES_MAX = 60;
const TYPES = new Map([
  [`Taxi`, `🚕`],
  [`Bus`, `🚌`],
  [`Train`, `🚂`],
  [`Ship`, `🛳️`],
  [`Transport`, `🚊`],
  [`Drive`, `🚗`],
  [`Flight`, `✈️`],
  [`Check-in`, `🏨`],
  [`Sightseeing`, `🏛️`],
  [`Restaurant`, `🍴`],
]);
const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];
const OFFERS = [
  `Add luggage`,
  `Switch to comfort class`,
  `Add meal`,
  `Choose seats`,
];

const getType = () => {
  let index = 0;
  let randomIndex = randomCount(TYPES.size);
  let type = [];
  for (let pair of TYPES.entries()) {
    if (randomIndex === index) {
      type = pair;
    }
    index++;
  }
  return type;
};

const getDescription = () => {
  let description = ``;
  for (let i = 0; i < randomCount(DESCRIPTIONS_MAX, DESCRIPTIONS_MIN); i++) {
    description = `${description} ${DESCRIPTIONS[randomCount(DESCRIPTIONS.length)]}`;
  }
  return description;
};

const getOffers = (count) => {
  let offers = OFFERS.slice();
  let pointOffers = [];
  for (let i = 0; i < count; i++) {
    let delIndex = randomCount(offers.length);
    pointOffers[i] = offers[delIndex];
    offers.splice(delIndex, 1);
  }
  return pointOffers;
};

const getPoint = () => ({
  type: getType(),
  country: [
    `Venice`,
    `Hong Kong`,
    `Istanbul`,
    `New York`,
    `London`,
    `Chefchaouen`,
    `Paris`,
  ][randomCount(7)],
  timeStart: Date.now() + randomCount(7 * 24 * 60 * 60 * 1000),
  timeFinish: Date.now() + randomCount(10 * 24 * 60 * 60 * 1000, 8 * 24 * 60 * 60 * 1000),
  price: randomCount(PRICE_MAX, PRICE_MIN),
  offers: getOffers(randomCount(OFFERS_MAX)),
  description: getDescription(),
});

export {getPoint};
