const express = require('express')
const authController = require('./../controllers/authController')
const settingsController = require('./../controllers/settingsController')
const router = express.Router()

router
  .route('/:id')
  .put(authController.protect, settingsController.updateUser)
  .delete(authController.protect, settingsController.deleteUser)

router
  .route('/:id/password')
  .put(authController.protect, settingsController.updatePassword)

module.exports = router
