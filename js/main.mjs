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
};

function onInitGame(level) {
  console.log('onInit');
  gLevel = level;
  var board = buildBoard(level.SIZE);
  console.log('board:', board);
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
        i: i,
        j: j,
      };
    }
  }
  return board;
}

function setMinesNegsCount(cellI, cellJ, gBoard) {
  var neighborsCount = 0;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue;

    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue;
      if (j < 0 || j >= mat[i].length) continue;

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
      <td data-i="${i}" 
          data-j="${j}" 
          onclick="onCellClick(${currCell}, this)">
      </td>`;
    }
    strHTML += '</tr>';
  }
  const elBoard = document.querySelector('.board');
  elBoard.innerHTML += strHTML;
}

function onCellClick(currCell, element) {
  if (currCell.isMine) {
    //change content to bomb
    //change view the red background;
    //stop timer
    //end game
    return;
  }

  if (currCell.isMarked) {
  }
}

// function cellMarked(elCell) {}

// function checkGameOver() {}

// function expandShown(board, elCell, i, j) {}
