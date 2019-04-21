import {Trip} from './trip.js';

const MAX_TRIP_OFFERS = 3;

const makeTripOffer = (offer) => `<li>
                <button class="trip-point__offer">${offer.title} +&euro;&nbsp;${offer.price}</button>
              </li>`;

const makeTripEditOffer = (offer) => `<div class='point__offers-item'><input class="point__offers-input visually-hidden" type="checkbox" id="${offer.title}" name="offer" value="${offer.title}" ${offer.accepted ? `checked` : ``}>
          <label for="${offer.title}" class="point__offers-label">
            <span class="point__offer-service">${offer.title}</span> + €<span class="point__offer-price">${offer.price}</span>
          </label></div>`;

const makeOffers = (trip) => {
  let offersStr = ``;
  let offers = [];
  const maxOffers = trip._offers.length >= 3 && trip instanceof Trip ? MAX_TRIP_OFFERS : trip._offers.length;
  for (let i = 0; i < maxOffers; i++) {
    offers[i] = trip._offers[i];
  }
  offers.forEach(function (value) {
    offersStr = `${offersStr} ${trip instanceof Trip ? makeTripOffer(value) : makeTripEditOffer(value)}`;
  });
  return offersStr;
};

export {makeOffers};
