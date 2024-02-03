const restrictTo = (...roles)=>{
    return (req,res,next)=>{
        const userRole = req.user[0].role
        console.log(userRole)
        if(!roles.includes(userRole)){
            return res.status(403).json({
                message : "you dont have this permission"
            })
        }
        else{
            next()
        }
    }
}
module.exports  = restrictTo