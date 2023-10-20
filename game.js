let dimX = 5; // The initial board size is dimX x dimY
let dimY = 5;
const winLength = 5; // How many stones needed to win
const board = []; // The game board
let turn = "X"; // Starting player. The other player is 'O'.

function initializeGame() {
  // TODO: Task 1
  // Initialize the game board to be an array of five arrays.
  // Each of the inner arrays should contain five empty strings.
  // Use the variables dimX and dimY instead of hard coding the number five.
  let newGame = document.getElementById("newgame");
  newGame.classList.add("hidden");
  let winnerText = document.getElementById("winnerText");
  winnerText.classList.add("hidden");
  dimX = 5;
  dimY = 5;
  board.length = 0;

  let b = [];
  for (i = 0; i < dimY; i++) {
    b = [];
    for (j = 0; j < dimX; j++) {
      b.push("");
    }
    board.push(b);
  }
}

function nextTurn() {
  if (turn === "X") {
    turn = "O";
  } else {
    turn = "X";
  }
  let turnLabel = document.getElementById("turn");
  turnLabel.textContent = turn;
}

function checkWin(x, y) {
  // TODO: Task 3
  // Hint: be careful to keep yourself inside of the game board!
  // Check the neighbouring squares of the square x,y.
  // If any of them contain same character as the current turn,
  // keep on checking to that direction -- and to the opposite!
  // Number of the stones needed is in variable winLength.
  x = +x;
  y = +y;
  let left = 0;
  let right = 0;
  let up = 0;
  let down = 0;
  let northeast = 0;
  let southwest = 0;
  let northwest = 0;
  let southeast = 0;

  // left
  for (let i = 1; i < 5; i++) {
    if (turn == board[y][x - i]) {
      left = left + 1;
    } else {
      break;
    }
  }
  // right
  for (let i = 1; i < 5; i++) {
    if (turn == board[y][x + i]) {
      right = right + 1;
    } else {
      break;
    }
  }
  // up
  for (let i = 1; i < 5; i++) {
    if (y - i < 0) {
      break;
    }
    if (turn == board[y - i][x]) {
      up = up + 1;
    } else {
      break;
    }
  }
  // down
  for (let i = 1; i < 5; i++) {
    if (y + i >= board.length) {
      break;
    }
    if (turn == board[y + i][x]) {
      down = down + 1;
    } else {
      break;
    }
  }
  // northeast
  for (let i = 1; i < 5; i++) {
    if (y - i < 0) {
      break;
    }
    if (turn == board[y - i][x + i]) {
      northeast = northeast + 1;
    } else {
      break;
    }
  }

  // southwest
  for (let i = 1; i < 5; i++) {
    if (y + i >= board.length) {
      break;
    }
    if (turn == board[y + i][x - i]) {
      southwest = southwest + 1;
    } else {
      break;
    }
  }
  // northwest
  for (let i = 1; i < 5; i++) {
    if (y - i < 0) {
      break;
    }
    if (turn == board[y - i][x - i]) {
      northwest = northwest + 1;
    } else {
      break;
    }
  }
  // southeast
  for (let i = 1; i < 5; i++) {
    if (y + 1 >= board.length) {
      break;
    }
    if (turn == board[y + i][x + i]) {
      southeast = southeast + 1;
    } else {
      break;
    }
  }
  if (
    left + right + 1 >= winLength ||
    up + down + 1 >= winLength ||
    northeast + southwest + 1 >= winLength ||
    northwest + southeast + 1 >= winLength
  ) {
    let winner = document.getElementById("winner");
    winner.textContent = turn;

    let winnerText = document.getElementById("winnerText");
    winnerText.classList.remove("hidden");

    let newGame = document.getElementById("newgame");
    newGame.classList.remove("hidden");
    let button = document.getElementById("newgame");
    button.addEventListener("click", startGame);
  }
}

function expandBoard(direction) {
  // TODO: Task 2 B
  // This function adds a column or a row to the board
  // depending on the direction it gets as an argument.

  if (direction === "LEFT") {
    dimX = dimX + 1;
    for (i = 0; i < dimY; i++) {
      board[i].unshift("");
    }
  } else if (direction === "RIGHT") {
    dimX = dimX + 1;
    for (i = 0; i < dimY; i++) {
      board[i].push("");
    }
  } else if (direction === "UP") {
    dimY = dimY + 1;
    const table = [];
    for (i = 0; i < dimX; i++) {
      table.push("");
    }
    board.unshift(table);
  } else if (direction === "DOWN") {
    dimY = dimY + 1;
    const table = [];
    for (i = 0; i < dimX; i++) {
      table.push("");
    }
    board.push(table);
  }

  drawBoard();
}
function handleClick(event) {
  if (!winnerText.classList.contains("hidden")) {
    return;
  }
  let square = event.target;

  let x = square.dataset.x;
  let y = square.dataset.y;

  board[y][x] = turn;
  square.textContent = turn;
  square.removeEventListener("click", handleClick);

  checkWin(x, y);

  // TODO: Task 2 A
  // Implement the conditions when the board should be expanded.
  // Ie when the player clicks the extreme rows or columns.

  if (x == 0) {
    expandBoard("LEFT");
  } else if (x == board[0].length - 1) {
    expandBoard("RIGHT");
  }
  if (y == 0) {
    expandBoard("UP");
  } else if (y == board.length - 1) {
    expandBoard("DOWN");
  }
  nextTurn();
}

function createSquare(boardDiv, x, y) {
  let element = document.createElement("div");
  element.setAttribute("class", "square");
  element.setAttribute("data-x", x);
  element.setAttribute("data-y", y);
  element.textContent = board[y][x];

  if (board[y][x] === "") {
    element.addEventListener("click", handleClick);
  }

  boardDiv.appendChild(element);
}

function drawBoard() {
  const boardDiv = document.getElementById("board");
  boardDiv.style.gridTemplateColumns = "1fr ".repeat(dimX);
  boardDiv.style.gridTemplateRows = "1fr ".repeat(dimY);
  boardDiv.innerHTML = "";
  for (let y = 0; y < dimY; y++) {
    for (let x = 0; x < dimX; x++) {
      createSquare(boardDiv, x, y);
    }
  }
}

initializeGame();
drawBoard();

function startGame() {
  initializeGame();
  drawBoard();
}
