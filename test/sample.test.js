'use strict';
let command = require('command');
let test_utils = require('./test_utils');

describe ('Sample approval test', () => {
    before(() => {
        test_utils.setUp();
    });

    after(() => {
        test_utils.tearDown();
    });

    it ('Runs a test', () => {
        command.main();
        test_utils.verify('runs_a_test', 'foo')
    });
});