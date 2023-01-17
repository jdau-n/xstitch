export default class Game {
    mainCanvas: HTMLCanvasElement;
    mainCanvasContext: CanvasRenderingContext2D;

    canvasX: number = 500;
    canvasY: number = 500;
    cellSize: number = 25;
    holeRadius: number = 5; // (this * 2) + 1 = hole size eyyyy

    prevCellX: number = -1;
    prevCellY: number = -1;

    cellsX: number;
    cellsY: number;

    stitches: Array< Array<number> > = [];
    inStitch: boolean = false;
    stitchTop: boolean = true; // will the next stitch be over the top of the fabric?
    currentStitchX: number;
    currentStitchY: number;

    init() {
        this.mainCanvas = <HTMLCanvasElement> document.getElementById('m-canvas');
        this.mainCanvasContext = <CanvasRenderingContext2D> this.mainCanvas.getContext('2d');

        let effectiveCanvasX: number = this.canvasX - this.cellSize;
        let effectiveCanvasY: number = this.canvasY - this.cellSize;

        this.cellsX = effectiveCanvasX / this.cellSize;
        this.cellsY = effectiveCanvasY / this.cellSize;

        for (let i = 0; i < this.cellsX; i++) {
            for (let j = 0; j < this.cellsY; j++) {
                this.colourPoint(i, j, 0, 0, 0);
            }
        }

        this.mainCanvas.addEventListener('mousemove', (event) => this.handleMouseMove(event));
        this.mainCanvas.addEventListener('mouseout', (event) => this.handleMouseOut(event));
        this.mainCanvas.addEventListener('click', (event) => this.handleMouseClick(event));
    }

    getClosestHole(x:number, y:number) {
        let cellX = Math.floor( (x - ( this.cellSize / 2)) / this.cellSize );
        let cellY = Math.floor( (y - ( this.cellSize / 2)) / this.cellSize );

        return [cellX, cellY];
    }

    handleMouseMove(event: MouseEvent) {
        let [cellX, cellY] = this.getClosestHole( event.x, event.y );
        this.drawActivePoint(cellX, cellY);

        if (this.inStitch) {
            this.drawThread( event.x, event.y );
        }
    }

    handleMouseClick(event: MouseEvent) {
        let [cellX, cellY] = this.getClosestHole( event.x, event.y );
        this.selectPoint(cellX, cellY);
    }

    handleMouseOut(event: MouseEvent) {
        this.clearActivePoint();
    }

    pointToPixels(x:number, y:number) {
        let pointX = (x * this.cellSize) + this.cellSize;
        let pointY = (y * this.cellSize) + this.cellSize;

        return [pointX, pointY];
    }

    drawThread(mouseX:number, mouseY:number) {
        let [sourceX, sourceY] = this.pointToPixels( this.currentStitchX, this.currentStitchY );

        this.mainCanvasContext.beginPath();
        this.mainCanvasContext.moveTo(sourceX, sourceY);
        this.mainCanvasContext.lineTo(mouseX, mouseY);
        this.mainCanvasContext.stroke();
    }

    selectPoint(x:number, y:number) {
        if (x < 0 || x >= this.cellsX) { return; }
        if (y < 0 || y >= this.cellsY) { return; }

        if ( ! this.inStitch ) { this.inStitch = true; }
        this.currentStitchX = x;
        this.currentStitchY = y;
    }

    drawActivePoint(x:number, y:number) {
        if (x < 0 || x >= this.cellsX) { return; }
        if (y < 0 || y >= this.cellsY) { return; }
        if (this.prevCellX == x && this.prevCellY == y) { return; }

        if (this.prevCellX != -1 && this.prevCellY != -1) {
            this.colourPoint( this.prevCellX, this.prevCellY, 0, 0, 0 );
        }

        this.prevCellX = x;
        this.prevCellY = y;

        this.colourPoint( this.prevCellX, this.prevCellY, 0, 0, 255 );
    }

    clearActivePoint() {
        if (this.prevCellX != -1 && this.prevCellY != -1) {
            this.colourPoint( this.prevCellX, this.prevCellY, 0, 0, 0 );
        }

        this.prevCellX = -1;
        this.prevCellY = -1;
    }

    colourPoint(x:number, y:number, r:number, g:number, b:number) {
        let [pointX, pointY] = this.pointToPixels( x, y );

        this.mainCanvasContext.beginPath();
        this.mainCanvasContext.arc(pointX, pointY, this.holeRadius, 0, 2 * Math.PI, false);
        this.mainCanvasContext.fillStyle = 'rgb(' + r.toString() + ',' + g.toString() + ',' + b.toString() + ')';
        this.mainCanvasContext.fill();
    }
}