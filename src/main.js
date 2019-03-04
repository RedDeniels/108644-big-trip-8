import makeFilter from './make-filter.js';

const TRIP_FILTER = document.querySelector(`.trip-filter`);
const FILTER_TITLES = [
  `everything`,
  `future`,
  `past`
];
const FILTER_CHECKED = FILTER_TITLES[0];

const checkedFilter = function (fragment, filter) {
  fragment.getElementById(`filter-${filter}`).checked = true;
};

const switchFilter = function () {

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
