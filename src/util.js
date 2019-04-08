import {TripEdit} from './trip-edit.js';
import {TRIP_DAY_ITEMS, trips, tripsEdit, tripData} from './main.js';


const randomCount = (...counts) => {
  const [max, min = 0] = counts;
  return Math.floor(Math.random() * (max - min) + min);
};

const transfer = (oldTrip) => {

  let newTrip = tripsEdit[trips.indexOf(oldTrip)];
  newTrip.render(TRIP_DAY_ITEMS);
  TRIP_DAY_ITEMS.replaceChild(tripsEdit[trips.indexOf(oldTrip)]._element, oldTrip._element);
  oldTrip.unrender();

  newTrip._onSubmit = (newObject) => {
    let trip = trips[tripsEdit.indexOf(newTrip)];
    let data = tripData[tripsEdit.indexOf(newTrip)];

    data.type = newObject.type;
    data.country = newObject.country;
    data.timeStart = newObject.timeStart;
    data.timeFinish = newObject.timeFinish;
    data.price = newObject.price;
    data.offers = newObject.offers;
    data.description = newObject.description;
    data.photos = newObject.photos;

    trip.update(data);
    trip.render(TRIP_DAY_ITEMS);
    TRIP_DAY_ITEMS.replaceChild(trip._element, newTrip._element);
    newTrip.unrender();
    newTrip = new TripEdit(data);
  };

};

const dateTranfer = (number) => new Date(number);

export {randomCount, dateTranfer, TRIP_DAY_ITEMS, transfer, trips, tripsEdit, tripData};
