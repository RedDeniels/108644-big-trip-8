import {randomCount} from './util.js';

const types = new Map([
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

const getType = () => {
  let index = 0;
  let randomIndex = randomCount(types.size);
  let type = [];
  for (let pair of types.entries()) {
    if (randomIndex === index) {
      type = pair;
    }
    index++;
  }
  return type;
};

const getPoint = () => ({
  type: getType(),

});

export {getPoint};
