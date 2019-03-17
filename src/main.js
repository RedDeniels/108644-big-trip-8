import makeFilter from './make-filter.js';
import {Trip} from './trip.js';
import {TripEdit} from './trip-edit.js';
import {randomCount} from './util.js';
import {getPoint} from './data.js';

const TRIP_FILTER = document.querySelector(`.trip-filter`);
const TRIP_DAY_ITEMS = document.querySelector(`.trip-day__items`);
const FILTER_TITLES = [
  `everything`,
  `future`,
  `past`
];
const FILTER_CHECKED = FILTER_TITLES[0];
const TRIP_POINT_COUNT_START = 7;
let trips = [];

const checkedFilter = (fragment, filter) => {
  fragment.getElementById(`filter-${filter}`).checked = true;
};

const resetCards = () => {
  while (TRIP_DAY_ITEMS.firstChild) {
    TRIP_DAY_ITEMS.removeChild(TRIP_DAY_ITEMS.firstChild);
  }
  makeTripPoints(randomCount(10));
};

const onFilterClick = () => resetCards();

const switchFilter = () => {
  let filters = document.querySelectorAll(`.trip-filter__item`);
  for (let i = 0; i < filters.length; i++) {
    filters[i].addEventListener(`click`, onFilterClick);
  }
};

const renderFilters = (filters) => {
  let template = document.createElement(`template`);
  let fragment = document.createDocumentFragment();
  filters.forEach(function (item) {
    template.insertAdjacentHTML(`beforeend`, makeFilter(item));
    for (let j = 0; j < template.children.length;) {
      fragment.appendChild(template.children[j]);
    }
  });
  checkedFilter(fragment, FILTER_CHECKED);
  TRIP_FILTER.appendChild(fragment);
  switchFilter();
};

renderFilters(FILTER_TITLES);

const renderTripPoint = (points) => {
  let template = document.createElement(`template`);
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < points.length; i++) {
    trips[i] = new Trip(points[i]);
    trips[i].render(template);
    for (let j = 0; j < template.children.length;) {
      fragment.appendChild(template.children[j]);
    }
  }
  TRIP_DAY_ITEMS.appendChild(fragment);
};

const makeTripPoints = (count) => {
  let tripPoints = new Array(count);
  for (let i = 0; i < tripPoints.length; i++) {
    tripPoints[i] = getPoint();
  }
  renderTripPoint(tripPoints);
};

makeTripPoints(TRIP_POINT_COUNT_START);

export {TRIP_DAY_ITEMS};
