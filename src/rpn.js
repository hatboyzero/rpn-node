'use strict';

const RPNEngine = {
    stack: [],
    push: (input) => {
        RPNEngine.stack.unshift(input);
        return RPNEngine.stack;
    },
    process: (...args) => {
        return Promise.all(args.map((input) => {
            switch (input) {
                case '+':
                    return RPNEngine.add(0.0);
                default:
                    return RPNEngine.push(input);
            }
        }))
            .then(() => {
                return RPNEngine.stack;
            });
    },
    add: (value) => {
        if (RPNEngine.stack.length > 0 && RPNEngine.stack[0].match(/\d+\.?\d*/)) {
            value += parseFloat(RPNEngine.stack.shift());
            return RPNEngine.add(value);
        }

        RPNEngine.push(value.toString());

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