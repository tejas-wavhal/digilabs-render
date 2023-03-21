const express = require('express');
const cors = require('cors');
const { config } = require('dotenv');

config({
  path: "./config/config.env"
})

const app = express()

//Using Middleware
app.use(express.json({ limit: '50mb' }))

app.use(express.urlencoded({
  limit: '50mb',
  extended: true
}))

app.use(cors({  //so that we can frontend and backendnwith different website
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}))

// importing and using Routes
const data = require("./routes/dashboardRoutes.js")
const otp = require("./routes/otpRoutes.js")
//data routes
app.use("/api/v1", data)

//otp routes
app.use("/api/v1", otp)

app.get('/', (req, res) => {
  res.send(`<h1>Server is working <a href=${process.env.FRONTEND_URL}>Click hear to visit Frontend</a></h1>`)
})

module.exports = app
