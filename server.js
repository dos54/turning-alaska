/*===============================================
File: server.js
Author: Steven Thomas
Date: February 22, 2025
Purpose: The main server file
===============================================*/

// ==============================================
// Section: Require statements
// ===============================================
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
const env = require("dotenv").config()
const app = express()
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const staticRoutes = require("./src/routes/static")

import utilities from "./src/utilities"
const session = require("express-session")
const pool = require("./src/database")

