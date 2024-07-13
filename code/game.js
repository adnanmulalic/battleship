import { Player } from "./player.js";
import { displayBoard } from "./displayboard.js";

let playerOne = new Player();
let playerTwo = new Player();
let gameBoardOne = document.querySelector("#gameboard-one");
let gameBoardTwo = document.querySelector("#gameboard-two");

//["a", 1]

displayBoard(playerOne, gameBoardOne);
displayBoard(playerTwo, gameBoardTwo);

let playerOneTiles = document.querySelectorAll("div#gameboard-one > div.tile");

playerOneTiles.forEach((tile) => {
    for (const ship in playerOne.gameBoard.ships) {
        playerOne.gameBoard.ships[ship].position.forEach((xy) => {
            let coordinate = xy[0] + xy[1];
            if (tile.innerText === coordinate) {
                tile.classList.add("ship")
            }
        })
    }
})

