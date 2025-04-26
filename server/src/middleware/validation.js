import { z } from 'zod';
import AppError from '../errors/AppError.js';

export const validateBody = (schema) => {
    return (req, res, next) => {
        try {
            // Validate the request body against the schema
            schema.parse(req.body);
            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            // Handle validation errors
            throw new AppError(400, 'Invalid request data', error.errors); // Custom error handling
            
        }
    };
}

