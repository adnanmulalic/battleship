function createBoard() {
    let board = [];
    let letters = "abcdefghij";
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            board.push([letters[x], y + 1]);
        };
    };
    return board;
};

function letterRow() {
    
}

export {createBoard};