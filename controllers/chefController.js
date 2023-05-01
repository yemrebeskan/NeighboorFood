const Chef = require('../models/chefModel')
const Food = require('../models/foodModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getAllChefs = catchAsync(async (req, res, next) => {
  const chef = await Chef.find()

  res.status(200).json({
    status: 'success',
    results: chef.length,
    data: {
      chef,
    },
  })
})

exports.getChefById = catchAsync(async (req, res, next) => {
  const chefs = await Chef.findById(req.params.id)
  if (!chefs || chefs.length === 0) {
    const id = req.params.id
    return next(new AppError(`No chef found with that ${id}`, 404))
  }
  res.status(200).json({
    status: 'success',
    results: chefs.length,
    data: {
      chefs,
    },
  })
})

exports.getChefByDistrict = catchAsync(async (req, res, next) => {
  const district = req.params.district
  const chefs = await Chef.find({
    district: new RegExp(district, 'i'),
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
  const chef = await Chef.findById(req.params.id).populate('menu')
  if (!chef) {
    const id = req.params.id
    return next(new AppError(`No chef found with that ${id}`, 404))
  }
  res.status(200).json({
    status: 'success',
    data: {
      chefName: chef.name,
      menu: chef.menu,
    },
  })
})

exports.updateChef = catchAsync(async (req, res, next) => {
  const { name, menu } = req.body
  const chef = await Chef.findById(req.params.id)

  if (!chef) {
    return next(new AppError('No chef found with that id', 404))
  }

  chef.name = name
  chef.menu = menu
  await chef.save()

  res.status(200).json({
    status: 'success',
    data: {
      chef,
    },
  })
})

exports.updateChefMenu = catchAsync(async (req, res, next) => {
  const { chefId, foodIds } = req.body
  const chef = await Chef.findById(chefId)
  const foods = await Promise.all(
    foodIds.map(async (foodId) => {
      let food = await Food.findById(foodId)
      if (!food) {
        food = await new Food({
          chef: chefId,
          _id: foodId,
        }).save()
      }
      return food
    })
  )
  chef.menu = foods.map((food) => food._id)
  await chef.save()
  res.status(200).json({
    status: 'success',
    data: {
      chef,
      menu: chef.menu,
    },
  })
})

exports.cancelChef = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isChef: false },
    { new: true, runValidators: true }
  )
  const chef = await Chef.findOneAndDelete({ userInfos: user._id })
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

exports.changeThumbnail = catchAsync(async (req, res, next) => {
  const thumbnail = await Chef.findByIdAndUpdate(
    req.params.id,
    { thumbnail: req.body.thumbnail },
    { new: true, runValidators: true }
  )
  if (!thumbnail) {
    const id = req.params.id
    return next(new AppError(`No chef found with that ${id}`, 404))
  }
  res.status(200).json({
    status: 'success',
    data: {
      thumbnail,
    },
  })
})

exports.removeThumbnail = catchAsync(async (req, res, next) => {
  const thumbnail = await Chef.findByIdAndUpdate(
    req.params.id,
    { thumbnail: '' },
    { new: true, runValidators: true }
  )
  if (!thumbnail) {
    const id = req.params.id
    return next(new AppError(`No chef found with that ${id}`, 404))
  }
  res.status(200).json({
    status: 'success',
    data: {
      thumbnail,
    },
  })
})
