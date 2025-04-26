// AppError class to standardize error handling in the application

class AppError extends Error {
    constructor(statusCode, message, details) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // Indicates if the error is operational or programming error
        this.details = details || null; // Additional error details (optional)
        Error.captureStackTrace(this, this.constructor); // Capture the stack trace for debugging
    }
};


export default AppError;