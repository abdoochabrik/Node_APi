const express = require("express");
const app = express()

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const bodyParser = require("body-parser")
dotenv.config()

app.use(express.json())
app.use(helmet())
app.use(bodyParser.json());
app.use(morgan("common"))
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)

const db = require('./config/keys').mongoURI;

mongoose.connect(db)
        .then(() => console.log("conected to mongo"))
        .catch(err => console.log(err));   

app.get("/", (req,res) => {
    res.send("welcome to home page")
})

app.listen(8800, () => {
    console.log("hiiii");
});