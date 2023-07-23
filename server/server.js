require('dotenv').config()
const https = require('https')
const fs = require('fs')
const express = require('express')
const cookieParser = require ('cookie-parser')
const cors = require('cors')
const UserRoutes = require('./routes/user.routes')
const app = express()

// * Middleware
app.use(
  express.json(),
  express.urlencoded({extended: true}),
  cors(
    {credentials: true, origin: 'https://localhost:3000'}
  ),
  cookieParser()
)

UserRoutes(app)

https
    .createServer({
      key: fs.readFileSync("rootCA-key.pem"),
      cert: fs.readFileSync("rootCA.pem")
    }, app)
      .listen(8000, () => console.log("HTTPS Express server now running on port 8000"))