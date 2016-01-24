import {Injectable} from 'angular2/core';

@Injectable()
export class Interactions {

    bind(elem: any, actions: any): void {
        let cStart: {x: number, y: number};

        elem.addEventListener('mousedown', (event: MouseEvent) => {
            cStart = { x: event.clientX, y: event.clientY };
        });

        elem.addEventListener('mouseup', (event: MouseEvent) => {
            let cEnd = { x: event.clientX, y: event.clientY };
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
