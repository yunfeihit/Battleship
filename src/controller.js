import {Ship} from "./Ship.js";
import {GameBoard} from "./GameBoard.js";
import {createPlayer} from "./Player.js";
import {dom} from "./dom.js";

//workflow: (multiple actions)
function handleCreateUser(name) {
    //Edge Case: if 'user' already exist, do not create another user
    if(user) return;

    userName = name;

    //create user
    user = createPlayer(name);
    dom.closeUserNameInputDialog();

    //load next page:
    dom.loadPlaceShipsPage(user.gameBoard);

    dom.renderPlaceShipsPageIndicator(name);

    return name;
}

function reCreateUser(name) {
    //create user
    user = createPlayer(name);
    dom.closeUserNameInputDialog();

    //load next page:
    dom.loadPlaceShipsPage(user.gameBoard);
    console.log(`user name still be:${name}`);
}

function handleUserAttack(coord) {
    //make a attack
    const successAttack = robot.gameBoard.receiveAttack(coord);
    //Edge Case: if not hit on a Unhit cell, do nothing but return
    if(!successAttack) return;

    //re render the robot gameboardbindUserPlaceShip
    dom.renderRobotGameBoard(robot.gameBoard);
    if(robot.gameBoard.isGameOver()) {
        dom.renderUserWin();
    }

    //after user make a hit, automatically let robot make a hit
    const randomUnhitCoord = user.gameBoard.getRandomUnhitCoord()

    //Edge Case: if there is no unhit cell in user's gameboard
    if(randomUnhitCoord === null) return;

    user.gameBoard.receiveAttack(randomUnhitCoord);
    dom.renderUserGameBoard(user.gameBoard);
    if(user.gameBoard.isGameOver()) {
        dom.renderRobotWin();
    }
}

function handleUserPlaceShip(startPosition, length, direction, src) {
    //data layer:
    //user place a ship in user's gameboard manually
    const success1 = user.gameBoard.placeShip(startPosition, length, direction, src);

    if(!success1) return;

    //DOM layer:
    //render user's gameboard
    dom.renderPlaceShipsGameBoard(user.gameBoard);
    dom.renderAllShipsOnPlaceShipsGameBoard(user.gameBoard)

    //then robot place a ship in robot's gameboard automatically
    robot.gameBoard.placeShipRandom(length);

    dom.renderRobotGameBoard(robot.gameBoard);
}

function handleLoadPlayBattlePage() {
    if(user.gameBoard.hasShipPlaced() === false) {
        const message = 'AT LEAST ONE SHIP MUST BE PLACED';
        dom.placeShipIndicatorShowMessage(message);
        return;
    }

    dom.loadPlayBattlePage(user.gameBoard, robot.gameBoard)
}

function handlePlayAgain() {
    robot = createPlayer('Robot');
    dom.clooseAllDialogs();
    reCreateUser(userName);
}

let user;
let robot = createPlayer('Robot');
let userName;

//MAIN FUNCTION
function startGame() {
    dom.showUserNameInputDialog();
    dom.bindCreateUser(handleCreateUser);//user is created here
    dom.bindUserPlaceShip(handleUserPlaceShip);
    dom.bindLoadPlayBattlePage(handleLoadPlayBattlePage);
    dom.bindRobotGameBoardClick(handleUserAttack);
    dom.bindPlayAgainBtn(handlePlayAgain);
}

export {startGame};