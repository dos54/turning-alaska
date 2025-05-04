/*===============================================
File: server.js
Author: Steven Thomas
Date: February 22, 2025
Purpose: The main server file
===============================================*/

// ==============================================
// Section: Require statements
// ===============================================
require('dotenv').config()
const app = require('express')()
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const { auth } = require('express-openid-connect')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src/views'))

app.use(expressLayouts)
app.set('layout', 'layouts/main')

const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH_CLIENT_ID,
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
}

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(authConfig))

app.use(require('./src/routes/static'))
app.use(require('./src/routes/index'))

app.use(require('./src/middleware/errorHandler').errorHandler)

module.exports = { app }
