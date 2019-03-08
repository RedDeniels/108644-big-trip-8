import {makeOffers} from './make-offers.js';
import {dateTranfer} from './util.js';

const dateToTimeField = (date) => `${date.getHours()}:${date.getMinutes()}`;
const timeToTravel = (start, finish) => `${finish.getHours() - start.getHours()}h ${finish.getMinutes() - start.getMinutes()}m`;

export default (point) => `<article class="trip-point">
            <i class="trip-icon">${point.type[1]}</i>
            <h3 class="trip-point__title">${point.type[0]} to ${point.country}</h3>
            <p class="trip-point__schedule">
              <span class="trip-point__timetable">${dateToTimeField(dateTranfer(point.timeStart))}&nbsp;&mdash; ${dateToTimeField(dateTranfer(point.timeFinish))}</span>
              <span class="trip-point__duration">${timeToTravel(dateTranfer(point.timeStart), dateTranfer(point.timeFinish))}</span>
            </p>
            <p class="trip-point__price">&euro;&nbsp;${point.price}</p>
            <ul class="trip-point__offers">
              ${makeOffers(point.offers)}
            </ul>
          </article>`;
