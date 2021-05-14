const router = require("express").Router();
const User = require("../models/User");

router.get("/register", async (req,res) => {

    //res.send("auth rooot");
    const user = await new User({
        username: "chabrik",
        email : "abdoo.chbrik@gmail.com",
        password :"chabrik00"
    })

    await user.save();
    res.send(ok);


})

module.exports = router