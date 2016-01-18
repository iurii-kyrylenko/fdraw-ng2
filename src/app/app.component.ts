import {Component} from 'angular2/core';
import {IFDrawParams} from './fdraw/fdraw-params';
import {FDraw} from './fdraw/fdraw.component';

@Component({
    selector: 'app',
    directives: [FDraw],
    template: `
        <input [(ngModel)]="params.width" />
        ×
        <input [(ngModel)]="params.height" />

        {{params | json}}

        <fdraw [params]="params"></fdraw>
        `
})
export class App {
    params: IFDrawParams = {
        width: 340,
        height: 540,
        x: -0.6,
        y: 0,
        zoom: 100
    };
}
