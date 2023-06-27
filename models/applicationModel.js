const mongoose = require('mongoose')
const Schema = mongoose.Schema

const applicationModel = new Schema({
  userInfos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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

const Application = mongoose.model('Application', applicationModel)
module.exports = Application
