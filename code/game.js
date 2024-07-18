import { Player } from "./player.js";
import { displayBoard } from "./displayboard.js";


let playerOne = new Player();
let playerTwo = new Player();
let gameBoardOne = document.querySelector("#gameboard-one");
let playerOnePositions = document.querySelector("#gameboard-one > .positions")
let playerTwoPositions = document.querySelector("#gameboard-two > .positions");
let gameBoardTwo = document.querySelector("#gameboard-two");

//["a", 1]

displayBoard(playerOne, playerOnePositions);
displayBoard(playerTwo, playerTwoPositions);

let playerOneTiles = document.querySelectorAll("#gameboard-one > .positions > div.tile");

function placeShips(playerTiles) {
    playerTiles.forEach((tile) => {
        for (const ship in playerOne.gameBoard.ships) {
            playerOne.gameBoard.ships[ship].position.forEach((xy) => {
                let coordinate = xy[0] + xy[1];
                if (tile.innerText === coordinate) {
                    tile.classList.add("ship");
                    //tile.innerText += ship[0] + ship[1]
                    console.log(playerOne.gameBoard.shipPositions)
                }
            })
        }
    });   
}
placeShips(playerOneTiles);

playerOnePositions.addEventListener("click", (event) => {
    if (!event.target.classList.contains("hit" || "miss")) {
        let clickCoordinate = event.target.innerText;
        //playerOne.gameBoard.recieveAttack(clickCoordinate[0], Number(clickCoordinate[1])); //Number() is used to convert event.target.innerText to integer
        if (playerOne.gameBoard.recieveAttack(clickCoordinate[0], Number(clickCoordinate.slice(1)))) {
            event.target.classList.add("hit");
        } else {
            event.target.classList.add("miss");
        }
        console.log(playerOne.gameBoard.ships.cruiserTwo.stats)
        console.log(playerOne.gameBoard.allShipsSunk())
    }
})

document.querySelector("#randomize-button").addEventListener("click", () => {
    playerOne = new Player();
    while(playerOnePositions.firstChild) {
        playerOnePositions.removeChild(playerOnePositions.firstChild);
    }
    displayBoard(playerOne, playerOnePositions);
    playerOneTiles = document.querySelectorAll("#gameboard-one > .positions > div.tile");
    placeShips(playerOneTiles);
})

