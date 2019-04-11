import {Trip} from './trip.js';
import {TripEdit} from './trip-edit.js';
import {Filter} from './filter.js';
import {getPoint} from './point.js';
import {Statistic} from './statistic.js';
import {TYPES_TRANSPORT, TRIP_FILTER, TRIP_DAY_ITEMS, FILTER_TITLES} from './data.js';

const FILTER_CHECKED = FILTER_TITLES[0];
const TRIP_POINT_COUNT_START = 7;
let filters = [];
let trips = [];
let tripsEdit = [];
let tripsData = [];
let tripsSortingData = [];

const checkedFilter = (filter) => {
  if (filter._title === FILTER_CHECKED) {
    filter._element.querySelector(`input`).checked = true;
  }
};

const resetCards = () => {
  while (TRIP_DAY_ITEMS.firstChild) {
    TRIP_DAY_ITEMS.removeChild(TRIP_DAY_ITEMS.firstChild);
  }
};

const renderFilters = (filtersTitle) => {
  let template = document.createElement(`template`);
  let fragment = document.createDocumentFragment();
  filtersTitle.forEach(function (item) {
    filters[item] = new Filter(item);
    filters[item].render(template);
    for (let j = 0; j < template.children.length;) {
      fragment.appendChild(template.children[j]);
    }
    checkedFilter(filters[item]);
    filters[item]._onFilter = (filterName) => {
      switch (filterName) {
        case `everything`:
          tripsSortingData = tripsData.slice();
          break;
        case `future`:
          tripsSortingData = tripsData.filter((it) => it.timeStart > Date.now());
          break;
        case `past`:
          tripsSortingData = tripsData.filter((it) => it.timeStart < Date.now());
      }
      resetCards();
      renderTripPoint(tripsSortingData);
    };
  });
  TRIP_FILTER.appendChild(fragment);
};

renderFilters(FILTER_TITLES);

const renderTripPoint = (points) => {
  let template = document.createElement(`template`);
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < points.length; i++) {
    trips[i] = new Trip(points[i]);
    tripsEdit[i] = new TripEdit(points[i]);

    tripsEdit[i].onDelete = (trip) => {
      const index = tripsEdit.indexOf(trip);
      TRIP_DAY_ITEMS.removeChild(trip._element);
      trip.unrender();
      trips.splice(index, 1);
      tripsEdit.splice(index, 1);
      tripsData.splice(index, 1);
    };

    trips[i].transfer = (oldTrip) => {
      let newTrip = tripsEdit[trips.indexOf(oldTrip)];
      newTrip.render(TRIP_DAY_ITEMS);
      TRIP_DAY_ITEMS.replaceChild(tripsEdit[trips.indexOf(oldTrip)]._element, oldTrip._element);
      oldTrip.unrender();

      newTrip._onSubmit = (newObject) => {
        let trip = trips[tripsEdit.indexOf(newTrip)];
        let data = tripsData[tripsEdit.indexOf(newTrip)];

        data.type = newObject.type;
        data.country = newObject.country;
        data.timeStart = newObject.timeStart;
        data.timeFinish = newObject.timeFinish;
        data.price = newObject.price;
        data.offers = newObject.offers;
        data.description = newObject.description;
        data.photos = newObject.photos;

        trip.update(data);
        trip.render(TRIP_DAY_ITEMS);
        TRIP_DAY_ITEMS.replaceChild(trip._element, newTrip._element);
        newTrip.unrender();
        newTrip = new TripEdit(data);
      };
    };

    trips[i].render(template);
    for (let j = 0; j < template.children.length;) {
      fragment.appendChild(template.children[j]);
    }
  }

  TRIP_DAY_ITEMS.appendChild(fragment);
};
const makeTripPoints = (count) => {
  tripsData = new Array(count);
  for (let i = 0; i < tripsData.length; i++) {
    tripsData[i] = getPoint();
  }
  renderTripPoint(tripsData);
};
makeTripPoints(TRIP_POINT_COUNT_START);

const onTableClick = (evt) => {
  evt.preventDefault();
  document.querySelector(`.view-switch__item--table`).classList.add(`view-switch__item--active`);
  document.querySelector(`.statistic`).classList.add(`visually-hidden`);
  document.querySelector(`.view-switch__item--statistic`).classList.remove(`view-switch__item--active`);
  document.querySelector(`.main`).classList.remove(`visually-hidden`);
  document.querySelector(`.view-switch__item--table`).removeEventListener(`click`, onTableClick);
  document.querySelector(`.view-switch__item--statistic`).addEventListener(`click`, onStatisticClick);
};

const onStatisticClick = (evt) => {
  let moneyTypes = [];
  let moneyPrices = [];
  let transportTypes = [];
  let transportCounts = [];
  let transportStatistic = new Map([]);
  let transportTypesFilter = [];

  evt.preventDefault();
  document.querySelector(`.view-switch__item--statistic`).classList.add(`view-switch__item--active`);
  document.querySelector(`.main`).classList.add(`visually-hidden`);
  document.querySelector(`.view-switch__item--table`).classList.remove(`view-switch__item--active`);
  document.querySelector(`.statistic`).classList.remove(`visually-hidden`);
  document.querySelector(`.view-switch__item--table`).addEventListener(`click`, onTableClick);

  Array.from(TYPES_TRANSPORT).forEach(function (item) {
    transportTypesFilter.push(`${item[1]} ${item[0]}`.toUpperCase());
  });
  tripsData.forEach(function (item) {
    let type = `${Array.from(item.type)[0][1]} ${Array.from(item.type)[0][0]}`.toUpperCase();
    moneyTypes.push(type);
    moneyPrices.push(item.price);
    if (transportStatistic.has(type) && transportTypesFilter.find((it) => it === type)) {
      transportStatistic.set(type, transportStatistic.get(type) + 1);
    } else if (transportTypesFilter.find((it) => it === type)) {
      transportStatistic.set(type, 1);
    }
  });
  Array.from(transportStatistic).forEach(function (item) {
    transportTypes.push(item[0]);
    transportCounts.push(item[1]);
  });
  const moneyData = {
    types: moneyTypes,
    prices: moneyPrices,
  };
  const transportData = {
    types: transportTypes,
    counts: transportCounts,
  };

  return new Statistic(moneyData, transportData);
};

document.querySelector(`.view-switch__item--statistic`).addEventListener(`click`, onStatisticClick);
