const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const User = require('./../models/userModel')
const Admin = require('./../models/adminModel')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}


exports.signup = catchAsync(async (req, res, next) => {
  const body = { ...req.body }
  try {
    const newUser = await User.create({
      name: body.enteredName,
      surname: body.enteredSurname,
      email: body.enteredEmail,
      password: body.enteredPassword,
    })
    const token = signToken(newUser._id)

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    })
  }
})
/*
exports.googleLogin = catchAsync(async (req, res, next) => {  
  const { tokenId } = req.body
  if ( tokenId ) {
    try {
      const response = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      const { email_verified, name, email } = response.payload
      
      const newUser = new User({
        name: name,
        email: email,
        password: email + process.env.JWT_SECRET,
      })
      const token = signToken(newUser._id)

      res.status(201).json({
        status: 'success',
        token,
        data: {
          user: newUser,
        },
      })
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err,
      })
    }
  } else {
    res.status(400).json({
      status: 'fail',
      message: 'Google login failed',
    })
  }
})
*/




exports.login = catchAsync(async (req, res, next) => {
  try {
    const body = { ...req.body }
    const { email, password } = body
    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400))
    }
    const user = await User.findOne({ email }).select('+password')
    const admin = await Admin.findOne({ email }).select('+password')
    if (user) {
      const correct = await user.correctPassword(password, user.password)
      if (!user || !correct) {
        return next(new AppError('Incorrect email or password', 401))
      }
      const token = signToken(user._id)
      return res.status(200).json({
        status: 'success',
        token,
        uid: user._id,
        ischef: user.isChef,
        isApplied: user.isApplied,
        isAdmin: user.isAdmin,
        //chefId: user.chefId,
      })
    }
    if (admin) {
      const correct = await admin.correctPassword(password, admin.password)
      if (!admin || !correct) {
        return next(new AppError('Incorrect email or password', 401))
      }
      const token = signToken(admin._id)

      return res.status(200).json({
        status: 'success',
        token,
        uid: admin._id,
        isAdmin: admin.isAdmin,
      })
    }
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    })
  }
})

exports.protect = catchAsync(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    )
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  const currentUser = await User.findById(decoded.id)
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    )
  }

  req.user = currentUser
  next()
})
