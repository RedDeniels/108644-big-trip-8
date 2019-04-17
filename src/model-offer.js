class ModelOffer {
  constructor(data) {
    this.type = data[`type`];
    this.offers = this.transferOffers(data[`offers`]);
  }

  transferOffers(dataOffers) {
    let offers = [];
    dataOffers.forEach(function (item, index) {
      offers[index] = {};
      offers[index].title = item.name;
      offers[index].price = item.price;
      offers[index].accepted = false;
    });
    return offers;
  }

  static parseOffer(data) {
    return new ModelOffer(data);
  }

  static parseOffers(data) {
    return data.map(ModelOffer.parseOffer);
  }

}

export {ModelOffer};
