function createElement(html) {
  const element = document.createElement("div");
  element.insertAdjacentHTML("beforeend", html);
  return element.firstElementChild;
}

class Game {
  constructor() {
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
  }

  _getTemplate() {
    return `<div class="game">
        <div class="game__btn">
          <button class="btn btn--start">Start Game</button>
        </div>
        <span class="game__found">found parts: 0</span>
        <span class="game__total">total parts: 0</span>
        <div class="game__wrapper"></div>
        </div>`;
  }

  get element() {
    return this._element;
  }
}

class Stone {
  constructor() {
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
  }

  _getTemplate() {
    return `<button class="stone" disabled>
            <img class="stone__img" src="./image/t2.png" alt="" />
          </button>`;
  }

  get element() {
    return this._element;
  }
}

const root = document.querySelector(".root");
root.insertAdjacentElement("beforeend", new Game().element);
