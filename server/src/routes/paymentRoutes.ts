import express, { Request, Response, NextFunction } from 'express';
import Stripe from 'stripe';
import AppError from '../errors/AppError';
import { validateBody } from '../middleware/validation';
import { formatSuccessResponse } from '../utils/responseFormat';
import { stripeConfig } from '../config/serverConfig';
import { postPaymentSchema } from './schema/paymentSchema';
import { Payment } from '../types/payment';

// Simulated database for deposits ----- TODO: Replace with actual database logic
import { deposits } from './depositRoutes';
import { Deposit } from '../types/deposit';

// Initialize Stripe 
const stripe = new Stripe(stripeConfig.secretKey || "", {
    apiVersion: '2025-03-31.basil',
});

const paymentRouter = express.Router();
let paymentIdCounter = 1; // Simple counter for payment IDs
const payments: Payment[] = []; // Simulating payments in memory

// ------ POST /api/v1/payment/:depositId ------
paymentRouter.post('/:depositId', validateBody(postPaymentSchema), async (req: Request, res: Response) => {
    try {
        const depositId = parseInt(req.params.depositId, 10);
        const deposit = deposits.find((d: Deposit) => d.id === depositId);

        if (!deposit) {
            throw new AppError(404, 'Deposit not found. Payment cannot be processed.', `Deposit ID: ${depositId}`);
        }

        // Extract data from the request body
        const { paymentIntentId, paymentStatus, paymentMethodId } = req.body;

        // Confirm detail of payment with Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        if (!paymentIntent) {
            throw new AppError(400, 'Invalid payment intent ID');
        }


        // Create a new payment object
        const newPayment: Payment = {
            id: paymentIdCounter++,
            depositId: depositId,
            paymentIntentId,
            paymentStatus,
            paymentMethodId,
        };

        // Simulate saving to the database
        payments.push(newPayment);

        // ---- Response ----
        formatSuccessResponse(res, 201, 'Payment created successfully', { payment_id: newPayment.id });

    } catch (error) {
        // Pass error to next middleware (for error handling)
        throw error;
    }
});

// ------ GET /api/v1/payment/:id ------
paymentRouter.get('/:id', (req: Request, res: Response) => {
    try {
        const paymentId = parseInt(req.params.id, 10);
        const payment = payments.find((p: Payment) => p.id === paymentId);

        if (!payment) {
            throw new AppError(404, 'Payment not found');
        }

        // ---- Response ----
        formatSuccessResponse(res, 200, 'Payment retrieved successfully', payment);

    } catch (error) {
        // Pass error to next middleware (for error handling)
        throw error;
    }
});

// ------ GET /api/v1/payment ------
paymentRouter.get('/', (req: Request, res: Response) => {
    try {
        // ---- Response ----
        formatSuccessResponse(res, 200, 'Payments retrieved successfully', payments);

    } catch (error) {
        // Pass error to next middleware (for error handling)
        throw error;
    }
});

export default paymentRouter;
