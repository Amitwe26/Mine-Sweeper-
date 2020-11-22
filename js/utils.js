'use strict'

function calcMinesNegs(gBoard) {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            setMinesNegsCount(gBoard, i, j)
        }

    }
}

function setMinesNegsCount(gBoard, rowIdx, colIdx) {
    var count = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard.length) continue
            if (rowIdx === i && colIdx === j) continue
            // console.log(mat[i][j].isMine, i, j);
            if (gBoard[i][j].isMine === true) {
                count++
            }
        }
    }
    gBoard[rowIdx][colIdx].mineAroundCount = count;
}






function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}