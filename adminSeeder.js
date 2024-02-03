const bcrypt = require("bcryptjs")
const User = require("./model/userModel")

const adminSeeder = async ()=>{
    const isAdminExists = await User.findOne({userEmail:"admin@gmail.com"})
    if(!isAdminExists){
        //seeding admin
        await User.create({
            userName : 'admin',
            userPhoneNumber : "9812121212",
            userEmail : "admin@gmail.com",
            userPassword : bcrypt.hashSync("password",6),
            role:"admin"
        })
        console.log("admin seeded successfully")
    }else{
        console.log("admin already exists")
    }
}

module.exports = adminSeeder