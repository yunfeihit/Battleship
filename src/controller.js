import {Ship} from "./Ship.js";
import {GameBoard} from "./GameBoard.js";
import {createPlayer} from "./Player.js";
import {
    renderUserGameBoard, 
    renderRobotGameBoard,
    renderPlaceShipsGameBoard,
    renderUserWin,
    renderRobotWin, 
    bindRobotGameBoardClick,
    bindCreateUser,
    bindUserPlaceShip,
    showUserNameInputDialog,
    closeUserNameInputDialog,
    loadPlaceShipsPage,
    loadPlayBattlePage,
    bindShipDrag
    }
from "./dom.js";

//workflow: (multiple actions)
function handleCreateUser(name) {
    //Edge Case: if 'user' already exist, do not create another user
    if(user) return;

    //create user
    user = createPlayer(name);
    closeUserNameInputDialog();

    //load next page:
    loadPlaceShipsPage(user.gameBoard);
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
    const randomUnhitCoord = user.gameBoard.getRandomUnhitCoord()

    //Edge Case: if there is no unhit cell in user's gameboard
    if(randomUnhitCoord === null) return;

    user.gameBoard.receiveAttack(randomUnhitCoord);
    renderUserGameBoard(user.gameBoard);
    if(user.gameBoard.isGameOver()) {
        renderRobotWin();
    }
}

function handleUserPlaceShip(startPosition, length, direction) {
    //user place a ship in user's gameboard manually
    const success1 = user.gameBoard.placeShip(startPosition, length, direction);

    if(!success1) return;

    //render user's gameboard
    renderUserGameBoard(user.gameBoard);

    //then robot place a ship in robot's gameboard automatically
    const success2 = robot.gameBoard.placeShipRandom(length);
    if(!success2) return;

    renderRobotGameBoard(robot.gameBoard);
}


let user;
let robot = createPlayer('Robot');

//MAIN FUNCTION
function startGame() {

    showUserNameInputDialog();
    bindCreateUser(handleCreateUser);//user is created here

    bindUserPlaceShip(handleUserPlaceShip);
    bindRobotGameBoardClick(handleUserAttack);

}




export {startGame};