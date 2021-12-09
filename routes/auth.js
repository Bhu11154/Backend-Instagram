const router = require('express').Router()
const User = require('../models/User')

router.post('/register', async (req,res)=>{
    try{
        const newUser = new User({
            username: req.body.username,
            friends: req.body.friends,
        });
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;
