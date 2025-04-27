export interface Deposit {
    id: number | null; // UUID or null if not yet created
    guestName: string;
    guestEmail: string;
    checkInDate: Date;
    checkOutDate: Date;
    securityDeposit: number;
}