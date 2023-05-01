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
  items: [
    {
      name: {
        type: String,
      },
      price: {
        type: Number,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
  state: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending',
  },
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
