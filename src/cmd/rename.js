"use strict";

var basecmd = require('../basecmd');
var glob = require('glob');
var path = require('path');
var util = require('util');
var fs = require('fs');

function procCmd(argv) {
    let arr = argv._;

    if (arr.length < 3) {
        console.log('Usage: texturepackerjs rename sprite/**/*.png %03d.png [--beginindex=0]');

        return false;
    }

    let srcname = arr[1];
    let destname = arr[2];

    let beginindex = 0;
    if (argv.hasOwnProperty('beginindex')) {
        beginindex = argv.beginindex;
    }

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

    arrfile.sort();

    let pd = {};
    for (let ii = 0; ii < arrfile.length; ++ii) {
        let dirname = path.dirname(arrfile[ii]);
        let basename = path.basename(arrfile[ii]);

        if (!pd.hasOwnProperty(dirname)) {
            pd[dirname] = [];
        }

        pd[dirname].push(basename);

        console.log("%s %s", dirname, basename);
    }

    for (let k in pd) {
        let v = pd[k];

        for (let ii = 0; ii < v.length; ++ii) {
            let cfn = util.format(destname, ii);
            let sfn = path.join(k, v[ii]);
            let dfn = path.join(k, cfn);

            if (sfn != dfn) {
                fs.renameSync(sfn, dfn);
            }
        }
    }

    return true;
}

basecmd.addCmd('rename', procCmd);



