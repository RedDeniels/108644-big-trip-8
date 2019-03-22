import Component from './component.js';
import {transfer} from './switch-trip.js';
import {dateTranfer} from './util.js';
import {makeOffers} from './make-offers.js';

class Trip extends Component {
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

    this._onEdit = null;
    this._onBodyClick = this._onBodyClick.bind(this);
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

  _onBodyClick() {
    transfer(this);
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

  update(data) {
    this._type = data.type;
    this._country = data._country;
    this._timeStart = data._timeStart;
    this._timeFinish = data._timeFinish;
    this._price = data._price;
    this._offers = data._offers;
  }

  get template() {
    return `<article class="trip-point">
            <i class="trip-icon">${this._type[1]}</i>
            <h3 class="trip-point__title">${this._type[0]} to ${this._country}</h3>
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
