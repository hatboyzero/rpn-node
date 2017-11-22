'use strict';

const RPNEngine = {
    stack: [],
    push: (input) => {
        if (input.match(/-?\d+\.?\d*/)) {
            RPNEngine.stack.unshift(input);
        }
        return RPNEngine.stack;
    },
    process: (...args) => {
        return Promise.all(args.map((input) => {
            switch (input) {
                case '+':
                    return RPNEngine.add();
                case '-':
                    return RPNEngine.subtract();
                default:
                    return RPNEngine.push(input);
            }
        }))
            .then(() => {
                return RPNEngine.stack;
            });
    },
    add: () => {
        if (RPNEngine.stack.length >= 2) {
            let secondOperand = parseFloat(RPNEngine.stack.shift());
            let firstOperand = parseFloat(RPNEngine.stack.shift());
            RPNEngine.stack.unshift((firstOperand + secondOperand).toString());
        }

        return RPNEngine.stack;
    },
    subtract: () => {
        if (RPNEngine.stack.length >= 2) {
            let secondOperand = parseFloat(RPNEngine.stack.shift());
            let firstOperand = parseFloat(RPNEngine.stack.shift());
            RPNEngine.stack.unshift((firstOperand - secondOperand).toString());
        }

        return RPNEngine.stack;
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