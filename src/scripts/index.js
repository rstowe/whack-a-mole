import '../styles/index.scss';

class App {
  constructor() {
    this.state = {
      isStarted: false,
      counterValue: 30,
    }

    this.counter = document.createElement('div');
    this.counter.innerText = this.state.counterValue;
    this.render();
  }

  start(initialValue) {
    let { counterValue, isStarted } = this.state;

    if (initialValue) {
      counterValue = initialValue;
    }

    this.moleInterval = setInterval(() => {
      let moleNumber = Math.floor(Math.random() * 9) + 1;
      let animationDuration = Math.floor(Math.random() * 2);
      console.log('animationDuration', animationDuration);

      // if (moleNumber === 9 || moleNumber === 0) {
      //   moleNumber = 5;
      // }

      const mole = document.getElementById(`mole_${moleNumber}`);
      mole.style.setProperty('--animation-time', moleNumber +'s');
      console.log('mole', mole);

      mole.classList.add('active-mole');

      // setTimeout(() => {
      //   mole.classList.remove('active-mole');
      // }, 1000)
      // mole.classList.remove('active-mole');


    }, 1000)

    // const mole = document.getElementById('mole_3');
    // console.log('mole', mole);
    // mole.classList.add('active-mole');

    this.interval = setInterval(() => {
      if (counterValue === 0) {
        this.counter.innerText = counterValue--;
        this.stop();
      } else {
        this.counter.innerText = counterValue--;
      }
    }, 1000);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (this.moleInterval) {
      clearInterval(this.moleInterval);
    }
  }

  renderStartButton() {
    let buttonContainer = document.createElement('div');
    let startButton = document.createElement('button');
    startButton.innerText = "start";

    startButton.addEventListener('click', (event) => {
      let { isStarted } = this.state;

      if (isStarted) {
        this.stop();
        startButton.innerText = "start";
        this.state.isStarted = false;
      } else {
        this.start(30);
        startButton.innerText = "stop";
        this.state.isStarted = true;
      }
    })

    buttonContainer.appendChild(startButton);

    return buttonContainer;
  }

  renderCounter() {
    const startButton = this.renderStartButton();

    this.counterContainer = document.createElement('div');

    this.counterContainer.classList.add("counter-container");
    this.counterContainer.appendChild(this.counter);
    this.counterContainer.appendChild(startButton)
    return this.counterContainer;
  }

  hitMole(moleHit) {
    const mole = moleHit.srcElement;
    console.log('you hit', moleHit.target);
    // mole.classList.remove(moleHit.target.className)
    mole.classList.add('mole-hit');
  }

  createTile(tileId) {
    let tile = document.createElement('div');
    tile.classList.add("tile");

    let hole = document.createElement('div');
    hole.classList.add('hole');

    let mole = document.createElement('div');
    mole.classList.add(`mole`);
    mole.setAttribute("id", `mole_${tileId}`);
    mole.addEventListener('click', (event) => {
      console.log('event', event);
      const moleHit = event;
      this.hitMole(moleHit);
    })

    hole.appendChild(mole);
    tile.appendChild(hole);

    return tile;
  }

  renderGrid() {
    const gridRows = [
      { tiles: [{ id: 1 }, { id: 2 }, { id: 3 }] },
      { tiles: [{ id: 4 }, { id: 5 }, { id: 6 }] },
      { tiles: [{ id: 7 }, { id: 8 }, { id: 9 }] },
    ]

    let grid = document.createElement('div');
    grid.classList.add("grid");

    gridRows.forEach(row => {
      let rowElement = document.createElement('div');
      rowElement.classList.add("row");
      grid.appendChild(rowElement);

      row.tiles.forEach(tile => {
        let tileElement = this.createTile(tile.id);
        rowElement.appendChild(tileElement);
      })
    })

    return grid;
  }

  render() {
    const root = document.getElementById('app');
    const counter = this.renderCounter();
    const grid = this.renderGrid();

    root.appendChild(counter);
    root.appendChild(grid);
  }
}

new App();
