import {createElement} from './create-element.js';

export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }

    this._element = null;
  }

  render(container) {
    this._element = createElement(this.template);
    container.appendChild(this._element);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }

  get template() {
    throw new Error(`You have define template.`);
  }

  bind() {
    throw new Error(`You have define bind.`);
  }

  unbind() {
    throw new Error(`You have define unbind.`);
  }

  update() {}

}
