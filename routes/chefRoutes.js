const express = require('express')
const chefController = require('./../controllers/chefController')
const authController = require('./../controllers/authController')

const router = express.Router()

router.route('/:location').get(chefController.getAllChefs)

router
  .route('/:id')
  .get(chefController.getChefById)
  .delete(/*authController.protect,*/ chefController.cancelChef)

router.route('/district/:district').get(chefController.getChefByDistrict)

router
  .route('/:id/menu')
  .get(chefController.getChefMenu)
  .put(/*authController.protect, */ chefController.addFoodToMenu)

router
  .route('/:id/:foodId')
  .delete(/*authController.protect,*/ chefController.removeFoodFromMenu)

router
  .route('/:id/thumbnail')
  .put(/*authController.protect,*/ chefController.changeThumbnail)
  .delete(/*authController.protect,*/ chefController.removeThumbnail)

module.exports = router
