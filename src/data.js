const TRIP_FILTER = document.querySelector(`.trip-filter`);
const TRIP_DAY_ITEMS = document.querySelector(`.trip-day__items`);
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
const FILTER_TITLES = [
  `everything`,
  `future`,
  `past`
];

export {TRIP_FILTER, TRIP_DAY_ITEMS, TYPES, DESCRIPTIONS, OFFERS, FILTER_TITLES};
