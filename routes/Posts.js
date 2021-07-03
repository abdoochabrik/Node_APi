const router = require("express").Router()
const Post = require("../models/Post");
const User = require("../models/User");
const { get } = require("./users");


//**************create a post *****////

router.post("/", async (req,res) => {
    const newPost = await new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

//**************delete post ******//
router.delete("/:id", async (req,res) => {
    try {
    //const user = await User.findById(req.body.userId);
    const post = await Post.findById(req.params.id);
    if(req.body.userId === post.userId){
        await post.deleteOne();
       res.status(200).json("post has been deleted")
    }
    else{
       res.status(403).json("you can delete only your posts")
    }

    } catch (error) {
        res.status(500).json(error)   
    }
    
})

//**************update post ******//
router.put("/:id", async (req,res) => {
    try {

    //const user = await User.findById(req.body.userId);
    const post = await Post.findById(req.params.id);
    if(req.body.userId === post.userId){
        await post.updateOne({$set : req.body});
       res.status(200).json("post has been updated")
    }
    else{
       res.status(403).json("you can update only your posts")
    }

    } catch (error) {
        res.status(500).json(error)   
    }
    
})

//****************like and dislike a post  ******//
router.put("/:id/like", async (req,res) => {

    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
           await post.updateOne({ $push : { likes : req.body.userId } })
           res.status(200).json("psot liked")
        }
        else {
           await post.updateOne({ $pull : { likes : req.body.userId } })
           res.status(200).json("post disliked")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})


//***************** get a post ************//
router.get("/:id", async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});


//*************get posts of users followed ******//
router.get("/friendPosts/:userId", async (req,res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId : currentUser._id});
        const  friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId : friendId });
            })
        );
        res.json(userPosts.concat(...friendPosts))
    } catch (error) {
        res.status(500).json(error);
    }
})



//*******************get user's post by username ***///
router.get("/profile/:username", async (req,res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const posts = await Post.find({ userId: user._id });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router