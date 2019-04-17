import {ModelTrip} from './model-trip.js';
import {ModelDestination} from './model-destination.js';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (response) => {
  return response.json();
};

const API = class {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getTrips() {
    return this._load({url: `/points`})
      .then(toJSON)
      .then(ModelTrip.parseTrips);
  }

  getDestinations() {
    return this._load({url: `/destinations`})
      .then(toJSON)
      .then(ModelDestination.parseDestinations);
  }

  createTrip({trip}) {
    return this._load({
      url: `/points`,
      method: Method.POST,
      body: JSON.stringify(trip),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON);
  }

  updateTrip({id, data}) {
    return this._load({
      url: `/points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON);
  }

  deleteTrip({id}) {
    return this._load({url: `/points/${id}`, method: Method.DELETE});
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        console.error(`fetch error: ${err}`);
        throw err;
      });
  }
};

export {API};
