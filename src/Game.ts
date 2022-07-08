export default class Game {

    intervalHandle: number;

    init() {
        console.log("Init");
        this.intervalHandle = window.setInterval( this.tick, 1000 );
        console.log(this.intervalHandle);
    }

    tick() {
        console.log("tick");
    }
}