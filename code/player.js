import { Gameboard } from "./gameboard.js";




/* function randomCoordinates(shipLength) {

    let columns = "abcdefghij"
    function getRandomInt(max) { // from MDN Math.random()
        return Math.floor(Math.random() * max);
    }
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
    return coordinates;

} */

export class Player{
    constructor() {
        this.gameBoard = new Gameboard();
    }

/*     getPositions(){
        for (const ship in this.gameBoard.ships) {
            this.gameBoard.ships[ship].position.forEach((xy) => this.shipPositions.push(xy));
        }
    } */

}