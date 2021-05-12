const router = require("express").Router()

router.get("/", (req,res) => {
    res.send("auth rooot")
})

module.exports = router