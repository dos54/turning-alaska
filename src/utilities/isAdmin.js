const adminEmails = process.env.ADMIN_EMAILS.split(',').map((email) =>
  email.trim()
)

function isAdmin(email) {
  return adminEmails.includes(email)
}

module.exports = { isAdmin }
