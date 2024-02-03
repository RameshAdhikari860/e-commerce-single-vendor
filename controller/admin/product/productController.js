const Product = require("../../../model/productModel")

exports.createProduct = async (req,res)=>{
    const file = req.file
    let filePath
    if(!file){
        filePath = "https://easydrawingart.com/wp-content/uploads/2023/06/how-to-draw-one-punch-man.jpg"
        
    }else{
        filePath = req.file.filename
    }
    
    const {productName,productDescription,productPrice,productStockQty,productStatus} = req.body
    if(!productName || !productDescription || !productPrice || !productStockQty || !productStatus){
        return res.status(400).json({
            message : "provide all the product detail"
        })
    }
    // inserting product into database
    await Product.create({
        productDescription,
        productName,
        productPrice,
        productStockQty,
        productStatus,
        productImage : "http://localhost:4000/" + filePath 
    })
    res.status(200).json({
        message : "product created Successfully " 
    })
}