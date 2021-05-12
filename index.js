const express = require("express");
const app = express()

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")

dotenv.config()
mongoose.connect(process.env.mongo_url, { UseNewUrlParser : true, useUnifiedTopology: true}, () => {
    console.log("conected to mongo")
})

app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)

app.get("/", (req,res) => {
    res.send("welcome to home page")
})

app.listen(8800, () => {
    console.log("hiiii");
});