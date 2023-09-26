const mongoose = require("mongoose");
const winston = require('winston');

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      winston.info(`MongoDB Database connected with HOST: ${con.connection.host}`);
    })
    .catch((err) => {
      winston.error(`Failed to connect to MongoDB: ${err.message}`);
      process.exit(1);
    });
};

module.exports = connectDatabase;