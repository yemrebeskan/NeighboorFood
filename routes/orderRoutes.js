const express = require('express')
const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')
const router = express.Router()
const orderController = require('./../controllers/orderController')

router
  .post('/createOrder', authController.protect, orderController.makeOrder)
  .get(
    '/order/:id',
    authController.protect,
    orderController.getAllOrdersForUser
  )

module.exports = router
