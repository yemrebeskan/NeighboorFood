const multer = require('multer')
const path = require('path')
const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/profile_pictures')
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`)
  },
})

const upload = multer({
  storage: multerStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true)
    } else {
      cb(new AppError('Not an image! Please upload only images.', 400), false)
    }
  },
})

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!user) {
    const id = req.params.id
    return next(new AppError(`No user found with that ${id}`, 404))
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  })
})
;(exports.changeImage = upload.single('image')),
  catchAsync(async (req, res, next) => {
    if (!req.file) {
      return next(new AppError('Please upload an image!', 400))
    }

    if (!user) {
      return next(new AppError('No user found with that ID', 404))
    }
    //burası çalışcak mı emin değilim
    if (user.image) {
      removeImage(user.image)
    }

    const imagePath = path.join('images', 'profile_pictures', req.file.filename)

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { image: imagePath },
      { new: true, runValidators: true }
    )

    if (!user) {
      return next(new AppError('User not found', 404))
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    })
  })

exports.removeImage = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { image: null },
    { new: true, runValidators: true }
  )
  if (!user) {
    const id = req.params.id
    return next(new AppError(`No user found with that ${id}`, 404))
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  })
})

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('+password')
  if (!user) {
    const id = req.params.id
    return next(new AppError(`No user found with that ${id}`, 404))
  }
  const { password, newPassword, newPasswordConfirm } = req.body
  if (!(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect password', 401))
  }
  user.password = newPassword

  await user.save()
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  })
})

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id)
  if (!user) {
    const id = req.params.id
    return next(new AppError(`No user found with that ${id}`, 404))
  }
  res.status(204).json({
    status: 'success',
    data: null,
  })
})
