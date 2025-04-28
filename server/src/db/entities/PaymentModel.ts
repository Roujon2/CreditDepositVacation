// Initial payment form entity
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Payment {
    @PrimaryKey()
    id!: string; // UUID

    @Property()
    depositId!: string; // UUID

    @Property()
    paymentIntentId!: string; // Stripe payment intent ID

    @Property()
    paymentStatus!: string; // e.g., 'pending', 'completed', 'failed'

    @Property()
    paymentMethodId!: string; // Stripe payment method ID

    @Property({ onCreate: () => new Date() })
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();
    
}

export default Payment;