const spaces = document.querySelectorAll('.space');
// spaces.forEach(space => space.addEventListener('click', handleClick));

// Bubble Up Event Listener
document.addEventListener('click', e => {
  if (e.target.classList.contains('space')) {
    handleClick(e.target);
  } else if (e.target === modal) {
    closeModal();
  }
});

const reset = document.querySelector('.reset');
reset.addEventListener('click', resetGame);

const xScore = document.querySelector('#xWins');
const oScore = document.querySelector('#oWins');

const blankPlayerBoard = {
  rowOne: 0, rowTwo: 0, rowThree: 0,
  majorDiag: 0, minorDiag: 0,
  colOne: 0, colTwo: 0, colThree: 0
};

const state = {
  lastWinner: null,
  playerXTurn: true,
  board: {},
  totalSpaces: 9,
  xBoard: Object.assign({}, blankPlayerBoard),
  oBoard: Object.assign({}, blankPlayerBoard)
}

const presentation = {
  xWins: 0,
  oWins: 0,
  xName: 'Player 1',
  oName: 'Player 2'
};

function handleClick(space) {
  const id = parseInt(space.getAttribute('id'));
  if (state.board[id]) alert('Space is already taken!');
  else {
    markSpace(space);
    setBoard(id);
  }
}

function turnSwitch() {
  state.playerXTurn = !state.playerXTurn;
}

function markSpace(space) {
  if (state.playerXTurn) space.textContent = 'X';
  else space.textContent = 'O';
}

function setBoard(id) {
  state.board[id] = true;
  const currentBoard = state.playerXTurn ? state.xBoard : state.oBoard;

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
  for (let key in state.xBoard) {
    if (state.xBoard[key] === 3) { 
      presentation.xWins++;
      return endGame('X');
    }
  }
  for (let key in state.oBoard) {
    if (state.oBoard[key] === 3) {
      presentation.oWins++;
     return endGame('O');
    }
  }
  if (Object.keys(state.board).length === state.totalSpaces) return endGame('draw')
  turnSwitch();
}

function endGame(status) {
  if (status === 'X') {
    state.lastWinner = 'X';
    alert('Player X Wins!');
  }
  else if (status === 'O') {
    state.lastWinner = 'O';
    alert('Player O Wins!');
  } 
  else {
    alert('DRAW!');
  }
  setScore();
  newGame();
}

function newGame() {
  state.xBoard = Object.assign({}, blankPlayerBoard);
  state.oBoard = Object.assign({}, blankPlayerBoard);
  state.board = {};
  state.playerXTurn = state.lastWinner === 'X' ? true : false;
  spaces.forEach(space => space.textContent = '');
}

function resetGame() {
  newGame();
  presentation.xWins = 0;
  presentation.oWins = 0;
  setScore();
}

function setScore() {
  xScore.textContent = `${presentation.xName} X Wins: ${presentation.xWins}`;
  oScore.textContent = `${presentation.oName} O Wins: ${presentation.oWins}`;
}

// Modal Implementation
const modal = document.querySelector('#playerModal');
const modalBtn = document.querySelector('#modalBtn');
const closeBtn = document.getElementsByClassName('closeBtn')[0];

modalBtn.addEventListener('click', openModal);

function openModal() {
  modal.style.display = 'block';
}

closeBtn.addEventListener('click', closeModal);

function closeModal() {
  modal.style.display = 'none';
}

// Player Name Submit
const nameSubmit = document.querySelector('#playerNameSubmit');
const p1Input = document.querySelector('#p1Name');
const p2Input = document.querySelector('#p2Name');

nameSubmit.addEventListener('click', addNames);

function addNames(e) {
  e.preventDefault();
  presentation.xName = p1Input.value ? p1Input.value : 'Player 1';
  presentation.oName = p2Input.value ? p2Input.value : 'Player 2';
  setScore();
  closeModal();
}