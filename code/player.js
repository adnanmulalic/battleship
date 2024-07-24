import { Gameboard } from "./gameboard.js";


export class Player{
    constructor() {
        this.gameBoard = new Gameboard();
    }

    displayBoard(board) {
        this.gameBoard.board.forEach((position) => {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            //tile.innerText = position.join("");
            tile.dataset.coordinate = position.join("");
            board.appendChild(tile);
        })
    }

    displayShots(tiles) {
        this.gameBoard.shots.forEach((shot) => {
            tiles.forEach((tile) => {
                let tileCoordinate = tile.dataset.coordinate;
                if (shot.coordinate[0] === tileCoordinate[0] && shot.coordinate[1] === Number(tileCoordinate.slice(1))) {
                    shot.isHit ? tile.classList.add("hit") : tile.classList.add("miss");
                }
            })
        })
    }

    displayMisses(tiles) {
        this.gameBoard.missedAttacks.forEach((miss) => {
            tiles.forEach((tile) => {
                let tileData = tile.dataset.coordinate;
                if (miss[0] === tileData[0] && miss[1] === Number(tileData.slice(1))) {
                    tile.classList.add("miss");
                }
            })
        })
    }

    placeShips(playerTiles) {
        playerTiles.forEach((tile) => {
            for (const ship in this.gameBoard.ships) {
                this.gameBoard.ships[ship].position.forEach((xy) => {
                    let coordinate = xy[0] + xy[1];
                    if (tile.dataset.coordinate === coordinate) {
                        tile.classList.add("ship");
                    }
                })
            }
        });   
    }

    randomFire() {
        let columns = "abcdefghij";
        let randomShot = [columns[Math.floor(Math.random() * 10)], Math.floor(Math.random() * 10) + 1];
        let sameShot = false;
        for (let i = 0; i < this.gameBoard.shots.length; i++) {
            if (randomShot[0] === this.gameBoard.shots[i].coordinate[0] && randomShot[1] === this.gameBoard.shots[i].coordinate[1]) {
                sameShot = true;
                break;
            }
        }
        if (sameShot) {
            return this.randomFire();
        }
        return randomShot;

    }

}