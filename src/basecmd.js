"use strict";

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

exports.checkParams = checkParams;
