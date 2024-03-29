const express = require('express')
const reviewController = require('./../controllers/reviewController')
const authController = require('./../controllers/authController')
const router = express.Router()

router
  .route('/makeReview/:userId/:chefId')
  .post(/*authController.protect,*/ reviewController.makeReview)

router
  .route('/makeReply/:id')
  .put(/*authController.protect,*/ reviewController.makeReply)

router
  .route('/user/:id')
  .get(/*authController.protect,*/ reviewController.getAllReviewsForChef)

module.exports = router
