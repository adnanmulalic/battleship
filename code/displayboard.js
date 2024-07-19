export function displayBoard(player, board) {
    player.gameBoard.board.forEach((position) => {
        let tile = document.createElement("div");
        tile.classList.add("tile");
        //tile.innerText = position.join("");
        tile.dataset.coordinate = position.join("");
        board.appendChild(tile);
    })
}