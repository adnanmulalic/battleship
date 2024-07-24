import { createBoard } from "./createboard.js";
import { Ship } from "./ship.js";

export class Gameboard {
    constructor() {
        this.board = createBoard();
        this.shots = [];
        this.shipPositions = [];
        this.ships = {
            destroyerOne : {
                stats: new Ship(2),
                position: this.randomCoordinates(2, this.shipPositions)  //[["a", 2], ["b", 2]]
            },
            destroyerTwo : {
                stats: new Ship(2),
                position: this.randomCoordinates(2, this.shipPositions)  //[["a", 2], ["b", 2]]
            },
            destroyerThree : {
                stats: new Ship(2),
                position: this.randomCoordinates(2, this.shipPositions)  //[["a", 2], ["b", 2]]
            },
            destroyerFour : {
                stats: new Ship(2),
                position: this.randomCoordinates(2, this.shipPositions)  //[["a", 2], ["b", 2]]
            },
            cruiserOne : {
                stats: new Ship(3),
                position: this.randomCoordinates(3, this.shipPositions)  //[["e", 1], ["e", 2], ["e", 3]]
            },
            cruiserTwo : {
                stats : new Ship(3),
                position: this.randomCoordinates(3, this.shipPositions)
            },
            cruiserThree : {
                stats : new Ship(3),
                position: this.randomCoordinates(3, this.shipPositions)
            },
            battleshipOne : {
                stats: new Ship(4),
                position: this.randomCoordinates(4, this.shipPositions)  //[["i", 2], ["i", 3], ["i", 4], ["i", 5]]
            },
            battleshipTwo : {
                stats: new Ship(4),
                position: this.randomCoordinates(4, this.shipPositions)  //[["i", 2], ["i", 3], ["i", 4], ["i", 5]]
            },
            carrier : {
                stats: new Ship(5),
                position: this.randomCoordinates(5, this.shipPositions)   //[["c", 9], ["d", 9], ["e", 9], ["f", 9], ["g", 9]]
            }
        }
    }

    recieveAttack(x, y) { // "b", 1
        let isHit = false;
        for (const ship in this.ships) { // loop through each ship object in ships object
            this.ships[ship].position.forEach((xy) => { //for each coordinate pair in position property
                if (xy[0] === x && xy[1] === y) {
                    isHit = true;
                    this.ships[ship].stats.hit();
                }
            })
        }
        this.shots.push({isHit, coordinate: [x, y]});
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

    randomCoordinates(shipLength) { // create random coordinates for ship based on length parameter
        let columns = "abcdefghij"
        function getRandomInt(max) { // from MDN Math.random()
            return Math.floor(Math.random() * max);
        }
        let overlap = false;
        let coordinates = [];
        let columnOrRow = getRandomInt(2);
        if (columnOrRow === 0) {
            let column = columns[getRandomInt(10)];
            let row = getRandomInt(10) + 1;
            if (row + shipLength > 10) {
                row -= shipLength;
            }
            for (let i = 0; i < shipLength; i++) {
                coordinates.push([column, row]);
                row++;
            }
        } else {
            let row = getRandomInt(10) + 1;
            let columnNum = getRandomInt(10);
            if (columnNum + shipLength > 10) {
                columnNum -= shipLength;
            }
            for (let i = 0; i < shipLength; i++) {
                let column = columns[columnNum]
                coordinates.push([column, row]);
                columnNum++;
            }
        }
        for (let i = 0; i < this.shipPositions.length; i++) { // check existing ship coordinates with new one
            let existingCoordinates = this.shipPositions[i];
            existingCoordinates.forEach((existingCoordinate) => {
                for (let j = 0; j < coordinates.length; j++) {
                    let newCoordinate = coordinates[j];
                    if (existingCoordinate[0] === newCoordinate[0] && existingCoordinate[1] === newCoordinate[1]) {
                        overlap = true;
                        break;
                    }
                }
            })
        }
        if (overlap === true) { // if new coordinates overlapt existing coordinate, recursively call randomCoordinates
            return this.randomCoordinates(shipLength)
        } else { // else push new coordinates into shipPositions and return new coordinates
            this.shipPositions.push(coordinates);
            return coordinates;
        }
    }
}