class Counter {
  constructor() {
    this.state = {
      isStarted: false,
      counterValue: 30,
    }

    this.counter = document.createElement('div');
    this.counter.innerText = this.state.counterValue;
  }

  start(initialValue) {
    let { counterValue } = this.state;

    if (initialValue) {
      counterValue = initialValue;
    }

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

  render() {
    const startButton = this.renderStartButton();

    this.counterContainer = document.createElement('div');

    this.counterContainer.classList.add("counter-container");
    this.counterContainer.appendChild(this.counter);
    this.counterContainer.appendChild(startButton)
    return this.counterContainer;
  }
}

export default Counter;
