'use strict'

const MINE = '💣';
const FLAG = '🚩'


var gBoard;
var gGame = {
    isOn: false,
    shownCount: 0,      //how much open
    markedCount: 0,         //how much with flag
    secsPassed: 0           //timmer
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



function init() {
    gBoard = buildBoard(gLevel);
    seedMines(gBoard);
    calcMinesNegs(gBoard);
    renderBoard(gBoard);
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

function seedMines(gBoard) {
    gBoard[2][3].isMine = true;             //seed mines on the board
    gBoard[1][1].isMine = true;

}

function calcMinesNegs(gBoard) {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            setMinesNegsCount(gBoard, i, j)
        }

    }
}

function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var value = getCellValue(cell)
            strHTML += `<td class="cell "  onmousedown="cellClicked(this,event,${i},${j})" >${value}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '';
    var elContainer = document.querySelector('.board');
    elContainer.innerHTML = strHTML;

}
function cellClicked(elCell, ev, i, j) {
    var cell = gBoard[i][j]
    if (ev.button === 2) {                  //right click give me in event "button 2"
        if (cell.isShown) return;
        if (cell.isMarked) {
            gGame.markedCount--;
            console.log('delete flag', gGame.markedCount);           //delete flag
        } else {
            gGame.markedCount++;
            console.log('add flag', gGame.markedCount);                //add flag
        }
        cell.isMarked = !cell.isMarked;                     //the toggle for flag 
        console.log('Now is:', cell.isMarked);
    } else {
        if (cell.isShown) return;
        if (cell.isMarked) return;
        cell.isShown = true;
        gGame.shownCount++;                         //add to count of open cell 
        elCell.classList.add('cellOpen');
        if (cell.isMine) {
            alert('game over!!!');
        }
    }
    var value = getCellValue(cell);
    elCell.innerText = value;
    // renderCell(elCell, value);

}



function getCellValue(cell) {                       //get in the cell and check what the value
    if (cell.isShown) {
        if (cell.isMine) {
            return MINE;
        } else {
            if (cell.mineAroundCount === 0) {           /// check if emtpy cell 
                return '';
            }
            return cell.mineAroundCount;                // return number 
        }
    } else if (cell.isMarked) {
        return FLAG;                                 //// return empty cell 
    }
    return '';

}


function userLevel(userInput) {
    gLevel = gLevels[userInput];
    init();
}