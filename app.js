const spaces = document.querySelectorAll('.space');
spaces.forEach(space => space.addEventListener('click', handleClick));

let turn = 0;
const xBoard = [];
const oBoard = [];
const totalSpaces = 9;

function handleClick() {
  if (this.textContent) alert('Space is already taken!');
  else {
    if (turn % 2 === 0) this.textContent = 'X';
    else this.textContent  = 'O';
    setBoard(this, turn);
    turn++;
  }
}

function setBoard(space) {
  const id = parseInt(space.getAttribute('id'));
  if (turn % 2 === 0) xBoard.push(id);
  else oBoard.push(id);
}

function checkRows() {

}

function checkColumns() {

}

function checkDiagonals() {

}