const User = require('../models/userModel')
const Chef = require('../models/chefModel')
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

exports.getAllReviewsForUser = catchAsync(async (req, res, next) => { // getAllReviewsForChef maybe
  try {
    const user = await Chef.findById(req.params.id).populate({
      path: 'reviews',
      model: 'Review',
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
    console.log(e);
    return next(new AppError(`Error ${e.toString()}`, 500));
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
      newReview,
    },
  })
})
