const express = require('express')
const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')
const router = express.Router()
const orderController = require('./../controllers/orderController')

router
  .route('/createOrder')
  .post(authController.protect, orderController.makeOrder)

router
  .route('/order/:id')
  .get(authController.protect, orderController.getAllOrdersForUser)

router
  .route('/order/:id/cancel')
  .delete(authController.protect, orderController.cancelOrder)

module.exports = router
