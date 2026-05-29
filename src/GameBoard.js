import {Ship} from "./Ship.js";

class Cell {
    constructor() {
        this.ship = null;
        this.isHit = false;
        this.coord = null;
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
                this.board[i].push(new Cell());
                this.board[i][j].coord =[i, j];
            }
        } 
    }

    //For test only
    //if a coord is not taken by ship and hit, show x
    //if a coord is taken by ship, show 'S'
    //if a coord is taken by ship and hit, show 'H'
    //if there is nothing, show -
    log() {
        //change cell to cooresponding value
        for(const row of this.board) {
            console.log(
                row.map(cell => {
                    if(cell.ship === null && cell.isHit === false) {
                        return '-';
                    } else if(cell.ship === null && cell.isHit === true) {
                        return 'x';
                    } else if(cell.ship !== null && cell.isHit === true) {
                        return 'H';
                    } else if(cell.ship !== null && cell.isHit === false) {
                        return 'S'
                    }  
                }).join(' ')
            )

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
            return true;
        }
    }

    isGameOver() {
        const allCells = this.board.flat();
        return !allCells.some(cell => {
            return cell.ship !== null && cell.isHit === false
        })
    }

    getRandomUnhitCoord() {
        const allCellsArray = this.board.flat();
        const allUnhitCellsArray = allCellsArray.filter(cell => cell.isHit === false);

        //Edge Case: if all cell is hit
        if(allUnhitCellsArray.length === 0) return null;

        const randomIndex = Math.floor(allUnhitCellsArray.length * Math.random())
        return allUnhitCellsArray[randomIndex].coord
    };

    placeShipRandom(length) {
        //place ship on the board ramdomlly, which will take enough room(avoid the cell already taken)
        //it not easy!
        
        //Inner Function
        const isThisPlaceWork = (startPosition, length, direction) => {

            //get all cells intend to taken first
            const alltakenCoords = [];
            const [x, y] = startPosition;
            if(direction === 'x') {
                for(let i = 0; i < length; i++) {
                    alltakenCoords.push([x + i, y]);
                }
            } else if(direction === 'y') {
                for(let j = 0; j < length; j++) {
                    alltakenCoords.push([x, y + j]);
                }
            }

            //test if all these cells is inside gameboard
            if(
                alltakenCoords.some(coord => {
                    const [x, y] = coord;
                    return (
                        x < 0 || x >= this.size || y < 0 || y >= this.size
                    )
                    })                        
                ) {
                return false
            //test if all these cells is taken
            } else if(
                alltakenCoords.some(coord => {
                    const [x, y] = coord;
                    return this.board[x][y].ship !== null
                    })
            ) {
                return false
            } else {
                return true
            }
        }
       
        const allCellsArray = this.board.flat();
        const allUnhitCellsArray = allCellsArray.filter(cell => cell.isHit === false);

        //Inner Recursion Function
        const placeShipInX = () => {
            const testDirection = 'x';

            //Base Case
            if(allUnhitCellsArray.length === 0) return false;

            const randomIndex = Math.floor(allUnhitCellsArray.length * Math.random())
            let testStartPosition = allUnhitCellsArray.splice(randomIndex, 1)[0].coord;

            if(isThisPlaceWork(testStartPosition, length, testDirection)) {
                this.placeShip(testStartPosition, length, testDirection)
            } else {
                placeShipInX()
            }
        }

        const placeShipInY = () => {
            const testDirection = 'y';

            //Base Case
            if(allUnhitCellsArray.length === 0) return false;

            const randomIndex = Math.floor(allUnhitCellsArray.length * Math.random())
            let testStartPosition = allUnhitCellsArray.splice(randomIndex, 1)[0].coord

            if(isThisPlaceWork(testStartPosition, length, testDirection)) {
                this.placeShip(testStartPosition, length, testDirection)
            } else {
                placeShipInY()
            }
        }                       
        
        if(!placeShipInX()) {
            placeShipInY();
        }
    }
}




export {GameBoard};