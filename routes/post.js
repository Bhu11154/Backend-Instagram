const router = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')

//creating a post
router.post('/',async (req,res)=>{
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    }catch(err){
        res.status(500).json(err)
    }
})

//fetching all posts
router.get('/',async (req,res)=>{
    try{
        const allPosts = await Post.find();
        res.status(200).json(allPosts)
    }catch(err){
        res.status(500).json(err)
    }
})

//fetching a particular post
router.get('/:username',async (req,res)=>{
    try{
        const Allposts = await Post.find({ username: req.params.username}).exec();
        res.status(200).json(Allposts)
    }catch(err){
        res.status(500).json(err)
    }
})

//Adding a friend to a given id
router.put("/friend/:id", async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        await user.updateOne({$push : {friends: req.body.username}})
        res.status(200).json("Added a friend");
    }catch(err){
        res.status(500).json(err);
    }
})

// getting all posts of friends of a given userId
router.get("/getFriendsPost/:id", async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const Friends = await user.friends;
        Friends.forEach(async (Friend)=>{
                try{
                    const Allposts = await Post.find({ username: `${Friend}`}).exec();
                    console.log(Allposts);
                }catch(err){
                    res.send(500).json(err);
                }
        })
        res.status(200).json("Done!");
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router
