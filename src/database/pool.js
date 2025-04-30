const { Pool } = require('pg')
require('dotenv').config()

const isDev = process.env.NODE_ENV === 'development'

const pool = new Pool({
  connectionString: isDev
    ? process.env.DEV_DATABASE_URL
    : process.env.DATABASE_URL,
  ssl: isDev ? { rejectUnauthorized: false } : undefined,
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
