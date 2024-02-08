const Product = require("../../../model/productModel")
const fs = require("fs")

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
    await Product.create({
        productDescription,
        productName,
        productPrice,
        productStockQty,
        productStatus,
        productImage: process.env.BACKEND_URL + filePath
    })
    res.status(200).json({
        message: "product created Successfully "
    })

}




exports.deleteProduct = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({
            message: "please provide id"
        })
    }
    const oldData = await Product.findById(id)
    if (!oldData) {
        return res.status(404).json({
            message: "No data found "
        })
    }
   
   
    const oldProductImage = oldData.productImage
    const lengthToCut = process.env.BACKEND_URL.length
    const finalFilePathAfterCut = oldProductImage.slice(lengthToCut)
    if (req.file && req.file.filename) {
        fs.unlink("uploads/" + finalFilePathAfterCut, (err) => {
            if (err) {
                console.log("error in deleting file", err)
            } else {
                console.log("Successfully deleted file")
            }
        })
    }
    await Product.findByIdAndDelete(id)
    res.status(200).json({
        message: "product delete successful"
    })
}

exports.editProduct = async (req, res) => {

    const { id } = req.params
    const { productName, productDescription, productPrice, productStockQty, productStatus } = req.body
    if (!productName || !productDescription || !productPrice || !productStockQty || !productStatus) {
        return res.status(400).json({
            message: "provide all the product detail"
        })
    }
    const oldData = await Product.findById(id)
    if (!oldData) {
        return res.status(404).json({
            message: "No data found "
        })
    }
   
   
    const oldProductImage = oldData.productImage
    const lengthToCut = process.env.BACKEND_URL.length
    const finalFilePathAfterCut = oldProductImage.slice(lengthToCut)
    if (req.file && req.file.filename) {
        fs.unlink("uploads/" + finalFilePathAfterCut, (err) => {
            if (err) {
                console.log("error in deleting file", err)
            } else {
                console.log("Successfully deleted file")
            }
        })
    }
    const datas = await Product.findByIdAndUpdate(id, {
        productDescription,
        productName,
        productPrice,
        productStockQty,
        productStatus,
        productImage: req.file && req.file.filename ?  process.env.BACKEND_URL + req.file.filename :  oldProductImage
    },{
        new : true
    })
    res.status(200).json({
        message : "success",
        datas
    })
}