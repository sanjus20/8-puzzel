
// ===============================
// GLOBAL BOARD STATE
// ===============================

let board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
];

// ===============================
// RENDER BOARD (GRID)
// ===============================

function renderBoard() {
    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";

    for (let i = 0; i < 3; i++) {
        const row = document.createElement("div");
        row.style.display = "flex";

        for (let j = 0; j < 3; j++) {
            const cell = document.createElement("div");

            cell.textContent = board[i][j] === 0 ? "" : board[i][j];
            cell.style.width = "60px";
            cell.style.height = "60px";
            cell.style.border = "2px solid black";
            cell.style.display = "flex";
            cell.style.alignItems = "center";
            cell.style.justifyContent = "center";
            cell.style.margin = "3px";
            cell.style.fontSize = "22px";
            cell.style.fontWeight = "bold";
            cell.style.background = board[i][j] === 0 ? "#eee" : "#fafafa";

            row.appendChild(cell);
        }
        boardDiv.appendChild(row);
    }
}

// ===============================
// SET PUZZLE FROM TEXTAREA
// ===============================

function setPuzzle() {
    const input = document.getElementById("input").value.trim().split("\n");

    if (input.length !== 3) {
        alert("Puzzle must be 3 rows");
        return;
    }

    let newBoard = input.map(row =>
        row.trim().split(/\s+/).map(Number)
    );

    const flat = newBoard.flat().sort().join("");
    if (flat !== "012345678") {
        alert("Invalid puzzle numbers!");
        return;
    }

    board = newBoard;
    renderBoard();
}

// ===============================
// MOVE TILE (LOCAL MOVE)
// ===============================

function moveTile(direction) {
    let x, y;

    // Find empty tile (0)
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === 0) {
                x = i;
                y = j;
            }
        }
    }

    let nx = x, ny = y;
    if (direction === "up") nx--;
    if (direction === "down") nx++;
    if (direction === "left") ny--;
    if (direction === "right") ny++;

    if (nx >= 0 && nx < 3 && ny >= 0 && ny < 3) {
        [board[x][y], board[nx][ny]] = [board[nx][ny], board[x][y]];
        renderBoard();
    }
}

// ===============================
// SOLVE PUZZLE (BACKEND BFS)
// ===============================

function solvePuzzle() {
    fetch("http://127.0.0.1:5000/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: board })
    })
    .then(res => res.json())
    .then(data => {
        if (!data.moves) {
            alert("Solver error");
            return;
        }

        let i = 0;

        function animate() {
            if (i < data.moves.length) {
                moveTile(data.moves[i]);
                i++;
                setTimeout(animate, 400);
            }
        }

        animate();
    })
    .catch(err => {
        console.error(err);
        alert("Backend not running!");
    });
}

// ===============================
// BUTTON HANDLERS
// ===============================

function sendMove(direction) {
    moveTile(direction);
}

// ===============================
// INITIAL LOAD
// ===============================

window.onload = () => {
    renderBoard();
};

