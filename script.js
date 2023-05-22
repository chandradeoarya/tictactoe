let board = Array(9).fill(null);
let currentPlayer = 'X';
let isGameOver = false;

function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for(let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if(board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    if(!board.includes(null)) {
        return 'draw';
    }

    return null;
}

function handleClick(i) {
    if(isGameOver || board[i]) {
        return;
    }

    board[i] = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    const result = checkWin();
    if(result) {
        isGameOver = true;
        document.getElementById('message').innerText = result === 'draw' ? "It's a draw!" : `${result} wins!`;
    } else {
        document.getElementById('message').innerText = `It's ${currentPlayer}'s turn!`;
    }

    drawBoard();
}

function drawBoard() {
    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = '';
    board.forEach((cell, i) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.innerText = cell ? cell : '';
        cellDiv.addEventListener('click', () => handleClick(i));
        boardDiv.appendChild(cellDiv);
    });
}

function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    isGameOver = false;
    document.getElementById('message').innerText = `It's ${currentPlayer}'s turn!`;
    drawBoard();
}

document.getElementById('reset').addEventListener('click', resetGame);
resetGame();