import Component from './component.js';
import moment from 'moment';
import {makeOffers} from './make-offers.js';
import {createElement} from './create-element.js';
import flatpickr from 'flatpickr';
import {TYPES} from './data.js';

class TripEdit extends Component {
  constructor(data) {
    super();
    this._type = data.type;
    this._country = data.country;
    this._timeStart = data.timeStart;
    this._timeFinish = data.timeFinish;
    this._price = data.price;
    this._offers = data.offers;
    this._description = data.description;
    this._photos = data.photos;

    this._onSubmit = null;
    this._onDelete = null;
    this._onSubmitClick = this._onSubmitClick.bind(this);
    this._onDeleteClick = this._onDeleteClick.bind(this);

    this._state.isStartDate = false;
    this._onChangeStartDate = this._onChangeStartDate.bind(this);
    this._state.isFinishDate = false;
    this._onChangeFinishDate = this._onChangeFinishDate.bind(this);

    this._onTypeClick = this._onTypeClick.bind(this);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  _processForm(formData) {
    const entry = {
      type: [],
      country: ``,
      timeStart: 0,
      timeFinish: 0,
      price: 0,
      offers: [],
      description: ``,
      photos: [],
    };
    const tripType = this._element.querySelector(`.point__destination-label`).innerHTML;
    const tripIcon = this._element.querySelector(`.travel-way__label`).innerHTML;
    const tripPhotos = Array.from(this._element.querySelectorAll(`.point__destination-image`));
    const tripOffers = Array.from(this._element.querySelectorAll(`.point__offers-label`));
    for (let value of tripOffers) {
      const service = value.querySelector(`.point__offer-service`);
      const price = value.querySelector(`.point__offer-price`);
      entry.offers.push(`${service.innerHTML} ${price.innerHTML}`);
    }
    for (let value of tripPhotos) {
      entry.photos.push(value.getAttribute(`src`));
    }
    entry.description = this._element.querySelector(`.point__destination-text`).innerHTML;
    entry.type = new Map([[tripType.replace(` to`, ``), tripIcon]]);

    entry.timeStart = this._timeStart;
    entry.timeFinish = this._timeFinish;

    const tripEditMapper = TripEdit.createMapper(entry);
    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (tripEditMapper[property]) {
        tripEditMapper[property](value);
      }
    }
    console.log(entry);
    return entry;
  }

  static createMapper(target) {
    return {
      destination: (value) => {
        target.country = value;
      },
      price: (value) => {
        target.price = value;
      },
      travelWay: (value) => {
        target.type = new Map([[value, TYPES.get(value)]]);
      },
      dateStart: (value) => {
        target.timeStart = moment(value).valueOf();
      },
      dateEnd: (value) => {
        target.timeFinish = moment(value).valueOf();
      },
      offer: (value) => target.offers.push(value),

    };
  }

  _onChangeStartDate() {
    this._state.isStartDate = !this._state.isStartDate;
    this.unbind();
    this.bind();
  }

  _onChangeFinishDate() {
    this._state.isFinishDate = !this._state.isFinishDate;
    this.unbind();
    this.bind();
  }

  _partialUpdate() {
    this._element.innerHTML = createElement(this.template).children[0].outerHTML;
  }

  startToField() {
    return `${moment(this._timeStart).format(`HH`)}:${moment(this._timeStart).format(`mm`)}`;
  }

  finishToField() {
    return `${moment(this._timeFinish).format(`HH`)}:${moment(this._timeFinish).format(`mm`)}`;
  }

  timeToTravel() {
    return `${moment(this._timeFinish).subtract(moment(this._timeStart).format(`HH`), `hours`).subtract(moment(this._timeStart).format(`mm`), `minutes`).format(`h[h] mm[m]`)}`;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  _onSubmitClick(evt) {
    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`.point__form`));
    const newData = this._processForm(formData);
    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }
    this.update(newData);
  }

  _onDeleteClick(evt) {
    evt.preventDefault();
    if (typeof this._onDelete === `function`) {
      this._onDelete(this);
    }
  }

  _onTypeClick(evt) {
    evt.preventDefault();
    this._element.querySelector(`.travel-way__toggle`).checked = true;
    let types = Array.from(this._element.querySelectorAll(`.travel-way__select-label`));
    types.forEach((item) => {
      item.addEventListener(`click`, this._onTypeToggleClick.bind(this));
    });
  }

  _onTypeToggleClick(evt) {
    let type = evt.currentTarget.innerHTML.split(` `);
    this._element.querySelector(`.travel-way__label`).innerHTML = type[0];
    this._element.querySelector(`.point__destination-label`).innerHTML = type[1];
    this._element.querySelector(`.travel-way__toggle`).checked = false;
    let types = Array.from(this._element.querySelectorAll(`.travel-way__select-label`));
    types.forEach((item) => {
      item.removeEventListener(`click`, this._onTypeToggleClick.bind(this));
    });
  }

  bind() {
    this._element.querySelector(`form`).addEventListener(`submit`, this._onSubmitClick);
    this._element.querySelector(`.point__button--delete`).addEventListener(`click`, this._onDeleteClick);
    this._element.querySelector(`.travel-way__label`).addEventListener(`click`, this._onTypeClick);
    this._element.querySelector(`.point__input--time-start`).addEventListener(`click`, this._onChangeStartDate);
    this._element.querySelector(`.point__input--time-start`).addEventListener(`click`, this._onChangeFinishDate);

    if (this._state.isStartDate) {
      flatpickr(`.point__input--time-start`, {
        locale: {
          rangeSeparator: ` — `
        },
        enableTime: true,
        altInput: true,
        altFormat: `H:i`
      });
    }
    if (this._state.isFinishDate) {
      flatpickr(`.point__input--time-finish`, {
        locale: {
          rangeSeparator: ` — `
        },
        enableTime: true,
        altInput: true,
        altFormat: `H:i`
      });
    }
  }

  unbind() {
    this._element.querySelector(`form`).removeEventListener(`click`, this.onSubmitClick);
    this._element.querySelector(`.point__button--delete`).removeEventListener(`click`, this._onDeleteClick);
    this._element.querySelector(`.travel-way__label`).removeEventListener(`click`, this._onTypeClick);
    this._element.querySelector(`.point__time`).removeEventListener(`click`, this._onChangeDate);
  }

  update(data) {
    this._type = data.type;
    this._country = data.country;
    this._timeStart = data.timeStart;
    this._timeFinish = data.timeFinish;
    this._price = data.price;
    this._offers = data.offers;
    this._description = data.description;
    this._photos = data.photos;
  }

  get template() {
    return `<article class="point">
  <form class="point__form" action="" method="get">
    <header class="point__header">
      <label class="point__date">
        choose day
        <input class="point__input" type="text" placeholder="MAR 18" name="day">
      </label>

      <div class="travel-way">
        <label class="travel-way__label" for="travel-way__toggle">${Array.from(this._type.values())}</label>

        <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">

        <div class="travel-way__select">
          <div class="travel-way__select-group">
            <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-taxi" name="travelWay" value="taxi">
            <label class="travel-way__select-label" for="travel-way-taxi">🚕 taxi</label>

            <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-bus" name="travelWay" value="bus">
            <label class="travel-way__select-label" for="travel-way-bus">🚌 bus</label>

            <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-train" name="travelWay" value="train">
            <label class="travel-way__select-label" for="travel-way-train">🚂 train</label>

            <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-flight" name="travelWay" value="flight">
            <label class="travel-way__select-label" for="travel-way-flight">✈️ flight</label>
          </div>

          <div class="travel-way__select-group">
            <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-check-in" name="travelWay" value="check-in">
            <label class="travel-way__select-label" for="travel-way-check-in">🏨 check-in</label>

            <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-sightseeing" name="travelWay" value="sight-seeing">
            <label class="travel-way__select-label" for="travel-way-sightseeing">🏛 sightseeing</label>
          </div>
        </div>
      </div>

      <div class="point__destination-wrap">
        <label class="point__destination-label" for="destination">${Array.from(this._type.keys())} to</label>
        <input class="point__destination-input" list="destination-select" id="destination" value="${this._country}" name="destination">
        <datalist id="destination-select">
          <option value="airport"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
          <option value="hotel"></option>
        </datalist>
      </div>

      <label class="point__time">
        choose time
        <input class="point__input point__input--time-start" type="text" value="${this.startToField()}" name="dateStart" placeholder="${this.startToField()}">
        <input class="point__input point__input--time-finish" type="text" value="${this.finishToField()}" name="dateEnd" placeholder="${this.finishToField()}">
      </label>

      <label class="point__price">
        write price
        <span class="point__price-currency">€</span>
        <input class="point__input" type="number" value="${this._price}" name="price">
      </label>

      <div class="point__buttons">
        <button class="point__button point__button--save" type="submit">Save</button>
        <button class="point__button point__button--delete" type="reset">Delete</button>
      </div>

      <div class="paint__favorite-wrap">
        <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite">
        <label class="point__favorite" for="favorite">favorite</label>
      </div>
    </header>

    <section class="point__details">
      <section class="point__offers">
        <h3 class="point__details-title">offers</h3>

        <div class="point__offers-wrap">
          ${makeOffers(this)}
        </div>

      </section>
      <section class="point__destination">
        <h3 class="point__details-title">Destination</h3>
        <p class="point__destination-text">${this._description}</p>
        <div class="point__destination-images">
          ${(Array.from(this._photos).map((photo) => (`<img src="${photo}" alt="picture from place" class="point__destination-image">`.trim()))).join(``)}
        </div>
      </section>
      <input type="hidden" class="point__total-price" name="total-price" value="">
    </section>
  </form>
</article>`.trim();
  }
}

export {TripEdit};
