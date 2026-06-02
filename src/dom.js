const userNameInput = document.querySelector('#user-name-input');
const inputNameBtn = document.querySelector('#input-name-btn')
const userGameBoardContainer = document.querySelector('#user-gameboard-container');
const robotGameBoardContainer = document.querySelector('#robot-gameboard-container');
const userNameInputDialog = document.querySelector('#user-name-input-dialog');

//Inner Function
function renderGameBoard(gameBoard, container) {
    container.innerHTML = "";
    const size = gameBoard.size;
    for(let i = 0; i < size; i++) {
        const row  = document.createElement('div');
        row.classList.add('gameboard-row')
        for(let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.dataset.x = j;
            cell.dataset.y = i;
            cell.classList.add('cell');

            //give cell different class name based on it's status(hit/ship)
            //this function will be used in 'controller.js'
            const cellData = gameBoard.board[i][j];
            if(cellData.isHit === fasle && cellData.ship === null) {
                cell.classList.add('empty');
            };
            if(cellData.isHit === fasle && cellData.ship !== null) {
                cell.classList.add('ship-placed');
            };
            if(cellData.isHit === true && cellData.ship !== null) {
                cell.classList.add('ship-hit');
            };
            if(cellData.isHit === true && cellData.ship === null) {
                cell.classList.add('miss-hit');
            };
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

function showUserNameInputDialog() {
    userNameInputDialog.showModal();
}

function closeUserNameInputDialog() {
    userNameInputDialog.close();
}

export{
    renderUserGameBoard, 
    renderRobotGameBoard,
    renderUserWin,
    renderRobotWin, 
    bindRobotGameBoardClick,
    bindCreateUser,
    bindUserPlaceShip,
    showUserNameInputDialog,
    closeUserNameInputDialog
};