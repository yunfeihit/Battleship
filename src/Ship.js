
class Ship {
    //startPosition: [x, y]
    //length: integar
    //direction: x(axis) or y(axis)
    constructor(startPosition, length, direction = 'x') {
        this.startPosition = startPosition; 
        this.length = length;
        this.direction = direction;
        this.health = length; //ship can take as many his as its length
        this.isSunk = false; //not sink when created

        //generate all the coordinations by its' 'length' and 'direction'
        //result: 'this.coords
        const [x, y] = this.startPosition;
        this.coords = [];
        this.coords.push(this.startPosition);
        for(let i = 1; i < length; i++) {
            if(direction === 'x') {
                this.coords.push([x + i, y])
            } else {
                this.coords.push([x, y + i])
            }
        }

    }

    //can only be hited once at a time, so no parameters needed
    getHit() {
        if(this.health > 0) {
            this.health--;
        }         
        if(this.health === 0) {
            this.isSunk = true;
        }
    }

    place() {
        return this.coords;
    }
}



export {Ship};