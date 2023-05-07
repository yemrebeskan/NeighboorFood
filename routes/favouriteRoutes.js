const express = require('express')
const authController = require('./../controllers/authController')
const favouriteController = require('./../controllers/favouriteController')
const router = express.Router()

router
  .route('/:id')
  .get(/*authController.protect,*/ favouriteController.getFavouriteChefsById)

router
  .route('/:id/:chefId')
  .put(/*authController.protect,*/ favouriteController.addFavouriteChef)
  .delete(/*authController.protect,*/ favouriteController.deleteFavouriteChef)

module.exports = router
