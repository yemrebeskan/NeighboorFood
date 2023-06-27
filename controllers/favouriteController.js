const User = require('../models/userModel')
const Chef = require('../models/chefModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

//BURALAR TAMAM GİBİ AMA FRONT KONTROLÜ OLMADIĞI İÇİN BİLMİYORUM
exports.getFavouriteChefsById = catchAsync(async (req, res, next) => {
  const id = req.params.id
  const user = await User.findById(id).populate('favouriteChefs')
  console.log(user)
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
  const userId = req.params.userId
  const chefId = req.params.chefId

  const user = await User.findById(userId)
  const realChef = await Chef.findById(chefId)
  const realChefId = realChef._id

  const updatedFavouriteChefs = [...user.favouriteChefs]

  if (updatedFavouriteChefs) {
    if (updatedFavouriteChefs.some((chef) => chef._id === realChefId)) {
      return next(
        new AppError('You have already added this chef to your favourites', 400)
      )
    }
  }

  updatedFavouriteChefs.push(realChefId)
  user.favouriteChefs = updatedFavouriteChefs
  await user.save()
  res.status(200).json({
    status: 'success',
    length: updatedFavouriteChefs.length,
    data: {
      user,
      updatedFavouriteChefs,
    },
  })
})

exports.deleteFavouriteChef = catchAsync(async (req, res, next) => {
  const chefId = req.params.chefId
  const realChef = await Chef.findById(chefId)
  const realChefId = realChef._id
  const userId = req.params.userId
  const user = await User.findById(userId)
  let updatedFavouriteChefs = [...user.favouriteChefs]

  if (updatedFavouriteChefs) {
    if (!favouriteChefs.includes(realChefId)) {
      return next(
        new AppError('You have not added this chef to your favourites', 400)
      )
    }
  }

  updatedFavouriteChefs = updatedFavouriteChefs.map(
    (chef) => chef._id !== chefId
  )
  user.favouriteChefs = updatedFavouriteChefs
  realChef.favouriteCount -= 1
  await realChef.save()
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
