import './style.css';
import { startGame } from './controller.js';

document.addEventListener('DOMContentLoaded', () => {
    try {
        startGame();
    }
    catch(error) {
        console.error('Error when loading the page:', error.message);
    }
})