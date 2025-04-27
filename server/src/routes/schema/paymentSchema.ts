import { z } from 'zod';

export const postPaymentSchema = z.object({
    paymentIntentId: z.string().min(1, 'Payment intent ID is required'),
    paymentStatus: z.enum(['succeeded', 'pending', 'failed'], {
        errorMap: () => ({ message: 'Invalid payment status' }),
    }),
    paymentMethodId: z.string().min(1, 'Payment method ID is required'),
});

// Infer the TypeScript type for the schema
export type PostPayment = z.infer<typeof postPaymentSchema>;

export default postPaymentSchema;