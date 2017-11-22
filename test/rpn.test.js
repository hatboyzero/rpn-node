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
       let inputs = ['1'];
       return rpn.process(inputs)
           .then((result) => {
               test_utils.verify('accepts_a_single_number_as_input', {input: inputs, result: result});
           });
   });

   it('Accepts two numbers as input', () => {
       let inputs = ['1','2'];
        return rpn.process(inputs)
            .then((result) => {
                test_utils.verify('accepts_two_numbers_as_input', {input: inputs, result: result});
            });
   });

   it('Accepts two numbers and an addition operator as input', () => {
       let inputs = ['1','2','+'];
        return rpn.process(inputs)
            .then((result) => {
                test_utils.verify('accepts_two_numbers_and_an_addition_operator_as_input', {input: inputs, result: result});
            });
   });

    it('Accepts three numbers and one addition operator as input', () => {
        let inputs = ['1','2','3','+'];
        return rpn.process(inputs)
            .then((result) => {
                test_utils.verify('accepts_three_numbers_and_one_addition_operator_as_input', {input: inputs, result: result});
            });
    });

   it('Accepts three numbers and two addition operators as input', () => {
        let inputs = ['1','2','3','+','+'];
        return rpn.process(inputs)
            .then((result) => {
                test_utils.verify('accepts_three_numbers_and_two_addition_operators_as_input', {input: inputs, result: result});
            });
   });

   it ('Accepts two numbers and a subtraction operator as input', () => {
        let inputs = ['1','2','-'];
        return rpn.process(inputs)
            .then((result) => {
                test_utils.verify('accepts_two_numbers_and_a_subtraction_operator_as_input', {input: inputs, result: result});
            })
   });

   it ('Accepts three numbers and a subtraction operator as input', () => {
        let inputs = ['1','2','3','-'];
        return rpn.process(inputs)
            .then((result) => {
                test_utils.verify('accepts_three_numbers_and_a_subtraction_operator_as_input', {input: inputs, result: result});
            });
   });

   it ('Accepts three numbers and two subtraction operators as input', () => {
        let inputs = ['1','2','3','-','-'];
        return rpn.process(inputs)
            .then((result) => {
                test_utils.verify('accepts_three_numbers_and_two_subtraction_operators_as_input', {input: inputs, result: result});
            });
   });

    it ('Accepts two numbers and a multiplication operator as input', () => {
        let inputs = ['1','2','*'];
        return rpn.process(inputs)
            .then((result) => {
                test_utils.verify('accepts_two_numbers_and_a_multiplication_operator_as_input', {input: inputs, result: result});
            })
    });

    it ('Accepts three numbers and a multiplication operator as input', () => {
        let inputs = ['1','2','3','*'];
        return rpn.process(inputs)
            .then((result) => {
                test_utils.verify('accepts_three_numbers_and_a_multiplication_operator_as_input', {input: inputs, result: result});
            });
    });

    it ('Accepts three numbers and two multiplication operators as input', () => {
        let inputs = ['1','2','3','*','*'];
        return rpn.process(inputs)
            .then((result) => {
                test_utils.verify('accepts_three_numbers_and_two_multiplication_operators_as_input', {input: inputs, result: result});
            });
    });

    it ('Accepts two numbers and a division operator as input', () => {
        let inputs = ['1','2','/'];
        return rpn.process(inputs)
            .then((result) => {
                test_utils.verify('accepts_two_numbers_and_a_divisionn_operator_as_input', {input: inputs, result: result});
            })
    });

    it ('Accepts three numbers and a division operator as input', () => {
        let inputs = ['1','2','3','/'];
        return rpn.process(inputs)
            .then((result) => {
                test_utils.verify('accepts_three_numbers_and_a_division_operator_as_input', {input: inputs, result: result});
            });
    });

    it ('Accepts three numbers and two division operators as input', () => {
        let inputs = ['1','2','3','/','/'];
        return rpn.process(inputs)
            .then((result) => {
                test_utils.verify('accepts_three_numbers_and_two_division_operators_as_input', {input: inputs, result: result});
            });
    });

    it ('Rejects an invalid input', () => {
        let inputs = ['a'];
        return rpn.process(inputs)
            .then(() => {
                assert.fail();
            })
            .catch((error) => {
                if (error) {
                    test_utils.verify('rejects_an_invalid_input', {input: inputs, error: error});
                }
            });
    });

    it ('Rejects an invalid input sequence for addition', () => {
        let inputs = ['1','+'];
        return rpn.process(inputs)
            .then(() => {
                assert.fail();
            })
            .catch((error) => {
                if (error) {
                    test_utils.verify('rejects_an_invalid_input_sequence_for_addition', {input: inputs, error: error});
                }
            });
    });

    it ('Rejects an invalid input sequence for subtraction', () => {
        let inputs = ['1','-'];
        return rpn.process(inputs)
            .then(() => {
                assert.fail();
            })
            .catch((error) => {
                if (error) {
                    test_utils.verify('rejects_an_invalid_input_sequence_for_subtraction', {input: inputs, error: error});
                }
            });
    });

    it ('Rejects an invalid input sequence for multiplication', () => {
        let inputs = ['1','*'];
        return rpn.process(inputs)
            .then(() => {
                assert.fail();
            })
            .catch((error) => {
                if (error) {
                    test_utils.verify('rejects_an_invalid_input_sequence_for_multiplication', {input: inputs, error: error});
                }
            });
    });

    it ('Rejects an invalid input sequence for division', () => {
        let inputs = ['1','/'];
        return rpn.process(inputs)
            .then(() => {
                assert.fail();
            })
            .catch((error) => {
                if (error) {
                    test_utils.verify('rejects_an_invalid_input_sequence_for_division', {input: inputs, error: error});
                }
            });
    });

    it ('Handles a divide by zero', () => {
        let inputs = ['1', '0', '/'];
        return rpn.process(inputs)
            .then((result) => {
                test_utils.verify('handles_a_divide_by_zero', {input: inputs, result: result});
            });
    });

    it ('Handles a negative divide by zero', () => {
        let inputs = ['-1', '0', '/'];
        return rpn.process(inputs)
            .then((result) => {
                test_utils.verify('handles_a_negative_divide_by_zero', {input: inputs, result: result});
            });
    });

    it ('Handles an infinity as input', () => {
        let inputs = ['Infinity', '-1', '*'];
        return rpn.process(inputs)
            .then((result) => {
                test_utils.verify('handles_an_infinity_as_input', {input: inputs, result: result});
            });
    });

    it ('Handles a negative infinity as input', () => {
        let inputs = ['-Infinity', '-1', '*'];
        return rpn.process(inputs)
            .then((result) => {
                test_utils.verify('handles_a_negative_infinity_as_input', {input: inputs, result: result});
            });
    });

    it ('Handles a NaN as input', () => {
        let inputs = ['NaN', '1', '+'];
        return rpn.process(inputs)
            .then((result) => {
                test_utils.verify('handles_a_nan_as_input', {input: inputs, result: result});
            });
    });
});