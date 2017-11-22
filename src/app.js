'use strict';
let readline = require('readline');
let rpn = require('rpn');

let prompt = '> ';
let commandInterface = readline.createInterface(process.stdin, process.stdout, null);
commandInterface.on('line', function (response) {
    switch(response.trim()) {
        case 'q':
            commandInterface.close();
            process.stdin.destroy();
            break;
        default:
            let inputs = response.split(' ');
            rpn.process(inputs)
                .then((result) => {
                    console.log(result.stack[0]);
                    commandInterface.setPrompt(prompt, prompt.length);
                    commandInterface.prompt();
                })
                .catch((error) => {
                    console.log(error.message);
                    commandInterface.setPrompt(prompt, prompt.length);
                    commandInterface.prompt();
                });
            break;
    }
});

commandInterface.setPrompt(prompt, prompt.length);
commandInterface.prompt();
