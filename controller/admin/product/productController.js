const Product = require("../../../model/productModel")

exports.createProduct = async (req, res) => {
   
        const file = req.file
        let filePath
        if (!file) {
            filePath = "https://easydrawingart.com/wp-content/uploads/2023/06/how-to-draw-one-punch-man.jpg"

        } else {
            filePath = req.file.filename
        }

        const { productName, productDescription, productPrice, productStockQty, productStatus } = req.body
        if (!productName || !productDescription || !productPrice || !productStockQty || !productStatus) {
            return res.status(400).json({
                message: "provide all the product detail"
            })
        }
        // inserting product into database
        await Products.create({
            productDescription,
            productName,
            productPrice,
            productStockQty,
            productStatus,
            productImage: "http://localhost:4000/" + filePath
        })
        res.status(200).json({
            message: "product created Successfully "
        })
   
}


exports.getProducts = async(req,res)=>{
  
        const products = await Product.find()
    if(products.length == 0){
        res.status(400).json({
            message : "No product found",
            products : []
        })
    }else{
        res.status(200).json({
            message : "product fetched successfully",
            products
        })
    }
   
}

exports.getProduct = async(req,res)=>{
    const {id} = req.params
    if(!id){
        return res.status(400).json({
            message : "please proveide productId"
        })
    }
    const product = await  Product.find({_id : id})
    if(product.length ===0){
        return res.status(400).json({
            message : "product not found"
        })
    }
    else{
        return res.status(200).json({
            message : "product fetched successful",
            product
        })
    }
}