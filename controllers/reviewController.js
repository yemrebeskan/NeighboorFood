const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const Review = require('../models/reviewModel')

exports.getAllReviewsById = catchAsync(async (req, res, next) => {
  const review = await Review.find({
    user: mongoose.Types.ObjectId(req.params.id),
  }).populate('user')

  res.status(200).json({
    status: 'success',
    results: review.length,
    data: {
      review,
    },
  })
})

exports.getAllReviewsForUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate('reviews')
  const review = user.reviews
  res.status(200).json({
    status: 'success',
    results: review.length,
    data: {
      review,
    },
  })
})

exports.makeReview = catchAsync(async (req, res, next) => {
  const { name, rating, comment } = req.body
  const user = req.user.id
  const review = await Review.create({
    name,
    rating,
    comment,
    user,
  })
  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  })
})

exports.updateReview = catchAsync(async (req, res, next) => {
  const reviewId = req.params.id
  const reviewData = req.body

  const review = await Review.findByIdAndUpdate(reviewId, reviewData, {
    new: true,
    runValidators: true,
  })

  if (!review) {
    return next(new AppError(`No review found with that ${reviewId}`, 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  })
})

exports.deleteReview = catchAsync(async (req, res, next) => {
  const reviewId = req.params.id
  const review = await Review.findByIdAndDelete(reviewId)

  if (!review) {
    return next(new AppError(`No review found with that ${reviewId}`, 404))
  }

  res.status(204).json({
    status: 'success',
    data: null,
  })
})
