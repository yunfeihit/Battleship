//For test only
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

console.log('random place a ship (length: 2):');
newGameBoard.placeShipRandom(2);
newGameBoard.log();

console.log('keep placing ships untill fail:') 
for(let i = 0; i < 20; i++) {
    newGameBoard.placeShipRandom(Math.floor(Math.random() * 3) + 2);
    newGameBoard.log()
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
}