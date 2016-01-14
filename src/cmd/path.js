"use strict";

var basecmd = require('../basecmd');
var fs = require('fs');
var path = require('path');
var util = require('util');
var glob = require('glob');

function cpfile(src, dest) {
    let buf = fs.readFileSync(src, 'binary');
    fs.writeFileSync(dest, buf, 'binary');
}

function procCmd(argv) {
    let arr = argv._;

    if (arr.length < 2) {
        console.log('Usage: texturepackerjs path sprite/**/*.png [--pathlink=_]');

        return false;
    }

    let srcname = arr[1];

    let arrfile = [];
    if (util.isArray(srcname)) {
        for (let j = 0; j < srcname.length; ++j) {
            let lstfile = glob.sync(srcname[j]);
            for (var i = 0; i < lstfile.length; ++i) {
                let srcfile = lstfile[i];

                arrfile.push(srcfile);
            }
        }
    }
    else {
        let lstfile = glob.sync(srcname);
        for (var i = 0; i < lstfile.length; ++i) {
            let srcfile = lstfile[i];

            arrfile.push(srcfile);
        }
    }

    for (let ii = 0; ii < arrfile.length; ++ii) {
        let dfn = arrfile[ii].replace(/\//g, '_');
        cpfile(arrfile[ii], dfn);
    }

    return true;
}

basecmd.addCmd('path', procCmd);



