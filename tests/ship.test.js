import { Ship } from "../code/ship.js";

test('Is ship created', () => {
    const sub = new Ship(2);
    expect(sub).toMatchObject({length: 2})
})

test('Is ship hit', () => {
    const sub = new Ship(2);
    sub.hit();
    sub.isSunk();
    expect(sub).toMatchObject({hits: 1, sunk: false})
})

test('Is ship sunk', () => {
    const sub = new Ship(3);
    sub.hit(); sub.hit(); sub.hit();
    sub.isSunk();
    expect(sub).toMatchObject({hits: 3, sunk: true})
})