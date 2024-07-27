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
                //let shipTile = document.createElement("div");
                this.gameBoard.ships[ship].position.forEach((xy) => {
                    let coordinate = xy[0] + xy[1];
                    if (tile.dataset.coordinate === coordinate) {
                        tile.classList.add("ship");
                    }
                })
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
        // (this.gameBoard.shots.length !== 0 && this.gameBoard.shots[this.gameBoard.shots.length - 1].isHit) || (this.gameBoard.shots.length > 1 && this.gameBoard.shots[this.gameBoard.shots.length - 2].isHit)
        if (correctShot !== null) {
            //correctShot = this.gameBoard.shots[this.gameBoard.shots.length - 1].isHit ? this.gameBoard.shots[this.gameBoard.shots.length - 1] : this.gameBoard.shots[this.gameBoard.shots.length - 2];
            let columnOrRow = Math.floor(Math.random() * 2);
            if (columnOrRow === 0) {
                let incOrDec = Math.floor(Math.random() * 2);
                let asciCode = correctShot.coordinate[0].charCodeAt();
                if (asciCode - 1 < 97 || asciCode + 1 > 106) {
                    asciCode - 1 < 97 ? incOrDec = 0 : incOrDec = 1;
                }
                incOrDec === 0 ? asciCode++ : asciCode--; 
                randomShot = [String.fromCharCode(asciCode), correctShot.coordinate[1]]
            } else {
                let incOrDec = Math.floor(Math.random() * 2);
                let numberCoordinate = correctShot.coordinate[1];
                if (numberCoordinate - 1 < 1 || numberCoordinate + 1 > 10) {
                    numberCoordinate - 1 < 1 ? incOrDec = 0 : incOrDec = 1;
                }
                randomShot[0] = correctShot.coordinate[0];
                incOrDec === 0 ? randomShot[1] = correctShot.coordinate[1] + 1 : randomShot[1] = correctShot.coordinate[1] - 1;
            }
            sameShotCounter++;
            
        }
        if (sameShotCounter >= 20) {
            randomShot = [columns[Math.floor(Math.random() * 10)], Math.floor(Math.random() * 10) + 1];
        }
        let sameShot = false;
        for (let i = 0; i < this.gameBoard.shots.length; i++) {
            if (randomShot[0] === this.gameBoard.shots[i].coordinate[0] && randomShot[1] === this.gameBoard.shots[i].coordinate[1]) {
                sameShot = true;
                break;
            }
        }
        if (sameShot) {
            return this.randomFire(sameShotCounter);
        }
        return randomShot;

    }

}