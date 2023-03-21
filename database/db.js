const mongoose = require('mongoose');

exports.connectDB = async () => {
  try {
    const { connection } = await mongoose.set('strictQuery', true).connect(process.env.MONGO_URI, { useNewUrlParser: true })
    console.log(`🟢MongoDB connected with ${connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}


