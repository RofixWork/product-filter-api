import status from 'http-status-codes'

/**
 * Description
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 * @returns {Response}
 */
const notFound = (request, response, next) => {
    const route = request.url || ''
    return response.status(status.NOT_FOUND).json({message: `Route '${route}' Not Found (404)`, timestamp: new Date().toISOString()});
}

export default notFound;