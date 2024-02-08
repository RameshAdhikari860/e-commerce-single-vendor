const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    userEmail:{
        type: String,
        required :[true,"userEmail is required"]
    },
    userPhoneNumber :{
        type : Number,
        required:[true,"userNumber is required"]
    },
    userPassword:{
        type: String,
        required:[true,"userPassword"],
        // select : false
    },
    userName :{
        type : String,
        required :[true, "userName is required"]
    },
    role:{
        type : String,
        enum : ["customer","admin"],
        default : "customer",
        
    },
    otp :{
        type :String,
        select : false
    },
    isOtpVerified : {
        type :Boolean,
        default : false,
        select : false
    }
})

const User = mongoose.model("User",userSchema)
module.exports = User