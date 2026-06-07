const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hackable_web'

app.use(cors())
app.use(express.json())

const authRouter = require('./routes/auth')
app.use('/api/auth', authRouter)

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Server is running and connected to Express.' })
})

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Unable to connect to MongoDB:', error)
    process.exit(1)
  })
