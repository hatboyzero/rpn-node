'use strict';
let rpn = require('rpn');
let test_utils = require('./test_utils');

describe('Reverse polish notation unit tests', () => {
   beforeEach(() => {
       return test_utils.setUp();
   });

   afterEach(() => {
       return test_utils.tearDown();
   });

   it('Accepts a single number as input', () => {
       return rpn.process('1')
           .then((result) => {
               test_utils.verify('accepts_a_single_number_as_input', result);
           });
   });

   it('Accepts two numbers as input', () => {
        return rpn.process('1','2')
            .then((result) => {
                test_utils.verify('accepts_two_numbers_as_input', result);
            });
   });

   it('Accepts two numbers and an addition operator as input', () => {
        return rpn.process('1','2','+')
            .then((result) => {
                test_utils.verify('accepts_two_numbers_and_an_addition_operator_as_input', result);
            });
   });
});