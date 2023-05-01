const express = require('express')
const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')
const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.route('/').get(userController.getAllUsers)

router.route('/:id').get(userController.getUserById)

router
  .route('/:id/rate')
  .put(authController.protect, userController.rateChefAndComment)

router.route('/:id/bechef').put(authController.protect, userController.beChef)

module.exports = router
