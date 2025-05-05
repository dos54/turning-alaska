/**
 * Global error-handling middleware for Express
 *
 * @param {Error} err - The error object
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next function (required for middleware signature)
 */
// eslint-disable-next-line
function errorHandler(err, req, res, next) {
  const status = err.status || 500
  const message = err.message || 'Internal Server Error'
  res.render('error', { title: 'There was an error', status, message })
}

module.exports = { errorHandler }
