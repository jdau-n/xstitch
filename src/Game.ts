import TabManager from "./ui/TabManager"
import StatusManager from "./ui/StatusManager"

export default class Game {

    intervalHandle: number;

    statusManager: StatusManager;

    init() {
        this.intervalHandle = window.setInterval( this.tick, 1000 );

        this.statusManager = new StatusManager();
        this.statusManager.createDOM();
    }

    tick() {
        console.log("tick");
    }
}