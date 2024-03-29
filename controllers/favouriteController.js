const User = require('../models/userModel')
const Chef = require('../models/chefModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

//BURALAR TAMAM GİBİ AMA FRONT KONTROLÜ OLMADIĞI İÇİN BİLMİYORUM
exports.getFavouriteChefsById = catchAsync(async (req, res, next) => {
  const id = req.params.id
  const user = await User.findById(id).populate({
    path: 'favouriteChefs',
    populate: {
      path: 'userInfos',
      select: 'name surname', // Sadece isim ve soyisim alanlarını seçin
    },
  })

  if (!user) {
    const id = req.params.id
    return next(new AppError(`No user found with that ${id}`, 404))
  }
  const favouriteChefs = user.favouriteChefs.map((chef) => ({
    id: chef.userInfos._id,
    chefId: chef._id,
    name: `${chef.userInfos.name}`,
    surname: `${chef.userInfos.surname}`,
    image: chef.userInfos.image,
    rating: chef.rating,
    about: chef.about,
  }))
  res.status(200).json({
    status: 'success',
    data: {
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
  realChef.favouriteCount += 1
  await realChef.save()
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
    if (
      updatedFavouriteChefs.some((chefId) => {
        return chefId === realChefId
      })
    ) {
      return next(
        new AppError('You have not added this chef to your favourites', 400)
      )
    }
  }

  updatedFavouriteChefs = updatedFavouriteChefs.filter(
    (favChefId) => favChefId.toString() !== chefId
  )

  user.favouriteChefs = updatedFavouriteChefs
  realChef.favouriteCount -= 1
  await realChef.save()
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

exports.isFavouriteChef = async (req, res, next) => {
  try {
    const uid = req.params.userId
    const chefId = req.params.chefId
    const user = await User.findById(uid)
    const isFavourite = user.favouriteChefs.some((chef) => chef === chefId)

    res.status(200).json({
      status: 'success',
      length: updatedFavouriteChefs.length,
      isFavourite: isFavourite,
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    })
  }
}
