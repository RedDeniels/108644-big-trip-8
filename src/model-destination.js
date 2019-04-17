class ModelDestination {
  constructor(data) {
    this.country = data[`name`];
    this.description = data[`description`];
    this.photos = data[`pictures`];
  }

  static parseDestination(data) {
    return new ModelDestination(data);
  }

  static parseDestinations(data) {
    return data.map(ModelDestination.parseDestination);
  }

}

export {ModelDestination};
