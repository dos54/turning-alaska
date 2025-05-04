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
  res.render('error', { title: 'There was an error' })
}

module.exports = { errorHandler }
