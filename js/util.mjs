'use strict';

//* GETS AN EMPTY GLOBAL VAR OF GNUMS AND BUILDS IT ACCORDING TO THE GNUMSRANGE LENGTH
function resetNums() {
  gNums = [];
  for (var i = 0; i < gNumsRange; i++) {
    gNums.push(i + 1);
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////
//* DRAWS A RANDOM NUMBER FROM GNUMS ARRAY AND SPLICES THAT NUM SO IT WONT REPEAT ITSELF
function drawNum() {
  var randIdx = getRandomInt(0, gNums.length);
  var num = gNums[randIdx];
  gNums.splice(randIdx, 1);
  return num;
}

/////////////////////////////////////////////////////////////////////
//* DRAW a RAN num from nums input and splice it out of the array
function drawNum(nums) {
  var idx = getRandomInt(0, nums.length);
  var num = nums[idx];
  nums.splice(idx, 1);

  return num;
}

///////////////////////////////////////////////////////////////////////////////////////////////
//* GET RANDOM INT INCLUSIVE / EXCLUSIVE

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//* GET RANDOM INT INCLUSIVE / INCLUSIVE

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

///////////////////////////////////////////////////////////////////////////////////////////////
//* CREATES BOARD ACCORDING TO GLOBAL SIZE VAR
export function createBoard() {
  var size = gSize;
  const board = [];
  for (var i = 0; i < size; i++) {
    board.push([]);
    for (var j = 0; j < size; j++) {
      board[i][j] = VAR;
    }
  }
  return board;
}
///////////////////////////////////////////////////////////////////////////////////////////////
//* GETS A BOARD FROM CREATEBOARD AND RENDERING IT TO THE DOM
export function renderBoard(board) {
  var strHTML = '';
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < board[0].length; j++) {
      var currCell = board[i][j];
      strHTML += `<td data-i="${i}" data-j="${j}" onclick="onCellClicked(this, ${currCell})" >${currCell}</td>`;
    }
    strHTML += '</tr>';
  }
  const elBoard = document.querySelector('.board');
  elBoard.innerHTML += strHTML;
}
///////////////////////////////////////////////////////////////////////////////////////////
//*renders a board and has a class name to use and insert to tbody.board

function renderBoard(board) {
  var strHTML = '';
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < board[0].length; j++) {
      const cell = board[i][j];
      strHTML += `<td data-i="${i}" data-j="${j}" onclick="onCellClicked(this, ${i}, ${j})" class="${className} ">${cell}</td>`;
    }
    strHTML += '</tr>';
  }
  const elBoard = document.querySelector('tbody.board');
  elBoard.innerHTML = strHTML;
}
//////////////////////////////////////////////////////////////////////////////////////////////
//* RENDER A BOARD with the table element itself.
//* gets a mat and selector.

function renderBoard(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      const cell = mat[i][j];
      const className = `cell cell-${i}-${j}`;

      strHTML += `<td class="${className}">${cell}</td>`;
    }
    strHTML += '</tr>';
  }
  strHTML += '</tbody></table>';

  const elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

///////////////////////////////////////////////////////////////////////////////////////////////
//* INCASE WE NEED TO WORK/RENDER ON NEW MATRIX - DO NOT USE SPLICE IT SHALLOW COPY
function copyMat(mat) {
  var newMat = [];
  for (var i = 0; i < mat.length; i++) {
    newMat[i] = [];
    for (var j = 0; j < mat[0].length; j++) {
      newMat[i][j] = mat[i][j];
    }
  }
  return newMat;
}
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////
//* CREATE ANY ITEM
function createBalloons(count) {
  var balloons = [];
  for (var i = 0; i < count; i++) {
    var balloon = createBalloon(i);
    balloons.push(balloon);
  }
  return balloons;
}

///////////////////////////////////////////////////////////////////////////////////////////////
function shuffle(items) {
  var randIdx, keep, i;
  for (i = items.length - 1; i > 0; i--) {
    randIdx = getRandomInt(0, items.length - 1);

    keep = items[i];
    items[i] = items[randIdx];
    items[randIdx] = keep;
  }
  return items;
}

///////////////////////////////////////////////////////////////////////////////////////////////
//* RENDER ONLY CELL TO DOM
// location is an object like this - { i: 2, j: 7 } or location.i:i , location.j : j
function renderCell(location, value) {
  // Select the elCell and set the value
  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
}
///////////////////////////////////////////////////////////////
//* RENDER A CELL FROM LOCATION USING GETCLASSNAME FUNC AND RETURN the value into the innerHTML
function renderCell(location, value) {
  const cellSelector = '.' + getClassName(location); // cell-i-j
  const elCell = document.querySelector(cellSelector);
  elCell.innerHTML = value;
}

///////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//* GET RANDOM COLOR
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

///////////////////////////////////////////////////////////////////////////////////////////////

//* SHOW / HIDE ELEMENT
function hideElement(selector) {
  const el = document.querySelector(selector);
  el.classList.add('hidden');
}

function showElement(selector) {
  const el = document.querySelector(selector);
  el.classList.remove('hidden');
}

//////////////////////////////////////////////////////////

//* GET ANY CELL TO AN ARRAY
function getEmptyCell(board) {
  const emptyCells = [];
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      var currCell = board[i][j];
      if (currCell.gameElement === null && currCell.type !== WALL)
        emptyCells.push({ i: i, j: j });
    }
  }
  //* CHOOSE A RANDOM INDEX FROM THAT ARRAY AND RETURN THE CELL ON THAT INDEX
  const randomIdx = getRandomInt(0, emptyCells.length - 1);
  return emptyCells[randomIdx];
}

//////////////////////////////////////////////////////////
//* NEGS LOOP
function countFoodAround(board, rowIdx, colIdx) {
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (i === rowIdx && j === colIdx) continue;
      if (j < 0 || j >= board[0].length) continue;
      var currCell = board[i][j];
    }
  }
}

//////////////////////////////////////////////////////////
//* NEGS LOOP like in the pacman GAME
function countNeighbors(cellI, cellJ, mat) {
  var neighborsCount = 0;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue;

    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue;
      if (j < 0 || j >= mat[i].length) continue;

      if (mat[i][j] === LIFE || mat[i][j] === SUPER_LIFE) neighborsCount++;
    }
  }
  return neighborsCount;
}

//////////////////////////////////////////////////////////////////////////////
//*builds a board but a specific one with islands inside from the food player game

function buildBoard() {
  const size = 10;
  const board = [];

  for (var i = 0; i < size; i++) {
    board.push([]);
    for (var j = 0; j < size; j++) {
      board[i][j] = FOOD;
      if (
        i === 0 ||
        i === size - 1 ||
        j === 0 ||
        j === size - 1 ||
        (j === 3 && i > 4 && i < size - 2)
      ) {
        board[i][j] = WALL;
      }
    }
  }
  return board;
}

////////////////////////////////////////////////////////////
//* return a cellClass by input a object with location keys and values (location.i , location.j)

function getClassName(location) {
  const cellClass = 'cell-' + location.i + '-' + location.j;
  return cellClass;
}

///////////////////////////////////////////////////////////////////////
//* getting next location with an EVENT LISTENER - NEED TO ADD HANDLE ON KEY IN HTML !
//* works for arrowkeys only! can adjust by the key name find in the console.log

//* IT USES A GLOBAL VAR FROM GAMER POSITION
//* NEED TO SEE HOW TO USE IT (WHAT TO RETURN to where)

function onHandleKey(event) {
  const i = gGamerPos.i;
  const j = gGamerPos.j;
  console.log('event.key:', event.key);

  switch (event.key) {
    case 'ArrowLeft':
      moveTo(i, j - 1);
      break;
    case 'ArrowRight':
      moveTo(i, j + 1);
      break;
    case 'ArrowUp':
      moveTo(i - 1, j);
      break;
    case 'ArrowDown':
      moveTo(i + 1, j);
      break;
  }
}

///////////////////////////////////////////////////////
//* getting next location with an EVENT LISTENER - NEED TO ADD HANDLE ON KEY IN HTML !
//* works for arrowkeys only! can adjust by the key name find in the console.log

function getNextLocation(eventKeyboard) {
  // console.log(eventKeyboard)
  const nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };
  // DONE: figure out nextLocation
  switch (eventKeyboard) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
  }

  return nextLocation; //RETURNS AN OBJECT
}

////////////////////////////////////////////////////////////////
//*SORTING NUMS

numbers.sort(function (a, b) {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
});

//////////////////////////////////////////////////////////////
//* time from specific time stamp when it called.

function getTime() {
  return new Date().toString().split(' ')[4];
}

////////////////////////

const GAMER_IMG = '<img src="img/gamer.png">';
const WIN_SOUND = new Audio('sound/win.mp3');
WIN_SOUND.play();
