const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    default: 'undefined',
  },
  kcal: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default:
      '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',
  },
  isToday: {
    type: Boolean,
    default: false,
  },
  chef: {
    type: mongoose.Schema.ObjectId,
    ref: 'Chef',
  },
})

const Food = mongoose.model('Food', foodSchema)

module.exports = Food
