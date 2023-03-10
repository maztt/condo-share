const express = require('express')
const cors = require('cors')

const app = express()
const port = 5000

// JSON responses
app.use(express.json())

// CORS solving
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}))

// PUBLIC handler
app.use(express.static('public'))

// ROUTES
const userRoutes = require('./routes/userRoutes')
const toolRoutes = require('./routes/toolRoutes')

app.use('/users', userRoutes)
app.use('/tools', toolRoutes)

app.listen(port)