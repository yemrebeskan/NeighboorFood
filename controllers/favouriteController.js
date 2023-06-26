const User = require('../models/userModel')
const Chef = require('../models/chefModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

//BURALAR TAMAM GİBİ AMA FRONT KONTROLÜ OLMADIĞI İÇİN BİLMİYORUM
exports.getFavouriteChefsById = catchAsync(async (req, res, next) => {
  const id = req.params.id
  const user = await User.findById(id).populate('favouriteChefs')
  if (!user) {
    const id = req.params.id
    return next(new AppError(`No user found with that ${id}`, 404))
  }
  const favouriteChefs = user.favouriteChefs.map((chef) => ({
    id: chef.userInfos._id,
    name: `${chef.userInfos.name} ${chef.userInfos.surname}`,
    image: chef.userInfos.image,
    rating: chef.rating,
    about: chef.about,
  }))
  res.status(200).json({
    status: 'success',
    data: {
      user,
      favouriteChefs,
    },
  })
})

exports.addFavouriteChef = catchAsync(async (req, res, next) => {
  const userId = req.params.id
  const user = await User.findById(userId)
  const chefId = req.params.cid
  const realChefId = await Chef.findOne({ userInfos: chefId })
  const favouriteChefs = user.favouriteChefs

  if (favouriteChefs.some((chef) => chef.id === realChefId)) {
    return next(
      new AppError('You have already added this chef to your favourites', 400)
    )
  }
  favouriteChefs.push(realChefId)
  await user.save()
  res.status(200).json({
    status: 'success',
    length: favouriteChefs.length,
    data: {
      user,
      favouriteChefs,
    },
  })
})

exports.deleteFavouriteChef = catchAsync(async (req, res, next) => {
  const chefId = req.params.cid
  const realChefId = await Chef.findOne({ userInfos: chefId })
  const userId = req.params.id
  const user = await User.findById(userId)
  const favouriteChefs = user.favouriteChefs

  if (!favouriteChefs.includes(realChefId)) {
    return next(
      new AppError('You have not added this chef to your favourites', 400)
    )
  }
  favouriteChefs.pull(realChefId)
  chef.favouriteCount -= 1
  await chef.save()
  await user.save()
  res.status(200).json({
    status: 'success',
    length: favouriteChefs.length,
    data: {
      user,
      favouriteChefs,
    },
  })
})
