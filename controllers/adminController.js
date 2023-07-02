const User = require('../models/userModel')
const Chef = require('../models/chefModel')
const Food = require('../models/foodModel')
const Admin = require('../models/adminModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const Application = require('../models/applicationModel')
const Menu = require('../models/menuModel')

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
  const users = await Application.find().populate({
    path: 'userInfos',
    model: 'User',
  })

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  })
})

exports.acceptApplication = catchAsync(async (req, res, next) => {
  const applicationId = req.params.id
  const application = await Application.findById(applicationId)
  const user = await User.findByIdAndUpdate(
    application.userInfos,
    { isChef: true, isApplied: false },
    { new: true, runValidators: true }
  )
  const body = { ...req.body }
  const { aboutNewChef, country, streetAdress, city } = body
  const newChef = new Chef({
    userInfos: user._id,
    informationAboutChef: aboutNewChef,
    country: country,
    streetAddress: streetAdress,
    city: city,
  })
  await newChef.save()

  const chefsMenu = new Menu({
    chef: newChef._id,
  })
  await chefsMenu.save()

  const newNotification = new Notification({
    message: 'Your application has been accepted',
    to: user._id,
  })
  await newNotification.save()

  await Application.findByIdAndRemove(applicationId)

  res.status(200).json({
    status: 'success',
    data: {
      newChef,
    },
  })
})

exports.refuseApplication = catchAsync(async (req, res, next) => {
  const applicationId = req.params.id
  await Application.findByIdAndRemove(applicationId)

  res.status(200).json({
    status: 'success',
  })
})
