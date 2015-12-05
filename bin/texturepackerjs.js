#!/usr/bin/env node

"use strict";

var fs = require('fs');
var process = require('process');
var glob = require('glob');
var image = require('../src/image');
var argv = require('yargs')
    .option('space', {
        alias : 'space',
        demand: false,
        describe: 'space',
        type: 'int'
    })
    .option('max', {
        alias : 'max',
        demand: false,
        describe: 'max',
        type: 'int'
    })
    .usage('Usage: texturepackerjs input-filename')
    .example('texturepackerjs input-filename', 'texturepackerjs input-filename')
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2015')
    .argv;

var basearr = argv._;

if (basearr == undefined || basearr.length < 1) {
    console.log('Usage: texturepackerjs input-filename');

    process.exit(1);
}

//if (!basecmd.checkParams(argv, 'space')) {
//    process.exit(1);
//}

let space = 2;
if (argv.hasOwnProperty('space')) {
    space = argv.space;
}

let max = 2048;
if (argv.hasOwnProperty('max')) {
    max = argv.max;
}

let arr = [];
for (let j = 0; j < basearr.length; ++j) {
    let lstfile = glob.sync(basearr[j]);
    for (var i = 0; i < lstfile.length; ++i) {
        let srcfile = lstfile[i];
        if (fs.existsSync(srcfile)) {
            let png = image.load(srcfile);
            let rect = image.getRealRect(png);
            console.log(srcfile + ' real rect is ' + JSON.stringify(rect));
        }
    }
}
