import {Component, Input, ElementRef} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {IFDrawParams} from './fdraw-params';

@Component({
    selector: 'fdraw',
    template: `
        <div>
            {{params | json}}
        </div>
    `
})
export class FDraw {
    @Input() params: IFDrawParams;

    constructor(element: ElementRef) {
        let targetElement = element.nativeElement;
        console.log('targetElement:', targetElement);

        let obs = Observable.fromEvent(targetElement, 'mousedown');

        obs.subscribe((event: MouseEvent) => {
            console.log('event:', event);
            this.params.x = event.clientX;
        });
    }
}
