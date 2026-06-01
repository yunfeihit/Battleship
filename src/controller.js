import {Ship} from "./Ship.js";
import {GameBoard} from "./GameBoard.js";
import {createPlayer} from "./Player.js";
import {
    renderUserGameBoard, 
    renderRobotGameBoard,
    renderUserWin,
    renderRobotWin, 
    bindRobotGameBoardClick,
    bindCreateUser,
    bindUserPlaceShip
    }
from "./dom.js";

function createUser(name) {
    user = createPlayer(name);

    //render both gameboard after get user name input
    renderUserGameBoard(user.gameBoard);
    renderRobotGameBoard(robot.gameBoard);
}

function handleUserAttack(coord) {
    //make a attack
    const successAttack = robot.gameBoard.receiveAttack(coord);
    //Edge Case: if not hit on a Unhit cell, do nothing but return
    if(!successAttack) return;

    //re render the robot gameboard
    renderRobotGameBoard(robot.gameBoard);
    if(robot.gameBoard.isGameOver()) {
        renderUserWin();
    }

    //after user make a hit, automatically let robot make a hit
    const ramdomUnhitCoord = user.gameBoard.getRandomUnhitCoord()

    //Edge Case: if there is no unhit cell in user's gameboard
    if(ramdomUnhitCoord === null) return;

    user.gameBoard.receiveAttack(ramdomUnhitCoord);
    renderUserGameBoard(user.gameBoard);
    if(user.gameBoard.isGameOver()) {
        renderRobotWin();
    }
}

function handleUserPlaceShip(startPosition, length, direction) {
    //user place a ship in robot's gameboard manually
    robot.gameBoard.placeShip(startPosition, length, direction);
    //then robot place a ship in user's gameboard automatically
    
}


//MAIN FUNCTION
let user;
let robot = createPlayer('Robot');

function startGame() {

    bindCreateUser(createUser);
    bindUserPlaceShip(handleUserPlaceShip);
    bindRobotGameBoardClick(handleUserAttack);

}




export {startGame};