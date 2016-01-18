import {Component} from 'angular2/core';
import {IFDrawParams} from './fdraw/fdraw-params';
import {FDraw} from './fdraw/fdraw.component';

@Component({
    selector: 'app',
    directives: [FDraw],
    template: `
        <input [value]="params.width" (input)="pushToImmutable('width', $event.target.value)" />
        ×
        <input [value]="params.height" (input)="pushToImmutable('height', $event.target.value)" />

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

    pushToImmutable(prop: string, value: string) {
        this.params = Object.assign({}, this.params, {[prop]: +value});
    }
}
