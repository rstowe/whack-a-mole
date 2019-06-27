import '../styles/index.scss';

class App {
  constructor() {
    this.state = {
      isStarted: false,
      counterValue: 30,
      activeMole: null,
      score: 0,
    }

    this.counter = document.createElement('div');
    this.scoreboard = document.createElement('div');
    this.startButton = document.createElement('button');
    this.resetButton = document.createElement('button');

    this.init();
    this.render();
  }

  init() {
    this.startButton.innerText = "START";
    this.startButton.classList.add('success');
    this.resetButton.innerText = "RESET";
    this.resetButton.classList.add('danger');
    this.resetButton.classList.add('hidden');
    this.scoreboard.innerText = this.state.score;
    this.scoreboard.classList.add('scoreboard')
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
    this.timeInterval = setInterval(() => {
      if (this.state.counterValue === 0) {
        let minusOne = this.state.counterValue--;
        this.counter.innerText = minusOne;
        this.startButton.classList.add('hidden');
        this.stop();
      } else {
        let minusOne = this.state.counterValue--;
        this.counter.innerText = minusOne;
      }
    }, 1000);
  }

  start(initialValue) {
    this.resetButton.classList.add('hidden');
    this.startMoleAppear();
    this.startCounter(initialValue);
  }

  resetGame() {
    this.state.counterValue = 30;
    this.counter.innerText = 30;
    this.scoreboard.innerText = 0;
    this.startButton.innerText = "START";
    this.startButton.classList.remove('hidden');
    this.state.isStarted = false;
  }

  stop() {
    if (this.timeInterval) clearInterval(this.timeInterval);
    if (this.moleInterval) clearInterval(this.moleInterval);
    this.resetButton.classList.remove('hidden');
    this.startButton.innerText = "START";
    this.startButton.classList.add('success');
    this.startButton.classList.remove('danger');
    this.state.isStarted = false;
  }

  renderControls() {
    let buttonContainer = document.createElement('div');

    this.startButton.addEventListener('click', () => {
      let { isStarted } = this.state;

      if (isStarted) {
        this.stop();
        this.startButton.innerText = "START";
        this.startButton.classList.add('success');
        this.startButton.classList.remove('danger');
        this.state.isStarted = false;
      } else {
        this.start();
        this.startButton.innerText = "STOP";
        this.startButton.classList.add('danger');
        this.startButton.classList.remove('success');
        this.state.isStarted = true;
      }
    })

    this.resetButton.addEventListener('click', () => {
      this.resetGame();
    })

    buttonContainer.appendChild(this.startButton);
    buttonContainer.appendChild(this.resetButton);

    return buttonContainer;
  }

  renderTopBar() {
    const controls = this.renderControls();
    const title = document.createElement('h2');

    title.innerText = 'Whack-A-Mole';
    this.counterContainer = document.createElement('div');
    this.counterContainer.classList.add("counter-container");
    this.counterContainer.appendChild(title);
    this.counterContainer.appendChild(controls);

    return this.counterContainer;
  }

  hitMole(moleHit) {
    const mole = moleHit.srcElement;

    this.scoreboard.innerText = this.state.score + 10;
    this.state.score = this.state.score + 10;
    mole.classList.add('mole-hit');

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

  renderScoreBar() {
    let scoreBar = document.createElement('div');
    let scoreContainer = document.createElement('div');
    let scoreTitle = document.createElement('div');
    let longGrass = document.createElement('div');
    let timeContainer = document.createElement('div');
    let timeTitle = document.createElement('div');

    scoreTitle.innerText = "Score:";
    timeTitle.innerText = "Time:";
    scoreContainer.classList.add('scoreContainer');
    timeContainer.classList.add('timeContainer');
    scoreTitle.classList.add('scoreTitle');
    timeTitle.classList.add('timeTitle');
    scoreBar.classList.add("scoreBar");

    scoreContainer.appendChild(scoreTitle);
    scoreContainer.appendChild(this.scoreboard);

    timeContainer.appendChild(timeTitle);
    timeContainer.appendChild(this.counter);

    longGrass.classList.add("longGrass");
    scoreBar.appendChild(longGrass);
    scoreBar.appendChild(timeContainer);
    scoreBar.appendChild(scoreContainer)
    // scoreBar.appendChild(scoreTitle);
    // scoreBar.appendChild(this.scoreboard);

    return scoreBar;
  }

  render() {
    const root = document.getElementById('app');
    const topBar = this.renderTopBar();
    const grid = this.renderGrid();
    const scoreBar = this.renderScoreBar();

    root.appendChild(topBar);
    root.appendChild(grid);
    root.appendChild(scoreBar);
  }
}

new App();
