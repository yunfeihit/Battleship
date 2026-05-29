const userNameInput = document.querySelector('#user-name-input');
const inputNameBtn = document.querySelector('#input-name-btn')
const userGameBoardContainer = document.querySelector('#user-gameboard-container');
const robotGameBoardContainer = document.querySelector('#robot-gameboard-container');

function renderGameBoard(gameBoard, container) {
    container.innerHTML = "";
    const size = gameBoard.size;
    for(let i = 0; i < size; i++) {
        const row  = document.createElement('div');
        row.classList.add('gameboard-row')
        for(let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.dataset.x = i;
            cell.dataset.y = j;
            cell.classList.add('cell');
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function renderUserGameBoard(userGameBoard) {
    renderGameBoard(userGameBoard, userGameBoardContainer)
}

function renderRobotGameBoard(robotGameBoard) {
    renderGameBoard(robotGameBoard, robotGameBoardContainer)
}

function renderUserWin() {

}

function renderRobotWin() {

}



function bindRobotGameBoardClick(handler) {
    robotGameBoardContainer.addEventListener('click', (event) => {
        const cell = event.target;
        //if not click on a cell, return and do nothing
        if(!cell.classList.contains('cell')) return;

        const x = Number(cell.dataset.x);
        const y = Number(cell.dataset.y);

        handler([x, y])
    })
}

function bindCreateUser(handler) {
    inputNameBtn.addEventListener('click', () => {
        handler(userNameInput.value);
    })
}

function bindUserPlaceShip(handler) {
    let startPosition;
    let length;
    let direction = 'x';
    handler(startPosition, length, direction);
}


export{
    renderUserGameBoard, 
    renderRobotGameBoard,
    renderUserWin,
    renderRobotWin, 
    bindRobotGameBoardClick,
    bindCreateUser,
    bindUserPlaceShip
};