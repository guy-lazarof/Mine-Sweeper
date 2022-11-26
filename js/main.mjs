var gLevel = {
  SIZE: 4,
  MINES: 2,
};

var gLife=3

var gBoard = [];

var gElLife;

var gElStartBtn;

var gElCells = [];

var gTimer = 0;

var gTimerIntervalId;

var gMines;

var victory=false

function onInitGame(level) {
  gBoard = [];
  gTimer = 0
  clearInterval(gTimerIntervalId)
  var time = document.querySelector('.timer')
  time.innerText=`TIMER: ${gTimer}`
  gLevel = level;
  gLife = 3;
  gElLife = document.querySelector('.life-counter');
  gElLife.innerText = `LIVES: ${gLife}`;
  gBoard = buildBoard(level.SIZE);
  renderBoard(gBoard);
  gElStartBtn=document.querySelector('.btn-start-reset-game');
  gElStartBtn.innerText = `😁`;
}

function buildBoard(boardSize) {
  var board = [];
  for (var i = 0; i < boardSize; i++) {
    board.push([]);
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
              onclick="setMinesOnFirstClick(this) "></button>
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
  gMines = []
  const boardSize = gBoard.length;
  for (var i = 0; i < boardSize; i++) {
    allCells.push(...gBoard[i]);
  }
  for (var i = 0; i < gLevel.MINES; i++) {
    var index = getRandomInt(0, allCells.length);
    if (allCells[index].i === +row && allCells[index].j === +column) {
      i--;
      continue;
    }

    var mineCell = allCells[index];
    gBoard[mineCell.i][mineCell.j].isMine = true;
    gMines.push(gBoard[mineCell.i][mineCell.j])
    allCells.splice(index, 1);
  }
  gBoard[row][column].isClicked = true;
  for (var i = 0; i < gElCells.length; i++) {
    gElCells[i].setAttribute('onclick', 'onCellClick(this)');
    gElCells[i].setAttribute('oncontextmenu', 'rightClick(event,this)');
  }

  setCellState();
  onCellClick(element);
  gTimerIntervalId = setInterval(timer, 1000)
}

function timer() {
  gTimer+=1
  var time = document.querySelector('.timer')
  time.innerText=`TIMER: ${gTimer}`
}

function setCellState() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard.length; j++) {
      if (gBoard[i][j].isMine) continue;
      gBoard[i][j].minesAroundCount = setCellMinesNeighborsCount(i, j);
    }
  }
}

function rightClick(ev, elCell) {
  ev.preventDefault();
  const { i: row, j: column } = elCell.dataset;
  const currCell = gBoard[row][column];
  if (currCell.isMarked) {
    currCell.isMarked = false
  } else {
    currCell.isMarked = true
   }
  if (currCell.isMarked) {
    gBoard[row][column].isMarked = true;
    elCell.innerText = '🚩';
    elCell.classList.add('is-marked');
    elCell.setAttribute('onclick', "");
    return;
  } else {
    gBoard[row][column].isMarked = false;
    elCell.innerText = '';
    elCell.classList.remove('is-marked');
    elCell.setAttribute('onclick', "onCellClick(this)");
  }
}

function onCellClick(element) {
  const { i, j } = element.dataset;
  const currCell = gBoard[+element.dataset.i][+element.dataset.j];
  const currCellI =+element.dataset.i
  const currCellJ = +element.dataset.j
  // checkVictory(gBoard)
  if (currCell.isMine) {
    playSound("mine");
    currCell.isClicked = true;
    element.innerText = '💣';
    element.classList.add('is-clicked', 'is-mine');
    element.setAttribute('disabled', true);
    gLife--;
    gElLife.innerText = `LIVES: ${gLife}`;
    if (gLife === 0) {
      endGame();
    }
    return;
  }

  else if (currCell.minesAroundCount !== 0) {
    playSound("cell");
    currCell.isClicked = true;
    element.innerText = currCell.minesAroundCount;
    element.classList.add('is-clicked', 'has-neighbors');
    element.setAttribute('disabled', true);
    return;
  } 
  else if (currCell.minesAroundCount === 0) {
    playSound("cell");
    element.classList.add('is-clicked');
    element.setAttribute('disabled', true);
    currCell.isClicked = true;
    for (var A = currCellI - 1; A <= currCellI + 1; A++) {
      if (A < 0 || A >= gBoard.length) continue;
      for (var B = currCellJ - 1; B <= currCellJ + 1; B++) {
        if (B < 0 || B >= gBoard.length) continue;
        if (A === currCellI && B === currCellJ) continue;
        gBoard[A][B].minesAroundCount = setCellMinesNeighborsCount(A, B);
        gBoard[A][B].isClicked = true;
        var elCellExpanding = document.getElementById(`${A}-${B}`)
        elCellExpanding.innerText = gBoard[A][B].minesAroundCount;
        if (gBoard[A][B].minesAroundCount !== 0) {
          elCellExpanding.innerText = gBoard[A][B].minesAroundCount;
          elCellExpanding.classList.add('is-clicked', 'has-neighbors');
          elCellExpanding.setAttribute('disabled', true);

        } else if(gBoard[A][B].minesAroundCount === 0){
          elCellExpanding.classList.add('is-clicked', 'is-empty')
          elCellExpanding.innerText = ""
          // onCellClick(elCellExpanding)
          elCellExpanding.setAttribute('disabled', true);
        }
      }
    }

    return;
  }
}

// function expanding() {
  
// }

function endGame() {
  playSound("loseGame")
  clearInterval(gTimerIntervalId)
  const elBoard = document.querySelector('.board');
  elBoard.innerHTML = `<div class="game-over">Game Over</div>`;
  gElStartBtn=document.querySelector('.btn-start-reset-game');
  gElStartBtn.innerText = `😭`;
}

function resetGame() {
  playSound("startGame")
  onInitGame(gLevel);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function playSound(sound) {
  if (sound === "cell") {
    var sound = new Audio('sound/click.mp3');
    sound.play();
  }
  else if (sound === "mine") {
    var sound = new Audio('sound/mine.mp3');
    sound.play();
  } else if (sound === "startGame") {
    var sound = new Audio('sound/startGame.mp3');
    sound.play();
  }
  else if (sound === "loseGame") {
    var sound = new Audio('sound/loseGame.mp3');
    sound.play();
  }
}

// function checkVictory(gBoard){
//   for (var i = 0; i <gBoard.length; i++){
//     for (var j = 0; j < gBoard.length; j++) {
//       if (gBoard[i][j].isMine) {
//         if ((!gBoard[i][j].isClicked) && (!gBoard[i][j].isMarked)) {
//           console.log('gBoard:', gBoard)
//           return false
//         }
//         else  {
//           console.log('winnn')
//         }
//       }
//     }
    
//     }
    
// }