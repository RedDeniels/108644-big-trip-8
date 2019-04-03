import Component from './component.js';
import {dateTranfer, transfer} from './util.js';
import {makeOffers} from './make-offers.js';
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
    this._state.isDate = false;
    this._state.isType = false;

    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeType = this._onChangeType.bind(this);
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

    const tripEditMapper = TripEdit.createMapper(entry);
    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (tripEditMapper[property]) {
        tripEditMapper[property](value);
      }
    }
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
      time: (value) => {
        target.timeStart = value;
        target.timeFinish = value;
      },
      offer: (value) => target.offers.push(value),

    };
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onChangeType() {
    this._state.isType = !this._state.isType;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  startToField() {
    return `${dateTranfer(this._timeStart).getHours()}:${dateTranfer(this._timeStart).getMinutes()}`;
  }

  finishToField() {
    return `${dateTranfer(this._timeFinish).getHours()}:${dateTranfer(this._timeFinish).getMinutes()}`;
  }

  timeToTravel() {
    return `${dateTranfer(this._timeFinish).getHours() - dateTranfer(this._timeStart).getHours()}h ${dateTranfer(this._timeFinish).getMinutes() - dateTranfer(this._timeStart).getMinutes()}m`;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
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
    transfer(this);
    if (typeof this._onDelete === `function`) {
      this._onDelete();
    }
  }

  bind() {
    this._element.querySelector(`form`).addEventListener(`submit`, this._onSubmitClick);
    this._element.querySelector(`form`).addEventListener(`reset`, this._onDeleteClick);

  }

  unbind() {
    this._element.querySelector(`form`).removeEventListener(`click`, this._onBodyClick);
    this._element.querySelector(`form`).removeEventListener(`click`, this._onBodyClick);
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
        <label class="travel-way__label" for="travel-way__toggle">${this._type[1]}</label>

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
        <label class="point__destination-label" for="destination">${this._type[0]} to</label>
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
        <input class="point__input" type="text" value="${this.startToField()} — ${this.finishToField()}" name="time" placeholder="${this.startToField()} — ${this.finishToField()}">
      </label>

      <label class="point__price">
        write price
        <span class="point__price-currency">€</span>
        <input class="point__input" type="text" value="${this._price}" name="price">
      </label>

      <div class="point__buttons">
        <button class="point__button point__button--save" type="submit">Save</button>
        <button class="point__button" type="reset">Delete</button>
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
