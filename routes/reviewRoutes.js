const express = require('express')
const reviewController = require('./../controllers/reviewController')
const authController = require('./../controllers/authController')
const router = express.Router()

router
  .route('/makeReview')
  .post(/*authController.protect,*/ reviewController.makeReview)

router
  .route('/review/:id')
  .get(reviewController.getAllReviewsById)
  .put(/*authController.protect,*/ reviewController.updateReview)
  .delete(/*authController.protect,*/ reviewController.deleteReview)

router
  .route('/user/:id')
  .get(/*authController.protect,*/ reviewController.getAllReviewsForUser)

module.exports = router
