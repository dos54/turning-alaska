const { app } = require('./app')
const pool = require('./src/database/pool')
const port = process.env.PORT  || 3000

const db = require('./src/database/pool')

async function pingDatabase() {
  try {
    await db.pool.query('SELECT 1')
    console.log('Database connection successful')
  } catch (err) {
    console.error('Database connection failed', err)
  } finally {
    await db.pool.end()
  }
}

pingDatabase()

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
