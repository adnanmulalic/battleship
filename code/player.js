import { Gameboard } from "./gameboard.js";


export class Player{
    constructor() {
        this.gameBoard = new Gameboard();
    }

    displayBoard(board) {
        this.gameBoard.board.forEach((position) => {
            let tile = document.createElement("div");
            board.parentElement.getAttribute("id") === "gameboard-two" && tile.classList.add("tile")
            tile.dataset.coordinate = position.join("");
            board.appendChild(tile);
        })
    }

    displayShots(tiles) {
        this.gameBoard.shots.forEach((shot) => {
            let shotTile = document.createElement("div");
            tiles.forEach((tile) => {
                let tileCoordinate = tile.dataset.coordinate;
                if (shot.coordinate[0] === tileCoordinate[0] && shot.coordinate[1] === Number(tileCoordinate.slice(1))) {
                    shot.isHit ? shotTile.classList.add("hit") : shotTile.classList.add("miss");
                    if(!tile.hasChildNodes()) {
                        tile.appendChild(shotTile);
                    }
                }
            })
        })
    }

    placeShips(playerTiles) {
        playerTiles.forEach((tile) => {
            for (const ship in this.gameBoard.ships) {
                let shipTile = document.createElement("div");
                shipTile.dataset.shipName = ship;
                shipTile.dataset.startTile = this.gameBoard.ships[ship].position[0].join("");
                if (this.gameBoard.ships[ship].position[0][1] === this.gameBoard.ships[ship].position[1][1]) {
                    let shipLength = this.gameBoard.ships[ship].position.length * 5;
                    shipTile.style.width = shipLength - 0.6 + "rem";
                    shipTile.classList.add("shipX");
                } else {
                    let shipHeight = this.gameBoard.ships[ship].position.length * 5;
                    shipTile.style.height = shipHeight - 0.6 + "rem";
                    shipTile.classList.add("shipY");
                }
                if (tile.dataset.coordinate === shipTile.dataset.startTile) {
                    
                    tile.appendChild(shipTile);
                    
                }
            }
        });   
    }

    randomFire(sameShotCounter = 0) {
        let columns = "abcdefghij";
        let correctShot = null;
        if (this.gameBoard.shots.length > 0) {
            for (let i = this.gameBoard.shots.length - 1; i >= 0; i--) {
                if (this.gameBoard.shots[i].isHit) {
                    correctShot = this.gameBoard.shots[i];
                    break;
                }
            }
        }
        let randomShot = [columns[Math.floor(Math.random() * 10)], Math.floor(Math.random() * 10) + 1];
        if (correctShot !== null) { // if last shot was hit, next coordinate wont be random, but next to last hit
            let columnOrRow = Math.floor(Math.random() * 2); 
            if (columnOrRow === 0) {
                let incOrDec = Math.floor(Math.random() * 2);
                let asciCode = correctShot.coordinate[0].charCodeAt();
                if (asciCode - 1 < 97 || asciCode + 1 > 106) {
                    asciCode - 1 < 97 ? incOrDec = 0 : incOrDec = 1;
                }
                incOrDec === 0 ? asciCode++ : asciCode--; 
                randomShot = [String.fromCharCode(asciCode), correctShot.coordinate[1]] // next shot will be either left or right of current hit
            } else {
                let incOrDec = Math.floor(Math.random() * 2);
                let numberCoordinate = correctShot.coordinate[1];
                if (numberCoordinate - 1 < 1 || numberCoordinate + 1 > 10) {
                    numberCoordinate - 1 < 1 ? incOrDec = 0 : incOrDec = 1;
                }
                randomShot[0] = correctShot.coordinate[0];
                incOrDec === 0 ? randomShot[1] = correctShot.coordinate[1] + 1 : randomShot[1] = correctShot.coordinate[1] - 1; // next shot will be either up or down from current hit
            }           
            sameShotCounter++;
        }
        if (sameShotCounter >= 20) {
            randomShot = [columns[Math.floor(Math.random() * 10)], Math.floor(Math.random() * 10) + 1];
        }

        for (let i = 0; i < this.gameBoard.shots.length; i++) { // if random shot is already in array of shots, call randomFire() again
            if (randomShot[0] === this.gameBoard.shots[i].coordinate[0] && randomShot[1] === this.gameBoard.shots[i].coordinate[1]) {
                return this.randomFire(sameShotCounter);
            }
        }
        return randomShot;

    }

}