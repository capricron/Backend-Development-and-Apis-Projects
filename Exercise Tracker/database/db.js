const mongoose = require("mongoose");
require('dotenv').config();

exports.connect = () => {
  const uri = process.env.MONGO_URI;
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 
  };

  mongoose.connect(uri, connectionParams)
    .then(() => console.log("Database successfully connected"))
    .catch((err) => console.log(`Error connecting to the database:\n${err}`));

  return mongoose.connection;
};
