const User = require('../models/userModel')
const Chef = require('../models/chefModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getFavouriteChefsById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id)
  const favouriteChefs = user.favouriteChefs
  if (!user) {
    const id = req.params.id
    return next(new AppError(`No user found with that ${id}`, 404))
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
      favouriteChefs,
    },
  })
})

exports.addFavouriteChef = catchAsync(async (req, res, next) => {
  const { chefId } = req.params
  const chef = await Chef.findById(chefId)
  const user = await User.findById(req.user._id)
  const favouriteChefs = user.favouriteChefs

  if (favouriteChefs.includes(chefId)) {
    return next(
      new AppError('You have already added this chef to your favourites', 400)
    )
  }
  favouriteChefs.push(chefId)
  chef.favouriteCount += 1
  await chef.save()
  await user.save()
  res.status(200).json({
    status: 'success',
    data: {
      user,
      favouriteChefs,
    },
  })
})

exports.deleteFavouriteChef = catchAsync(async (req, res, next) => {
  const { chefId } = req.params
  const chef = await Chef.findById(chefId)
  const user = await User.findById(req.user._id)
  const favouriteChefs = user.favouriteChefs

  if (!favouriteChefs.includes(chefId)) {
    return next(
      new AppError('You have not added this chef to your favourites', 400)
    )
  }
  favouriteChefs.pull(chefId)
  chef.favouriteCount -= 1
  await chef.save()
  await user.save()
  res.status(200).json({
    status: 'success',
    data: {
      user,
      favouriteChefs,
    },
  })
})
