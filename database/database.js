require('dotenv').config();
const { mongoose } = require("mongoose");
const User = require('../model/userModel');
const bcrypt = require("bcryptjs");
const adminSeeder = require('../adminSeeder');

const URI = process.env.URI



exports.databaseConnection = async ()=>{
    await mongoose.connect(URI);
   
    console.log("database connected successfully")
    adminSeeder()
    

   
}