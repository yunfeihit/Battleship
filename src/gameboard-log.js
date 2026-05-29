import { GameBoard } from "./GameBoard.js";

const newGameBoard = new GameBoard();

console.log('a new gameboard:')

newGameBoard.log();

console.log('place a ship at [3,3], [4,3] ,[5,3]:');

newGameBoard.placeShip([3, 3], 3);
newGameBoard.log();

console.log('Hit [4, 3]:');

newGameBoard.receiveAttack([4, 3]);
newGameBoard.log();
