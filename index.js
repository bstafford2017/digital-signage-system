const express = require('express')
const fileupload = require('express-fileupload')
const path = require('path')

const logger = require('./logger')

const app = express()

// Middleware for logging requests
app.use(logger)

// Middleware for body parsing uploaded files
app.use(fileupload())

app.use('/img', express.static(__dirname + '/uploads'));

// Use routes for uploads
app.use('/api/upload', require('./routes/api/uploads'))

let port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))

