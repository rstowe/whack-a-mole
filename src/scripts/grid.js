class Grid {
  helloWorld() {
    console.log('hello');
  }

  hitMole(moleHit) {
    const mole = moleHit.srcElement;
    console.log('you hit', moleHit.target);
    mole.classList.remove(moleHit.target.className)
    mole.classList.add('mole-hidden');
  }

  createRow() {
    let row = document.createElement('div');
    row.classList.add("row");

    return row;
  }

  createTile(tileId) {
    let tile = document.createElement('div');
    tile.classList.add("tile");

    let hole = document.createElement('div');
    hole.classList.add('hole');

    let mole = document.createElement('div');
    mole.classList.add(`mole_${tileId}`);
    mole.addEventListener('click', (event) => {
      console.log('event', event);
      const moleHit = event;
      this.hitMole(moleHit);
    })

    hole.appendChild(mole);
    tile.appendChild(hole);

    return tile;
  }

  createGrid() {
    const gridRows = [
      { tiles: [{ id: 1 }, { id: 2 }, { id: 3 }] },
      { tiles: [{ id: 4 }, { id: 5 }, { id: 6 }] },
      { tiles: [{ id: 7 }, { id: 8 }, { id: 9 }] },
    ]

    let grid = document.createElement('div');
    grid.classList.add("grid");

    gridRows.forEach(row => {
      let rowElement = this.createRow();
      grid.appendChild(rowElement);

      row.tiles.forEach(tile => {
        let tileElement = this.createTile(tile.id);
        rowElement.appendChild(tileElement);
      })
    })

    return grid;
  }

  render() {
    return this.createGrid();
  }
}

export default Grid;
