import { Response } from 'express';

interface SuccessResponseData {
    [key: string]: any;
}

export const formatSuccessResponse = (
    res: Response,
    statusCode: number,
    message: string,
    data: SuccessResponseData | null = null
): Response => {
    return res.status(statusCode).json({
        status: 'success',
        message,
        data,
    });
}
