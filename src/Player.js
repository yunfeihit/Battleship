import {GameBoard} from "./GameBoard.js";

//use factory function instead of Class
//create gameBoard at the same time
function createPlayer(name) {
    return {
        name,
        gameBoard: new GameBoard(),
        hit(gameBoard, coord) {
            gameBoard.receiveAttack(coord)
        }
    }
}



export{createPlayer};