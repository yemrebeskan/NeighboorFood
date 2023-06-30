const express = require('express')
const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')
const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.route('/').get(userController.getAllUsers)

router.route('/:id').get(userController.getUserById)

router.route('/cart').put(userController.addToCart)

router.route('/:userId/cart/:foodId').delete(userController.removeFromCart)

router.route('/:id/cart').get(userController.getCart)

router.route('/carts').delete(userController.clearCart)

router
  .route('/:id/rate')
  .put(/*authController.protect,*/ userController.rateChefAndComment)

router
  .route('/:id/chefapply')
  .put(/*authController.protect,*/ userController.chefApply)

router.route('/:id/pastorders').get(userController.getPastOrders)

module.exports = router
