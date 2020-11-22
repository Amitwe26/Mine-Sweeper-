'use strict'

const MINE = '💣';
const FLAG = '🚩';
const WIN = '😎';
const NORMAL = '😊';
const LOSE = '🤯';


var gLive = 3;
var gGameInterval;
var gBoard;
var gRandomPositionMine;
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gLevels = {
    'Beginner': { SIZE: 4, MINES: 2 },
    'Regular': { SIZE: 8, MINES: 12 },
    'Advanced': { SIZE: 12, MINES: 30 }
};

var gLevel = {
    SIZE: 4,
    MINES: 2
};


function initGame() {
    gGame.isOn = false;
    gGame.shownCount = 0;
    gGame.secsPassed = 0;
    gGame.markedCount = 0;

    clearInterval(gGameInterval);

    document.querySelector('.status').innerText = NORMAL;
    document.querySelector('.timmer span').innerText = '0';

    gBoard = buildBoard(gLevel);
    renderBoard(gBoard);
}

function initBoard(i, j) {
    gGame.isOn = true;
    seedMines(gBoard, gLevel, i, j);
    calcMinesNegs(gBoard);
    gGameInterval = setInterval(timerOut, 1000);
}

function buildBoard(gLevel) {
    var board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                mineAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            };
        }

    }
    console.log(board);
    return board;
}


function seedMines(gBoard, gLevel, i, j) {
    gRandomPositionMine = [];
    while (gRandomPositionMine.length !== gLevel.MINES) {
        var numI = getRndInteger(0, gLevel.SIZE - 1);
        var numJ = getRndInteger(0, gLevel.SIZE - 1);
        if (!gBoard[numI][numJ].isMine && numI !== i && numJ !== j) {
            gBoard[numI][numJ].isMine = true;
            gRandomPositionMine.push({ 'i': numI, 'j': numJ });
        }
    }

}

function revealMines() {
    for (var index = 0; index < gRandomPositionMine.length; index++) {
        var minePossision = gRandomPositionMine[index];
        var i = minePossision['i'];
        var j = minePossision['j'];
        var elCell = document.querySelector(`.cell-${i}-${j}`);
        gBoard[i][j].isShown = true;
        elCell.innerText = getCellValue(gBoard[i][j]);
        elCell.classList.add('cellOpen');
    }

}


function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var value = getCellValue(cell)
            strHTML += `<td class="cell-${i}-${j} cell "  onmousedown="cellClicked(this,event,${i},${j})" >${value}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '';
    var elContainer = document.querySelector('.board');
    elContainer.innerHTML = strHTML;

}

function cellClicked(elCell, ev, i, j) {
    if (gGame.isOn === false && gGame.shownCount !== 0) return;
    var cell = gBoard[i][j]
    if (ev.button === 2) {
        if (cell.isShown) return;
        if (cell.isMarked) {
            gGame.markedCount--;
            console.log('delete flag', gGame.markedCount);
        } else {
            gGame.markedCount++;
            console.log('add flag', gGame.markedCount);
        }
        cell.isMarked = !cell.isMarked;
        console.log('Now is:', cell.isMarked);
    } else {
        if (cell.isShown) return;
        if (cell.isMarked) return;
        if (gGame.shownCount === 0) {
            initBoard(i, j)
        }
        cell.isShown = true;
        gGame.shownCount++;
        elCell.classList.add('cellOpen');
        if (cell.isMine) {
            gameOver(cell, elCell);
            revealMines();
        } else if (gGame.shownCount === gLevel.SIZE ** 2 - gLevel.MINES) {
            gameSuccess();
        }

    }
    var value = getCellValue(cell);
    elCell.innerText = value;

}


function gameSuccess(cell) {
    clearInterval(gGameInterval);
    document.querySelector('.status').innerHTML = WIN;
    gGame.isOn = false;
    var value = getCellValue(cell);
    elCell.innerText = value;


}

function gameOver(cell, elCell) {
    clearInterval(gGameInterval);
    document.querySelector('.status').innerHTML = LOSE;
    gGame.isOn = false;
    var value = getCellValue(cell);
    elCell.innerText = value;
    elCell.classList.add('cellMine');

}

function getCellValue(cell) {
    if (cell.isShown) {
        if (cell.isMine) {
            return MINE;
        } else {
            if (cell.mineAroundCount === 0) {
                return '';
            }
            return cell.mineAroundCount;
        }
    } else if (cell.isMarked) {
        return FLAG;
    }
    return '';

}



function changeLevel(userInput) {
    if (gGame.isOn) {
        var result = confirm('New game?');
        if (!result) {
            return;
        }
    }
    gLevel = gLevels[userInput];
    initGame()
}

function timerOut() {

    gGame.secsPassed++
    var getH1 = document.querySelector('.timmer span');
    getH1.innerText = gGame.secsPassed;

    console.log(gGame.secsPassed);

}
