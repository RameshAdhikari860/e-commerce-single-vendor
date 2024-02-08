const User = require("../../../model/userModel")


exports.getUsers = async(req,res)=>{
    const currentUser = req.user
    // console.log(hulk[0]._id)
    const users = await User.find({_id : {$ne:currentUser[0]._id}}).select(["+otp","+isOtpVerified","-__v"])
    if(users.length > 1){
        res.status(200).json({
            message : "Users fetched successfully",
            data : users
        })
    }else{
        res.status(404).json({
            message : "user collection is empty",
            data : []
        })
    }
}


exports.deleteUser = async(req,res)=>{
    const userId = req.params.id
    console.log(userId)
    if(!userId){
        return res.status(400).json({
            message : "please provide userId"
        })
    }
    const user = await User.findById(userId)
    if(!user){
        return res.status(404).json({
            message : "user not found"
        })
    }else{
        await User.findByIdAndDelete(userId)
        res.status(200).json({
            message  : "User successfully deleted"
        })
    }
}