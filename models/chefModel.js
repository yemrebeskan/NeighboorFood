const mongoose = require('mongoose')

const chefSchema = new mongoose.Schema({
  userInfos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  thumbnail: {
    type: String,
    default:
      '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',
  },
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu',
  },
  rating: {
    type: Number,
    default: 0,
  },
  favouriteCount: {
    type: Number,
    default: 0,
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
  about: {
    type: String,
    default: '',
  },
  reviews: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  },
  informationAboutChef: {
    type: String,
    default: '',
  },
  country: {
    type: String,
  },
  streetAddress: {
    type: String,
    default: '',
  },
  city: {
    type: String,
    default: '',
  },
})

const Chef = mongoose.model('Chef', chefSchema)

module.exports = Chef
