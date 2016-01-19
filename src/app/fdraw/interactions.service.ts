import {Injectable} from 'angular2/core';
import {MapPoint} from './map-point.service';

@Injectable()
export class Interactions {
    constructor(private mapPoint: MapPoint) {}

    bind(elem: any, trgParams: any, actions: any): void {
        let cStart: {x: number, y: number};

        elem.addEventListener('mousedown', (event: MouseEvent) => {
            cStart = this.mapPoint.map(event.clientX, event.clientY, trgParams);
        });

        elem.addEventListener('mouseup', (event: MouseEvent) => {
            let cEnd = this.mapPoint.map(event.clientX, event.clientY, trgParams);
            actions.move(cEnd.x - cStart.x, cEnd.y - cStart.y);
        });

        elem.addEventListener('keydown', (event: KeyboardEvent) => {
            switch (event.keyCode) {
                case 107: case 187: actions.zoomIn(); break;
                case 109: case 189: actions.zoomOut(); break;
                default: return;
            }
        });

        // to do: touch events
    }
}
