
export const formatSuccessResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        status: 'success',
        message,
        data,
    });
}
