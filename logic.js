const board = document.querySelector(".board");
const resetBTN = document.querySelector("#reset");
const dialog = document.querySelector('dialog');
const okBTN = document.querySelector(".okBTN");
var message = document.querySelector(".message");

const playerOne = createPlayer("P1", "X");
const playerTwo = createPlayer("P2", "O");

var playerTurn = playerOne;


createBoard();

var cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
    cell.innerText = null;
});

console.log(cells[0].innerText);


resetBTN.addEventListener('click', reset);

okBTN.addEventListener('click', () => {
    dialog.close();
    reset();
})



function checkWin() {
    let draw = true;
    cells.forEach((cell) => {
        if (cell.innerText === "") {
            draw = false;
        }
    });
    if ((cells[0].innerText == cells[1].innerText && cells[0].innerText == cells[2].innerText && cells[0].innerText != "") || (cells[3].innerText == cells[4].innerText && cells[3].innerText == cells[5].innerText && cells[3].innerText != "") ||
        (cells[2].innerText == cells[4].innerText && cells[2].innerText == cells[6].innerText && cells[2].innerText != "") || (cells[6].innerText == cells[7].innerText && cells[6].innerText == cells[8].innerText && cells[6].innerText != "") ||
        (cells[0].innerText == cells[3].innerText && cells[0].innerText == cells[6].innerText && cells[0].innerText != "") || (cells[1].innerText == cells[4].innerText && cells[1].innerText == cells[7].innerText && cells[1].innerText != "") ||
        (cells[2].innerText == cells[5].innerText && cells[2].innerText == cells[8].innerText && cells[2].innerText != "") || (cells[0].innerText == cells[4].innerText && cells[0].innerText == cells[8].innerText && cells[0].innerText != "")) {
        message.innerText = `Winner is ${playerTurn.getName()}`;
        dialog.showModal();
    }
    else if (draw) {
        message.innerText = `DRAW!`;
        dialog.showModal();
    };

};



function setTurn(player) {
    if (player.getMark() == "X") {
        return playerTwo;
    }
    else {
        return playerOne;
    }
};


function createPlayer(name, mark) {
    let playerName = name;
    let playerMark = mark;

    const getName = () => playerName;
    const setName = (newName) => playerName = newName;

    const getMark = () => playerMark;
    const setMark = (newMark) => playerMark = newMark;

    return { getName, setName, getMark, setMark };
};


function createBoard() {
    for (let i = 1; i < 10; i++) {
        const cell = document.createElement("div");
        cell.setAttribute("id", i);
        cell.setAttribute('class', "cell");
        cell.style.backgroundColor = "wheat";
        cell.style.border = "solid black 1px";
        cell.addEventListener("click", function click() {
            cell.innerText = playerTurn.getMark();
            checkWin();
            playerTurn = setTurn(playerTurn);
            cell.removeEventListener("click", click);
        });
        board.appendChild(cell);
    }

};


function reset() {
    board.innerHTML = "";
    playerTurn = playerOne;
    createBoard(playerTurn);
    cells = document.querySelectorAll(".cell");
};



//FACTORY
/*
function createPlayer(name, mark) {
    let playerName = name;
    let playerMark = mark;

    const getName = () => playerName;
    const getMark = () => playerMark;

    return {
        getName,
        getMark
    };
}

function createCell(id) {
    let mark = "";

    const getMark = () => mark;
    const setMark = (newMark) => mark = newMark;

    const render = () => {
        const cell = document.createElement("div");
        cell.setAttribute("id", id);
        cell.setAttribute('class', "cell");
        cell.style.backgroundColor = "wheat";
        cell.style.border = "solid black 1px";
        cell.addEventListener("click", function click() {
            if (mark === "") {
                setMark(game.getCurrentPlayer().getMark());
                cell.innerText = getMark();
                game.checkWin();
                game.nextTurn();
                cell.removeEventListener("click", click);
            }
        });
        return cell;
    };

    return {
        getMark,
        setMark,
        render
    };
}


function createGame(playerOne, playerTwo) {
    let currentPlayer = playerOne;
    let cells = [];

    const getCurrentPlayer = () => currentPlayer;
    const nextTurn = () => currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;

    const checkWin = () => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        let isDraw = cells.every(cell => cell.getMark() !== "");

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (cells[a].getMark() && cells[a].getMark() === cells[b].getMark() && cells[a].getMark() === cells[c].getMark()) {
                message.innerText = `Winner is ${currentPlayer.getName()}`;
                dialog.showModal();
                return;
            }
        }

        if (isDraw) {
            message.innerText = `DRAW!`;
            dialog.showModal();
        }
    };

    const createBoard = () => {
        const board = document.querySelector(".board");
        board.innerHTML = "";
        for (let i = 0; i < 9; i++) {
            const cell = createCell(i);
            cells.push(cell);
            board.appendChild(cell.render());
        }
    };

    return {
        getCurrentPlayer,
        nextTurn,
        checkWin,
        createBoard
    };
}

const playerOne = createPlayer("P1", "X");
const playerTwo = createPlayer("P2", "O");

const game = createGame(playerOne, playerTwo);
game.createBoard();

const resetBTN = document.querySelector("#reset");
const dialog = document.querySelector('dialog');
const okBTN = document.querySelector(".okBTN");
var message = document.querySelector(".message");

resetBTN.addEventListener('click', () => {
    game.createBoard();
});

okBTN.addEventListener('click', () => {
    dialog.close();
    game.createBoard();
});

*/