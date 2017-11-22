'use strict';
let RpnError = require('errors');

const RPNEngine = {
    stack: [],
    push: (input) => {
        return new Promise((resolve, reject) => {
            if (input.match(/-?\d+\.?\d*|-?Infinity|NaN/)) {
                RPNEngine.stack.unshift(input);
                resolve({stack: RPNEngine.stack});
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
                    return RPNEngine.operation((a,b) => { return a / b; });
                default:
                    return RPNEngine.push(input);
            }
        }))
        .then((result) => {
            return result.pop();
        });
    },
    operation: (callback) => {
        return new Promise((resolve, reject) => {
            if (RPNEngine.stack.length >= 2) {
                let secondOperand = parseFloat(RPNEngine.stack.shift());
                let firstOperand = parseFloat(RPNEngine.stack.shift());
                let result = callback(firstOperand,secondOperand).toString()
                RPNEngine.stack.unshift(result);
                resolve({stack: RPNEngine.stack, result: result});
            } else {
                reject(RpnError.invalidInput({message: 'Invalid input sequence:\n' + JSON.stringify(RPNEngine.stack, null, 2)}));
            }

            resolve({stack: RPNEngine.stack});
        })
    },
    clear: () => {
        return new Promise((resolve, reject) => {
            RPNEngine.stack.length = 0;
            resolve({stack: RPNEngine.stack});
        });
    }
};

Object.freeze(RPNEngine);

module.exports = RPNEngine;