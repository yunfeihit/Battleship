import { GameBoard } from "../src/GameBoard.js";

describe("test behavior of class GameBoard", () => {

    const newGameBoard = new GameBoard();
    newGameBoard.placeShip([3, 4], 3);

    test("place ship and the GameBoard know it", () => {

        expect(newGameBoard.board[3][4].ship).not.toBe(null);
        expect(newGameBoard.board[4][4].ship).not.toBe(null);
        expect(newGameBoard.board[5][4].ship).not.toBe(null);
        expect(newGameBoard.board[6][4].ship).toBe(null);
    })

    test("receive attack and the GameBoard know it", () => {
        newGameBoard.receiveAttack([2, 2]);
        expect(newGameBoard.board[2][2].isHit).toBe(true);
        expect(newGameBoard.board[5][5].isHit).toBe(false);
    })

    test("hit at the ship and ship's health decrease", () => {
        expect(newGameBoard.board[3][4].ship.health).toBe(3);

        newGameBoard.receiveAttack([3, 4]);
        expect(newGameBoard.board[3][4].ship.health).toBe(2);
    })

    test("receive 3 hit and game is over", () => {
        newGameBoard.receiveAttack([4, 4]);
        newGameBoard.receiveAttack([5, 4]);
        
        expect(newGameBoard.board[3][4].ship.isSunk).toBe(true);
        expect(newGameBoard.isGameOver()).toBe(true);
    })

})


