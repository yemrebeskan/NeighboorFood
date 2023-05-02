const Chef = require('../models/chefModel')
const Food = require('../models/foodModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const User = require('../models/userModel')

exports.getAllChefs = catchAsync(async (req, res, next) => {
  const chef = await Chef.find().populate({
    path: 'userInfos',
  })
  res.status(200).json({
    status: 'success',
    results: chef.length,
    data: {
      chef,
    },
  })
})

exports.getChefById = catchAsync(async (req, res, next) => {
  const userId = req.params.id
  const chef = await Chef.find({ userInfos: userId }).populate({
    path: 'userInfos',
  })
  console.log(chef)
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
    .populate({
      path: 'menu',
      model: 'Food',
    })
    .populate({
      path: 'userInfos',
    })

  if (!chef) {
    const id = req.params.id
    return next(new AppError(`No chef found with that ${id}`, 404))
  }
  res.status(200).json({
    status: 'success',
    data: {
      chef,
      menu: chef.menu,
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

exports.updateChefMenu = catchAsync(async (req, res, next) => {
  const chefId = req.params.id
  const { menu } = req.body

  const chef = await Chef.findOne({ userInfos: chefId })
  if (!chef) {
    return next(new AppError(`No chef found with that ${chefId}`, 404))
  }

  if (menu) {
    chef.menu = menu
  }

  await chef.save()

  res.status(200).json({
    status: 'success',
    data: {
      chef,
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

exports.changeThumbnail = catchAsync(async (req, res, next) => {
  const userId = req.params.id
  const chef = await Chef.findOne({ userInfos: userId })

  if (!chef) {
    return next(new AppError(`No chef found with that id: ${userId}`, 404))
  }

  chef.thumbnail = req.body.thumbnail
  await chef.save({ validateBeforeSave: true })

  res.status(200).json({
    status: 'success',
    data: {
      thumbnail: chef.thumbnail,
    },
  })
})

exports.removeThumbnail = catchAsync(async (req, res, next) => {
  const userId = req.params.id
  const chef = await Chef.findOneAndUpdate(
    { userInfos: userId },
    { thumbnail: '' },
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

