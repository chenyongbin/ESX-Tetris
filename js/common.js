define([], function () {
    'use strict';

    function ArgsError(message) {
        this.message = message || "The arguments cannot be empty.";
        this.name = "ArgsError";
    }
    ArgsError.prototype = new Error();
    ArgsError.prototype.constructor = ArgsError;

    function DepencyError(message) {
        this.message = message || "The denpencies cannot be null.";
        this.name = "DepencyError";
    }
    DepencyError.prototype = new Error();
    DepencyError.prototype.constructor = DepencyError;

    return {
        ArgsError,
        DepencyError
    }
});