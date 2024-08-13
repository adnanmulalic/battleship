import { Player } from "./player.js";

//initial page load
let playerOne = new Player(); let playerOneBoard = document.querySelector("#gameboard-one > .positions");
playerOne.displayBoard(playerOneBoard);

let playerTwo = new Player(); let playerTwoBoard = document.querySelector("#gameboard-two > .positions");
playerTwo.displayBoard(playerTwoBoard);

let playerOneTiles = document.querySelectorAll("#gameboard-one > .positions > div");
let playerTwoTiles = document.querySelectorAll("#gameboard-two > .positions > div");

playerOne.placeShips(playerOneTiles);

//functions
function displayGridShots() {
    playerOne.gameBoard.board.forEach((position) => {
        let borderTile = document.createElement("div");
        borderTile.classList.add("tile");
        borderTile.dataset.coordinate = position.join("");
        document.querySelector("#gameboard-one > .grid-borders").appendChild(borderTile);
    })
}
displayGridShots();
let playerOneGrid = document.querySelector(".grid-borders");
let playerOneGridTiles = document.querySelectorAll("div.grid-borders > div"); // grid above ships for easiers css placement of shots


function isGameOver(playerOne, playerTwo) {
    if (playerOne.gameBoard.allShipsSunk()) {
        document.querySelector("#game-winner").innerText = "Game over. Computer wins.";
        return playerOne.gameBoard.allShipsSunk();
    } else if (playerTwo.gameBoard.allShipsSunk()) {
        document.querySelector("#game-winner").innerText = "Game over. Player wins.";
        return playerTwo.gameBoard.allShipsSunk();
    }
        
}

function playerAttackClick(event) {
        if (event.target.classList.contains("tile")) { // if tile has only one class, allow click
            let clickCoordinate = event.target.dataset.coordinate;
            let shipObject = playerTwo.gameBoard.recieveAttack(clickCoordinate[0], Number(clickCoordinate.slice(1)));
            playerTwo.displayShots(playerTwoTiles);
            event.target.removeEventListener("click", playerAttackClick)
            if (shipObject && shipObject.stats.sunk) {
                playerTwoTiles.forEach((tile) => {
                    shipObject.position.forEach((shipCoordinate) => {
                        if (tile.dataset.coordinate[0] === shipCoordinate[0] && Number(tile.dataset.coordinate.slice(1)) === shipCoordinate[1]) {
                            tile.classList.add("shipSunkTile");
                        }
                    })
                    
                })
            }
            
            if (isGameOver(playerOne, playerTwo)) {
                playerTwoTiles.forEach((tile) => tile.removeEventListener("click", playerAttackClick));
            } else {
                setTimeout(() => {
                    let randomShot = playerOne.randomFire();
                    let playerShipObject = playerOne.gameBoard.recieveAttack(randomShot[0], randomShot[1]);
                    playerOne.displayShots(playerOneGridTiles);
                    if (playerShipObject && playerShipObject.stats.sunk) {
                        playerOneGridTiles.forEach((tile) => {
                            playerShipObject.position.forEach((shipCoordinate) => {
                                if (tile.dataset.coordinate[0] === shipCoordinate[0] && Number(tile.dataset.coordinate.slice(1)) === shipCoordinate[1]) {
                                    tile.classList.add("shipSunkTile");
                                }
                            })
                            
                        })
                    }
                    if (isGameOver(playerOne, playerTwo)) {
                        playerTwoTiles.forEach((tile) => tile.removeEventListener("click", playerAttackClick));
                    }
                }, 100)
            }

    
            document.querySelector("#randomize-restart-button").innerText = "Restart game";
        }
    
}

//event listeners


playerTwoTiles.forEach((tile) => {
    tile.addEventListener("click", playerAttackClick)
});

//reset players and reload boards
document.querySelector("#randomize-restart-button").addEventListener("click", (event) => {
    event.target.innerText = "Randomize ship positions";
    playerOne = new Player();
    while(playerOneGrid.firstChild) {
        playerOneGrid.removeChild(playerOneGrid.firstChild);
    }
    displayGridShots();
    playerOneGridTiles = document.querySelectorAll("div.grid-borders > div");
    while(playerOneBoard.firstChild) {
        playerOneBoard.removeChild(playerOneBoard.firstChild);
    }
    playerOne.displayBoard(playerOneBoard);
    playerOneTiles = document.querySelectorAll("#gameboard-one > .positions > div");
    playerOne.placeShips(playerOneTiles);

    //"computer" player
    playerTwo = new Player();
    while(playerTwoBoard.firstChild) {
        playerTwoBoard.removeChild(playerTwoBoard.firstChild);
    }
    playerTwo.displayBoard(playerTwoBoard);
    playerTwoTiles = document.querySelectorAll("#gameboard-two > .positions > div");
    playerTwoTiles.forEach((tile) => tile.addEventListener("click", playerAttackClick));
    
    document.querySelector("#game-winner").innerText = "";
})

