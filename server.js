require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const router = require('./router')
const corsMiddleware = require('./middlewares/corsMiddleware')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

app.use(corsMiddleware)

app.use('/', router)

app.listen(process.env.PORT || 3000, () => console.log('Server Started'))