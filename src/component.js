import {createElement} from './create-element.js';

class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }
  }

  render(container) {
    this._element = createElement(this.template);
    container.appendChild(this._element);
    this.bind();
    return this._element;
  }

  get template() {
    throw new Error(`You have define template.`);
  }

}
