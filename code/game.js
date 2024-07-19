import { Player } from "./player.js";
import { displayBoard } from "./displayboard.js";


let playerOne = new Player();
let playerTwo = new Player();
let gameBoardOne = document.querySelector("#gameboard-one");
let playerOnePositions = document.querySelector("#gameboard-one > .positions")
let playerTwoPositions = document.querySelector("#gameboard-two > .positions");
let gameBoardTwo = document.querySelector("#gameboard-two");

displayBoard(playerOne, playerOnePositions);
displayBoard(playerTwo, playerTwoPositions);

let playerOneTiles = document.querySelectorAll("#gameboard-one > .positions > div.tile");
let playerTwoTiles = document.querySelectorAll("#gameboard-two > .positions > div.tile");

function placeShips(playerTiles) {
    playerTiles.forEach((tile) => {
        for (const ship in playerOne.gameBoard.ships) {
            playerOne.gameBoard.ships[ship].position.forEach((xy) => {
                let coordinate = xy[0] + xy[1];
                if (tile.innerText === coordinate) {
                    tile.classList.add("ship");
                }
            })
        }
    });   
}
placeShips(playerOneTiles);

function randomShot(event) {
    playerOneTiles.forEach((tile) => {
        
    })
}
randomShot("a")

playerOnePositions.addEventListener("click", (event) => {
    if (!event.target.classList.contains("hit" || "miss")) {
        let clickCoordinate = event.target.dataset.coordinate;
        if (playerOne.gameBoard.recieveAttack(clickCoordinate[0], Number(clickCoordinate.slice(1)))) { //Number() is used to convert event.target.innerText to integer
            event.target.classList.add("hit");
        } else {
            event.target.classList.add("miss");
        }
        console.log(playerOne.gameBoard.allShipsSunk())
    }
});

playerTwoPositions.addEventListener("click", (event) => {
    if (!event.target.classList.contains("hit" || "miss")) {
        let clickCoordinate = event.target.dataset.coordinate;
        if (playerTwo.gameBoard.recieveAttack(clickCoordinate[0], Number(clickCoordinate.slice(1)))) {
            event.target.classList.add("hit");
        } else {
            event.target.classList.add("miss");
        }
        console.log(playerTwo.gameBoard.ships.cruiserTwo.stats)
        console.log(playerTwo.gameBoard.allShipsSunk())
    }
});

document.querySelector("#randomize-button").addEventListener("click", () => {
    playerOne = new Player();
    while(playerOnePositions.firstChild) {
        playerOnePositions.removeChild(playerOnePositions.firstChild);
    }
    displayBoard(playerOne, playerOnePositions);
    playerOneTiles = document.querySelectorAll("#gameboard-one > .positions > div.tile");
    placeShips(playerOneTiles);
    //"computer" player
    playerTwo = new Player();
    while(playerTwoPositions.firstChild) {
        playerTwoPositions.removeChild(playerTwoPositions.firstChild);
    }
    displayBoard(playerTwo, playerTwoPositions);
    playerTwoTiles = document.querySelectorAll("#gameboard-two > .positions > div.tile");
})

