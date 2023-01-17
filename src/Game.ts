export default class Game {
    mainCanvas: HTMLCanvasElement;
    mainCanvasContext: CanvasRenderingContext2D;

    canvasX: number = 500;
    canvasY: number = 500;
    cellSize: number = 25; 
    margin: number = 25;
    holeRadius: number = 5; // (this * 2) + 1 = hole size eyyyy

    init() {
        this.mainCanvas = <HTMLCanvasElement> document.getElementById('m-canvas');
        this.mainCanvasContext = <CanvasRenderingContext2D> this.mainCanvas.getContext('2d');

        let effectiveCanvasX: number = this.canvasX - (this.margin);
        let effectiveCanvasY: number = this.canvasY - (this.margin);

        let cellsX: number = effectiveCanvasX / this.cellSize;
        let cellsY: number = effectiveCanvasY / this.cellSize;

        for (let i = 0; i < cellsX; i++) {
            for (let j = 0; j < cellsY; j++) {
                let pointX = (i * this.cellSize) + this.margin;
                let pointY = (j * this.cellSize) + this.margin;

                this.mainCanvasContext.beginPath();
                this.mainCanvasContext.arc(pointX, pointY, this.holeRadius, 0, 2 * Math.PI, false);
                this.mainCanvasContext.fillStyle = 'black';
                this.mainCanvasContext.fill();
            }
        }
    }
}