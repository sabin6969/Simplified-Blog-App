class ErrorResponse extends Error {

    /**
     * 
     * @param {number} statusCode
     * @param {string} message 
     * @param {object} stackTrace
     * 
     */
    constructor(statusCode, message, stackTrace) {
        super();
        if (!stackTrace) {
            Error.captureStackTrace(this); /// capturing the stack trace for debugging
        }
        else {
            this.stack = stackTrace;
        }
        this.statusCode = statusCode;
        this.message = message;
        this.sucess = false;
    }
}

export default ErrorResponse;