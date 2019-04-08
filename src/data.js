import {randomCount} from './util.js';

const OFFER_PRICE_MAX = 100;
const OFFER_PRICE_MIN = 10;
const DESCRIPTIONS_MAX = 5;
const DESCRIPTIONS_MIN = 3;
const OFFERS_MIN = 1;
const OFFERS_MAX = 3;
const PRICE_MAX = 300;
const PRICE_MIN = 10;
const PHOTO_MAX = 10;
const PHOTO_MIN = 5;
const TYPES = new Map([
  [`taxi`, `🚕`],
  [`bus`, `🚌`],
  [`train`, `🚂`],
  [`ship`, `🛳️`],
  [`transport`, `🚊`],
  [`drive`, `🚗`],
  [`flight`, `✈️`],
  [`check-in`, `🏨`],
  [`sightseeing`, `🏛️`],
  [`restaurant`, `🍴`],
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
  return new Map([[type[0], type[1]]]);
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

const getPhotos = (count) => {
  let photos = [];
  for (let i = 0; i < count; i++) {
    photos[i] = `//picsum.photos/100/100?r=${Math.random()}`;
  }
  return photos;
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
  offers: getOffers(randomCount(OFFERS_MAX, OFFERS_MIN)),
  description: getDescription(),
  photos: getPhotos(randomCount(PHOTO_MAX, PHOTO_MIN)),
});

export {getPoint, OFFER_PRICE_MAX, OFFER_PRICE_MIN, TYPES};
