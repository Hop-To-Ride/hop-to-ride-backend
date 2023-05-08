const jwt=require('jsonwebtoken')
const User=require('../models/users.js')

const auth=async(req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','').trim()
        const decoded=jwt.verify(token,'htr')
        const user=await User.findOne({_id:decoded._id,'tokens.token':token})

        if(!user){
            throw new Error()
        }

        req.token=token
        req.user=user
        next()
    }catch(error){
        console.log(error);
        res.status(201).json({
            status: false,
            message: "Please authenticate",
            errors: [],
            data: {},
        });
        
    }
}

module.exports=auth