import {Injectable} from 'angular2/core';
import {IFDrawParams} from './fdraw-params';

@Injectable()
export class MapPoint {
    map(srcX: number, srcY: number, trgParams: IFDrawParams): {x: number,  y: number} {
        let target = {
            x: trgParams.x + srcX / trgParams.zoom,
            y: trgParams.y - srcY / trgParams.zoom
        };
        return target;
    }
}
