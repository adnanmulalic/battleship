import { Gameboard } from "../code/gameboard.js";

const newBoard = new Gameboard();
test('Is board created', () => {
    expect(newBoard.board).toHaveLength(100);
    expect(newBoard.board).toContainEqual(["d", 1]);
});

test('Are ship positions correct', () => {
    expect(newBoard.ships.destroyerOne.position).toEqual()
});

test('Shot missed', () => {
    newBoard.recieveAttack('c', 2);
    expect(newBoard.missedAttacks).toHaveLength(1);
})

test('Shot hit', () => {
    newBoard.recieveAttack('b', 2);
    expect(newBoard.ships.destroyerOne.stats.hits).toEqual(1)
})

test('Are all ships sunk', () => {
    expect(newBoard.allShipsSunk()).toMatch('There are ships still afloat.');
})