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

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src/views'))

app.use(expressLayouts)
app.set('layout', 'layouts/main')

app.use(require('./src/routes/static'))
app.use(require('./src/routes/index'))

module.exports = { app }
