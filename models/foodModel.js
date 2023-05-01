const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    default: 'undefined',
  },
  price: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  disslikes: {
    type: Number,
    default: 0,
  },
  chef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chef',
  },
  image: {
    type: String,
    default: 'undefined',
  },
  isToday: {
    type: Boolean,
    default: false,
  },
})

const Food = mongoose.model('Food', foodSchema)

module.exports = Food
