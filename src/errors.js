'use strict';
class RpnError {
    constructor(statusCode, message, type) {
        this.statusCode = statusCode;
        this.message = message;
        this.type = type;
    }

    static invalidInput(err) {
        return new RpnError(100, err.message, 'invalidInput');
    }
}

module.exports = RpnError;
