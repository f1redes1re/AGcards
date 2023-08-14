// eslint-disable-next-line max-classes-per-file, import/no-cycle, import/extensions
import { createDOMElement } from './main.js';

/* eslint-disable no-underscore-dangle */
// Создане класса карточки
export class Card {
  constructor(container, flip) {
    this.container = container;
    this.flip = flip;
    this._open = false;
    this._success = false;
  }

  createElement(cardNumber) {
    this.element = createDOMElement('button', ['btn', 'btn-font-black']);
    this.container.appendChild(this.element);
    this.cardNumber = cardNumber;
    this.element.addEventListener('click', () => {
      this.flip(this);
    });
  }

  set cardNumber(value) {
    this._cardNumber = value;
    this.element.textContent = value;
  }

  get cardNumber() {
    return this._cardNumber;
  }

  set open(value) {
    this._open = value;
    this.element.classList.toggle('btn-font-white', value);
  }

  get open() {
    return this._open;
  }
}

/* eslint-disable no-underscore-dangle */
// Создание подкласса карточки
export class AmazingCard extends Card {
  constructor(container, flip) {
    super(container, flip);
    this._imageUrl = '';
    this._open = false;
    this._success = false;
  }

  createElement(cardNumber) {
    this.element = createDOMElement('button', ['btn', 'btn-font-black']);
    this.container.appendChild(this.element);
    this.cardNumber = cardNumber;
    this.element.addEventListener('click', () => {
      this.flip(this);
    });
  }

  set cardNumber(value) {
    this._cardNumber = value;
    this.element.textContent = value;
    this._imageUrl = `url('https://source.unsplash.com/random/200x200?sig=${this._cardNumber}')`;
  }

  get cardNumber() {
    return this._cardNumber;
  }

  set open(value) {
    this._open = value;
    this.element.classList.toggle('img-font-white', value);
    if (value) {
      // Устанавливаем backgroundImage только когда карточка открывается
      this.element.style.backgroundImage = this._imageUrl;
    } else {
      this.element.style.backgroundImage = '';
    }
  }

  get open() {
    return this._open;
  }
}
