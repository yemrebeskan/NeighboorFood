const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  chef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chef',
  },
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  state: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending',
  },
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
