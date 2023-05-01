const express = require('express')
const chefController = require('./../controllers/chefController')
const authController = require('./../controllers/authController')

const router = express.Router()

router.route('/').get(chefController.getAllChefs)

router
  .route('/:id')
  .get(chefController.getChefById)
  .delete(chefController.cancelChef)

router.route('/district/:district').get(chefController.getChefByDistrict)

router
  .route('/:id/menu')
  .get(chefController.getChefMenu)
  .put(authController.protect, chefController.updateChefMenu)

router
  .route('/:id/thumbnail')
  .put(authController.protect, chefController.changeThumbnail)
  .delete(authController.protect, chefController.removeThumbnail)

module.exports = router
