import {randomCount} from './util.js';
import {Trip} from './trip.js';

const OFFER_PRICE_MAX = 100;
const OFFER_PRICE_MIN = 10;
const makeTripOffer = (offer) => `<li>
                <button class="trip-point__offer">${offer} +&euro;&nbsp;${randomCount(OFFER_PRICE_MAX, OFFER_PRICE_MIN)}</button>
              </li>`;

const makeTripEditOffer = (offer) => `<input class="point__offers-input visually-hidden" type="checkbox" id="${offer}" name="offer" value="${offer}">
          <label for="${offer}" class="point__offers-label">
            <span class="point__offer-service">${offer}</span> + €<span class="point__offer-price">${randomCount(OFFER_PRICE_MAX, OFFER_PRICE_MIN)}</span>
          </label>`;

const makeOffers = (trip) => {
  let offersStr = ``;
  trip._offers.forEach(function (value) {
    offersStr = `${offersStr} ${trip instanceof Trip ? makeTripOffer(value) : makeTripEditOffer(value)}`;
  });
  return offersStr;
};

export {makeOffers};
