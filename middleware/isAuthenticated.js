const jwt= require("jsonwebtoken")
const User = require("../model/userModel")
const promisify = require("util").promisify
const isAuthenticated = async (req,res,next)=>{
    const token  = req.headers.authorization
    if(!token){
        return res.status(400).json({
            message : "send token "
        })
    }
        // jwt.verify(token,process.env.SECRET_KEY,(err,success)=>{
        //     if(err){
        //         res.status(400).json({
        //             message : "Invalid token"
        //         })
        //     }else{
        //         res.status(200).json({
        //             message : "valid TOken"
        //         })
        //     }
        // })
        const decoded = await promisify(jwt.verify)(token,process.env.SECRET_KEY)
        if(!decoded){
            return res.status(403).json({
                message :"Dont try this at home"
            })
        }
        const doesUserExist = await User.find({_id :decoded.id});
        if(!doesUserExist){
            return res.status(400).json({
                message : "user not found"
            })
        }
        req.user = doesUserExist
    next();
}

module.exports = isAuthenticated
