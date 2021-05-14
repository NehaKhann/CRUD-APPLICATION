const express = require("express");
const path = require("path");


const app = express();
const hbs = require("hbs");

//SINCE PORT 80 ALSO RUNS BY SIMPLY TYPING  "localhost:"
const port = process.env.PORT || 80;




require("./db/conn")
require("dotenv").config()

const employeeRouter = require("./router/employee")
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.use(express.static(static_path));
app.use(express.urlencoded({extended: false})); // getting data from form
app.use(employeeRouter)
 app.listen(port, () => {
    console.log(`listening to the port no at ${port}`);
});
