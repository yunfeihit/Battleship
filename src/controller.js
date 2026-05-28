import {Ship} from "./Ship.js";
import {GameBoard} from "./GameBoard.js";
import {createPlayer} from "./Player.js";
import {
    renderUserGameBoard, 
    renderRobotGameBoard,
    renderUserWin,
    renderRobotWin, 
    bindRobotGameBoardClick,
    bindCreateUser
} from "./dom.js";

function createUser(name) {
    user = createPlayer(name);

    //render both gameboard after get user name input
    renderUserGameBoard(user.gameBoard);
    renderRobotGameBoard(robot.gameBoard);
}

function handleUserAttack(coord) {
    robot.gameBoard.receiveAttack(coord);
    renderRobotGameBoard(robot.gameBoard);
    if(robot.gameBoard.isGameOver()) {
        renderRobotWin();
    }

    //after user make a hit, automatically let robot make a hit
    user.gameBoard.receiveAttack(randomCoord);
    renderUserGameBoard(user.gameBoard);
    if(user.gameBoard.isGameOver()) {
        renderUserWin();
    }
}

//MAIN FUNCTION
let user;
let robot = createPlayer('Robot');

function startGame() {

    bindCreateUser(createUser);

    bindRobotGameBoardClick(handleUserAttack);

}




export {startGame};