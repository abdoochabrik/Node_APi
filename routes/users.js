const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")

//*****************update user*******************//
router.put("/:id", async (req,res) => {
    if (req.body.userId === req.params.id){

        if(req.body.password) {
        try {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (error) {
            return res.status(500).json(error)
        }}

        try {
            const user = await User.findByIdAndUpdate(req.params.id, {$set:req.body, });
            res.status(200).json("account updated")
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    else {
        return res.status(403).json("you can update inly your account")
    }
})


//*****************delete user*******************//

router.delete("/:id", async (req,res) => {

    if (req.body.userId === req.params.id){
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("account deleted")
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    else {
        return res.status(403).json("you can delete inly your account")
    }
})



module.exports = router