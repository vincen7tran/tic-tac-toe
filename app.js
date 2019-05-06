const spaces = document.querySelectorAll('.space');
spaces.forEach(space => space.addEventListener('click', handleClick));

let playerXTurn = true;
const board = {};
const totalSpaces = 9;
const blankPlayerBoard = {
  rowOne: 0, rowTwo: 0, rowThree: 0,
  majorDiag: 0, minorDiag: 0,
  colOne: 0, colTwo: 0, colThree: 0
};
const xBoard = Object.assign({}, blankPlayerBoard)
const oBoard = Object.assign({}, blankPlayerBoard);

function handleClick() {
  const id = parseInt(this.getAttribute('id'));
  if (board[id]) alert('Space is already taken!');
  else {
    if (playerXTurn) this.textContent = 'X';
    else this.textContent  = 'O';
    setBoard(playerXTurn, id);
    playerXTurn = !playerXTurn;
  }
}

function setBoard(playerXTurn, id) {
  
  board[id] = true;
  const currentBoard = playerXTurn ? xBoard : oBoard;

  if (id === 0) {
    currentBoard['rowOne']++;
    currentBoard['colOne']++;
    currentBoard['majorDiag']++;
  } else if (id === 1) {
    currentBoard['rowOne']++;
    currentBoard['colTwo']++;
  } else if (id === 2) {
    currentBoard['rowOne']++;
    currentBoard['colThree']++;
    currentBoard['minorDiag']++;
  } else if (id === 3) {
    currentBoard['rowTwo']++;
    currentBoard['colOne']++;
  } else if (id === 4) {
    currentBoard['rowTwo']++;
    currentBoard['colTwo']++;
    currentBoard['majorDiag']++;
    currentBoard['minorDiag']++;
  } else if (id === 5) {
    currentBoard['rowTwo']++;
    currentBoard['colThree']++;
  } else if (id === 6) {
    currentBoard['rowThree']++;
    currentBoard['colOne']++;
    currentBoard['minorDiag']++;
  } else if (id === 7) {
    currentBoard['rowThree']++;
    currentBoard['colTwo']++;
  } else if (id === 8) {
    currentBoard['rowThree']++;
    currentBoard['colThree']++;
    currentBoard['majorDiag']++;
  }
  checkVictory();
}

function checkVictory() {
  for (let key in xBoard) {
    if (xBoard[key] === 3) endGame('X');
  }
  for (let key in oBoard) {
    if (oBoard[key] === 3) endGame('O');
  }
  if (Object.keys(board).length === totalSpaces) endGame('draw')
}

function endGame(status) {
  if (status === 'X') alert('Player X Wins!');
  else if (status === 'O') alert('Player O Wins!');
  else alert('DRAW!')
}