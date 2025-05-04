const adminEmails = process.env.ADMIN_EMAILS.split(',').map((email) =>
  email.trim()
)

function requiresAdmin(req, res, next) {
  if (!req.oidc.isAuthenticated())
    return res.redirect(`/login?returnTo=${req.originalUrl}`)
  const email = req.oidc.user?.email
  if (adminEmails.includes(email)) return next()
  next({ status: 403, message: 'Access denied' })
}

module.exports = { requiresAdmin }
