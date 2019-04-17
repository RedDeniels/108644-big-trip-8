import {TYPES} from './data.js';

class ModelTrip {
  constructor(data) {
    this.id = data[`id`];
    this.type = this.transferType(data[`type`]);
    this.country = data[`destination`][`name`];
    this.timeStart = data[`date_from`];
    this.timeFinish = data[`date_to`];
    this.price = data[`base_price`];
    this.offers = data[`offers`] || [];
    this.description = data[`destination`][`description`];
    this.photos = data[`destination`][`pictures`];
  }

  transferType(type) {
    for (let pair of TYPES.entries()) {
      if (type === pair[0]) {
        return new Map([pair]);
      }
    }
    return null;
  }

  static parseTrip(data) {
    return new ModelTrip(data);
  }

  static parseTrips(data) {
    return data.map(ModelTrip.parseTrip);
  }

}

export {ModelTrip};
