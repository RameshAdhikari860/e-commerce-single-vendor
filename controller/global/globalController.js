exports.getProducts = async (req, res) => {

    const products = await Product.find()
    // .populate({
    //     path : "reviews",
    //     populate : {
    //         path : "userId",
    //         select : "userName userEmail"
    //     }
    // })
    if (products.length == 0) {
        res.status(400).json({
            message: "No product found",
            products: []
        })
    } else {
        res.status(200).json({
            message: "product fetched successfully",
            products
        })
    }

}

exports.getProduct = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({
            message: "please provide productId"
        })
    }
    const product = await Product.find({ _id: id })
    const productReviews = await Review.find({productId : id }).populate("userId")
    if (product.length === 0) {
        return res.status(400).json({
            message: "product not found",
            product : [],
            productReviews : []
        })
    }
    else {
        return res.status(200).json({
            message: "product fetched successful",
            product,
            productReviews
        })
    }
}
