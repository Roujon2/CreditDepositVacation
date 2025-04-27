import { Request, Response, NextFunction } from 'express';
import AppError from './AppError';

// Error handler for not found routes
export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
    const error = new AppError(
        404,
        'Route not found',
        `The requested URL ${req.originalUrl} was not found on this server.`
    );
    error.isOperational = true; // Mark the error as operational
    next(error); // Pass the error to the next middleware (error handler)
};

// Global error handler for the application
export const errorHandler = (
    err: any, 
    req: Request, 
    res: Response, 
    next: NextFunction
): any => {
    console.error('Error occurred:', err); // Log the error for debugging

    // Check if the error is an instance of AppError
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            details: err.details || null, // Include additional error details if available
        });
    }

    // Handle other types of errors (e.g., programming errors)
    return res.status(500).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
    });
};
