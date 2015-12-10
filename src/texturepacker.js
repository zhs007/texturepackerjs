"use strict";

var fs = require('fs');
var util = require('util');
var image = require('./image');

function countArea(w, h) {
    return w * h;
}

function countAreaEx(rect) {
    return (rect.right - rect.left) * (rect.bottom - rect.top);
}

function procOption(option) {
    if (option == undefined) {
        option = {};
    }

    if (!option.hasOwnProperty('space')) {
        option.space = 2;
    }

    if (!option.hasOwnProperty('POT')) {
        option.POT = true;
    }

    if (!option.hasOwnProperty('max')) {
        option.max = 2048;
    }

    if (!option.hasOwnProperty('min')) {
        option.min = 256;
    }

    return option;
}

function insByArea(lsttex, lstsort, index) {
    let a1 = lsttex[index].area;
    for (let jj = 0; jj < lstsort.length; ++jj) {
        let a2 = lsttex[lstsort[jj]].area;
        if (a1 > a2) {
            lstsort.splice(jj, 0, index);

            return lstsort;
        }
    }

    lstsort.push(index);

    return lstsort;
}

function sortByArea(lsttex) {
    let lstsort = [];

    for (let ii = 0; ii < lsttex.length; ++ii) {
        lstsort = insByArea(lsttex, lstsort, ii);
    }

    return lstsort;
}

function logList(lsttex, lst) {
    for (let jj = 0; jj < lst.length; ++jj) {
        let cur = lsttex[lst[jj]];

        console.log(util.format('%s area is %d real rect is %j', cur.filename, cur.area, cur.rect));
    }
}

function getObj_area(lsttex, lst) {
    return lsttex[lst[0]];
}

function texturePacker(lstfile, option) {
    option = procOption(option);

    let lsttexture = [];
    let totalarea = 0;
    for (var i = 0; i < lstfile.length; ++i) {
        let srcfile = lstfile[i];
        if (fs.existsSync(srcfile)) {
            let png = image.load(srcfile);
            let rect = image.getRealRect(png);

            //lsttexture.push({png: png, rect: rect});

            let w = rect.right - rect.left;// + option.space * 2;
            let h = rect.bottom - rect.top;// + option.space * 2;

            let curarea = countArea(w, h);
            totalarea += curarea;

            lsttexture.push({png: png, rect: rect, area: curarea, filename: srcfile});

            //console.log(srcfile + ' area is ' + curarea + ' real rect is ' + JSON.stringify(rect));
        }
    }

    let lstsort_area = sortByArea(lsttexture);
    logList(lsttexture, lstsort_area);

    let ret = {lsttex: lsttexture, lst: []};
}

exports.texturePacker = texturePacker;
