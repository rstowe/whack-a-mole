import '../styles/index.scss';

class App {
  constructor() {
    this.state = {
      isStarted: false,
      counterValue: 30,
      activeMole: null,
      score: 0,
    }

    this.scoreboard = document.createElement('div');
    this.counter = document.createElement('div');
    this.startButton = document.createElement('button');
    this.resetButton = document.createElement('button');

    this.init();
    this.render();
  }

  init() {
    this.startButton.innerText = "START";
    this.resetButton.innerText = "RESET";
    this.scoreboard.innerText = this.state.score;
    this.counter.innerText = this.state.counterValue;
    this.counter.classList.add('counter');
  }

  startMoleAppear() {
    this.moleInterval = setInterval(() => {
      let nextActiveMole = Math.floor(Math.random() * 9) + 1;
      let animationDuration = Math.floor(Math.random() * (1200 - 400 + 1) + 400);

      while (this.state.activeMole === nextActiveMole) {
        nextActiveMole = Math.floor(Math.random() * 9) + 1;
      }

      const mole = document.getElementById(`mole_${nextActiveMole}`);
      mole.style.setProperty('--animation-time', animationDuration + 'ms');
      mole.classList.add('active-mole');

      this.state.activeMole = nextActiveMole

      setTimeout(() => {
        mole.classList.remove('active-mole');
      }, animationDuration)
    }, 1000)
  }

  startCounter(initialValue) {
    let { counterValue } = this.state;

    if (initialValue) counterValue = initialValue;

    this.timeInterval = setInterval(() => {
      if (counterValue === 0) {
        this.counter.innerText = counterValue--;
        this.stop();
      } else {
        this.counter.innerText = counterValue--;
      }
    }, 1000);
  }

  start(initialValue) {
    this.startMoleAppear();
    this.startCounter(initialValue);
  }

  resetGame() {
    this.startButton.innerText = "START";
    this.state.isStarted = false;
  }

  stop() {
    if (this.timeInterval) clearInterval(this.timeInterval);
    if (this.moleInterval) clearInterval(this.moleInterval);
    this.resetGame();
  }

  renderControls() {
    let buttonContainer = document.createElement('div');

    this.startButton.addEventListener('click', () => {
      let { isStarted } = this.state;

      if (isStarted) {
        this.stop();
        this.startButton.innerText = "START";
        this.state.isStarted = false;
      } else {
        this.start();
        this.startButton.innerText = "STOP";
        this.state.isStarted = true;
      }
    })

    buttonContainer.appendChild(this.startButton);
    buttonContainer.appendChild(this.resetButton);

    return buttonContainer;
  }

  renderCounter() {
    const controls = this.renderControls();
    const title = document.createElement('h2');

    title.innerText = 'Whack-A-Mole';
    this.counterContainer = document.createElement('div');
    this.counterContainer.classList.add("counter-container");
    this.counterContainer.appendChild(this.counter);
    this.counterContainer.appendChild(title);
    this.counterContainer.appendChild(controls);
    this.counterContainer.appendChild(this.scoreboard);

    return this.counterContainer;
  }

  hitMole(moleHit) {
    const mole = moleHit.srcElement;
    console.log('you hit', moleHit.target);

    this.scoreboard.innerText = this.state.score + 10;
    this.state.score = this.state.score + 10;
    mole.classList.add('mole-hit');
    console.log('this.state.score', this.state.score);
    setTimeout(() => {
      mole.classList.remove('mole-hit');
    }, 200)
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
    // tile.innerHTML = `
    //   <div class="tile">
    //     <div class="hole">
    //       <div class="mole" id="mole_${tileId}">
    //       </div>
    //     </div>
    //   </div>
    // `
    //
    // return tile;
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
