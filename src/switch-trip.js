import {TripEdit} from './trip-edit';
import {TRIP_DAY_ITEMS, tripData, trips, tripsEdit} from './main.js';

const transfer = (oldTrip) => {
  let newTrip = tripsEdit[trips.indexOf(oldTrip)];
  newTrip.render(TRIP_DAY_ITEMS);
  TRIP_DAY_ITEMS.replaceChild(tripsEdit[trips.indexOf(oldTrip)]._element, oldTrip._element);
  oldTrip.unrender();

  newTrip._onSubmit = (newObject) => {
    let trip = trips[tripsEdit.indexOf(newTrip)];
    let data = tripData[tripsEdit.indexOf(newTrip)];

    data._type = newObject.type;
    data._country = newObject.country;
    data._timeStart = newObject.timeStart;
    data._timeFinish = newObject.timeFinish;
    data._price = newObject.price;
    data._offers = newObject.offers;
    data._description = newObject.description;
    data._photos = newObject.photos;

    trip.update(data);
    trip.render(TRIP_DAY_ITEMS);
    TRIP_DAY_ITEMS.replaceChild(trip._element, newTrip._element);
    newTrip.unrender();
    newTrip = new TripEdit(data);
  };

};

export {transfer};
