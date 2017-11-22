'use strict';
let rpn = require('rpn');
let approvals = require('approvals');
let approvalsConfig = approvals.getConfig({appendEOL: false});
approvals.configure(approvalsConfig);
approvals.mocha();

let env = {
    alias: 'test'
};

function setUp() {
    return rpn.clear();
}

function tearDown() {
    return rpn.clear();
}

let outputDir = __dirname + '/approvals';

let globalScrubber = approvals.scrubbers.multiScrubber([
    (data) => {
        return (data || '')
            .replace(
                /\\?"[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}\\?"/ig,
                '<UUID>');
    },
    (data) => {
        return (data || '')
            .replace(
                /\\?"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\\?"/g,
                '<ISO8601 TIMESTAMP>');
    },
    (data) => {
        let home = require('os').homedir();
        return (data || '')
            .replace(
                __dirname,
                '<CURRENT_PATH>');
    }
]);

module.exports = {
    env: env,
    verify: (testName, data, optionsOverride) => {
        return approvals.verifyAndScrub(
            outputDir,
            testName,
            JSON.stringify(data, null, 2),
            globalScrubber,
            optionsOverride);
    },
    setUp: setUp,
    tearDown: tearDown,
};
