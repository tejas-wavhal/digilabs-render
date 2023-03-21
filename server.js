const app = require("./app.js");
const { connectDB } = require("./database/db.js");
const cloudinary = require("cloudinary")

connectDB()

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET
})

app.listen(process.env.PORT, () => {
  console.log(`Server is Working on Port:${process.env.PORT}`)
})