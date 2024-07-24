import { Player } from "./player.js";


let playerOne = new Player();
let playerTwo = new Player();
let playerOneBoard = document.querySelector("#gameboard-one > .positions")
let playerTwoBoard = document.querySelector("#gameboard-two > .positions");

playerOne.displayBoard(playerOneBoard);
playerTwo.displayBoard(playerTwoBoard);

let playerOneTiles = document.querySelectorAll("#gameboard-one > .positions > div.tile");
let playerTwoTiles = document.querySelectorAll("#gameboard-two > .positions > div.tile");


playerOne.placeShips(playerOneTiles);

playerOneBoard.addEventListener("click", (event) => {
    if (!event.target.classList.contains("hit" || "miss")) {
        let clickCoordinate = event.target.dataset.coordinate;
        playerOne.gameBoard.recieveAttack(clickCoordinate[0], Number(clickCoordinate.slice(1)));
        playerOne.displayShots(playerOneTiles);
        console.log(playerOne.gameBoard.allShipsSunk())
    }
});

playerTwoBoard.addEventListener("click", (event) => {
    if (!event.target.classList.contains("hit" || "miss")) {
        let clickCoordinate = event.target.dataset.coordinate;
        playerTwo.gameBoard.recieveAttack(clickCoordinate[0], Number(clickCoordinate.slice(1)));
        playerTwo.displayShots(playerTwoTiles);
        setTimeout(() => {
            let randomShot = playerOne.randomFire();
            console.log(randomShot)
            playerOne.gameBoard.recieveAttack(randomShot[0], randomShot[1]);
            playerOne.displayShots(playerOneTiles);
        }, 500)
        console.log(playerTwo.gameBoard.ships.cruiserTwo.stats)
        console.log(playerTwo.gameBoard.allShipsSunk())
    }
});

document.querySelector("#randomize-button").addEventListener("click", () => {
    playerOne = new Player();
    while(playerOneBoard.firstChild) {
        playerOneBoard.removeChild(playerOneBoard.firstChild);
    }
    playerOne.displayBoard(playerOneBoard);
    playerOneTiles = document.querySelectorAll("#gameboard-one > .positions > div.tile");
    playerOne.placeShips(playerOneTiles);
    //"computer" player
    playerTwo = new Player();
    while(playerTwoBoard.firstChild) {
        playerTwoBoard.removeChild(playerTwoBoard.firstChild);
    }
    playerTwo.displayBoard(playerTwoBoard);
    playerTwoTiles = document.querySelectorAll("#gameboard-two > .positions > div.tile");
})

