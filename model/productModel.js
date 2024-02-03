const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
    productName :{
        type : String,
        requried : [true,"productName must be provided"]
    },
    productDescription:{
        type : String,
        required: [true,"productDescription required"]
    },
    productStockQty :{
        type :Number,
        required : [true,"qty is requried"]
    },
    productPrice :{
        type : Number,
        required: [true,"price is required"]
    },
    productStatus :{
        type :String,
        enum : ["available","unavailable"],
        
    },
        productImage : String
    },
    {
        timestamps : true
    }
)
const Product = mongoose.model("Product",productSchema)
module.exports = Product