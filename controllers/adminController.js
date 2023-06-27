const User = require('../models/userModel')
const Chef = require('../models/chefModel')
const Food = require('../models/foodModel')
const Admin = require('../models/adminModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.createAdmin = catchAsync(async (req, res, next) => {
  const { name, surname, email, password } = req.body
  const admin = await Admin.create({
    name,
    surname,
    email,
    password,
  })
  res.status(201).json({
    status: 'success',
    data: {
      admin,
    },
  })
})

exports.getAllApplications = catchAsync(async (req, res, next) => {
  const users = await User.find({ isApplied: true })

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  })
})
