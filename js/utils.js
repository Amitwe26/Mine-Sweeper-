

function setMinesNegsCount(mat, rowIdx, colIdx) {
    var count = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= mat.length) continue                  //מציאת שכנים 
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= mat.length) continue
            if (rowIdx === i && colIdx === j) continue
            // console.log(mat[i][j].isMine, i, j);
            if (mat[i][j].isMine === true) {
                count++
            }
        }
        // console.log('the value is:', count);
    }
    mat[rowIdx][colIdx].mineAroundCount = count;
}


// function toOpenCell() {
//     var elOpen = document.querySelector('.cell');
//     elOpen.classList.add('cellOpen')

// }

// function play() {

//     gGameInterval = setInterval(timerOut, 150);
//     console.log(gTime);

// }



function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}