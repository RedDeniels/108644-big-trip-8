import {getPoint} from './data.js';
import {Trip} from './trip.js';
import {TripEdit} from './trip-edit.js';
//  import {TRIP_DAY_ITEMS} from './main.js';

const exchange = (oldTrip, newTrip) => {
  newTrip._type = oldTrip._type;
  newTrip._country = oldTrip._country;
  newTrip._timeStart = oldTrip._timeStart;
  newTrip._timeFinish = oldTrip._timeFinish;
  newTrip._price = oldTrip._price;
  newTrip._offers = oldTrip._offers;
  newTrip._photos = oldTrip._photos;
};

const tripToEdit = (oldTrip) => {
  let newTrip = new TripEdit(getPoint());
  exchange(oldTrip, newTrip);
//  oldTrip.onEdit = () => {
//    newTrip.render(TRIP_DAY_ITEMS);
//    TRIP_DAY_ITEMS.replaceChild(newTrip._element, oldTrip._element);
//    oldTrip.unrender();
//  };
};

const editToTrip = (oldTrip) => {
  let newTrip = new Trip(getPoint());
  exchange(oldTrip, newTrip);
//  oldTrip.onSubmit = () => {
//    newTrip.render(TRIP_DAY_ITEMS);
//    TRIP_DAY_ITEMS.replaceChild(newTrip._element, oldTrip._element);
//    oldTrip.unrender();
//  };
};

const transfer = (oldTrip) => oldTrip instanceof Trip ? tripToEdit(oldTrip) : editToTrip(oldTrip);

export {transfer};
