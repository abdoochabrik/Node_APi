const express = require("express");
const app = express()

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const bodyParser = require("body-parser")
dotenv.config()
const path = require("path")
app.use(express.json())
app.use(helmet())
app.use(bodyParser.json());
const multer = require("multer"); 
app.use(morgan("common"))
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)
app.use("/images", express.static(path.join(__dirname, "public/images")))
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const upload =multer({storage});
app.post("/api/upload", upload.single("file"), (req,res) => {
    try {
        return res.status(200).json("file uploaded")
    } catch (error) {
        console.log(error)
    }
})

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