// Define winning combinations for Tic-Tac-Toe
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];

// Variables to hold the game state
let board, turn, winner;

// Cached DOM elements
const messageEl = document.getElementById('message');
const boardEl = document.getElementById('board');
const resetButton = document.getElementById('reset-button');

// Initialize game
function init() {
    board = Array(9).fill(''); // Create an empty board
    turn = 'X'; // X always goes first
    winner = null; // No winner at the start
    renderBoard(); // Render the game board
    updateMessage(); // Update the message
}

// Render the Tic-Tac-Toe board
function renderBoard() {
    boardEl.innerHTML = ''; // Clear any existing board
    board.forEach((mark, idx) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.textContent = mark; // Display X or O
        square.addEventListener('click', () => handleTurn(idx));
        boardEl.appendChild(square);
    });
}

// Handle player's turn
function handleTurn(idx) {
    // If square is already taken or game is over, do nothing
    if (board[idx] || winner) return;

    // Mark the current square with the player's mark
    board[idx] = turn;
    winner = checkWinner(); // Check for a winner or a tie
    turn = turn === 'X' ? 'O' : 'X'; // Switch turns
    renderBoard(); // Re-render the board
    updateMessage(); // Update the game message
}

// Check for a winner or tie
function checkWinner() {
    // Check all winning combinations
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]; // Return 'X' or 'O' if there's a winner
        }
    }
    // If the board is full and no winner, it's a tie
    if (!board.includes('')) {
        return 'T'; // Tie
    }
    return null; // No winner yet
}

// Update the game message based on the game state
function updateMessage() {
    if (winner === 'T') {
        messageEl.textContent = "It's a tie!";
    } else if (winner) {
        messageEl.textContent = `${winner} wins!`;
    } else {
        messageEl.textContent = `It's ${turn}'s turn!`;
    }
}

// Reset the game when the reset button is clicked
resetButton.addEventListener('click', init);

// Start the game for the first time
init();
