const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  chef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chef',
  },
  rating: {
    type: Number,
    default: 0,
  },
  comment: {
    type: String,
    default: '',
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review
