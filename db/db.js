require("dotenv").config();
const mongoose = require("mongoose");

const db =
  "mongodb+srv://hoptoride:" +
  process.env.MONGO_PASS +
  "@htr.6gjyokp.mongodb.net/" +
  process.env.MONGO_DB +
  "?retryWrites=true&w=majority";
// const db = process.env.URI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log("Connection failed: ", err.message);
  });
