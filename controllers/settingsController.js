const multer = require('multer')
const path = require('path')
const User = require('../models/userModel')
const bcryptjs = require('bcryptjs')
const fs = require('fs')
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

exports.getImage = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    const id = req.params.id
    return next(new AppError(`No user found with that ${id}`, 404))
  }
  const imageBase64 = user.image
  res.send(imageBase64)
})

exports.changeImage = catchAsync(async (req, res, next) => {
  const imageBase64 = req.body
  const userId = req.params.id
  const user = await User.findByIdAndUpdate(
    userId,
    { image: imageBase64 },
    { new: true, runValidators: true }
  )
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
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png',
    },
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
  const body = { ...req.body }
  const user = await User.findById(req.params.id).select('+password')
  if (!user) {
    const id = req.params.id
    return next(new AppError(`No user found with that ${id}`, 404))
  }

  const { password, newPassword } = body

  user.password = newPassword // Şifre yenilenirken kriptolamaya gerek yok.
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
