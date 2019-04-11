import Component from './component.js';

class Filter extends Component {
  constructor(title) {
    super();
    this._title = title;
    this._check = false;

    this._onFilter = null;
    this._onFilterClick = this._onFilterClick.bind(this);
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  _onFilterClick() {
    if (typeof this._onFilter === `function`) {
      this._onFilter(this._title);
    }
  }

  bind() {
    this._element.querySelector(`.trip-filter__item`).addEventListener(`click`, this._onFilterClick);
  }

  unbind() {
    this._element.querySelector(`.trip-filter__item`).removeEventListener(`click`, this._onFilterClick);
  }

  get template() {
    return `<span><input type="radio" id="filter-${this._title}" name="filter" value="${this._title}"><label class="trip-filter__item" for="filter-${this._title}">${this._title}</label></span>`.trim();
  }
}

export {Filter};
