const mongoose = require('mongoose')

const Schema = mongoose.Schema

const notificationSchema = new Schema({
  message: {
    type: String,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const Notification = mongoose.model('notification', notificationSchema)

module.exports = Notification
