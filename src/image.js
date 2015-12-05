"use strict";

var fs = require('fs');
var PNG = require('pngjs').PNG;

function load(filename) {
    let data = fs.readFileSync(filename);
    let png = PNG.sync.read(data);

    return png;
}

function getRealRect(png) {
    let rect = {left: png.width, top: png.height, right: 0, bottom: 0};

    for (let yy = 0; yy < png.height; ++yy) {
        for (let xx = 0; xx < png.width; ++xx) {
            let idx = (png.width * yy + xx) << 2;

            if (png.data[idx + 3] > 0) {
                if (xx < rect.left) {
                    rect.left = xx;
                }

                if (xx > rect.right) {
                    rect.right = xx;
                }

                if (yy < rect.top) {
                    rect.top = yy;
                }

                if (yy > rect.bottom) {
                    rect.bottom = yy;
                }
            }
        }
    }

    return rect;
}

exports.load = load;
exports.getRealRect = getRealRect;

