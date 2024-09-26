function createElement(html) {
  const element = document.createElement("div");
  element.insertAdjacentHTML("beforeend", html);
  return element.firstElementChild;
}

class Game {
  constructor(data, Stone) {
    this._data = data;
    this._Stone = Stone;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._render()
  }

  _generateStones(){
    return this._data.map((el) => new this._Stone(el).element)
  }

  _render(){
    this._element.querySelector(".game__wrapper").append(...this._generateStones())
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
  constructor({id, color, img}) {
    this._id = id;
    this._color = color;
    this._img = img;
    console.log(this._img);
    
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
  }

  _getTemplate() {
    return `<button class="stone">
            <img class="stone__img" src="./image/${this._img}.png" alt="" />
          </button>`;
  }

  get element() {
    return this._element;
  }
}

const data = [
  {
    id: 346,
    color: "blue",
    img: "t2",
  },
  {
    id: 2345,
    color: "red",
    img: "t1",
  },
  {
    id: 7,
    color: "green",
    img: "t3",
  },
  {
    id: 235,
    color: "violet",
    img: "t4",
  },
  {
    id: 567,
    color: "blue",
    img: "t2",
  },
  {
    id: 67,
    color: "red",
    img: "t1",
  },
  {
    id: 43,
    color: "green",
    img: "t3",
  },
  {
    id: 87,
    color: "violet",
    img: "t4",
  },
  {
    id: 95,
    color: "blue",
    img: "t2",
  },
  {
    id: 352,
    color: "red",
    img: "t1",
  },
  {
    id: 3456,
    color: "green",
    img: "t3",
  },
  {
    id: 323446,
    color: "violet",
    img: "t4",
  },
];

const root = document.querySelector(".root");
root.insertAdjacentElement("beforeend", new Game(data, Stone).element);
