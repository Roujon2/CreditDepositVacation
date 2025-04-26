import express from 'express';
import Stripe from 'stripe';
import AppError from '../errors/AppError.js';
import { validateBody } from '../middleware/validation.js';
import { formatSuccessResponse } from '../utils/responseFormat.js'
import { stripeConfig } from '../../config/serverConfig.js';
import { postPaymentSchema } from './schema/paymentSchema.js';


// Simulated database for deposits ----- TODO: Replace with actual database logic
import { deposits } from './depositRoutes.js'; // Assuming deposits is exported from depositRoutes.js
const payments = [];
let paymentIdCounter = 1; // Simple counter for payment IDs

// Initialize Stripe 
const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2022-11-15',
});


const paymentRouter = express.Router();


// ------ POST /api/v1/payment/:depositId ------
paymentRouter.post('/:depositId', validateBody(postPaymentSchema), async (req, res) => {
    try {
        const depositId = parseInt(req.params.depositId, 10);
        const deposit = deposits.find(d => d.id === depositId);

        if (!deposit) {
            throw new AppError(404, 'Deposit not found. Payment cannot be processed.', { deposit_id: depositId });
        }

        // Extract data from the request body
        const { paymentIntentId, paymentStatus, paymentMethodId } = req.body;


        // Confirm detail of payment with Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        if (!paymentIntent) {
            throw new AppError(400, 'Invalid payment intent ID');
        }

        // Update deposit with payment details
        deposit.paymentIntentId = paymentIntentId;
        deposit.paymentStatus = paymentStatus;
        
        // Create a new payment object
        const newPayment = {
            id: paymentIdCounter++,
            depositId: deposit.id,
            paymentIntentId,
            paymentStatus,
            paymentMethodId,
        };

        // Simulate saving to the database
        payments.push(newPayment);

        // ---- Response ----
        return formatSuccessResponse(res, 201, 'Payment created successfully', { payment_id: newPayment.id });
        
    } catch (error) {
        // Handle Stripe errors
        throw error
    }
});


// ------ GET /api/v1/payment/:id ------
paymentRouter.get('/:id', (req, res) => {
    try {
        const paymentId = parseInt(req.params.id, 10);
        const payment = payments.find(p => p.id === paymentId);

        if (!payment) {
            throw new AppError(404, 'Payment not found');
        }

        // ---- Response ----
        return formatSuccessResponse(res, 200, 'Payment retrieved successfully', payment);
        
    } catch (error) {
        throw error
    }
});
// ------ GET /api/v1/payment ------
paymentRouter.get('/', (req, res) => {
    try {
        // ---- Response ----
        return formatSuccessResponse(res, 200, 'Payments retrieved successfully', payments);
        
    } catch (error) {
        throw error
    }
});


export default paymentRouter;