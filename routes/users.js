const router = require("express").Router()

router.get("/", (req,res) => {
    res.send("user rooot")
})

module.exports = router