const http = require('http');

class HttpError extends Error {
    constructor (status, message) {
        super(message);
        this.status = status;
        this.message = http.STATUS_CODES[this.status] || message;
    }

    toString() {
        return JSON.stringify({message: this.message, status: this.status});
    }
}

module.exports = {HttpError};