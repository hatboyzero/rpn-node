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

    it('Accepts three numbers and one addition operator as input', () => {
        return rpn.process('1', '2', '3', '+')
            .then((result) => {
                test_utils.verify('accepts_three_numbers_and_one_addition_operator_as_input', result);
            });
    });

   it('Accepts three numbers and two addition operators as input', () => {
        return rpn.process('1', '2', '3', '+', '+')
            .then((result) => {
                test_utils.verify('accepts_three_numbers_and_two_addition_operators_as_input', result);
            });
   });

   it ('Accepts two numbers and a subtraction operator as input', () => {
        return rpn.process('1', '2', '-')
            .then((result) => {
                test_utils.verify('accepts_two_numbers_and_a_subtraction_operator_as_input', result);
            })
   });

   it ('Accepts three numbers and a subtraction operator as input', () => {
        return rpn.process('1', '2', '3', '-')
            .then((result) => {
                test_utils.verify('accepts_three_numbers_and_a_subtraction_operator_as_input', result);
            });
   });

   it ('Accepts three numbers and two subtraction operators as input', () => {
        return rpn.process('1', '2', '3', '-', '-')
            .then((result) => {
                test_utils.verify('accepts_three_numbers_and_two_subtraction_operators_as_input', result);
            });
   });
});