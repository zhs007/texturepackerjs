#!/usr/bin/env node

"use strict";

require('../src/cmd/path');
require('../src/cmd/rename');

//var fs = require('fs');
var process = require('process');
var glob = require('glob');
//var image = require('../src/image');
var basecmd = require('../src/basecmd');
var tp = require('../src/texturepacker');
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
    .option('min', {
        alias : 'min',
        demand: false,
        describe: 'min',
        type: 'int'
    })
    .option('POT', {
        alias : 'POT',
        demand: false,
        describe: 'Power of 2',
        type: 'boolean'
    })
    .usage('Usage: texturepackerjs input-filename')
    .example('texturepackerjs input-filename', 'texturepackerjs input-filename')
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2015')
    .argv;

basecmd.procCmd(argv);

process.exit(1);

//var basearr = argv._;
//
//if (basearr == undefined || basearr.length < 1) {
//    console.log('Usage: texturepackerjs input-filename');
//
//    process.exit(1);
//}
//
//if (basearr[0])
//
////if (!basecmd.checkParams(argv, 'space')) {
////    process.exit(1);
////}
//
//let option = {};
//
//option.space = 2;
//if (argv.hasOwnProperty('space') && argv.space != undefined) {
//    option.space = argv.space;
//}
//
//option.max = 2048;
//if (argv.hasOwnProperty('max') && argv.max != undefined) {
//    option.max = argv.max;
//}
//
//option.min = 256;
//if (argv.hasOwnProperty('min') && argv.min != undefined) {
//    option.min = argv.min;
//}
//
//option.POT = true;
//if (argv.hasOwnProperty('POT') && argv.POT != undefined) {
//    option.POT = argv.POT;
//}
//
//let arr = [];
//for (let j = 0; j < basearr.length; ++j) {
//    let lstfile = glob.sync(basearr[j]);
//    for (var i = 0; i < lstfile.length; ++i) {
//        let srcfile = lstfile[i];
//
//        arr.push(srcfile);
//
//        //if (fs.existsSync(srcfile)) {
//        //    let png = image.load(srcfile);
//        //    let rect = image.getRealRect(png);
//        //    console.log(srcfile + ' real rect is ' + JSON.stringify(rect));
//        //}
//    }
//}
//
//tp.texturePacker(arr, option);
