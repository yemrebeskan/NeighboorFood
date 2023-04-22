const express = require('express')
const reviewController = require('./../controllers/reviewController')
const authController = require('./../controllers/authController')
const router = express.Router()

router.route('/').post(/*authController.protect*/ reviewController.makeReview)

router
  .route('/:id')
  .get(reviewController.getAllReviewsById)
  .patch(/*authController.protect*/ reviewController.updateReview)
  .delete(/*authController.protect*/ reviewController.deleteReview)

router.route('/user/:id').get(reviewController.getAllReviewsForUser)

module.exports = router
