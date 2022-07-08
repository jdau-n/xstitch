import TabManager from "./ui/TabManager"
import Game from "./Game"

import "./styles/styles.scss";

var tabs = new TabManager();

var game = new Game();
game.init();

console.log(tabs.currentTab);