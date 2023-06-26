const express = require('express')
const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')
const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.route('/').get(userController.getAllUsers)

router.route('/:id').get(userController.getUserById)

router
  .route('/cart')
  .put(userController.addToCart)
  .delete(userController.removeFromCart)

router.route('/carts').delete(userController.clearCart)

router
  .route('/:id/rate')
  .put(/*authController.protect,*/ userController.rateChefAndComment)

router
  .route('/:id/bechef')
  .post(/*authController.protect,*/ userController.beChef)

router
  .route('/:id/chefapply')
  .put(/*authController.protect,*/ userController.chefApply)

module.exports = router
