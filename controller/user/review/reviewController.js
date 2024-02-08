const Product = require("../../../model/productModel")
const Review = require("../../../model/reviewModel")


exports.createReview = async (req,res)=>{
    const userId = req.id
    const {rating,message} = req.body
    const productId = req.params.id
   
    if(!rating || !message || !productId){
        return res.status(400).json({
            message  :"please provide rating,message,proudctId"
        })
    }
    // check whether product exists
    const productExists = await Product.findById(productId)
    if(!productExists){
        return res.status(404).json({
            message : "Product with product ID not found"
        })
    }
   
    await Review.create({
        userId,
        productId,
        rating,
        message
    })
    res.status(200).json({
        message : "Review Added successfully"
    })
}


exports.getMyReviews = async(req,res)=>{
    const userId = req.user[0]._id
    const reviews = await Review.find({userId})
    if(reviews.length == 0){
        res.status(404).json({
            message :"you haven't given review to any products yet",
            reviews :[]
        })
    }else{
        res.status(200).json({
            message : "Review fetched successfully",
            reviews
        })
    }
}

exports.deleteReview = async(req,res)=>{
    const reviewId = req.params.id
    if(!reviewId){
        return res.status(404).json({
            message : "Please provide ReviewID"
        })
    }
    // check if that user created this review
    const userId = req.user[0]._id
    const review = Review.findById(reviewId)
    const ownerIdOfReview = review.userId
    if(ownerIdOfReview !== userId){
        return res.status(400).json({
            message : "You don't have permission to delete this review"
        })
    }
  
    await Review.findByIdAndDelete(reviewId)
    res.status(200).json({
        message : "review deleted"
    })
}

// exports.addProductReview = async(req,res)=>{
//     const productId = req.params.id
//     const userId = req.user[0]._id
//     const{rating,message} = req.body
//     const review = {
//         userId,
//         rating,
//         message
//     }
//     const product = await Product.findById(productId).populate("user")
//     product.reviews.push(review)
//     await product.save()
//     res.json({
//         message : "Review done"
//     })
// }