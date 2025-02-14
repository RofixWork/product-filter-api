
import status from 'http-status-codes'
/**
 * Error Hanlder Middleware
 * @param {Error} error
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 * @returns {import("express").Response}
 */
const errorHandler = (error, request, response, next) => {
    if(error instanceof Error) {
        return response.status(error.status || 500).json({message: error.message, timestamp: new Date().toISOString()});
    }
    return response.status(status.INTERNAL_SERVER_ERROR).json({message: "Something went weong...", timestamp: new Date().toISOString()});
}
export default errorHandler