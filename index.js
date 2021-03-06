const express = require("express");
const app = express()

//secure from dos attacks
const limitter = require('express-rate-limit');

app.use(
    limitter({
      windowMs: 5000,
      max: 5 ,
      message: {
          message: 'vous avez depasser le nombre de requetes autorisés',
      },
    })
)

app.use(express.json({ limit: '0.5kb' }));

//prevent nosql injection

const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize());

//prevent xss attacks
//app.use(xss());
const helmet = require("helmet");




const mongoose = require("mongoose");
const dotenv = require("dotenv");

const morgan = require("morgan");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/Posts")
const conversationRoute = require("./routes/conversations")
const messageRoute = require("./routes/messages")
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
app.use("/api/conversations", conversationRoute)
app.use("/api/messages", messageRoute)
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

app.listen(8000, () => {
    console.log("hiiii");
});