import hitImg from "./imgs/dot-hit-red.png";
import missImg from "./imgs/dot-miss.png";

const userNameInput = document.querySelector('#user-name-input');
const inputNameBtn = document.querySelector('#input-name-btn');
const userNameInputForm = document.querySelector('#user-name-input-form');
const gameboardsContainer = document.querySelector('#gameboards-container');
const placeShipsGameBoardContainer = document.querySelector('#place-ships-gameboard-container');
const userGameBoardContainer = document.querySelector('#user-gameboard-container');
const robotGameBoardContainer = document.querySelector('#robot-gameboard-container');
const userNameInputDialog = document.querySelector('#user-name-input-dialog');
const indicatorContainer = document.querySelector('#indicator-container');
const placeShipsPage = document.querySelector('#page-place-ships');
const playBattlePage = document.querySelector('#page-play-battle');
const loadPlayBattlePageBtn = document.querySelector('#play-battle-btn');
const userWinDialog = document.querySelector('#user-win-dialog');
const robotWinDialog = document.querySelector('#robot-win-dialog');
const winPlayAgainBtn = document.querySelector('#win-play-again-btn');
const losePlayAgainBtn = document.querySelector('#lose-play-again-btn');
const placeShipsIndicator = document.querySelector('#place-ships-indicator');
const battleIndicator = document.querySelector('#battle-indicator');
const placeShipIndicatorContainer = document.querySelector('#indicator-container');
const placeShipIndicatorContainer2 = document.querySelector('#indicator-container-2')

//#region render gameboard

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
            const cellData = gameBoard.board[j][i];
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

//Inner Function
function renderAllHits(container) {
    const allEffectiveHits = container.querySelectorAll('.ship-hit');
    const allMissedHits = container.querySelectorAll('.miss-hit');

    allEffectiveHits.forEach(cell => {
        const img = document.createElement('img');
        img.src = hitImg;

        //avoid multipule render
        if(cell.querySelector('.hit-img')) return;

        img.classList.add('hit-img');
        cell.appendChild(img);
    });

    allMissedHits.forEach(cell => {
        const img = document.createElement('img');
        img.src = missImg;

        //avoid multipule render
        if(cell.querySelector('.miss-img')) return;

        img.classList.add('miss-img');
        cell.appendChild(img);
    })
}

function renderUserGameBoard(userGameBoard) {
    renderGameBoard(userGameBoard, userGameBoardContainer);
    renderAllShipsOnUserGameBoard(userGameBoard);
    renderAllHits(userGameBoardContainer);
}

function renderRobotGameBoard(robotGameBoard) {
    renderGameBoard(robotGameBoard, robotGameBoardContainer);
    renderAllHits(robotGameBoardContainer);
}

function renderPlaceShipsGameBoard(placeGameBoard) {
    renderGameBoard(placeGameBoard, placeShipsGameBoardContainer)
}
//#endregion


function renderUserWin() {
    setTimeout(() => {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.add('hidden');      
        });

        userWinDialog.showModal();
    }, 500)
}

function renderRobotWin() {
    setTimeout(() => {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.add('hidden');
        });
        robotWinDialog.showModal();
    }, 500)
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
    userNameInputForm.addEventListener('submit', (event) => {
        event.preventDefault();
        return handler(userNameInput.value);
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

    autoChangeBorderAndBoxShadowColor(placeShipIndicatorContainer);

    //render userGameBoard here
    renderGameBoard(userGameBoard, placeShipsGameBoardContainer);
    bindShipDrag();
}

function loadPlayBattlePage(userGameBoard, robotGameBoard) {
    //add 'hidden' back to all other pages:
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });

    playBattlePage.classList.remove('hidden');

    renderUserGameBoard(userGameBoard);
    renderRobotGameBoard(robotGameBoard);
    renderBattlePageIndicator();
    autoChangeBorderAndBoxShadowColor(placeShipIndicatorContainer2);

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
        const length = Number(event.dataTransfer.getData('length'));
        const src = event.dataTransfer.getData('src');

        //change the data layer
        handler(startPosition, length, direction, src);
    })    
}

function renderAllShipsOnGameBoard(gameBoardContainer, gameBoard) {
    //Inner Function
    const isThisCellShipStartPosition = (cell) => {
        return (
            cell.ship && 
            cell.coord[0] === cell.ship.startPosition[0] &&
            cell.coord[1] === cell.ship.startPosition[1]
        );
    }

    gameBoard.board.forEach(column => {
        column.forEach(cell => {
            if(isThisCellShipStartPosition(cell)) {
                //create a ship img:
                const shipImg = document.createElement('img');
                shipImg.classList.add('place-ship-img');
                if(cell.ship.direction === 'x') {
                    shipImg.style.height = '100%';
                    shipImg.style.width = `${cell.ship.length * 100}%`;
                    shipImg.src = cell.shipImgSrc;
                }
                if(cell.ship.direction === 'y') {
                    shipImg.style.width = '100%';
                    shipImg.style.height = `${cell.ship.length * 100}%`;
                    shipImg.src = cell.shipImgSrc;
                }
                
                //find the cell element
                const theRowElement = gameBoardContainer.querySelectorAll('.gameboard-row')[cell.coord[1]];
                const theCellElement =theRowElement.querySelectorAll('.cell')[cell.coord[0]];

                theCellElement.appendChild(shipImg);
            }
        })
    })
}

function renderAllShipsOnPlaceShipsGameBoard(userGameBoard) {
    renderAllShipsOnGameBoard(placeShipsGameBoardContainer, userGameBoard)
}

function renderAllShipsOnUserGameBoard(userGameBoard) {
    renderAllShipsOnGameBoard(userGameBoardContainer, userGameBoard)
}

function bindLoadPlayBattlePage(handler) {
    loadPlayBattlePageBtn.addEventListener('click', handler)
}

function bindPlayAgainBtn(handler) {
    winPlayAgainBtn.addEventListener('click', handler);
    losePlayAgainBtn.addEventListener('click', handler);
}

function clooseAllDialogs() {
    const allDialogs = document.querySelectorAll('dialog');
    allDialogs.forEach(dialog => {
        dialog.close()
    })
}

//#region Place Ship Indicator

let placeShipIndicatorInterval;

function renderPlaceShipsPageIndicator(name) {
    const message = `HELLO ${name.toUpperCase()}!  PLACE YOUR SHIPS HERE!`;
    showTextContentByCharacterInPlaceShipsPageIndicator(placeShipsIndicator, message);
}

//'message' must be string
function placeShipIndicatorShowMessage(message) {
    if(typeof message !== 'string') {
        console.log('message must be a string!');
        return;
    }

    showTextContentByCharacterInPlaceShipsPageIndicator(placeShipsIndicator, message);
}

function showTextContentByCharacterInPlaceShipsPageIndicator(container, message) {
    clearInterval(placeShipIndicatorInterval);
    container.innerHTML = '';

    let index = 0;
    placeShipIndicatorInterval = setInterval(() => {
        container.textContent += message[index];
        index++;

        if(index === message.length) clearInterval(placeShipIndicatorInterval);
    }, 15)
}

//#endregion

let playBattleInterval;

//Inner Function
function showTextContentByCharacterInBattlePageIndicator(container, message) {
    clearInterval(playBattleInterval);
    container.innerHTML = '';

    let index = 0;
    playBattleInterval = setInterval(() => {
        container.textContent += message[index];
        index++;

        if(index === message.length) clearInterval(playBattleInterval);
    }, 15)
}

function renderBattlePageIndicator() {
    const message = 'HIT THE BOARD!';
    showTextContentByCharacterInBattlePageIndicator(battleIndicator, message);
}

function indicatorShowAffectiveHit() {
    const message = 'IT\'S A HIT!';
    showTextContentByCharacterInBattlePageIndicator(battleIndicator, message);
}

function indicatorShowMissHit() {
    const message = 'YOU MISS!';
    showTextContentByCharacterInBattlePageIndicator(battleIndicator, message);
}

function autoChangeBorderAndBoxShadowColor(element) {
    setInterval(() => {
        const randomColor = `rgb(
            ${Math.floor(Math.random() * 256)},
            ${Math.floor(Math.random() * 256)},
            ${Math.floor(Math.random() * 256)}
        )`

        element.style.borderColor = randomColor;
        element.style.boxShadow = `0 0 8px ${randomColor}`;
    }, 400)
}

export const dom = {
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
    bindShipDrag,
    renderAllShipsOnPlaceShipsGameBoard,
    bindLoadPlayBattlePage,
    bindPlayAgainBtn,
    clooseAllDialogs,
    renderPlaceShipsPageIndicator,
    placeShipIndicatorShowMessage,
    renderAllShipsOnUserGameBoard,
    indicatorShowAffectiveHit,
    indicatorShowMissHit
};