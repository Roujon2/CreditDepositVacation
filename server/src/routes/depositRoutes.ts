import express, { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';
import { validateBody } from '../middleware/validation';
import { postDepositSchema } from './schema/depositSchema';
import { formatSuccessResponse } from '../utils/responseFormat';
import { Deposit } from '../types/deposit';


// Initialize the router
const depositRouter = express.Router();

// Simulate database for now ----- TODO: Replace with actual database logic
const deposits: Deposit[] = [];
let depositIdCounter = 1; // Simple counter for deposit IDs

// ------ POST /api/v1/deposit ------
depositRouter.post('/', validateBody(postDepositSchema), (req: Request, res: Response) => {
    try {
        // Extract data from the request body
        const { guestName, guestEmail, checkInDate, checkOutDate, securityDeposit } = req.body;

        // Validate check-in and check-out dates
        const today = new Date();
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        
        if (checkIn >= checkOut) {
            throw new AppError(400, 'Check-out date must be after check-in date');
        }

        if (checkIn < today) {
            throw new AppError(400, 'Check-in date must be today or in the future');
        }

        // If the checkin date is less than 3 days from today (including today), throw an error
        const threeDaysFromNow = new Date(today);
        threeDaysFromNow.setDate(today.getDate() + 2);
        if (checkIn < threeDaysFromNow) {
            throw new AppError(400, 'Check-in date must be at least 3 days from today');
        }

        // Create a new deposit object
        const newDeposit: Deposit = {
            id: depositIdCounter++,
            guestName,
            guestEmail,
            checkInDate,
            checkOutDate,
            securityDeposit
        };

        // Simulate saving to the database
        deposits.push(newDeposit);

        // ---- Response ----
        formatSuccessResponse(res, 201, 'Deposit created successfully', { deposit_id: newDeposit.id });

    } catch (error) {
        throw error;
    }
});

// ------ GET /api/v1/deposit/:id ------
depositRouter.get('/:id', (req: Request, res: Response) => {
    try {
        const depositId = parseInt(req.params.id, 10);
        const deposit = deposits.find(d => d.id === depositId);

        if (!deposit) {
            throw new AppError(404, 'Deposit not found');
        }

        // ---- Response ----
        formatSuccessResponse(res, 200, 'Deposit retrieved successfully', deposit);

    } catch (error) {
        throw error;
    }
});

// ------ GET /api/v1/deposit ------
depositRouter.get('/', (req: Request, res: Response) => {
    try {
        // ---- Response ----
        formatSuccessResponse(res, 200, 'Deposits retrieved successfully', deposits);

    } catch (error) {
        throw error;
    }
});

export default depositRouter;
export { deposits }; // Export the deposits array for testing purposes
