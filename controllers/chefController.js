const Chef = require('../models/chefModel')
const Food = require('../models/foodModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const User = require('../models/userModel')
const Menu = require('../models/menuModel')
const Order = require('../models/orderModel')

exports.getAllChefs = catchAsync(async (req, res, next) => {
  const city = req.params.location
  const chefs = await Chef.find({ city: city })
    .populate({
      path: 'userInfos',
    })
    .populate({
      path: 'menu',
      populate: {
        path: 'foods',
        model: 'Food',
        select: 'name price kcal likes dislikes carts -_id',
      },
    })

  const chefData = chefs.map((chef) => {
    return {
      id: chef.userInfos.id,
      name: chef.userInfos.name,
      surname: chef.userInfos.surname,
      image: chef.userInfos.image,
      chefFoods: chef.menu
        ? chef.menu.foods.map((food) => {
            return {
              chefId: chef.userInfos.id,
              menuName: food.name,
              price: food.price,
              kcal: food.kcal,
              carts: food.carts,
              likes: food.likes,
              dislikes: food.dislikes,
            }
          })
        : [],
    }
  })
  res.status(200).json({
    status: 'success',
    results: chefs.length,
    data: chefData,
  })
})

exports.getChefById = catchAsync(async (req, res, next) => {
  const userId = req.params.id
  const chef = await Chef.find({ userInfos: userId }).populate({
    path: 'userInfos',
  })

  if (!chef || chef.length === 0) {
    const id = req.params.id
    return next(new AppError(`No chef found with that ${id}`, 404))
  }

  res.status(200).json({
    status: 'success',
    results: chef.length,
    data: {
      chef,
    },
  })
})

exports.getChefByDistrict = catchAsync(async (req, res, next) => {
  const district = req.params.district
  const chefs = await Chef.find().populate({
    path: 'userInfos',
    match: { district: district },
  })

  if (!chefs || chefs.length === 0) {
    return next(new AppError(`No chef found in ${district}`, 404))
  }

  res.status(200).json({
    status: 'success',
    results: chefs.length,
    data: {
      chefs,
    },
  })
})
exports.getChefMenu = catchAsync(async (req, res, next) => {
  const userId = req.params.id
  const chef = await Chef.findOne({ userInfos: userId })
  const menu = await Menu.findOne({ chefInfos: chef._id }).populate({
    path: 'foods',
    model: 'Food',
  })
  if (!chef) {
    const id = req.params.id
    return next(new AppError(`No chef found with that ${id}`, 404))
  }
  res.status(200).json({
    status: 'success',
    data: {
      menu,
    },
  })
})

exports.updateChef = catchAsync(async (req, res, next) => {
  const chefId = req.params.id
  const { thumbnail, menu, about } = req.body

  const chef = await Chef.findOne({ userInfos: chefId })
  if (!chef) {
    return next(new AppError(`No chef found with that ${chefId}`, 404))
  }

  if (thumbnail) {
    chef.thumbnail = thumbnail
  }
  if (menu) {
    chef.menu = menu
  }
  if (about) {
    chef.about = about
  }

  await chef.save()

  res.status(200).json({
    status: 'success',
    data: {
      chef,
    },
  })
})

exports.updateAbout = catchAsync(async (req, res, next) => {
  const chefId = req.params.id
  const { about } = req.body
  const chef = await Chef.findOne({ userInfos: chefId })
  if (!chef) {
    return next(new AppError(`No chef found with that ${chefId}`, 404))
  }
  chef.about = about
  await chef.save()
  res.status(200).json({
    status: 'success',
    data: {
      chef,
    },
  })
})

exports.addFoodToMenu = catchAsync(async (req, res, next) => {
  const chefId = req.params.id
  const chef = await Chef.findOne({ userInfos: chefId })
  const { name, kcal, price, image } = req.body
  const newFood = new Food({ name, kcal, price, image, chef: chef._id })
  const savedFood = await newFood.save()

  if (!chef) {
    return res.status(404).json({
      status: 'fail',
      message: 'Chef not found',
    })
  }

  let menu = await Menu.findOne({ chefInfos: chef._id })
  if (!menu) {
    // Create a new menu if it doesn't exist
    menu = new Menu({ chefInfos: chef._id, foods: [] })
    chef.menu = menu._id
  }

  menu.foods.push(savedFood._id)
  await menu.save()
  await chef.save()
  res.status(200).json({
    status: 'success',
    data: {
      chef,
      menu,
    },
  })
})

exports.removeFoodFromMenu = catchAsync(async (req, res, next) => {
  const chefId = req.params.id
  const foodId = req.params.foodId
  const chef = await Chef.findOne({ userInfos: chefId })
  const menu = await Menu.findOne({ chefInfos: chef._id })
  menu.foods.filter((food) => food._id !== foodId)

  await menu.save()
  await Food.findByIdAndDelete(foodId)
  res.status(200).json({
    status: 'success',
    data: {
      chef,
      menu,
    },
  })
})

exports.updateFood = catchAsync(async (req, res, next) => {
  const chefId = req.params.id
  const foodId = req.params.foodId
  const newBody = {}
  Object.keys(req.body).forEach((key) => {
    if (typeof req.body[key] !== undefined) {
      newBody[key] = req.body[key]
    }
  })
  const chef = await Chef.findOne({ userInfos: chefId })
  const menu = await Menu.findOne({ chefInfos: chef._id })
  const food = await Food.findByIdAndUpdate(
    foodId,
    { ...newBody },
    { new: true, runValidators: true }
  )
  await food.save()
  res.status(200).json({
    status: 'success',
    data: {
      chef,
      menu,
      food,
    },
  })
})

// BURA ÇALIŞIYO AMA CANCEL CHEF OLAN BİRİ USERID'SİNİ GİRİNCE HATA VERİYO AMA TÜM USERLARDA ARAYINCA O ID İLE ÇIKIYOR
exports.cancelChef = catchAsync(async (req, res, next) => {
  const userId = req.params.id
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isChef: false },
    { new: true, runValidators: true }
  )
  const chef = await Chef.findOneAndDelete({ userInfos: userId })
    .populate({
      path: 'userInfos',
    })
    .exec()
  if (!user) {
    const id = req.params.id
    return next(new AppError(`No user found with that ${id}`, 404))
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
      isChef: user.isChef,
    },
  })
})

exports.getThumbnail = catchAsync(async (req, res, next) => {
  const userId = req.params.id
  const chef = await Chef.findOne({ userInfos: userId })
  if (!chef) {
    const id = req.params.id
    return next(new AppError(`No chef found with that ${id}`, 404))
  }
  const imageBase64 = chef.thumbnail
  res.send(imageBase64)
})

exports.changeFoodImage = catchAsync(async (req, res, next) => {
  const foodId = req.params.foodId
  const imageBase64 = req.body.newFoodImage
  const food = await Food.findByIdAndUpdate(
    foodId,
    { image: imageBase64 },
    { new: true, runValidators: true }
  )

  res.status(200).json({
    status: 'success',
    data: {
      food,
    },
  })
})

exports.removeFoodImage = catchAsync(async (req, res, next) => {
  const foodId = req.params.foodId
  const food = await Food.findByIdAndUpdate(
    foodId,
    {
      image:
        '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',
    },
    { new: true, runValidators: true }
  )

  res.status(200).json({
    status: 'success',
    data: {
      food,
    },
  })
})

exports.changeThumbnail = catchAsync(async (req, res, next) => {
  const imageBase64 = req.body.thumbnail
  const userId = req.params.id
  const chef = await Chef.findOneAndUpdate(
    { userInfos: userId },
    { thumbnail: imageBase64 },
    { new: true, runValidators: true }
  )

  res.status(200).json({
    status: 'success',
    data: {
      chef,
    },
  })
})

exports.removeThumbnail = catchAsync(async (req, res, next) => {
  const userId = req.params.id
  const chef = await Chef.findOneAndUpdate(
    { userInfos: userId },
    {
      thumbnail:
        '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',
    },
    { new: true, runValidators: true }
  )

  if (!chef) {
    return next(new AppError(`No chef found with that id: ${userId}`, 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      thumbnail: chef.thumbnail,
    },
  })
})

exports.getFoodImage = catchAsync(async (req, res, next) => {
  const foodId = req.params.foodId
  const food = await Food.findById(foodId)
  const imageBase64 = food.image
  res.send(imageBase64)
})

exports.changeFoodImage = catchAsync(async (req, res, next) => {
  const imageBase64 = req.body.getFoodImage
  const foodId = req.params.foodId
  const food = await Food.findByIdAndUpdate(
    foodId,
    { image: imageBase64 },
    { new: true, runValidators: true }
  )

  res.status(200).json({
    status: 'success',
    data: {
      food,
    },
  })
})
