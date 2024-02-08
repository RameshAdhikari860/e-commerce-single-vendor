const { getMyReviews, deleteReview, createReview } = require("../../controller/user/review/reviewController")

const isAuthenticated = require("../../middleware/isAuthenticated")
const catchAsync = require("../../services/catchAsync")

const router = require("express").Router()


// router.route("/reviews")
router.route("/reviews").get(isAuthenticated,catchAsync(getMyReviews))
router.route("/reviews/:id").delete(isAuthenticated,catchAsync(deleteReview)).post(isAuthenticated,catchAsync(createReview))

module.exports = router