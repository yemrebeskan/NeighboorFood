const User = require('../models/userModel')
const Chef = require('../models/chefModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const Review = require('../models/reviewModel')

exports.getAllReviewsForChef = catchAsync(async (req, res, next) => {
  // getAllReviewsForChef maybe
  try {
    const user = await Chef.findById(req.params.id).populate({
      path: 'reviews',
      model: 'Review',
      populate: {
        // We must do this to get reviewers name and surnames
        path: 'user',
        model: 'User',
      },
    })
    const review = user.reviews
    res.status(200).json({
      status: 'success',
      results: review.length,
      data: {
        reviews: review,
      },
    })
  } catch (e) {
    console.log(e)
    return next(new AppError(`Error ${e.toString()}`, 500))
  }
})

exports.makeReview = catchAsync(async (req, res, next) => {
  const userId = req.params.userId
  const chefId = req.params.chefId
  const { rating, comment } = req.body
  const user = await User.findById(userId)
  const chef = await Chef.findById({ userInfos: chefId })
  const newReview = new Review({
    user: userId,
    chef: chefId,
    rating,
    comment,
  })
  await newReview.save()
  res.status(200).json({
    status: 'success',
    data: {
      user,
      chef,
      newReview,
    },
  })
})

exports.makeReply = catchAsync(async (req, res, next) => {
  const reviewId = req.params.id
  const { reply } = req.body
  const review = await Review.findById(reviewId)
  if (!review) {
    return next(new AppError(`No review found with that ${reviewId}`, 404))
  }
  review.reply = reply
  await review.save()
  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  })
})
