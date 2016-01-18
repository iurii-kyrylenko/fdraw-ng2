import {Component, Input, ElementRef, OnChanges, SimpleChange} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {IFDrawParams} from './fdraw-params';

@Component({
    selector: 'fdraw',
    styles: [`
        canvas {
            display: block;
            border:1px solid #d3d3d3;
        }
    `],
    template: `
        <canvas
            [width]="params.width"
            [height]="params.height">
        </canvas>
    `
})
export class FDraw implements OnChanges {
    @Input() params: IFDrawParams;
    private _canvas: any;

    constructor(element: ElementRef) {
        this._canvas = element.nativeElement.querySelector('canvas');
        console.log('canvas:', this._canvas);

        let obs = Observable.fromEvent(this._canvas, 'mousedown');

        obs.subscribe((event: MouseEvent) => {
            this.params.x = event.clientX;
            this.params.y = event.clientY;
        });
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        setTimeout(() => {
            console.log('changes:', changes);
            let ctx = this._canvas.getContext('2d');
            ctx.font = '30px Arial';
            ctx.fillText(`${this.params.width}×${this.params.height}`, 10, 50);
        });
    }
}
