const express = require('express')
const chefController = require('./../controllers/chefController')
const authController = require('./../controllers/authController')

const router = express.Router()

router.route('/').get(chefController.getAllChefs)

router.route('/:id').get(chefController.getChefById)

router.route('/district/:district').get(chefController.getChefByDistrict)

router
  .route('/:id/menu')
  .get(chefController.getChefMenu)
  .put(
    authController.protect,
    authController.restrictTo('Chef', 'Admin'),
    chefController.updateChefMenu
  )

router
  .route('/district/:district/menu/:menu')
  .get(chefController.getChefAndMenuByDistrict)
module.exports = router
