import {API} from './api.js';

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
const TYPES_TRANSPORT = new Map([
  [`taxi`, `🚕`],
  [`bus`, `🚌`],
  [`train`, `🚂`],
  [`ship`, `🛳️`],
  [`transport`, `🚊`],
  [`drive`, `🚗`],
  [`flight`, `✈️`],
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
const MESSAGE_LOAD = `Loading route...`;
const MESSAGE_LOAD_ERR = `Something went wrong while loading your route info. Check your connection or try again later`;
const BUTTON_LOAD_TEXT = `Save`;
const BUTTON_LOAD_TEXT_BLOCK = `Saving...`;
const AUTHORIZATION = `Basic 5G1tlrydf1nP0n6=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
let destinations = [];
let offers = [];
api.getOffers()
  .then((data) => {
    offers = data;
  });
api.getDestinations()
  .then((data) => {
    destinations = data;
  });

export {TRIP_FILTER, TRIP_DAY_ITEMS, TYPES, TYPES_TRANSPORT, DESCRIPTIONS, OFFERS, FILTER_TITLES, MESSAGE_LOAD, MESSAGE_LOAD_ERR, BUTTON_LOAD_TEXT, BUTTON_LOAD_TEXT_BLOCK, api, destinations, offers};
