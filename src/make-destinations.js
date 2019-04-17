import {destinations} from './data.js';

const makeDestinations = () => {
  let destinationStr = ``;
  destinations.forEach(function (value) {
    destinationStr = `${destinationStr} <option value="${value.country}">`;
  });
  return destinationStr;
};

export {makeDestinations};
