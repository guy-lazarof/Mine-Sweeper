var gCell = {
  minesAroundCount: 4,
  isShown: false,
  isMine: false,
  isMarked: true,
};

var gLevel = {
  SIZE: 4,
  MINES: 2,
};

var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
  life: 3,
};

var gBoard = [];

var gElLife;

var gElCells = [];

function onInitGame(level) {
  gBoard = [];
  console.log('onInit');
  gLevel = level;
  gGame.life = 3;
  gElLife = document.querySelector('.life-counter');
  gElLife.innerText = gGame.life;
  gBoard = buildBoard(level.SIZE);
  console.log('board:', gBoard);
  renderBoard(gBoard);
}

function buildBoard(boardSize) {
  var board = [];
  for (var i = 0; i < boardSize; i++) {
    board.push([]); //each array is an i row
    for (var j = 0; j < boardSize; j++) {
      board[i][j] = {
        isClicked: false,
        isMine: false,
        isMarked: false,
        minesAroundCount: 0,
        i,
        j,
      };
    }
  }
  return board;
}

function setCellMinesNeighborsCount(cellI, cellJ) {
  var neighborsCount = 0;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= gBoard.length) continue;

    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue;
      if (j < 0 || j >= gBoard[i].length) continue;

      if (gBoard[i][j].isMine === true) neighborsCount++;
    }
  }
  return neighborsCount;
}

function renderBoard(board) {
  var strHTML = '';
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < board.length; j++) {
      var currCell = board[i][j];
      strHTML += `
      <td>
      <button class='cell'
              id="${i}-${j}"
              data-i="${i}" 
              data-j="${j}" 
              onclick="setMinesOnFirstClick(this)"></button>
      </td>`;
    }
    strHTML += '</tr>';
  }
  const elBoard = document.querySelector('.board');
  elBoard.innerHTML = null;
  elBoard.innerHTML += strHTML;
  gElCells = document.querySelectorAll('.cell');
}

function setMinesOnFirstClick(element) {
  const { i: row, j: column } = element.dataset;
  var allCells = [];
  const boardSize = gBoard.length;
  for (var i = 0; i < boardSize; i++) {
    allCells.push(...gBoard[i]);
  }
  for (var i = 0; i < gLevel.MINES; i++) {
    var index = getRandomInt(0, allCells.length);
    if (allCells[index].i === row && allCells[index].j === column) {
      i--;
      continue;
    }
    var mineCell = allCells[index];
    gBoard[mineCell.i][mineCell.j].isMine = true;
    allCells.splice(index, 1);
  }
  gBoard[row][column].isClicked = true;
  console.log('gBoard:', gBoard);

  for (var i = 0; i < gElCells.length; i++) {
    gElCells[i].setAttribute('onclick', 'onCellClick(this)');
  }

  setCellState();

  onCellClick(element);
}

function setCellState() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard.length; j++) {
      if (gBoard[i][j].isMine) continue;
      gBoard[i][j].minesAroundCount = setCellMinesNeighborsCount(i, j);
    }
  }
}

function onCellClick(element) {
  const { i, j } = element.dataset;
  const currCell = gBoard[element.dataset.i][element.dataset.j];
  console.log(currCell);
  if (currCell.isMine) {
    gBoard[i][j].isClicked = true;
    element.innerText = 'mine';
    element.classList.add('is-clicked', 'is-mine');
    element.setAttribute('disabled', true);
    gGame.life--;
    gElLife.innerText = gGame.life;
    if (gGame.life === 0) {
      endGame();
    }
    //stop timer
    //decrease life by 1. If life === 0, end the game and make all the mines shown
    return;
  }

  if (typeof currCell.minesAroundCount === 'number') {
    gBoard[i][j].isClicked = true;
    if (gBoard[i][j].minesAroundCount > 0) {
      element.innerText = gBoard[i][j].minesAroundCount;
      element.classList.add('is-clicked', 'has-neighbors');
      element.setAttribute('disabled', true);
      return;
    } else {
      element.innerText = null;
      element.classList.add('is-clicked', 'is-empty');
      element.setAttribute('disabled', true);
      return;
    }
  }

  if (currCell.isMarked) {
    gBoard[i][j].isMarked = true;
    element.innerText = 'flag';
    element.classList.add('is-marked');
    //TODO:change the classes
    // TODO:change content to "flag-icon"
    //TODO:change bg-color
    //TODO:disable left click
    //TODO:right click return to initial state
    return;
  }
}

function endGame() {
  const elBoard = document.querySelector('.board');
  elBoard.innerHTML = `<div class="game-over">Game Over</div>`;
}

function resetGame() {
  onInitGame(gLevel);
}

// function cellMarked(elCell) {}

// function checkGameOver() {}

// function expandShown(board, elCell, i, j) {}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
