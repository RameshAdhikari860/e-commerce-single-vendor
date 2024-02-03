const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../model/userModel')
const otpGenerator = require('otp-generator')
const sendEmail = require('../../services/sendEmail')

exports.registerUser = async(req,res)=>{
    const {email,password,phoneNumber,username} = req.body
    if(!email || !password || !phoneNumber || !username){
        return res.status(400).json({
            message :"please provide email,password,phoneNumber"
        })
    }
    // Check if user already exists
    const userFound = await User.find({userEmail: email})
    if(userFound.length > 0){
        return res.status(400).json({
            message : "user already registered"
        })
    }
    await User.create({
        userName : username,
        userPhoneNumber : phoneNumber,
        userEmail : email,
        userPassword : bcrypt.hashSync(password,6)
    })
    res.status(201).json({
        message : "Successfully registerd"
    })
}

exports.loginUser = async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).json({
            message :"provide email, password"
        })
    }
    const userFound = await User.find({userEmail : email})
    if(userFound.length == 0 ){
        return res.status(404).json({
            message : "user Not found"
        })
    }
    // password compare
    const isMatched = bcrypt.compareSync(password,userFound[0].userPassword)
    if(isMatched){
        // generate token  
        const token = jwt.sign({id : userFound[0]._id},process.env.SECRET_KEY,{expiresIn:'10d'})
        res.status(200).json({
            message : "user logged in successfully",
            token : token
        })
    }else{
        res.status(404).json({
            message : "Invalid Password"
        })
    }
}

exports.forgotPassword = async(req,res)=>{
    const {email} = req.body
    if(!email){
        return res.status(400).json({
            message : "Please provide Email"
        })
    }
    const userExist = await User.find({userEmail : email})
    if(userExist.length === 0){
        return res.status(400).json({
            message : "User doesn't Exists"
        })
    }
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false })
    userExist[0].otp = otp
    userExist[0].save()
    await sendEmail({
        email : email,
        subject : "Reset code",
        message :`this is otp ${otp} .` 
        
    })
    res.json({
        message : "otp sent successfully"
    })

}


exports.verifyOtp = async (req,res)=>{
    const {email,otp} = req.body
    if(!email || !otp){
        return res.status(400).json({
            message: "please provide otp and email"
        })
    }
    const userExists = await User.find({userEmail: email})
    if(userExists.length === 0 ){
        return res.status(400).json({
            message :"User Not Found"
        })
    }
    if(userExists[0].otp !== otp){
        return res.status(400).json({
            message :"Invalid OTP"
        })
    }
    userExists[0].otp = undefined
    userExists[0].isOtpVerified = true 
    userExists[0].save()
    res.status(200).json({
        message : "OTP Matched"
    })

}

exports.resetPassword = async (req,res)=>{
    const{email,newPassword,confirmPassword} = req.body
    if (!email || !newPassword ||!confirmPassword) {
        return res.status(400).json({
            message : "provide and confirm password"
        })
    }
    if(newPassword !== confirmPassword){
        return res.status(400).json({
            message : "not matched new password"
        })
    }
    const userExist = await User.find({userEmail : email})
    if(userExist.length === 0 ){
        return res.status(404).json({
            message : "user not found"
        })
    }
    if(!userExist[0].isOtpVerified){
        return res.status(400).json({
            message :"thsi action is not allowed"
        })
    }
    userExist[0].userPassword = bcrypt.hashSync(newPassword,8)
    userExist[0].isOtpverified = false
    userExist[0].save()
    res.status(200).json({
        message : "password reset success"
    })
}