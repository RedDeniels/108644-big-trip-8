import {randomCount} from './util.js';

const OFFER_PRICE_MAX = 100;
const OFFER_PRICE_MIN = 10;
const makeOffer = (offer) => `<li>
                <button class="trip-point__offer">${offer} +&euro;&nbsp;${randomCount(OFFER_PRICE_MAX, OFFER_PRICE_MIN)}</button>
              </li>`;

const makeOffers = (offers) => {
  let offersStr = ``;
  offers.forEach(function (value) {
    offersStr = `${offersStr} ${makeOffer(value)}`;
  });
  return offersStr;
};

export {makeOffers};
