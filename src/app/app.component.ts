import {Component} from 'angular2/core';
import {IFDrawParams} from './fdraw/fdraw-params';
import {FDraw} from './fdraw/fdraw.component';

@Component({
    selector: 'app',
    directives: [FDraw],
    template: `
        <fdraw [params]="params"></fdraw>
        <fdraw [params]="{width: 1, height: 2, x: 3, y: 4, zoom: 5}"></fdraw>
        `
})
export class App {
    params: IFDrawParams = {
        width: 400,
        height: 300,
        x: 0,
        y: 0,
        zoom: 1
    };
}
