function createElement(html) {
  const element = document.createElement("div");
  element.insertAdjacentHTML("beforeend", html);
  return element.firstElementChild;
}

class Game {
  _state = {
    pair: [],
    stonesStatus: [],
    gameActive: false
  };

  /* 
  
  {
      id: 54,
      disabled: false,
      hide: false
    }
  
  */

  constructor(data, Stone) {
    this._data = data;
    this._Stone = Stone;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._setStateStonesStatus(
      this._data.map((el) => {
        return {
          id: el.id,
          color: el.color,
          img: el.img,
          disabled: false,
          hide: false,
        };
      })
    );
    this._addListeners();
    this._render();
  }

  _generateStones() {
    return this._state.stonesStatus.map((el) => new this._Stone(el, this._setStatePairHandler.bind(this)).element);
  }

  // {id: 35, color: 'green'}
  _setStatePair(obj) {
    if (this._state.pair.length === 2) {
      this._state.pair = [];
    }
    this._state.pair.push(obj);
  }

  _setStateGameActive(status) {
    this._state.gameActive = status
  }

  _setStateStonesStatus(newStateStones) {
    this._state.stonesStatus = newStateStones;
  }

  _setStatePairHandler(obj) {
    this._setStatePair(obj);

    console.log(this._state.pair);

    if (this._isEqualPair()) {
      const idsStonesInPair = [this._state.pair[0].id, this._state.pair[1].id];

      const newStateStonesArray = this._state.stonesStatus.map((el) => {
        if (idsStonesInPair.includes(el.id)) {
          // камень найден по id
          el.disabled = true;
          return el;
        }

        return el;
      });

      this._setStateStonesStatus(newStateStonesArray);
    }

    // перерисовка (при клике на камень)
    this._render();
  }

  // return bool true false
  _isEqualPair() {
    if (this._state.pair.length < 2) {
      return false;
    }

    if (this._state.pair[0].color === this._state.pair[1].color) {
      return true;
    }

    return false;
  }

  _render() {
    this._element.querySelector(".game__wrapper").textContent = "";
    this._element.querySelector(".game__wrapper").append(...this._generateStones());
    this._element.querySelector(".btn--start").textContent = this._state.gameActive === true ? "Finish Game" : " Start Game"
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

  _addListeners() {
    this._element.querySelector(".btn--start").addEventListener("click", () => {
      this._setStateGameActive(!this._state.gameActive)
      this._render()
    });
  }

  get element() {
    return this._element;
  }
}

class Stone {
  constructor({ id, color, img, disabled, hide }, setStatePairHandler) {
    this._id = id;
    this._color = color;
    this._img = img;
    (this._disabled = disabled), (this._hide = hide), (this._setStatePairHandler = setStatePairHandler);
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._addListeners();
  }

  _getTemplate() {
    return `<button class="stone ${this._hide === true ? "stone--hide" : ""}" ${this._disabled === true ? "disabled" : ""}>
            <img class="stone__img" src="./image/${this._img}.png" alt="" />
          </button>`;
  }

  _addListeners() {
    this._element.addEventListener("click", () => {
      this._setStatePairHandler({
        id: this._id,
        color: this._color,
      });
    });
  }

  /* 
  
  1. click stone
  2. stone -> id + color
  3. parent storage id + color

  2. stone -> id + color
  3. parent storage id + color

  ---------------
  когда в storage есть 2 выбранных stone, родитель сравнивает цвета
  если цвета сошлись, пара найдена (disabled)
  
  */

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
