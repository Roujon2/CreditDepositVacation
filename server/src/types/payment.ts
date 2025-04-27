export interface Payment {
    id: number | null; // UUID or null if not yet created
    depositId: number; // ID of the deposit associated with this payment    
    paymentIntentId: string; // Stripe payment intent ID
    paymentStatus: 'succeeded' | 'pending' | 'failed'; // e.g., 'succeeded', 'pending', 'failed'
    paymentMethodId: string; // Stripe payment method ID
}