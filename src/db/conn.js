require("dotenv").config()
const mongoose = require("mongoose");

  //database connection

  mongoose.connect("mongodb://localhost:27017/CRUD-APPLICATION", {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      
    })
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log(error);
    });

