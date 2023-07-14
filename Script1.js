const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const playerTurnElement = document.getElementById('playerTurn');
const playerColorElement = document.getElementById('playerColor');

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
let circleTurn;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
        cell.style.backgroundColor = '';
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
    updateTurnMessage();
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false, currentClass);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw, winningClass) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!';
        winningMessageElement.style.backgroundColor = 'lightblue';
    } else {
        winningMessageTextElement.innerText = `${winningClass === CIRCLE_CLASS ? "O's" : "X's"} Wins!`;
        winningMessageElement.style.backgroundColor = winningClass === CIRCLE_CLASS ? 'pink' : 'lightblue';
    }
    winningMessageElement.classList.add('show');
    playerTurnElement.classList.remove(X_CLASS);
    playerTurnElement.classList.remove(CIRCLE_CLASS);
    playerColorElement.style.color = '';
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.style.backgroundColor = currentClass === CIRCLE_CLASS ? 'pink' : 'lightblue';
}

function swapTurns() {
    circleTurn = !circleTurn;
    updateTurnMessage();
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function updateTurnMessage() {
    if (circleTurn) {
        playerTurnElement.innerText = "O's Turn";
        playerTurnElement.classList.remove(X_CLASS);
        playerTurnElement.classList.add(CIRCLE_CLASS);
        playerColorElement.style.color = "pink";
    } else {
        playerTurnElement.innerText = "X's Turn";
        playerTurnElement.classList.remove(CIRCLE_CLASS);
        playerTurnElement.classList.add(X_CLASS);
        playerColorElement.style.color = "blue";
    }
}
