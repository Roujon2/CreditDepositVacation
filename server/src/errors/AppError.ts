// AppError class to standardize error handling in the application

class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
    details?: string;

    constructor(statusCode: number, message: string, details?: string) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; 
        this.details = details;
        Error.captureStackTrace(this, this.constructor); // Capture the stack trace for debugging
    }
}

export default AppError;
