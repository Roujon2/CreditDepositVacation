import { z } from 'zod';


export const postDepositSchema = z.object({
    guestName: z.string().min(1, 'Guest name is required'),
    guestEmail: z.string().email('Invalid email address'),
    checkInDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid check-in date: must be of format YYYY-MM-DD',
    }),
    checkOutDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid check-out date: must be of format YYYY-MM-DD',
    }),
    securityDeposit: z.number().positive('Security deposit must be a positive number'),
});


export default postDepositSchema;