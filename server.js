const { app } = require('./app')
const pool = require('./src/database/pool')
const port = process.env.PORT  || 3000

const db = require('./src/database/pool')


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
