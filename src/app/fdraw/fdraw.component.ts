import {Component, Input, ElementRef, OnChanges, SimpleChange} from 'angular2/core';
import {IFDrawParams} from './fdraw-params';
import {MapPoint} from './map-point.service';
import {Interactions} from './interactions.service';
import {Iterations} from './iterations.service';
import {GetColor} from './get-color.service';

@Component({
    selector: 'fdraw',
    styles: [`
        canvas {
            display: block;
            border:1px solid #d3d3d3;
        }
    `],
    template: `
        <canvas tabindex="1"
            [width]="params.width"
            [height]="params.height">
        </canvas>`,
    providers: [MapPoint, Interactions, Iterations, GetColor]
})
export class FDraw implements OnChanges {
    @Input() params: IFDrawParams;
    private _canvas: any;

    constructor(
        element: ElementRef,
        private mapPoint: MapPoint,
        private interactions: Interactions,
        private iterations: Iterations,
        private getColor: GetColor) {

        this._canvas = element.nativeElement.querySelector('canvas');
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        setTimeout(() => {
            this.draw();
        });
    }

    ngOnInit() {
        this.interactions.bind(this._canvas, {
            move: (dx: number, dy: number) => {
                this.params.x -= dx / this.params.zoom;
                this.params.y += dy / this.params.zoom;
                this.draw();
            },
            zoomIn: () => {
                this.params.zoom *= 1.5;
                this.draw();
            },
            zoomOut: () => {
                this.params.zoom /= 1.5;
                this.draw();
            }
        });
    }

    draw() {
        let context = this._canvas.getContext('2d');

        let width = this.params.width,
        height = this.params.height,
        halfWidth  = Math.floor(width / 2),
        halfHeight = Math.floor(height / 2);
        let imgData = context.createImageData(width, height);
        const maxIter = 300;

        for (let j = 0; j < height; j++) {
          for (let i = 0; i < width; i++) {
             let ii = 4 * (j * width + i);
             let cPoint = this.mapPoint.map(i - halfWidth, j - halfHeight, this.params);
             let nIter = this.iterations.mandelbrot(cPoint, maxIter);
             let c = this.getColor.wb(nIter / maxIter);
             imgData.data[ii + 0] = c.r;
             imgData.data[ii + 1] = c.g;
             imgData.data[ii + 2] = c.b;
             imgData.data[ii + 3] = c.a;
          }
        }
        context.putImageData(imgData, 0, 0);
    }
}
