//  import {createElement} from './create-element.js';
//  import {transfer} from './switch-task.js';
import {dateTranfer} from './util.js';
import {createElement} from './create-element.js';
import {makeOffers} from './make-offers.js';

class Trip {
  constructor(data) {
    this._type = data.type;
    this._country = data.country;
    this._timeStart = data.timeStart;
    this._timeFinish = data.timeFinish;
    this._price = data.price;
    this._offers = data.offers;
    this._description = data.description;

    this._element = null;
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

  bind() {
    this._element.querySelector(`.card__btn--edit`).addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  render(container) {
    this._element = createElement(this.template);
    container.appendChild(this._element);
    // this.bind();
    return this._element;
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
              ${makeOffers(this._offers)}
            </ul>
          </article>`.trim();
  }
}

export {Trip};
