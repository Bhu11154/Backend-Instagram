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

//Login
// router.post('/login',async (req,res)=>{
//     try{
//         const user = await User.findOne({email: req.body.email});
//         if(!user){
//             res.status(404).json('User not found')
//         }
//         const isValid = await bcrypt.compare(req.body.password, user.password);
//         if(!isValid){
//             res.status(400).json("Incorrect Password")
//         }
//         res.status(200).json(user)
//     }catch(err){
//         res.status(500).json(err);
//     }
    
// })


// try{
    //     const salt = await bcrypt.genSalt(10);
    //     const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //     const ChashedPassword = await bcrypt.hash(req.body.confirmpassword, salt);

    //         if(hashedPassword === ChashedPassword){
    //             const newUser = new User({
    //                 username: req.body.username,
    //                 email: req.body.email,
    //                 password: hashedPassword,
    //                 confirmpassword:ChashedPassword,
    //                 mobile: req.body.mobile,
    //             });
              
    //             const user = await newUser.save()
    //             res.status(200).json(user)
    //         }
            
    // }catch(err){
    //     res.status(500).json(err)
    // }

module.exports = router