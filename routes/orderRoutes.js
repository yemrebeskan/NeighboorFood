const express = require('express')
const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')
const router = express.Router()
const orderController = require('./../controllers/orderController')

router
  .route('/createOrder/:id')
  .post(/*authController.protect,*/ orderController.makeOrder)

router
  .route('/order/:id')
  .get(/*authController.protect,*/ orderController.getAllOrdersForUser)

router
  .route('/order/:userId/:orderId/cancel')
  .delete(/*authController.protect,*/ orderController.cancelOrder)

router.route('/order/:id/accept').put(orderController.acceptOrder)

router.route('/order/:id/reject').put(orderController.rejectOrder)

router.route('/order/:id/complete').put(orderController.completeOrder)

router.route('/:chefId').get(orderController.getPendingOrders)

router.route('/:chefId/accepted').get(orderController.getAcceptedOrders)

module.exports = router
