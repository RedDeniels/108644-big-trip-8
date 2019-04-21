import Component from './component.js';
import {makeOffers} from './make-offers.js';
import moment from '../node_modules/moment/moment.js';

class Trip extends Component {
  constructor(data) {
    super();
    this._id = data.id;
    this._type = data.type;
    this._country = data.country;
    this._timeStart = data.timeStart;
    this._timeFinish = data.timeFinish;
    this._price = data.price;
    this._offers = data.offers;
    this._description = data.description;
    this._photos = data.photos;

    this._onEdit = null;
    this._transfer = null;
    this._onBodyClick = this._onBodyClick.bind(this);
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  set transfer(fn) {
    this._transfer = fn;
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

  _onBodyClick() {
    if (typeof this._transfer === `function`) {
      this._transfer(this);
    }
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  bind() {
    this._element.addEventListener(`click`, this._onBodyClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onBodyClick);
  }

  update(newObject) {
    this._id = newObject.id;
    this._type = newObject.type;
    this._country = newObject.country;
    this._timeStart = newObject.timeStart;
    this._timeFinish = newObject.timeFinish;
    this._price = newObject.price;
    this._offers = newObject.offers;
    this._description = newObject.description;
    this._photos = newObject.photos;
  }

  toRAW() {
    return {
      'base_price': this._price,
      'date_from': this._timeStart,
      'date_to': this._timeFinish,
      'destination': {
        'description': this._description,
        'name': this._country,
        'pictures': this._photos,
      },
      'id': this._id,
      'offers': this._offers,
      'type': this._type.keys()[0],
    };
  }

  get template() {
    return `<article class="trip-point">
            <i class="trip-icon">${Array.from(this._type.values())}</i>
            <h3 class="trip-point__title">${Array.from(this._type.keys())} to ${this._country}</h3>
            <p class="trip-point__schedule">
              <span class="trip-point__timetable">${this.startToField()}&nbsp;&mdash; ${this.finishToField()}</span>
              <span class="trip-point__duration">${this.timeToTravel()}</span>
            </p>
            <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
            <ul class="trip-point__offers">
              ${makeOffers(this)}
            </ul>
          </article>`.trim();
  }
}

export {Trip};
