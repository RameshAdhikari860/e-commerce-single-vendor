const User = require("../../../model/userModel")


exports.getUsers = async(req,res)=>{
    const users = await User.find().select(["+otp","+isOtpVerified","-__v"])
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