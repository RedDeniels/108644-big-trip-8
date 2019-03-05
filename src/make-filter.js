export default (filter) => `<input type="radio" id="filter-${filter}" name="filter" value="${filter}">
            <label class="trip-filter__item" for="filter-${filter}">${filter}</label>`;
