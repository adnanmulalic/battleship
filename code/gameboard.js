import { createBoard } from "./createboard.js";
import { Ship } from "./ship.js";

export class Gameboard {
    constructor() {
        this.board = createBoard();
        this.missedAttacks = [];
        this.ships = {
            destroyer : {
                stats: new Ship(2),
                position: [["a", 2], ["b", 2]]
            },
            cruiser : {
                stats: new Ship(3),
                position: [["e", 1], ["e", 2], ["e", 3]]
            }
        }
    }

    recieveAttack(x, y) { // "b", 1
        let hit = false;
        for (const ship in this.ships) { // loop throus each ship objectin ships object
            this.ships[ship].position.forEach((xy) => { //for each coordinate pair in position property
                if (xy[0] === x && xy[1] === y) {
                    hit = true;
                    this.ships[ship].stats.hit();
                }
            })
        }
        !hit && this.missedAttacks.push([x, y]);
    }

    allShipsSunk() {
        let shipsSunk = true;
        for (const ship in this.ships) {
            if (this.ships[ship].stats.sunk === false) {
                shipsSunk = false;
            }
        }
        if (shipsSunk) {
            return 'All ships are sunk.'
        } else {
            return 'There are ships still afloat.'
        }
    }
}