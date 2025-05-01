const { Pool } = require('pg')
require('dotenv').config()

const isDev = process.env.NODE_ENV === 'development'

const pool = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

module.exports = {
  query: async (text, params) => {
    try {
      const res = await pool.query(text, params)
      if (isDev) console.log('Executed query', { text })
      return res
    } catch (err) {
      console.error('Query error', { text }, err)
      throw err
    }
  },
  pool,
}
