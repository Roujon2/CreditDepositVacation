// Initial deposit form entity
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Deposit {
    @PrimaryKey()
    id!: string; // UUID

    @Property()
    guestName!: string;

    @Property()
    guestEmail!: string;
  
    @Property()
    checkInDate!: Date;
  
    @Property()
    checkOutDate!: Date;
  
    @Property()
    securityDeposit!: number; 

    @Property()
    paymentIntendId!: string; // Stripe payment intent ID

    @Property()
    paymentStatus!: string; // e.g., 'pending', 'completed', 'failed'
  
    @Property({ onCreate: () => new Date() })
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();
}

