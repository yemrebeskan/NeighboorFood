const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    trim: true,
    default: 'undefined',
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
    default: Date.now(),
  },
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review
