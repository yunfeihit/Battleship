import {Ship} from "../src/Ship.js";

describe("test behavior of Class Ship", () => {
    const newShip = new Ship([3, 3], 3);

    test("ship is placed correctally", () => {
        expect(newShip.place()).toEqual([
            [3, 3],
            [4, 3],
            [5, 3]
        ])
    })
    
    test("ship is hitt 3 time, then sink", () => {
        newShip.getHit();
        expect(newShip.isSunk).toBe(false);
        newShip.getHit();
        expect(newShip.isSunk).toBe(false);
        newShip.getHit();
        expect(newShip.isSunk).toBe(true);
    })
})