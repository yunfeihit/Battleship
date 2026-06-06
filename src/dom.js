const userNameInput = document.querySelector('#user-name-input');
const inputNameBtn = document.querySelector('#input-name-btn');
const gameboardsContainer = document.querySelector('#gameboards-container');
const placeShipsGameBoardContainer = document.querySelector('#place-ships-gameboard-container');
const userGameBoardContainer = document.querySelector('#user-gameboard-container');
const robotGameBoardContainer = document.querySelector('#robot-gameboard-container');
const userNameInputDialog = document.querySelector('#user-name-input-dialog');
const indicatorContainer = document.querySelector('#indicator-container');
const placeShipsPage = document.querySelector('#page-place-ships');
const playBattlePage = document.querySelector('#page-play-battle');

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
            if(cellData.isHit === false && cellData.ship === null) {
                cell.classList.add('empty');
            };
            if(cellData.isHit === false && cellData.ship !== null) {
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

function renderPlaceShipsGameBoard(placeGameBoard) {
    renderGameBoard(placeGameBoard, placeShipsGameBoardContainer)
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


function showUserNameInputDialog() {
    userNameInputDialog.showModal();
}

function closeUserNameInputDialog() {
    userNameInputDialog.close();
}

//Load Pages:
function loadPlaceShipsPage(userGameBoard) {

    //add 'hidden' to all other pages:
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    //remove 'hidden' from placshipspage
    placeShipsPage.classList.remove('hidden');

    //render userGameBoard here
    renderGameBoard(userGameBoard, placeShipsGameBoardContainer);
    bindShipDrag();
}

function loadPlayBattlePage(userGameBoard, robotGameBoard) {
    playBattlePage.classList.remove('hidden');

    //add 'hidden' back to all other pages:
    document.querySelectorAll('page').forEach(page => {
        page.classList.add('hidden');
    });

    renderUserGameBoard(userGameBoard);
    renderRobotGameBoard(robotGameBoard);
}

function bindShipDrag() {
    const ships = document.querySelectorAll('.ship');

    ships.forEach(ship => {
        ship.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('length', ship.dataset.length);
            event.dataTransfer.setData('src', ship.src);
        })
    })
}

function bindUserPlaceShip(handler) {
    placeShipsGameBoardContainer.addEventListener('dragover', (event) => {
        event.preventDefault();
    })

    placeShipsGameBoardContainer.addEventListener('drop', (event) => {
        let direction = 'x';

        event.preventDefault();
        const cell = event.target;

        if(!cell.classList.contains('cell')) return;

        const startPosition = [
            Number(cell.dataset.x), 
            Number(cell.dataset.y)
        ];
        const length = event.dataTransfer.getData('length');
        const src = event.dataTransfer.getData('src');

        //change the data layer
        handler(startPosition, length, direction);

        //change the DOM layer
        renderShipImgOnCell(cell, length, direction, src);
    })
    
}

function renderShipImgOnCell(cell, length, direction, src) {
    const img = document.createElement('img');

    img.src = src;
    img.classList.add('place-ship-img');

    if(direction === 'x') {
        img.style.height = '100%';
        img.style.width = `{length * 100}%`;
    }

    if(direction === 'y') {
        img.style.width = '100%';
        img.style.height = `{length * 100}%`;
    }

    cell.appendChild(img);
}

export{
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
};