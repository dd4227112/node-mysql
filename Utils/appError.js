class appError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode || 500;
        this.statusMessage = statusCode >= 400 && statusCode <= 499 ? 'fail' : 'error';
        this.isOperration = true
        Error.captureStackTrace(this, this.constructor) // add error and trace line on the error object
    }
}
module.exports = appError