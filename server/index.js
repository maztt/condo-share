import express from 'express'
import cors from 'cors'
import userRoutes from './src/routes/userRoutes.js'
import toolRoutes from './src/routes/toolRoutes.js'

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

app.use('/users', userRoutes)
app.use('/tools', toolRoutes)

app.listen(port)