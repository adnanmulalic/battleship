import { Gameboard } from "../code/gameboard.js";

const newBoard = new Gameboard();
test('Is board created', () => {
    expect(newBoard.board).toHaveLength(100);
    expect(newBoard.board).toContainEqual(["d", 1]);
});

test('Are ship positions correct', () => {
    expect(newBoard.ships.destroyer.position).toEqual([["a", 2], ["b", 2]])
});

test('Shot missed', () => {
    newBoard.recieveAttack('c', 2);
    expect(newBoard.missedAttacks).toHaveLength(1);
})

test('Shot hit', () => {
    newBoard.recieveAttack('b', 2);
    expect(newBoard.ships.destroyer.stats.hits).toEqual(1)
})

test('Are all ships sunk', () => {
    expect(newBoard.allShipsSunk()).toMatch('There are ships still afloat.');
})

test('All ships are sunk', () => {
    newBoard.recieveAttack('a', 2); newBoard.recieveAttack('b', 2);
    newBoard.recieveAttack('e', 1); newBoard.recieveAttack('e', 2); newBoard.recieveAttack('e', 3);
    expect(newBoard.allShipsSunk()).toMatch('All ships are sunk.');
})