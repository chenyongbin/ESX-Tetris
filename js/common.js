define([], function () {
    'use strict';

    function ArgsError(message) {
        this.message = message || "The arguments cannot be empty.";
        this.name = "ArgsError";
    }
    ArgsError.prototype = new Error();
    ArgsError.prototype.constructor = ArgsError;

    return {
        ArgsError
    }
});