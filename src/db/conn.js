require("dotenv").config()
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_CONN_UR, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
}).then(() => {
    console.log("Connection is successful");
}).catch((error) => {
    console.log(error);
})
