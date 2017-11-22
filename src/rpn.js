'use strict';
let RpnError = require('errors');

const RPNEngine = {
    stack: [],
    push: (input) => {
        return new Promise((resolve, reject) => {
            if (input.match(/-?\d+\.?\d*|-?Infinity|NaN/)) {
                RPNEngine.stack.unshift(input);
                resolve(RPNEngine.stack);
            }

            reject(RpnError.invalidInput({message: "Input is invalid:\n" + JSON.stringify(input,null,2)}));
        });
    },
    process: (inputs) => {
        return Promise.all(inputs.map((input) => {
            switch (input) {
                case '+':
                    return RPNEngine.operation((a,b) => { return a + b; });
                case '-':
                    return RPNEngine.operation((a,b) => { return a - b; });
                case '*':
                    return RPNEngine.operation((a,b) => { return a * b; });
                case '/':
                    return RPNEngine.operation((a,b) => {
                        if (Math.abs(b) < Number.EPSILON) {
                            if (a > 0.0) {
                                return Number.POSITIVE_INFINITY;
                            } else if (a < 0.0) {
                                return Number.NEGATIVE_INFINITY;
                            }

                            return 0.0;
                        }

                        return a / b;
                    });
                default:
                    return RPNEngine.push(input);
            }
        }))
            .then(() => {
                return RPNEngine.stack;
            });
    },
    operation: (callback) => {
        return new Promise((resolve, reject) => {
            if (RPNEngine.stack.length >= 2) {
                let secondOperand = parseFloat(RPNEngine.stack.shift());
                let firstOperand = parseFloat(RPNEngine.stack.shift());
                RPNEngine.stack.unshift(callback(firstOperand,secondOperand).toString());
            } else {
                reject(RpnError.invalidInput({message: 'Invalid input sequence:\n' + JSON.stringify(RPNEngine.stack, null, 2)}));
            }

            resolve(RPNEngine.stack);
        })
    },
    clear: () => {
        return new Promise((resolve, reject) => {
            RPNEngine.stack.length = 0;
            resolve(RPNEngine.stack);
        });
    }
};

Object.freeze(RPNEngine);

module.exports = RPNEngine;