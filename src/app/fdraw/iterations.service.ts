import {Injectable} from 'angular2/core';

@Injectable()
export class Iterations {
    colorPalette(c: { x: number, y: number }, maxIter: number) {
        if (c.x < 0 || c.x > 1 || c.y < 0 || c.y > 1) {
            return 0;
        }
        return c.x * maxIter;
    }

    mandelbrot(c: { x: number, y: number }, maxIter: number) {
        let z = { x: 0, y: 0 };
        for (let i = 0; i < maxIter; i++) {
            let zz = {
                x: z.x * z.x - z.y * z.y + c.x,
                y: 2 * z.x * z.y + c.y
            };
            if (zz.x * zz.x + zz.y * zz.y > 4) {
                return i;
            }
            z = zz;
        }
        return maxIter;
    }
}
