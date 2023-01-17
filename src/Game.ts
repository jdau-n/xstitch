export default class Game {
    mainCanvas: HTMLCanvasElement;
    mainCanvasContext: CanvasRenderingContext2D;

    canvasX: number = 500;
    canvasY: number = 500;
    cellSize: number = 25;
    holeRadius: number = 5; // (this * 2) + 1 = hole size eyyyy

    prevCellX: number = 0;
    prevCellY: number = 0;

    init() {
        this.mainCanvas = <HTMLCanvasElement> document.getElementById('m-canvas');
        this.mainCanvasContext = <CanvasRenderingContext2D> this.mainCanvas.getContext('2d');

        let effectiveCanvasX: number = this.canvasX - this.cellSize;
        let effectiveCanvasY: number = this.canvasY - this.cellSize;

        let cellsX: number = effectiveCanvasX / this.cellSize;
        let cellsY: number = effectiveCanvasY / this.cellSize;

        for (let i = 0; i < cellsX; i++) {
            for (let j = 0; j < cellsY; j++) {
                this.colourPoint(i, j, 0, 0, 0);
            }
        }

        this.mainCanvas.addEventListener('mousemove', (event) => this.handleMouseMove(event));
    }

    handleMouseMove(event: MouseEvent) {
        let cellX = Math.floor( (event.x - ( this.cellSize / 2)) / this.cellSize );
        let cellY = Math.floor( (event.y - ( this.cellSize / 2)) / this.cellSize );

        this.drawActivePoint(cellX, cellY);
    }

    drawActivePoint(x:number, y:number) {

        if (this.prevCellX != 0 && this.prevCellY != 0) {
            this.colourPoint( this.prevCellX, this.prevCellY, 0, 0, 0 );
        }

        this.prevCellX = x;
        this.prevCellY = y;

        this.colourPoint( this.prevCellX, this.prevCellY, 0, 0, 255 );
    }

    clearActivePoint() {

    }

    colourPoint(x:number, y:number, r:number, g:number, b:number) {
        let pointX = (x * this.cellSize) + this.cellSize;
        let pointY = (y * this.cellSize) + this.cellSize;

        this.mainCanvasContext.beginPath();
        this.mainCanvasContext.arc(pointX, pointY, this.holeRadius, 0, 2 * Math.PI, false);
        this.mainCanvasContext.fillStyle = 'rgb(' + r.toString() + ',' + g.toString() + ',' + b.toString() + ')';
        this.mainCanvasContext.fill();
    }
}