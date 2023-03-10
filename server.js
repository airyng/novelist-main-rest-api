require('dotenv').config()

const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      router = require('./router'),
      middlewares = require('./boot/middlewareManager'),
      port = process.env.PORT || 3000

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

// Setup global middlewares
if (middlewares.global) {

  Object.keys(middlewares.global).map(key => {
    app.use(middlewares.global[key])
  })
}

app.use('/', router)

app.listen(port, () => console.log('Server started on port: ' + port))