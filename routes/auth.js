const router = require("express").Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

router.post("/register", async (req,res) => {
    

    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }




    });
    
    //***********LOGIN ********/

router.post("/login", async (req,res) => {




    try {
        const { username, password } = req.body
        const user = await User.findByCredentials(username, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
    })
   

module.exports = router;