import express, { Express } from 'express'
import cors from 'cors'
import userRoutes from './src/routes/userRoutes'
import toolRoutes from './src/routes/toolRoutes'

const app: Express = express()
const port: number = 5000

app.use(express.json())
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}))
app.use(express.static('public'))

app.use('/users', userRoutes)
app.use('/tools', toolRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})