import Game from "./Game"

import "./styles/styles.scss";

var game = new Game();

document.addEventListener("DOMContentLoaded", function(event) { 
    game.init();
});