const mongoose = require('mongoose')

const chefSchema = new mongoose.Schema({
  userInfos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  thumbnail: {
    type: String,
    default:
      'https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png',
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
