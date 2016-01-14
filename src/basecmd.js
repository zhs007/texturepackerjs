"use strict";

var lstcmd = {};

function checkParams(argv) {
    if (arguments.length > 1) {
        for (let i = 1; i < arguments.length; ++i) {
            if (!argv.hasOwnProperty(arguments[i])) {
                console.log('need param ' + arguments[i]);

                return false;
            }
        }
    }

    return true;
}

function addCmd(cmd, callback) {
    lstcmd[cmd] = callback;
}

function procCmd(argv) {
    let arr = argv._;

    if (arr.length < 1) {
        console.log('Usage: texturepackerjs command');

        return false;
    }

    let cmd = arr[0];
    if (lstcmd.hasOwnProperty(cmd)) {
        return lstcmd[cmd](argv);
    }

    console.log('Usage: command not define.');

    return false;
}

exports.checkParams = checkParams;
exports.addCmd = addCmd;
exports.procCmd = procCmd;