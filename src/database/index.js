import { Pool } from "pg";
require("dotenv").config()

// ==============================================
// Section: Connection pool
// ===============================================

let pool;
if (process.env.NODE_ENV == "development") {
    pool = new Pool({
        connectionString: process.env.DEV_DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        }
    })

    module.exports = {
        async query(text, params) {
            try {
                const res = await pool.query(text, params)
                console.log("Executed query", {text})
                return res
            } catch (error) {
                console.log("Error in query", {text})
                throw error
            }
        }
    }
} else {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL
    })
    module.exports = pool
}