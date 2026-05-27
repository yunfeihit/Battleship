import {Ship} from "./Ship.js";

class Cell {
    constructor() {
        this.ship = null;
        this.isHit = false;
    }
}

class GameBoard {
    constructor(size = 10) {
        this.size = size;

        //create the board:
        this.board = [];
        for(let i = 0; i < size; i++) {
            this.board.push([]);
            for(let j = 0; j < size; j++) {
                this.board[i].push(new Cell())
            }
        } 
    }

    placeShip(startPosition, length, direction = 'x') {
        const newShip = new Ship(startPosition, length, direction);
        const coordsTaken = newShip.place();
        
        //if ship is outside of the gameboard, stop placing and return false
        if(coordsTaken.some(item => {
            const [x, y] = item;
            return x < 0 || x >= this.size || y < 0 || y >= this.size;
        })) return false;

        //if any coord is already taken, stop placing and return false
        if(coordsTaken.some(item => {
            const [x, y] = item;
            return this.board[x][y].ship != null;
        })) return false;

        coordsTaken.forEach(item => {
            const [x, y] = item;
            this.board[x][y].ship = newShip;
        });

        return true;
    }

    receiveAttack(hitCoord) {
        const [x, y] = hitCoord;
        const hitCell = this.board[x][y];

        //if this coord is already hit, do nothing and return false
        if(hitCell.isHit === true) return false;

        hitCell.isHit = true;

        if(hitCell.ship !== null)  {
            const hitShip = hitCell.ship;
            hitShip.getHit();
        }
    }

    isGameOver() {
        const allCells = this.board.flat();
        return !allCells.some(cell => {
            return cell.ship !== null && cell.isHit === false
        })
    }

}




export {GameBoard};