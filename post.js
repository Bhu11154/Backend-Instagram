const router = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')

//create a post
router.post('/',async (req,res)=>{
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)

    }catch(err){
        res.status(500).json(err)
    }
})

//getting all posts
router.get('/',async (req,res)=>{
    try{
        const allPosts = await Post.find();
        res.status(200).json(allPosts)

    }catch(err){
        res.status(500).json(err)
    }
})

//getting a particular post
router.get('/:username',async (req,res)=>{
    try{
        const Allposts = await Post.find({ username: req.params.username}).exec();
        res.status(200).json(Allposts)

    }catch(err){
        res.status(500).json(err)
    }
})

//Adding a friend with an id
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

//deleting a post
// router.delete('/:id', async (req,res) => {
//     const id= req.params.id;
//     try{
//         await Post.findByIdAndRemove(id).exec();
//         res.send("Deleted Successfully")
//     }catch(err){
//         console.log(err)
//     }
// }) 

//editing a post
// router.put('/:id', async(req,res)=>{
//     try{
//         const post = await Post.findById(req.params.id);
//         await post.updateOne({$set: req.body});
//         res.status(200).json("Post has been updated")
//     }catch(err){
//         res.status(500).json(err)
//     }
// })

//like a post
// router.put("/like/:id", async (req,res)=>{
//     try{
//         const post = await Post.findById(req.params.id);
//         if(!post.likes.includes(req.body.username)){
//             await post.updateOne({ $push : {likes: req.body.username}})
//             res.status(200).json("The post has been liked :)")
//         }else{
//             await post.updateOne({ $pull: {likes:req.body.username}})
//             res.status(200).json("The post has been disliked :)")
//         }
//     }catch(err){
//         res.status(500).json(err)
//     }
// })

//dislike a post
// router.put("/dislike/:id", async (req,res)=>{
//     try{
//         const post = await Post.findById(req.params.id);
//         if(!post.dislikes.includes(req.body.username)){
//             await post.updateOne({ $push : {dislikes: req.body.username}})
//             res.status(200).json("The post has been disliked :)")
//         }else{
//             await post.updateOne({ $pull: {dislikes:req.body.username}})
//             res.status(200).json("The post has been liked :)")
//         }
//     }catch(err){
//         res.status(500).json(err)
//     }
// })

module.exports = router