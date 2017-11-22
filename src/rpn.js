'use strict';
let RpnError = require('errors');

const RPNEngine = {
    stack: [],
    push: (input) => {
        return new Promise((resolve, reject) => {
            if (input.match(/-?\d+\.?\d*/)) {
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
                    return RPNEngine.add();
                case '-':
                    return RPNEngine.subtract();
                case '*':
                    return RPNEngine.multiply();
                case '/':
                    return RPNEngine.divide();
                default:
                    return RPNEngine.push(input);
            }
        }))
            .then(() => {
                return RPNEngine.stack;
            });
    },
    add: () => {
        return new Promise((resolve) => {
            if (RPNEngine.stack.length >= 2) {
                let secondOperand = parseFloat(RPNEngine.stack.shift());
                let firstOperand = parseFloat(RPNEngine.stack.shift());
                RPNEngine.stack.unshift((firstOperand + secondOperand).toString());
            }

            resolve(RPNEngine.stack);
        });
    },
    subtract: () => {
        return new Promise((resolve) => {
            if (RPNEngine.stack.length >= 2) {
                let secondOperand = parseFloat(RPNEngine.stack.shift());
                let firstOperand = parseFloat(RPNEngine.stack.shift());
                RPNEngine.stack.unshift((firstOperand - secondOperand).toString());
            }

            resolve(RPNEngine.stack);
        });
    },
    multiply: () => {
        return new Promise((resolve) => {
            if (RPNEngine.stack.length >= 2) {
                let secondOperand = parseFloat(RPNEngine.stack.shift());
                let firstOperand = parseFloat(RPNEngine.stack.shift());
                RPNEngine.stack.unshift((firstOperand * secondOperand).toString());
            }

            resolve(RPNEngine.stack);
        });
    },
    divide: () => {
        return new Promise((resolve) => {
            if (RPNEngine.stack.length >= 2) {
                let secondOperand = parseFloat(RPNEngine.stack.shift());
                let firstOperand = parseFloat(RPNEngine.stack.shift());
                RPNEngine.stack.unshift((firstOperand / secondOperand).toString());
            }

            resolve(RPNEngine.stack);
        });
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