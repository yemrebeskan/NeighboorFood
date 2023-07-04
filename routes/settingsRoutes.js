const express = require('express')
const authController = require('./../controllers/authController')
const settingsController = require('./../controllers/settingsController')
const router = express.Router()

router
  .route('/:id')
  .put(/*authController.protect,*/ settingsController.updateUser)
  .delete(/*authController.protect,*/ settingsController.deleteUser)

router
  .route('/:id/password')
  .put(/*authController.protect,*/ settingsController.updatePassword)

router
  .route('/:id/image')
  .get(/*authController.protect,*/ settingsController.getImage)
  .put(/*authController.protect,*/ settingsController.changeImage)
  .delete(/*authController.protect,*/ settingsController.removeImage)

router
  .route('/:id/adress')
  .put(/*authController.protect,*/ settingsController.updateAdress)

module.exports = router
